import { Resend } from "resend";
import type { LabNote } from "@prisma/client";

/**
 * Send an email notification when a new Lab Note is submitted.
 *
 * CONTRACT:
 *   - This function NEVER throws. Callers must not depend on it for success.
 *   - If Resend is not configured (missing env vars), it logs a warning and
 *     returns { sent: false }. The note remains PENDING in the DB.
 *   - If the API call fails, logs the error and returns { sent: false }.
 *   - The DB write must happen BEFORE calling this function.
 *
 * EMAIL CONTENT:
 *   - Contains: rating, name, email, context, message, status, createdAt
 *   - Does NOT contain: IP address, ipHash, userAgentSummary, DB internals
 */

export type EmailResult =
  | { sent: true; messageId: string }
  | { sent: false; reason: string };

function buildStars(rating: number): string {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

function formatDate(date: Date): string {
  return date.toLocaleString("en-US", {
    timeZone: "UTC",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

export async function sendLabNoteNotification(
  note: Pick<LabNote, "id" | "rating" | "name" | "email" | "context" | "message" | "status" | "createdAt">
): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.FEEDBACK_NOTIFICATION_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    const missing = [
      !apiKey && "RESEND_API_KEY",
      !fromEmail && "RESEND_FROM_EMAIL",
      !toEmail && "FEEDBACK_NOTIFICATION_EMAIL",
    ]
      .filter(Boolean)
      .join(", ");

    console.warn(
      `[Email] Notification skipped — missing env vars: ${missing}. ` +
        `Note ID ${note.id} is saved as PENDING.`
    );
    return { sent: false, reason: `Missing config: ${missing}` };
  }

  const resend = new Resend(apiKey);
  const displayName = note.name?.trim() || "Anonymous";

  const textBody = [
    "NEW LAB NOTE — PENDING REVIEW",
    "",
    `Rating:  ${buildStars(note.rating)} (${note.rating}/5)`,
    `Name:    ${displayName}`,
    `Email:   ${note.email ?? "(not provided)"}`,
    `Context: ${note.context ?? "(not specified)"}`,
    "",
    "Message:",
    note.message,
    "",
    `Status:  ${note.status}`,
    `Created: ${formatDate(note.createdAt)}`,
    "",
    "---",
    "Review and approve this note in Prisma Studio or the admin interface (next milestone).",
  ].join("\n");

  const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><style>
  body { font-family: monospace; background: #0a0b10; color: #e2e8f0; padding: 32px; }
  .container { max-width: 560px; margin: 0 auto; }
  .badge { display: inline-block; background: #1e293b; border: 1px solid #334155; border-radius: 4px; padding: 2px 10px; font-size: 11px; letter-spacing: 0.1em; color: #94a3b8; text-transform: uppercase; margin-bottom: 24px; }
  h1 { font-size: 18px; font-weight: bold; color: #f1f5f9; margin: 0 0 24px; }
  .field { margin-bottom: 16px; }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; margin-bottom: 4px; }
  .value { font-size: 14px; color: #e2e8f0; }
  .stars { color: #5ed2ba; font-size: 20px; letter-spacing: 2px; }
  .message-box { background: #111827; border: 1px solid #1e293b; border-radius: 6px; padding: 16px; margin: 16px 0; font-size: 13px; line-height: 1.6; color: #cbd5e1; }
  .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 11px; color: #475569; }
</style></head>
<body><div class="container">
  <div class="badge">Lab Notes</div>
  <h1>New Lab Note — Pending Review</h1>
  <div class="field">
    <div class="label">Rating</div>
    <div class="stars">${buildStars(note.rating)}</div>
    <div class="value" style="margin-top:4px;font-size:12px;color:#64748b">${note.rating} / 5</div>
  </div>
  <div class="field">
    <div class="label">Name</div>
    <div class="value">${displayName}</div>
  </div>
  <div class="field">
    <div class="label">Email</div>
    <div class="value">${note.email ?? "<em style='color:#475569'>not provided</em>"}</div>
  </div>
  <div class="field">
    <div class="label">Context</div>
    <div class="value">${note.context ?? "<em style='color:#475569'>not specified</em>"}</div>
  </div>
  <div class="field">
    <div class="label">Message</div>
    <div class="message-box">${note.message.replace(/\n/g, "<br>")}</div>
  </div>
  <div class="field">
    <div class="label">Status</div>
    <div class="value" style="color:#f59e0b">${note.status}</div>
  </div>
  <div class="field">
    <div class="label">Created</div>
    <div class="value" style="font-size:12px;color:#94a3b8">${formatDate(note.createdAt)}</div>
  </div>
  <div class="footer">
    Review and approve this note in Prisma Studio or the admin interface (next milestone).
  </div>
</div></body></html>
  `.trim();

  try {
    const result = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: "New Lab Note — Pending Review",
      text: textBody,
      html: htmlBody,
    });

    if (result.error) {
      console.error("[Email] Resend API error:", result.error);
      return { sent: false, reason: result.error.message };
    }

    console.info(`[Email] Notification sent for note ${note.id}. Message ID: ${result.data?.id}`);
    return { sent: true, messageId: result.data?.id ?? "unknown" };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[Email] Unexpected error sending notification:", err);
    return { sent: false, reason: message };
  }
}
