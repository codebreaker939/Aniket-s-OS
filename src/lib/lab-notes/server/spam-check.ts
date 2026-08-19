import { prisma } from "@/lib/db";

/**
 * Duplicate detection window: 10 minutes.
 * If a note with the same message + email (if provided) was submitted
 * within this window, reject it as a duplicate.
 */
const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

export type DuplicateCheckResult =
  | { isDuplicate: false }
  | { isDuplicate: true };

/**
 * Check for a recent duplicate submission.
 *
 * Duplicate criteria:
 *   - Same trimmed message
 *   - Same email (if provided; null emails are not matched against each other)
 *   - Submitted within the last 10 minutes
 *
 * This is intentionally conservative — it only prevents obvious accidental
 * double-submissions, not sophisticated abuse (handled by rate limiter).
 */
export async function checkDuplicate(params: {
  message: string;
  email: string | undefined;
}): Promise<DuplicateCheckResult> {
  const { message, email } = params;
  const since = new Date(Date.now() - DUPLICATE_WINDOW_MS);

  try {
    const existing = await prisma.labNote.findFirst({
      where: {
        message: message.trim(),
        // Only match on email if one was provided — never match null vs null
        ...(email ? { email } : {}),
        createdAt: { gte: since },
      },
      select: { id: true },
    });

    if (existing) {
      console.warn(
        `[SpamCheck] Duplicate submission detected within window. ` +
          `Existing ID: ${existing.id}`
      );
      return { isDuplicate: true };
    }

    return { isDuplicate: false };
  } catch (err) {
    // On DB error, allow the submission to continue (fail-open to preserve UX)
    // The create step will surface any real DB issues.
    console.error("[SpamCheck] Duplicate check DB error:", err);
    return { isDuplicate: false };
  }
}
