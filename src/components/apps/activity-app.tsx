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
import { AppHeader, Panel, StatusBadge } from "@/components/ui/os-primitives";

const categoryFilters: { id: ActivityCategory | "ALL"; label: string }[] = [
  { id: "ALL", label: "All Events" },
  { id: "SYSTEM", label: "System" },
  { id: "APPLICATION", label: "Apps" },
  { id: "ENGINEERING", label: "Lab Work" },
  { id: "SOURCE_CONTROL", label: "Source Control" },
  { id: "NETWORK", label: "Network" },
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
    <div className="flex h-full flex-col gap-4 overflow-hidden text-white select-none">
      <div className="shrink-0 space-y-3">
        <AppHeader
          icon={Activity}
          eyebrow="LIVE SYSTEM"
          title="System Activity"
          description="Real session events, application launches, and workstation state transitions."
          variant="data"
          meta={
            <button
              type="button"
              onClick={() => activityContext?.clearEvents()}
              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.045] px-2.5 py-1.5 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/[0.55] transition-all hover:border-white/20 hover:bg-white/[0.075] hover:text-white"
            >
              <Trash2 className="h-3 w-3" />
              <span>Clear Log</span>
            </button>
          }
          status={<StatusBadge tone="info" pulse>{events.length} Events</StatusBadge>}
        />

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {categoryFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setSelectedCategory(f.id)}
              className={`rounded-md border px-2.5 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-wider transition-all whitespace-nowrap
                ${
                  selectedCategory === f.id
                    ? "border-semantic-info/40 bg-semantic-info/[0.15] text-semantic-info"
                    : "border-white/[0.08] bg-white/[0.02] text-white/40 hover:border-white/[0.15] hover:text-white/70"
                }
              `}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pt-3 pr-1 space-y-2 custom-scrollbar">
        {filteredEvents.length === 0 ? (
          <Panel variant="quiet" className="flex min-h-[14rem] flex-col items-center justify-center border-dashed p-6 text-center">
            <Clock className="h-6 w-6 text-white/20 mb-2" />
            <p className="font-mono text-xs text-white/40">
              No activity logged for this category in the current session.
            </p>
          </Panel>
        ) : (
          filteredEvents.map((evt) => (
            <Panel
              key={evt.id}
              variant="data"
              interactive
              className="flex flex-col gap-3 p-3.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[0.65rem]">
                  <span className="h-1.5 w-1.5 rounded-full bg-semantic-info os-status-pulse" />
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
                    className="inline-flex items-center gap-1 font-semibold text-semantic-info hover:underline uppercase tracking-wider"
                  >
                    <span>Inspect App</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                )}

                <span className="text-white/40 tabular-nums">{evt.timestamp}</span>
              </div>
            </Panel>
          ))
        )}
      </div>
    </div>
  );
}
