import Link from "next/link";
import { ExternalLink, User, GraduationCap, Code2, Sparkles, Briefcase } from "lucide-react";

export function AboutApp() {
  return (
    <div className="space-y-4 text-white">
      {/* Header section */}
      <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
            <User className="h-3.5 w-3.5" />
            <span>Profile & Career Context</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-white">ANIKET RAI</h2>
          <p className="mt-1 text-xs text-white/70">
            B.Tech CSE Student • Full-Stack Developer • Exploring AI/ML
          </p>
        </div>
        <span className="rounded-full bg-accent/15 border border-accent/30 px-3 py-1 font-mono text-[0.62rem] font-semibold text-accent uppercase tracking-wider">
          Verified
        </span>
      </div>

      {/* Main bio */}
      <p className="text-sm leading-relaxed text-white/80">
        Building software, learning systems, and moving toward AI/ML engineering. Focused on full-stack development and practical machine learning applications.
      </p>

      {/* Key details grid */}
      <div className="grid gap-2.5 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-2 text-accent">
            <GraduationCap className="h-4 w-4" />
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider">Education</span>
          </div>
          <p className="mt-1.5 text-xs font-medium text-white/90">B.Tech Computer Science & Engineering</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-2 text-accent">
            <Code2 className="h-4 w-4" />
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider">Engineering Focus</span>
          </div>
          <p className="mt-1.5 text-xs font-medium text-white/90">Full-Stack Web Architecture & System Design</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="h-4 w-4" />
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider">Current Exploration</span>
          </div>
          <p className="mt-1.5 text-xs font-medium text-white/90">Artificial Intelligence & Machine Learning</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <Briefcase className="h-4 w-4" />
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-wider">Open To</span>
          </div>
          <p className="mt-1.5 text-xs font-medium text-white/90">Internships & Software Engineering Roles</p>
        </div>
      </div>

      {/* Deep Link Footer */}
      <div className="pt-2">
        <Link
          href="/about"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2.5 font-mono text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
        >
          <span>Open Full Profile Route</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
