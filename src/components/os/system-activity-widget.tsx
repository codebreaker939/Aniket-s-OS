"use client";

import { useOptionalSystemActivity } from "@/components/os/system-activity-context";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import { Activity, ChevronRight } from "lucide-react";

export function SystemActivityWidget() {
  const activityContext = useOptionalSystemActivity();
  const windowManager = useOptionalWindowManager();

  const events = activityContext?.events || [];
  const latestEvents = events.slice(0, 3);

  const handleViewAll = () => {
    if (windowManager) {
      windowManager.openApp("activity");
    }
  };

  return (
    <div className="rounded-2xl border border-white/12 bg-slate-950/60 p-4 shadow-xl backdrop-blur-xl text-white select-none font-sans space-y-2.5 max-w-sm w-full">
      {/* Widget Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 font-mono text-[0.62rem] font-bold text-accent uppercase tracking-widest">
          <Activity className="h-3.5 w-3.5" />
          <span>SYSTEM ACTIVITY</span>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="font-mono text-[0.58rem] font-bold text-accent hover:underline flex items-center gap-0.5 uppercase tracking-wider"
        >
          <span>VIEW ALL</span>
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>

      {/* Events List */}
      <div className="space-y-2 font-mono text-xs">
        {latestEvents.length === 0 ? (
          <div className="p-3 text-center text-[0.68rem] text-white/35">
            No recent activity logged.
          </div>
        ) : (
          latestEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5 space-y-1 hover:border-white/12 transition-colors"
            >
              <div className="flex items-center justify-between text-[0.62rem]">
                <div className="flex items-center gap-1.5 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-white">{evt.title}</span>
                </div>
                <span className="text-white/40 tabular-nums">{evt.timestamp}</span>
              </div>

              <p className="text-[0.65rem] text-white/55 leading-tight font-sans line-clamp-1">
                {evt.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
