"use client";

import type { GitHubActivityItem } from "@/lib/github/types";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import { Activity, Clock, ExternalLink, FlaskConical, GitBranch } from "lucide-react";

type ActivityViewProps = {
  recentActivity: GitHubActivityItem[];
};

function formatDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return isoString;
  }
}

export function ActivityView({ recentActivity }: ActivityViewProps) {
  const windowManager = useOptionalWindowManager();

  const handleOpenLab = (labId: string) => {
    if (windowManager) {
      windowManager.openApp("engineering-lab");
      window.dispatchEvent(
        new CustomEvent("os:select-lab-experiment", { detail: { labId } })
      );
    }
  };

  return (
    <div className="space-y-4 select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <Activity className="h-4 w-4 text-accent" />
          RECENT ACTIVITY & REPOSITORY UPDATES
        </h3>
        <span className="font-mono text-[0.58rem] text-white/40 uppercase">
          Real Metadata
        </span>
      </div>

      {recentActivity.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[14rem] rounded-xl border border-dashed border-white/10 p-6 text-center">
          <GitBranch className="h-6 w-6 text-white/25 mb-2" />
          <p className="font-mono text-xs text-white/40">
            No recent repository activity available.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {recentActivity.map((item) => (
            <div
              key={item.repoName}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-white tracking-tight">
                    {item.repoName}
                  </span>
                  {item.labId && (
                    <span className="font-mono text-[0.55rem] font-bold text-accent px-1.5 py-0.5 rounded border border-accent/30 bg-accent/10">
                      {item.labId}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 font-mono text-[0.62rem] text-white/45">
                  <span className="text-accent/90">{item.language}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-white/30" />
                    Updated {formatDate(item.updatedAt)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {item.labId && (
                  <button
                    type="button"
                    onClick={() => handleOpenLab(item.labId!)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[0.62rem] font-bold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider"
                  >
                    <FlaskConical className="h-3 w-3" />
                    <span>Open Lab</span>
                  </button>
                )}

                <a
                  href={item.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[0.62rem] font-semibold text-white hover:bg-white/15 transition-all uppercase tracking-wider"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Honest Architecture Disclosure */}
      <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4 space-y-1.5 font-mono text-[0.6rem] text-white/40">
        <span className="text-accent font-bold uppercase tracking-wider block">
          DATA FLOW & AUDIT
        </span>
        <p className="leading-relaxed">
          Source Control connects directly to public GitHub API endpoints via Next.js server-side revalidated fetch (`revalidate: 3600`). Activity timestamps reflect genuine repository updates without synthetic contribution charts.
        </p>
      </div>
    </div>
  );
}
