"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useOSLifecycle } from "./os-lifecycle";
import { experimentsData } from "@/lib/experiments-data";

type SystemWidgetProps = {
  className?: string;
  onOpenApp?: (id: "engineering-lab" | "terminal") => void;
};

function formatUptime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, "0");
  const s = (totalSec % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function formatLiveClock(date: Date): { time: string; date: string } {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
  const dateStr = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
  return { time, date: dateStr };
}

function useViewportLabel(): string {
  const [label, setLabel] = useState("DESKTOP");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setLabel(w < 768 ? "MOBILE" : w < 1024 ? "TABLET" : "DESKTOP");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return label;
}

function useNetwork(): { online: boolean } {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);
  return { online };
}

export function SystemWidget({ className, onOpenApp }: SystemWidgetProps) {
  const { sessionStartTime } = useOSLifecycle();
  const { online } = useNetwork();
  const viewportLabel = useViewportLabel();

  const [clock, setClock] = useState(() => formatLiveClock(new Date()));
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClock(formatLiveClock(now));
      if (sessionStartTime) {
        setUptime(formatUptime(now.getTime() - sessionStartTime));
      }
    };
    tick();
    const id = window.setInterval(tick, 1_000);
    return () => window.clearInterval(id);
  }, [sessionStartTime]);

  const labCount = experimentsData.length;

  return (
    <div className={cn("flex flex-col gap-3 w-60 select-none", className)}>
      {/* System Widget */}
      <aside
        aria-label="System status"
        className="os-surface-1 rounded-xl p-3.5 text-white transition-all hover:border-white/[0.18]"
      >
        <div className="mb-2.5 flex items-center justify-between">
          <h2 className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent-mint/80">
            System
          </h2>
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              online
                ? "bg-accent-mint shadow-[0_0_8px_rgba(96,224,202,0.65)] os-status-pulse"
                : "bg-semantic-error"
            }`}
            aria-label={online ? "Online" : "Offline"}
          />
        </div>

        <dl className="space-y-2">
          {/* Live time */}
          <div>
            <dt className="sr-only">Current time</dt>
            <dd className="font-mono text-lg font-bold tabular-nums text-white leading-none">
              {clock.time}
            </dd>
            <dd className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-white/40 mt-0.5">
              {clock.date}
            </dd>
          </div>

          <div className="border-t border-white/[0.07] pt-2 space-y-1.5">
            {/* Uptime */}
            <div className="flex items-center justify-between">
              <dt className="font-mono text-[0.55rem] uppercase tracking-wider text-white/[0.35]">
                Session
              </dt>
              <dd className="font-mono text-[0.66rem] font-medium tabular-nums text-white/80">
                {sessionStartTime ? uptime : "—"}
              </dd>
            </div>

            {/* Network */}
            <div className="flex items-center justify-between">
              <dt className="font-mono text-[0.55rem] uppercase tracking-wider text-white/[0.35]">
                Network
              </dt>
              <dd
                className={`flex items-center gap-1 font-mono text-[0.62rem] font-semibold ${
                  online ? "text-accent-mint" : "text-semantic-error"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    online ? "bg-accent-mint" : "bg-semantic-error"
                  }`}
                />
                {online ? "ONLINE" : "OFFLINE"}
              </dd>
            </div>

            {/* Viewport */}
            <div className="flex items-center justify-between">
              <dt className="font-mono text-[0.55rem] uppercase tracking-wider text-white/[0.35]">
                View
              </dt>
              <dd className="font-mono text-[0.62rem] text-white/[0.55]">
                {viewportLabel}
              </dd>
            </div>

            {/* Focus */}
            <div className="flex items-center justify-between">
              <dt className="font-mono text-[0.55rem] uppercase tracking-wider text-white/[0.35]">
                Focus
              </dt>
              <dd className="font-mono text-[0.62rem] text-white/80">
                AI / ML
              </dd>
            </div>
          </div>
        </dl>
      </aside>

      {/* Engineering Lab Widget */}
      <aside
        aria-label="Engineering lab overview"
        role="button"
        tabIndex={0}
        className="os-surface-1 cursor-pointer rounded-xl p-3.5 text-white transition-all hover:-translate-y-0.5 hover:border-accent-mint/[0.22]"
        onClick={() => onOpenApp?.("engineering-lab")}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onOpenApp?.("engineering-lab");
        }}
      >
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white/50">
            Engineering Lab
          </h2>
          <span className="rounded border border-accent-mint/25 bg-accent-mint/10 px-1.5 py-0.5 font-mono text-[0.52rem] uppercase tracking-wider text-accent-mint/70">
            Open
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-2xl font-bold text-white">
            {labCount.toString().padStart(2, "0")}
          </span>
          <span className="font-mono text-[0.6rem] uppercase tracking-wider text-accent-mint/70">
            Experiments
          </span>
        </div>
      </aside>
    </div>
  );
}
