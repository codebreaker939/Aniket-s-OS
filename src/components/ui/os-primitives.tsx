import type { ComponentType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type IconComponent = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

type Tone = "ready" | "learning" | "info" | "attention" | "error" | "neutral";
type PanelVariant = "default" | "technical" | "editorial" | "document" | "data" | "quiet" | "critical";
type HeaderVariant = "default" | "technical" | "editorial" | "document" | "data" | "quiet";

const toneClasses: Record<Tone, string> = {
  ready: "border-accent-mint/30 bg-accent-mint/10 text-accent-mint",
  learning: "border-accent-lavender/30 bg-accent-lavender/10 text-accent-lavender",
  info: "border-semantic-info/30 bg-semantic-info/10 text-semantic-info",
  attention: "border-semantic-attention/30 bg-semantic-attention/10 text-semantic-attention",
  error: "border-semantic-error/[0.35] bg-semantic-error/10 text-semantic-error",
  neutral: "border-white/[0.12] bg-white/[0.045] text-white/60",
};

const panelClasses: Record<PanelVariant, string> = {
  default: "os-panel",
  technical: "os-panel os-panel-technical",
  editorial: "os-panel os-panel-editorial",
  document: "os-panel os-panel-document",
  data: "os-panel os-panel-data",
  quiet: "os-panel os-panel-quiet",
  critical: "os-panel os-panel-critical",
};

const headerAccentClasses: Record<HeaderVariant, string> = {
  default: "text-accent-mint",
  technical: "text-accent-mint",
  editorial: "text-accent-copper",
  document: "text-white/80",
  data: "text-semantic-info",
  quiet: "text-accent-lavender",
};

export function StatusBadge({
  children,
  tone = "neutral",
  pulse = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[0.58rem] font-semibold uppercase tracking-[0.12em]",
        toneClasses[tone],
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-1.5 w-1.5 rounded-full bg-current", pulse && "os-status-pulse")}
      />
      {children}
    </span>
  );
}

export function Panel({
  children,
  variant = "default",
  interactive = false,
  className,
}: {
  children: ReactNode;
  variant?: PanelVariant;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl p-4 text-white transition-all duration-200",
        panelClasses[variant],
        interactive && "hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.055]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AppHeader({
  icon: Icon,
  title,
  eyebrow,
  description,
  meta,
  status,
  variant = "default",
  className,
}: {
  icon: IconComponent;
  title: string;
  eyebrow?: string;
  description: string;
  meta?: ReactNode;
  status?: ReactNode;
  variant?: HeaderVariant;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "relative shrink-0 overflow-hidden rounded-xl border border-white/10 px-4 py-3.5",
        "bg-gradient-to-r from-white/[0.060] via-white/[0.026] to-transparent",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
        variant === "technical" && "border-accent-mint/[0.15] bg-[linear-gradient(90deg,rgba(96,224,202,0.075),rgba(255,255,255,0.025),transparent)]",
        variant === "editorial" && "border-accent-copper/[0.15] bg-[radial-gradient(360px_circle_at_0%_0%,rgba(213,145,94,0.10),transparent_68%)]",
        variant === "document" && "border-white/[0.15] bg-[linear-gradient(90deg,rgba(241,244,248,0.085),rgba(255,255,255,0.025),transparent)]",
        variant === "data" && "border-semantic-info/[0.15] bg-[linear-gradient(90deg,rgba(151,172,255,0.090),rgba(255,255,255,0.025),transparent)]",
        variant === "quiet" && "border-accent-lavender/[0.15] bg-[radial-gradient(420px_circle_at_100%_0%,rgba(178,164,255,0.085),transparent_68%)]",
        className
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-3">
          <span
            className={cn(
              "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.045]",
              headerAccentClasses[variant]
            )}
          >
            <Icon aria-hidden className="h-4 w-4" />
          </span>
          <div className="min-w-0">
            {eyebrow ? <p className="os-meta mb-1">{eyebrow}</p> : null}
            <h2 className="os-text-display text-base font-semibold text-white sm:text-lg">
              {title}
            </h2>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-white/60">
              {description}
            </p>
          </div>
        </div>
        {(meta || status) && (
          <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
            {meta}
            {status}
          </div>
        )}
      </div>
    </header>
  );
}

export function SectionHeading({
  label,
  kicker,
  icon: Icon,
  id,
  className,
}: {
  label: string;
  kicker?: string;
  icon?: IconComponent;
  id?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <div>
        {kicker ? <p className="os-meta mb-1">{kicker}</p> : null}
        <h3 id={id} className="text-sm font-semibold text-white">{label}</h3>
      </div>
      {Icon ? <Icon aria-hidden className="h-4 w-4 text-white/[0.35]" /> : null}
    </div>
  );
}

export function Metadata({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <dt className="os-meta text-[0.58rem]">{label}</dt>
      <dd className="text-sm font-medium text-white/90">{value}</dd>
    </div>
  );
}

export function Metric({
  label,
  value,
  tone = "neutral",
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-white/[0.026] px-3 py-2",
        toneClasses[tone],
        className
      )}
    >
      <p className="font-mono text-[0.56rem] uppercase tracking-[0.12em] opacity-70">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}
