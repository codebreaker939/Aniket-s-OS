"use client";

import { useState, useEffect, useCallback } from "react";
import { LabNoteCard } from "./lab-notes/lab-note-card";
import { LabNoteEmptyState } from "./lab-notes/lab-note-empty-state";
import { LabNoteForm } from "./lab-notes/lab-note-form";
import {
  BookOpen,
  PenTool,
  Lock,
  MessageSquare,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

// ─── Public API response types ────────────────────────────────────────────────

type PublicLabNote = {
  id: string;
  rating: number;
  name: string;
  message: string;
  context: string | null;
  createdAt: string;
};

type LabNotesApiResponse = {
  notes: PublicLabNote[];
  publishedCount: number;
  averageRating: number | null;
};

// ─── Fetch state ──────────────────────────────────────────────────────────────

type FetchState =
  | { status: "LOADING" }
  | { status: "SUCCESS"; data: LabNotesApiResponse }
  | { status: "EMPTY" }
  | { status: "ERROR" };

export function LabNotesApp() {
  const [activeTab, setActiveTab] = useState<"notes" | "form">("notes");
  const [fetchState, setFetchState] = useState<FetchState>({ status: "LOADING" });

  const fetchNotes = useCallback(async () => {
    setFetchState({ status: "LOADING" });
    try {
      const res = await fetch("/api/lab-notes");
      if (!res.ok) {
        setFetchState({ status: "ERROR" });
        return;
      }
      const data: LabNotesApiResponse = await res.json();
      if (data.publishedCount === 0) {
        setFetchState({ status: "EMPTY" });
      } else {
        setFetchState({ status: "SUCCESS", data });
      }
    } catch {
      setFetchState({ status: "ERROR" });
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Derive stats from fetched data
  const overallRating =
    fetchState.status === "SUCCESS" && fetchState.data.averageRating !== null
      ? `${fetchState.data.averageRating} ★`
      : "—";

  const publishedCount =
    fetchState.status === "SUCCESS" ? fetchState.data.publishedCount : 0;

  const noteCount =
    fetchState.status === "SUCCESS" ? fetchState.data.notes.length : 0;

  return (
    <div className="flex flex-col h-full space-y-4 text-white select-none font-sans">
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-accent" />
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              LAB NOTES
            </h2>
            <p className="text-[0.68rem] text-white/60">
              Visitor Notes / Field Observations
            </p>
          </div>
        </div>

        {/* Stats Pill */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-[0.62rem] text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
          <div className="flex items-center gap-1">
            <span className="text-white/30">OVERALL:</span>
            <span className="text-accent font-bold">{overallRating}</span>
          </div>
          <span className="w-[1px] h-3 bg-white/10" />
          <div className="flex items-center gap-1">
            <span className="text-white/30">PUBLISHED:</span>
            <span className="text-white font-bold">{publishedCount}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_15.5rem] gap-4 min-h-[28rem]">
        {/* Left Area */}
        <div className="flex flex-col gap-3">
          {/* Tab Switcher */}
          <div className="flex items-center justify-between border-b border-white/8 pb-2">
            <div className="flex items-center gap-1 bg-white/[0.03] border border-white/10 p-1 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveTab("notes")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[0.65rem] font-bold uppercase tracking-wider transition-all ${
                  activeTab === "notes"
                    ? "bg-accent/20 border border-accent/40 text-accent"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <MessageSquare className="h-3 w-3" />
                <span>Public Notes ({noteCount})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[0.65rem] font-bold uppercase tracking-wider transition-all ${
                  activeTab === "form"
                    ? "bg-accent/20 border border-accent/40 text-accent"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                <PenTool className="h-3 w-3" />
                <span>Leave a Note</span>
              </button>
            </div>

            <span className="hidden sm:inline-block font-mono text-[0.55rem] text-white/30 uppercase tracking-wider">
              {fetchState.status === "LOADING"
                ? "LOADING..."
                : fetchState.status === "ERROR"
                ? "UNAVAILABLE"
                : fetchState.status === "EMPTY"
                ? "AWAITING FIRST NOTE"
                : "APPROVED FEEDBACK"}
            </span>
          </div>

          {/* Active View Content */}
          <div className="flex-1 overflow-y-auto pr-1 no-scrollbar min-h-[20rem]">
            {activeTab === "notes" ? (
              <>
                {fetchState.status === "LOADING" && (
                  <div className="flex flex-col items-center justify-center min-h-[18rem] gap-3">
                    <Loader2 className="h-6 w-6 text-accent animate-spin" />
                    <p className="font-mono text-[0.62rem] text-white/40 uppercase tracking-widest">
                      Loading Notes...
                    </p>
                  </div>
                )}

                {fetchState.status === "ERROR" && (
                  <div className="flex flex-col items-center justify-center min-h-[18rem] rounded-xl border border-rose-500/20 bg-rose-500/[0.03] p-8 text-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400">
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-mono text-[0.62rem] font-bold text-rose-400 uppercase tracking-widest mb-1">
                        LAB NOTES TEMPORARILY UNAVAILABLE
                      </p>
                      <p className="text-xs text-white/40">
                        The rest of ANIKET OS remains operational.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={fetchNotes}
                      className="font-mono text-[0.6rem] text-white/40 hover:text-white/70 uppercase tracking-wider transition-colors underline underline-offset-2"
                    >
                      Try again
                    </button>
                  </div>
                )}

                {fetchState.status === "EMPTY" && (
                  <LabNoteEmptyState onOpenForm={() => setActiveTab("form")} />
                )}

                {fetchState.status === "SUCCESS" && (
                  <div className="space-y-3">
                    {fetchState.data.notes.map((note) => (
                      <LabNoteCard key={note.id} note={note} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <LabNoteForm onSuccess={() => {}} />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden md:flex flex-col gap-3 border-l border-white/10 pl-4">
          {/* Status Card */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2.5">
            <div className="flex items-center gap-1.5 font-mono text-[0.58rem] font-bold text-accent uppercase tracking-widest">
              <Layers className="h-3.5 w-3.5" />
              <span>Feedback System</span>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Lab Notes is a visitor observation journal for the Engineering Lab
              and Aniket OS workstation.
            </p>

            <button
              type="button"
              onClick={() => setActiveTab("form")}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-accent/15 border border-accent/30 px-3 py-2 font-mono text-xs font-bold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider"
            >
              <PenTool className="h-3.5 w-3.5" />
              <span>Leave a Lab Note</span>
            </button>
          </div>

          {/* Privacy & Moderation Card */}
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="flex items-center gap-1.5 font-mono text-[0.58rem] font-bold text-white/50 uppercase tracking-wider">
              <Lock className="h-3 w-3 text-accent" />
              <span>Privacy &amp; Moderation</span>
            </div>

            <div className="space-y-1.5 text-[0.7rem] text-white/60 leading-relaxed">
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                <span>Your email is private and never displayed.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                <span>Name is optional — submit as Anonymous anytime.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-accent shrink-0 mt-0.5" />
                <span>Submissions are moderated before appearing publicly.</span>
              </div>
            </div>
          </div>

          {/* Backend Status */}
          <div className="rounded-xl border border-white/8 bg-white/[0.01] p-3 font-mono text-[0.58rem] text-white/40 space-y-1">
            <div className="flex items-center gap-1 text-accent/80 font-semibold uppercase">
              <span>●</span>
              <span>Live Backend</span>
            </div>
            <p className="leading-normal">
              PostgreSQL · Prisma · Resend. Notes are stored server-side and
              moderated before public display.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
