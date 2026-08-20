"use client";

import { Monitor, Wifi } from "lucide-react";

import { useDesktopTelemetry } from "@/components/os/desktop-telemetry";
import { cn } from "@/lib/utils";

type SystemWidgetProps = {
  className?: string;
};

export function SystemWidget({ className }: SystemWidgetProps) {
  const { clock, uptime, online, viewport, focusedAppLabel } = useDesktopTelemetry();

  return (
    <aside className={cn("desktop-system-readout", className)} aria-label="Live system status">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Monitor className="h-3.5 w-3.5 text-accent-mint" aria-hidden="true" />
          <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/58">
            LIVE SYSTEM
          </h2>
        </div>
        <span
          className={cn(
            "flex items-center gap-1.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.12em]",
            online ? "text-accent-mint/88" : "text-semantic-error"
          )}
        >
          <Wifi className="h-3 w-3" aria-hidden="true" />
          {online ? "ONLINE" : "OFFLINE"}
        </span>
      </div>

      <time dateTime={clock.iso} className="mt-3 block">
        <span className="block font-mono text-xl font-semibold leading-none tabular-nums text-white">
          {clock.time}
        </span>
        <span className="mt-1 block font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/36">
          {clock.date}
        </span>
      </time>

      <dl className="mt-3 grid grid-cols-2 gap-x-5 gap-y-2 border-t border-white/[0.08] pt-2.5">
        <div>
          <dt className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/32">
            SESSION
          </dt>
          <dd className="mt-1 font-mono text-[0.66rem] tabular-nums text-white/76">
            {uptime}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/32">
            VIEW
          </dt>
          <dd className="mt-1 font-mono text-[0.66rem] text-semantic-info/86">{viewport}</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/32">
            FOCUS
          </dt>
          <dd className="mt-1 font-mono text-[0.66rem] text-accent-lavender/88">AI / ML</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/32">
            ACTIVE
          </dt>
          <dd className="mt-1 truncate font-mono text-[0.66rem] uppercase text-white/76">
            {focusedAppLabel}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
