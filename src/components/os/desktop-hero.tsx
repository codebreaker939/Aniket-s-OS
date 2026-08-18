import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
        "relative z-10 w-full max-w-3xl text-white select-none drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]",
        isCentered && "mx-auto text-center",
        className
      )}
    >
      {/* OS Identity Tag */}
      <div className={cn("inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent/90", isCentered && "justify-center")}>
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span>{siteConfig.name}</span>
        <span className="text-white/30">/</span>
        <span className="text-white/60">WORKSTATION</span>
      </div>

      {/* Main Name Anchor */}
      <h1
        id="desktop-hero-title"
        className={cn(
          "mt-3 font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]",
          compact ? "text-4xl sm:text-5xl" : "text-4xl sm:text-6xl lg:text-7xl"
        )}
      >
        ANIKET RAI
      </h1>

      {/* Subtitles */}
      <div
        className={cn(
          "mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm font-medium text-white/80 md:text-base",
          isCentered && "justify-center"
        )}
      >
        <span>B.Tech CSE Student</span>
        <span aria-hidden="true" className="text-accent/60 font-bold">•</span>
        <span>Full-Stack Developer</span>
        <span aria-hidden="true" className="text-accent/60 font-bold">•</span>
        <span>Exploring AI/ML</span>
      </div>

      {/* Statement */}
      <p className={cn("mt-5 max-w-2xl text-white/75 font-normal leading-relaxed", compact ? "text-base" : "text-lg md:text-xl")}>
        Building software, learning systems, and moving toward AI/ML engineering.
      </p>

      {/* Desktop Focus Metadata Grid */}
      <dl className={cn("mt-7 grid max-w-2xl gap-4 sm:grid-cols-2", isCentered && "mx-auto text-left")}>
        <div className="border-l-2 border-accent/60 pl-3 py-0.5">
          <dt className="font-mono text-[0.66rem] uppercase tracking-widest text-white/45">Current Focus</dt>
          <dd className="mt-1 text-sm font-semibold text-white/95">AI / ML</dd>
        </div>
        <div className="border-l-2 border-white/20 pl-3 py-0.5">
          <dt className="font-mono text-[0.66rem] uppercase tracking-widest text-white/45">Open To</dt>
          <dd className="mt-1 text-sm font-semibold text-white/95">Internships / Software Engineering</dd>
        </div>
      </dl>
    </section>
  );
}

