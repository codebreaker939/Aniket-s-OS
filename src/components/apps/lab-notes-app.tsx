import Link from "next/link";
import { ExternalLink, BookOpen, MessageSquareCode } from "lucide-react";

export function LabNotesApp() {
  return (
    <div className="space-y-4 text-white">
      <div>
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Visitor & Lab Notes</span>
        </div>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-white">LAB NOTES</h2>
        <p className="mt-1 text-xs text-white/70">
          Technical notes, ongoing research observations, and visitor feedback.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-2 font-mono text-[0.62rem] text-accent font-semibold uppercase tracking-wider">
            <MessageSquareCode className="h-3.5 w-3.5" />
            <span>Note #001 / Architecture</span>
          </div>
          <h3 className="mt-1 text-xs font-semibold text-white/90">Single-Page Desktop OS Interaction Model</h3>
          <p className="mt-1 text-xs text-white/70 leading-relaxed">
            Eliminating full route redirects from the desktop canvas creates a cohesive, workstation-native feel where apps exist concurrently in multi-window state.
          </p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-2 font-mono text-[0.62rem] text-accent font-semibold uppercase tracking-wider">
            <MessageSquareCode className="h-3.5 w-3.5" />
            <span>Note #002 / Research</span>
          </div>
          <h3 className="mt-1 text-xs font-semibold text-white/90">ML Pipeline Optimization in FastAPI</h3>
          <p className="mt-1 text-xs text-white/70 leading-relaxed">
            Benchmarking model inference latency and async worker dispatch queues for real-time predictive APIs.
          </p>
        </div>
      </div>

      <div className="pt-2">
        <Link
          href="/lab-notes"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
        >
          <span>Open Lab Notes Route</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
