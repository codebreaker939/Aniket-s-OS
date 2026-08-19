"use client";

import { useState } from "react";
import { useOptionalSystemActivity } from "@/components/os/system-activity-context";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import type { ActivityCategory } from "@/lib/activity-types";
import type { DesktopAppId } from "@/types";
import {
  Activity,
  Trash2,
  Clock,
  ChevronRight,
} from "lucide-react";

const categoryFilters: { id: ActivityCategory | "ALL"; label: string }[] = [
  { id: "ALL", label: "All Events" },
  { id: "SYSTEM", label: "System" },
  { id: "APPLICATION", label: "Apps" },
  { id: "ENGINEERING", label: "Lab Work" },
  { id: "SOURCE_CONTROL", label: "Source Control" },
  { id: "NETWORK", label: "Network" },
  { id: "LAB_NOTES", label: "Lab Notes" },
];

export function ActivityApp() {
  const activityContext = useOptionalSystemActivity();
  const windowManager = useOptionalWindowManager();
  const [selectedCategory, setSelectedCategory] = useState<ActivityCategory | "ALL">("ALL");

  const events = activityContext?.events || [];

  const filteredEvents = events.filter((e) => {
    if (selectedCategory === "ALL") return true;
    return e.category === selectedCategory;
  });

  const handleOpenApp = (appId?: string, labId?: string) => {
    if (windowManager && appId) {
      windowManager.openApp(appId as DesktopAppId);
      if (labId) {
        window.dispatchEvent(
          new CustomEvent("os:select-lab-experiment", { detail: { labId } })
        );
      }
    }
  };

  return (
    <div className="flex flex-col h-full text-white select-none font-sans overflow-hidden">
      {/* Pinned Header & Category Nav Bar */}
      <div className="shrink-0 space-y-3 pb-3 border-b border-white/10">
        {/* Sub-Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 text-accent" />
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                SYSTEM ACTIVITY
              </h2>
              <p className="text-[0.68rem] text-white/60">
                Real Session Event Log & Workstation State Transitions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[0.62rem]">
            <button
              type="button"
              onClick={() => activityContext?.clearEvents()}
              className="inline-flex items-center gap-1 border border-white/10 bg-white/5 px-2.5 py-1 rounded text-white/50 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear Log</span>
            </button>
            <span className="text-accent font-bold px-2 py-1 rounded border border-accent/20 bg-accent/10">
              {events.length} EVENTS
            </span>
          </div>
        </div>

        {/* Category Filter Nav Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categoryFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedCategory(f.id)}
              className={`rounded-md border px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-wider transition-all whitespace-nowrap
                ${
                  selectedCategory === f.id
                    ? "border-accent/40 bg-accent/15 text-accent"
                    : "border-white/8 bg-white/[0.02] text-white/40 hover:text-white/70 hover:border-white/15"
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Events Timeline List */}
      <div className="flex-1 overflow-y-auto pt-3 pr-1 space-y-2 custom-scrollbar">
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[14rem] rounded-xl border border-dashed border-white/10 p-6 text-center">
            <Clock className="h-6 w-6 text-white/20 mb-2" />
            <p className="font-mono text-xs text-white/40">
              No activity logged for this category in the current session.
            </p>
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-white/15 transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[0.65rem]">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="font-bold text-white text-xs">{evt.title}</span>
                  <span className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[0.55rem] uppercase text-white/40 font-semibold">
                    {evt.category}
                  </span>
                </div>

                <p className="text-xs text-white/70 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 font-mono text-[0.62rem]">
                {evt.appId && (
                  <button
                    type="button"
                    onClick={() => handleOpenApp(evt.appId, evt.labId)}
                    className="inline-flex items-center gap-1 font-semibold text-accent hover:underline uppercase tracking-wider"
                  >
                    <span>Inspect App</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                )}

                <span className="text-white/40 tabular-nums">{evt.timestamp}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
