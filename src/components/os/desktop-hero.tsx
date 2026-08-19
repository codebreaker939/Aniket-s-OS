import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Cpu, Sparkles } from "lucide-react";

type DesktopHeroProps = {
  compact?: boolean;
  align?: "left" | "center";
  className?: string;
};

export function DesktopHero({ compact = false, align = "left", className }: DesktopHeroProps) {
  const isCentered = align === "center";

  return (
    <section
      aria-labelledby="desktop-hero-title"
      className={cn(
        "relative z-10 w-full max-w-3xl text-white select-none drop-shadow-[0_18px_34px_rgba(0,0,0,0.54)]",
        isCentered && "mx-auto text-center",
        className
      )}
    >
      <div className={cn("inline-flex items-center gap-2 rounded-full border border-accent-mint/20 bg-accent-mint/[0.055] px-3 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-accent-mint/90 shadow-[0_0_26px_rgba(96,224,202,0.08)]", isCentered && "justify-center")}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent-mint os-status-pulse" />
        <span>{siteConfig.name}</span>
        <span className="text-white/30">/</span>
        <span className="text-white/60">WORKSTATION</span>
      </div>

      <h1
        id="desktop-hero-title"
        className={cn(
          "os-text-display mt-5 font-semibold leading-[0.95] text-white drop-shadow-[0_6px_22px_rgba(0,0,0,0.72)]",
          compact ? "text-4xl sm:text-5xl" : "text-5xl sm:text-6xl lg:text-7xl"
        )}
      >
        ANIKET RAI
      </h1>

      <div
        className={cn(
          "mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm font-medium text-white/75 md:text-base",
          isCentered && "justify-center"
        )}
      >
        <span>B.Tech CSE Student</span>
        <span aria-hidden="true" className="text-accent-copper/60 font-bold">•</span>
        <span>Full-Stack Developer</span>
        <span aria-hidden="true" className="text-accent-lavender/70 font-bold">•</span>
        <span className="text-accent-lavender/90">Exploring AI/ML</span>
      </div>

      <p className={cn("mx-auto mt-6 max-w-2xl text-white/75 font-normal leading-relaxed", compact ? "text-base" : "text-lg md:text-xl")}>
        Building systems beyond the interface: practical software, backend thinking,
        and experiments that point toward AI engineering.
      </p>

      <dl className={cn("mt-8 grid max-w-2xl gap-3 sm:grid-cols-3", isCentered && "mx-auto text-left")}>
        <div className="rounded-xl border border-accent-lavender/[0.15] bg-accent-lavender/[0.055] p-3">
          <dt className="os-meta flex items-center gap-1.5 text-accent-lavender/75"><Sparkles className="h-3 w-3" /> Focus</dt>
          <dd className="mt-2 text-sm font-semibold text-white/95">AI / ML</dd>
        </div>
        <div className="rounded-xl border border-accent-mint/[0.15] bg-accent-mint/[0.045] p-3">
          <dt className="os-meta flex items-center gap-1.5 text-accent-mint/75"><Cpu className="h-3 w-3" /> Building</dt>
          <dd className="mt-2 text-sm font-semibold text-white/95">Software systems</dd>
        </div>
        <div className="rounded-xl border border-accent-copper/[0.15] bg-accent-copper/[0.045] p-3">
          <dt className="os-meta flex items-center gap-1.5 text-accent-copper/[0.78]"><ArrowUpRight className="h-3 w-3" /> Open To</dt>
          <dd className="mt-2 text-sm font-semibold text-white/95">Internships</dd>
        </div>
      </dl>
    </section>
  );
}
