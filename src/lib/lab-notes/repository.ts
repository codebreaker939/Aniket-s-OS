import type {
  LabNote,
  LabNoteSubmission,
  LabNotesStats,
} from "./types";

/**
 * Honest initial state: No fake statistics or fake testimonials.
 */
export const initialLabNotesStats: LabNotesStats = {
  overallRating: "—",
  publishedCount: 0,
  statusText: "AWAITING LIVE DATA",
};

/**
 * Published notes list (empty by default for production honesty).
 */
export const publishedLabNotes: LabNote[] = [];

/**
 * Get stats for public header.
 */
export function getLabNotesStats(): LabNotesStats {
  if (publishedLabNotes.length === 0) {
    return initialLabNotesStats;
  }
  const sum = publishedLabNotes.reduce((acc, note) => acc + note.rating, 0);
  const avg = (sum / publishedLabNotes.length).toFixed(1);
  return {
    overallRating: `${avg} ★`,
    publishedCount: publishedLabNotes.length,
    statusText: "APPROVED FEEDBACK",
  };
}

/**
 * Demo submission function representing future POST /api/lab-notes endpoint.
 * Prepares local submission confirmation state without pretending a database write occurred.
 */
export async function submitLabNoteDemo(
  _submission: LabNoteSubmission
): Promise<{ success: boolean; noteId: string; message: string }> {
  void _submission;
  // Simulate network latency (250ms)
  await new Promise((resolve) => setTimeout(resolve, 250));

  const demoNoteId = `NOTE-DEMO-${Math.floor(100 + Math.random() * 900)}`;

  return {
    success: true,
    noteId: demoNoteId,
    message:
      "Your note has been prepared for moderation. It will appear publicly after approval.",
  };
}
