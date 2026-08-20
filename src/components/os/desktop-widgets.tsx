"use client";

import { useReducedMotion } from "motion/react";
import { ArrowUpRight, GitBranch, Loader2, Radio, RefreshCw } from "lucide-react";

import { useDesktopTelemetry } from "@/components/os/desktop-telemetry";
import { cn } from "@/lib/utils";
import type { DesktopAppId } from "@/types";

type DesktopWidgetProps = {
  className?: string;
  onOpenApp?: (id: DesktopAppId) => void;
};

function sourceStatusClass(status: string) {
  if (status === "CONNECTED") return "text-accent-mint";
  if (status === "SYNCING") return "text-semantic-info";
  if (status === "NOT_CONFIGURED") return "text-semantic-attention";
  return "text-semantic-error";
}

function formatRepoDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "RECENT";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  })
    .format(date)
    .toUpperCase();
}

export function LiveBuildMonitor({ className }: { className?: string }) {
  const { focusedAppId, focusedAppLabel, online, sourceControl, uptime } = useDesktopTelemetry();
  const reduceMotion = useReducedMotion();
  const signalActive =
    online && (sourceControl.status === "CONNECTED" || sourceControl.status === "SYNCING");

  const stages = [
    {
      id: "workspace",
      label: "WORKSPACE",
      value: "READY",
      tone: "mint",
      active: focusedAppId === null,
    },
    {
      id: "source",
      label: "SOURCE CONTROL",
      value: sourceControl.status === "CONNECTED" ? "CONNECTED" : sourceControl.status,
      tone:
        sourceControl.status === "CONNECTED"
          ? "blue"
          : sourceControl.status === "SYNCING"
            ? "amber"
            : "coral",
      active: sourceControl.status === "SYNCING" || focusedAppId === "github",
    },
    {
      id: "lab",
      label: "ENGINEERING LAB",
      value: "READY",
      tone: "lavender",
      active: focusedAppId === "engineering-lab",
    },
  ];

  return (
    <div className={cn("desktop-build-monitor", className)} aria-label="Live build monitor">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 text-accent-mint" aria-hidden="true" />
          <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/56">
            LIVE BUILD
          </span>
        </div>
        <span className="font-mono text-[0.58rem] uppercase tracking-[0.14em] text-white/36">
          {online ? "NETWORK ONLINE" : "NETWORK OFFLINE"}
        </span>
      </div>

      <div className="relative">
        <div className="desktop-build-line" aria-hidden="true">
          {!reduceMotion && signalActive && <span className="desktop-build-signal" />}
        </div>
        <div className="relative grid grid-cols-3 gap-2">
          {stages.map((stage) => (
            <div key={stage.id} className="flex flex-col items-center gap-2 text-center">
              <span
                className={cn(
                  "desktop-build-node",
                  stage.tone === "mint" && "desktop-build-node-mint",
                  stage.tone === "blue" && "desktop-build-node-blue",
                  stage.tone === "lavender" && "desktop-build-node-lavender",
                  stage.tone === "amber" && "desktop-build-node-amber",
                  stage.tone === "coral" && "desktop-build-node-coral",
                  stage.active && "desktop-build-node-active"
                )}
                aria-hidden="true"
              />
              <span className="font-mono text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-white/46">
                {stage.label}
              </span>
              <span className="font-mono text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-white/78">
                {stage.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-5 gap-y-2 border-t border-white/[0.08] pt-3 text-left">
        <div>
          <dt className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/32">
            SESSION
          </dt>
          <dd className="mt-1 font-mono text-[0.66rem] tabular-nums text-white/78">{uptime}</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.52rem] uppercase tracking-[0.14em] text-white/32">
            CURRENT APP
          </dt>
          <dd className="mt-1 truncate font-mono text-[0.66rem] uppercase text-accent-lavender/90">
            {focusedAppLabel}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function SourceControlWidget({ className, onOpenApp }: DesktopWidgetProps) {
  const { sourceControl } = useDesktopTelemetry();
  const reduceMotion = useReducedMotion();
  const statusText = sourceControl.status === "SYNCING" ? "SYNCHRONIZING" : sourceControl.status;
  const connected = sourceControl.status === "CONNECTED";
  const repositories = sourceControl.repositories.slice(0, 2);

  return (
    <aside className={cn("desktop-widget desktop-widget-source", className)} aria-label="Source Control">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="h-3.5 w-3.5 text-semantic-info" aria-hidden="true" />
            <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/58">
              SOURCE CONTROL
            </h2>
          </div>
          <div className={cn("mt-2 flex items-center gap-1.5 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.12em]", sourceStatusClass(sourceControl.status))}>
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                connected && "bg-accent-mint shadow-[0_0_10px_rgba(96,224,202,0.75)] os-status-pulse",
                sourceControl.status === "SYNCING" && "bg-semantic-info",
                sourceControl.status === "UNAVAILABLE" && "bg-semantic-error",
                sourceControl.status === "NOT_CONFIGURED" && "bg-semantic-attention"
              )}
            />
            {statusText}
          </div>
        </div>

        <button
          type="button"
          aria-label="Refresh Source Control"
          onClick={() => void sourceControl.refresh()}
          disabled={sourceControl.isLoading}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.035] text-white/44 transition-colors hover:border-semantic-info/35 hover:text-semantic-info focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-info disabled:cursor-wait disabled:opacity-60"
        >
          {sourceControl.isLoading ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className="mt-3 space-y-2">
        {sourceControl.isLoading ? (
          [0, 1, 2].map((index) => (
            <div key={index} className="desktop-sync-row">
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full bg-semantic-info",
                  !reduceMotion && "animate-pulse"
                )}
              />
              <span className="h-px flex-1 bg-white/[0.12]" />
            </div>
          ))
        ) : repositories.length > 0 ? (
          repositories.map((repo) => (
            <div key={repo.id} className="group flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-mono text-[0.68rem] font-semibold uppercase text-white/86 transition-colors group-hover:text-semantic-info">
                  {repo.name}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/36">
                {formatRepoDate(repo.updatedAt)}
              </span>
            </div>
          ))
        ) : (
          <p className="max-w-[15rem] pt-2 text-[0.74rem] leading-relaxed text-white/42">
            Public repository data is unavailable in this session.
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3">
        <span className="font-mono text-[0.54rem] font-semibold uppercase tracking-[0.14em] text-white/34">
          {sourceControl.syncLabel}
        </span>
        <button
          type="button"
          onClick={() => onOpenApp?.("github")}
          className="inline-flex items-center gap-1 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-semantic-info/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-info"
        >
          OPEN
          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}

export function CurrentExperimentWidget({ className, onOpenApp }: DesktopWidgetProps) {
  const { currentExperiment } = useDesktopTelemetry();

  return (
    <aside className={cn("desktop-widget desktop-widget-experiment", className)} aria-label="Current experiment">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/58">
            CURRENT EXPERIMENT
          </h2>
          {currentExperiment ? (
            <div className="mt-3">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-lavender">
                {currentExperiment.id}
              </p>
              <p className="mt-1 truncate text-lg font-semibold leading-none text-white">
                {currentExperiment.name}
              </p>
              <p className="mt-2 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-white/44">
                {currentExperiment.domain}
              </p>
            </div>
          ) : (
            <p className="mt-3 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-white/46">
              NONE
            </p>
          )}
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "mt-1 h-2 w-2 rounded-full",
            currentExperiment
              ? "bg-accent-lavender shadow-[0_0_12px_rgba(178,164,255,0.75)]"
              : "bg-white/24"
          )}
        />
      </div>

      <button
        type="button"
        onClick={() => onOpenApp?.("engineering-lab")}
        className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-accent-lavender/18 bg-accent-lavender/[0.07] px-2.5 py-1.5 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-accent-lavender/86 transition-colors hover:border-accent-lavender/38 hover:bg-accent-lavender/[0.13] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-lavender"
      >
        {currentExperiment ? "OPEN LAB" : "OPEN ENGINEERING LAB"}
        <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
      </button>
    </aside>
  );
}
