"use client";

import { BookOpen, PenTool } from "lucide-react";

type LabNoteEmptyStateProps = {
  onOpenForm: () => void;
};

export function LabNoteEmptyState({ onOpenForm }: LabNoteEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[18rem] rounded-xl border border-dashed border-white/12 p-8 text-center bg-white/[0.01]">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-accent mb-4">
        <BookOpen className="h-6 w-6" />
      </div>

      <span className="font-mono text-[0.62rem] font-bold text-accent uppercase tracking-[0.2em] mb-1">
        LAB NOTES ARCHIVE
      </span>

      <h3 className="text-sm font-bold text-white tracking-tight">
        No published notes yet.
      </h3>

      <p className="text-xs text-white/50 leading-relaxed max-w-sm mt-1 mb-5">
        Be the first visitor to leave a note about your experience exploring the Engineering Lab and Aniket OS.
      </p>

      <button
        type="button"
        onClick={onOpenForm}
        className="inline-flex items-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-5 py-2.5 font-mono text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-slate-950 uppercase tracking-wider"
      >
        <PenTool className="h-3.5 w-3.5" />
        <span>Leave a Note</span>
      </button>
    </div>
  );
}
