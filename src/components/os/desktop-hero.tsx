"use client";

import { cn } from "@/lib/utils";
import { LiveBuildMonitor } from "@/components/os/desktop-widgets";
import { useDesktopTelemetry } from "@/components/os/desktop-telemetry";
import { personalProfile } from "@/lib/profile-content";

type DesktopHeroProps = {
  compact?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function DesktopHero({ compact = false, align = "left", className }: DesktopHeroProps) {
  const isCentered = align === "center";
  const { focusedAppLabel } = useDesktopTelemetry();

  return (
    <section
      aria-labelledby="desktop-hero-title"
      className={cn(
        "relative z-10 w-full max-w-3xl text-white select-none drop-shadow-[0_18px_34px_rgba(0,0,0,0.54)]",
        isCentered && "mx-auto text-center",
        className
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "desktop-identity-glow absolute -inset-x-10 top-8 h-40",
          isCentered ? "mx-auto" : "left-0"
        )}
      />

      <div className={cn("relative inline-flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-accent-mint/90", isCentered && "justify-center")}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent-mint shadow-[0_0_12px_rgba(96,224,202,0.8)] os-status-pulse" />
        <span>{personalProfile.osName}</span>
      </div>

      <h1
        id="desktop-hero-title"
        className={cn(
          "os-text-display relative mt-5 font-semibold leading-[0.92] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.76)]",
          compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl lg:text-7xl xl:text-[5.65rem]"
        )}
      >
        {personalProfile.name.toUpperCase()}
      </h1>

      <div
        className={cn(
          "mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-white/76 md:text-base",
          isCentered && "justify-center"
        )}
      >
        <span className="text-white/78">{personalProfile.education}</span>
        <span aria-hidden="true" className="text-accent-mint/58 font-bold">•</span>
        <span>{personalProfile.role}</span>
      </div>

      <p className="mt-3 text-base font-medium text-accent-lavender/90">
        {personalProfile.focus}
      </p>

      <p className={cn("relative mx-auto mt-5 max-w-2xl text-white/66 font-normal leading-relaxed", compact ? "text-base" : "text-base md:text-lg")}>
        {personalProfile.desktopIntro}
      </p>

      <dl
        className={cn(
          "mx-auto mt-7 grid max-w-xl grid-cols-3 gap-3 border-y border-white/[0.08] py-3 text-left",
          !isCentered && "mx-0"
        )}
      >
        <div>
          <dt className="font-mono text-[0.54rem] uppercase tracking-[0.16em] text-accent-lavender/68">
            CURRENTLY
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white/92">AI / ML</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.54rem] uppercase tracking-[0.16em] text-accent-mint/68">
            LOOKING FOR
          </dt>
          <dd className="mt-1 text-sm font-semibold text-white/92">Software Internships</dd>
        </div>
        <div>
          <dt className="font-mono text-[0.54rem] uppercase tracking-[0.16em] text-accent-copper/72">
            CURRENT APP
          </dt>
          <dd className="mt-1 truncate text-sm font-semibold uppercase text-white/92">{focusedAppLabel}</dd>
        </div>
      </dl>

      <div className={cn("mt-7", isCentered && "mx-auto")}>
        <LiveBuildMonitor />
      </div>
    </section>
  );
}
