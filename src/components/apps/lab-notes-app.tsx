"use client";

import { useState } from "react";
import {
  getLabNotesStats,
  publishedLabNotes,
} from "@/lib/lab-notes/repository";
import { LabNoteCard } from "./lab-notes/lab-note-card";
import { LabNoteEmptyState } from "./lab-notes/lab-note-empty-state";
import { LabNoteForm } from "./lab-notes/lab-note-form";
import {
  BookOpen,
  PenTool,
  Lock,
  MessageSquare,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";

export function LabNotesApp() {
  const [activeTab, setActiveTab] = useState<"notes" | "form">("notes");
  const stats = getLabNotesStats();

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

        {/* Stats Pill - Honest initial state */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-[0.62rem] text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
          <div className="flex items-center gap-1">
            <span className="text-white/30">OVERALL:</span>
            <span className="text-accent font-bold">{stats.overallRating}</span>
          </div>
          <span className="w-[1px] h-3 bg-white/10" />
          <div className="flex items-center gap-1">
            <span className="text-white/30">PUBLISHED:</span>
            <span className="text-white font-bold">{stats.publishedCount}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_15.5rem] gap-4 min-h-[28rem]">
        {/* Left Area: View Switcher + Notes Archive or Form */}
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
                <span>Public Notes ({publishedLabNotes.length})</span>
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
              {stats.statusText}
            </span>
          </div>

          {/* Active View Content */}
          <div className="flex-1 overflow-y-auto pr-1 no-scrollbar min-h-[20rem]">
            {activeTab === "notes" ? (
              publishedLabNotes.length === 0 ? (
                <LabNoteEmptyState onOpenForm={() => setActiveTab("form")} />
              ) : (
                <div className="space-y-3">
                  {publishedLabNotes.map((note) => (
                    <LabNoteCard key={note.id} note={note} />
                  ))}
                </div>
              )
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                <LabNoteForm onSuccess={() => {}} />
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: System Overview & Privacy Rules */}
        <div className="hidden md:flex flex-col gap-3 border-l border-white/10 pl-4">
          {/* Status Card */}
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2.5">
            <div className="flex items-center gap-1.5 font-mono text-[0.58rem] font-bold text-accent uppercase tracking-widest">
              <Layers className="h-3.5 w-3.5" />
              <span>Feedback System</span>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Lab Notes is a visitor observation journal for the Engineering Lab and Aniket OS workstation.
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
              <span>Privacy & Moderation</span>
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

          {/* Architecture Status */}
          <div className="rounded-xl border border-white/8 bg-white/[0.01] p-3 font-mono text-[0.58rem] text-white/40 space-y-1">
            <div className="flex items-center gap-1 text-accent/80 font-semibold uppercase">
              <Sparkles className="h-2.5 w-2.5" />
              <span>Future Integration</span>
            </div>
            <p className="leading-normal">
              Frontend contract & validation ready. Database & email API will connect in future backend milestone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
