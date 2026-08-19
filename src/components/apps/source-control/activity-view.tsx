"use client";

import { Activity, GitBranch } from "lucide-react";

export function ActivityView() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h3 className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] text-white/70 flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-accent/60" />
          Development Activity
        </h3>
      </div>

      {/* Placeholder */}
      <div className="flex flex-col items-center justify-center min-h-[16rem] rounded-xl border border-dashed border-white/12 p-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-accent/50 mb-4">
          <GitBranch className="h-6 w-6" />
        </div>

        <h4 className="font-mono text-[0.72rem] font-bold text-white/50 uppercase tracking-wider mb-1.5">
          Awaiting GitHub Sync
        </h4>

        <p className="text-[0.68rem] text-white/35 leading-relaxed max-w-xs">
          Live GitHub activity will appear here once the GitHub API integration
          is configured. Commit history, push events, and repository updates
          will be displayed in real time.
        </p>

        <div className="mt-4 rounded-lg border border-white/8 bg-white/[0.02] px-3.5 py-2 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 animate-pulse" />
          <span className="font-mono text-[0.56rem] text-white/30 uppercase tracking-wider">
            Integration pending
          </span>
        </div>
      </div>

      {/* Architecture preview */}
      <div className="rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3">
        <p className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-white/25 mb-2">
          Planned Architecture
        </p>
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[0.6rem] text-white/35">
          <span className="rounded border border-white/8 bg-white/[0.03] px-2 py-0.5">
            GitHub API
          </span>
          <span className="text-white/15">→</span>
          <span className="rounded border border-white/8 bg-white/[0.03] px-2 py-0.5">
            Server Fetch
          </span>
          <span className="text-white/15">→</span>
          <span className="rounded border border-white/8 bg-white/[0.03] px-2 py-0.5">
            Normalized Data
          </span>
          <span className="text-white/15">→</span>
          <span className="rounded border border-accent/15 bg-accent/[0.04] px-2 py-0.5 text-accent/50">
            Source Control UI
          </span>
        </div>
      </div>
    </div>
  );
}
