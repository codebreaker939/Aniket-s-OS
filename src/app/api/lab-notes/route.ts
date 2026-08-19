import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { prisma } from "@/lib/db";
import { labNoteSubmitSchema } from "@/lib/lab-notes/server/schema";
import { checkRateLimit } from "@/lib/lab-notes/server/rate-limiter";
import { checkDuplicate } from "@/lib/lab-notes/server/spam-check";
import { sendLabNoteNotification } from "@/lib/lab-notes/server/email";

/**
 * Cache approved notes for 60 seconds server-side.
 * After moderation approval the cache will naturally expire within 1 minute.
 */
export const revalidate = 60;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Extract a privacy-safe hashed representation of the visitor IP.
 * Raw IP is never stored.
 */
function getIpHash(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return createHash("sha256").update(ip).digest("hex");
}

/**
 * Extract a brief, safe user-agent summary (browser family only).
 * Never stores the full UA string.
 */
function getUserAgentSummary(request: NextRequest): string | undefined {
  const ua = request.headers.get("user-agent") ?? "";
  if (!ua) return undefined;
  // Extract only the browser family token (first parenthetical / first token)
  const match = ua.match(/^([^(]+)/);
  return match ? match[1].trim().slice(0, 80) : undefined;
}

// ---------------------------------------------------------------------------
// Public response shape — NEVER include email, ipHash, or moderation metadata
// ---------------------------------------------------------------------------

type PublicLabNote = {
  id: string;
  rating: number;
  name: string;
  message: string;
  context: string | null;
  createdAt: string;
};

type PublicLabNotesResponse = {
  notes: PublicLabNote[];
  publishedCount: number;
  averageRating: number | null;
};

// ---------------------------------------------------------------------------
// GET /api/lab-notes — Public fetch (APPROVED notes only)
// ---------------------------------------------------------------------------

export async function GET(): Promise<NextResponse<PublicLabNotesResponse | { error: string }>> {
  try {
    const notes = await prisma.labNote.findMany({
      where: { status: "APPROVED" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        rating: true,
        name: true,
        message: true,
        context: true,
        createdAt: true,
        // Explicitly NOT selecting: email, ipHash, userAgentSummary,
        // approvedAt, rejectedAt, status, updatedAt
      },
    });

    const publishedCount = notes.length;
    const averageRating =
      publishedCount === 0
        ? null
        : Math.round(
          notes.reduce((sum: number, n) => sum + n.rating, 0) * 10
          ) / 10;

    const publicNotes: PublicLabNote[] = notes.map((note) => ({
      id: note.id,
      rating: note.rating,
      name: note.name?.trim() || "Anonymous",
      message: note.message,
      context: note.context,
      createdAt: note.createdAt.toISOString(),
    }));

    return NextResponse.json({
      notes: publicNotes,
      publishedCount,
      averageRating,
    });
  } catch (err) {
    console.error("[GET /api/lab-notes] Database error:", err);
    return NextResponse.json(
      { error: "Lab notes temporarily unavailable." },
      { status: 503 }
    );
  }
}

// ---------------------------------------------------------------------------
// POST /api/lab-notes — Submit a new note
// ---------------------------------------------------------------------------

export async function POST(
  request: NextRequest
): Promise<NextResponse> {
  // 1. Parse and validate request body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parseResult = labNoteSubmitSchema.safeParse(body);
  if (!parseResult.success) {
    const fieldErrors = parseResult.error.flatten().fieldErrors;
    return NextResponse.json(
      { error: "Validation failed.", fieldErrors },
      { status: 400 }
    );
  }

  const { rating, name, email, message, context } = parseResult.data;
  // honeypot already enforced by Zod — reaching here means it was empty

  // 2. Anti-spam: rate limit by hashed IP
  const ipHash = getIpHash(request);
  const rateLimitResult = checkRateLimit(ipHash);
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimitResult.retryAfterSeconds),
        },
      }
    );
  }

  // 3. Anti-spam: duplicate detection
  const duplicateResult = await checkDuplicate({ message, email });
  if (duplicateResult.isDuplicate) {
    // Return a generic success-adjacent message — don't confirm the duplicate
    // exists, to avoid leaking information
    return NextResponse.json(
      {
        success: true,
        message:
          "Your note has been sent for moderation. It will appear publicly after approval.",
      },
      { status: 200 }
    );
  }

  // 4. Normalize and create the PENDING record
  const userAgentSummary = getUserAgentSummary(request);

  let newNote;
  try {
    newNote = await prisma.labNote.create({
      data: {
        rating,
        name: name ?? null,
        email: email ?? null,
        message,
        context: context ?? null,
        status: "PENDING",
        ipHash,
        userAgentSummary: userAgentSummary ?? null,
      },
    });
  } catch (err) {
    console.error("[POST /api/lab-notes] Database write error:", err);
    return NextResponse.json(
      { error: "Could not save your note. Please try again." },
      { status: 500 }
    );
  }

  // 5. Attempt email notification (fire-and-forget — never blocks the response)
  // Database write succeeded; email failure must NOT delete the note.
  sendLabNoteNotification(newNote).then((emailResult) => {
    if (!emailResult.sent) {
      console.warn(
        `[POST /api/lab-notes] Email notification failed for note ${newNote.id}: ${emailResult.reason}`
      );
    }
  });

  // 6. Return safe confirmation — do NOT return the full DB row
  return NextResponse.json(
    {
      success: true,
      message:
        "Your note has been sent for moderation. It will appear publicly after approval.",
    },
    { status: 201 }
  );
}
