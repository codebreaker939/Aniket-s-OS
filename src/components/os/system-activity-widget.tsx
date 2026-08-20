"use client";

import { AnimatePresence, motion } from "motion/react";
import { Activity, ChevronRight } from "lucide-react";

import { useOptionalSystemActivity } from "@/components/os/system-activity-context";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import { cn } from "@/lib/utils";
import type { SystemActivityEvent } from "@/lib/activity-types";

function eventTone(event: SystemActivityEvent) {
  switch (event.category) {
    case "SOURCE_CONTROL":
      return "bg-semantic-info shadow-[0_0_10px_rgba(151,172,255,0.55)]";
    case "ENGINEERING":
      return "bg-accent-lavender shadow-[0_0_10px_rgba(178,164,255,0.55)]";
    case "NETWORK":
      return "bg-accent-mint shadow-[0_0_10px_rgba(96,224,202,0.55)]";
    case "APPLICATION":
      return "bg-accent-copper shadow-[0_0_10px_rgba(213,145,94,0.45)]";
    default:
      return "bg-white/45";
  }
}

export function SystemActivityWidget() {
  const activityContext = useOptionalSystemActivity();
  const windowManager = useOptionalWindowManager();

  const events = activityContext?.events || [];
  const latestEvents = events.slice(0, 3);

  const handleViewAll = () => {
    windowManager?.openApp("activity");
  };

  return (
    <aside className="desktop-activity-feed select-none font-sans text-white" aria-label="System activity">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="h-3.5 w-3.5 text-semantic-info" aria-hidden="true" />
          <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/58">
            SYSTEM ACTIVITY
          </h2>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="flex items-center gap-0.5 font-mono text-[0.54rem] font-semibold uppercase tracking-[0.12em] text-semantic-info/72 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-info"
        >
          VIEW
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-2.5 space-y-2">
        <AnimatePresence initial={false}>
          {latestEvents.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-4 text-[0.72rem] text-white/36"
            >
              No recent activity logged.
            </motion.p>
          ) : (
            latestEvents.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-[2.6rem_0.5rem_minmax(0,1fr)] items-start gap-2"
              >
                <time className="font-mono text-[0.58rem] tabular-nums text-white/36">
                  {event.timestamp.slice(0, 5)}
                </time>
                <span className={cn("mt-1.5 h-1.5 w-1.5 rounded-full", eventTone(event))} />
                <div className="min-w-0">
                  <p className="truncate text-[0.74rem] font-medium leading-tight text-white/82">
                    {event.title}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
