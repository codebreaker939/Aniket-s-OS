/* ─── Lab Notes Data & Type Abstractions ─────────────────── */

export type LabNoteStatus = "PENDING" | "APPROVED" | "REJECTED";

export type LabNoteContext =
  | "Overall Experience"
  | "Engineering Lab"
  | "Projects"
  | "System Evolution"
  | "Toolbox"
  | "Source Control"
  | "Resume"
  | "Visual Design";

export type LabNote = {
  id: string;
  rating: number; // 1 - 5
  name?: string;
  email?: string; // Always kept private, never rendered publicly
  message: string;
  context?: LabNoteContext;
  status: LabNoteStatus;
  createdAt: string;
  approvedAt?: string;
};

export type LabNoteSubmission = {
  rating: number;
  name?: string;
  email?: string;
  message: string;
  context?: LabNoteContext;
};

export type LabNotesStats = {
  overallRating: string;
  publishedCount: number;
  statusText: string;
};

export const LAB_NOTE_CONTEXT_OPTIONS: LabNoteContext[] = [
  "Overall Experience",
  "Engineering Lab",
  "Projects",
  "System Evolution",
  "Toolbox",
  "Source Control",
  "Resume",
  "Visual Design",
];
