"use client";

import Image from "next/image";
import { aboutProfileData } from "@/lib/about-data";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import { AppHeader, Panel, SectionHeading, StatusBadge } from "@/components/ui/os-primitives";
import type { DesktopAppId } from "@/types";
import {
  User,
  MapPin,
  GraduationCap,
  FlaskConical,
  Wrench,
  Map,
  FileText,
  Sparkles,
  Briefcase,
  ChevronRight,
  Compass,
  Code2,
  ShieldCheck,
} from "lucide-react";

export function AboutApp() {
  const windowManager = useOptionalWindowManager();
  const openApp = (id: DesktopAppId) => {
    windowManager?.openApp(id);
  };

  const p = aboutProfileData;

  return (
    <div className="flex flex-col space-y-5 text-white select-none font-sans">
      <AppHeader
        icon={User}
        title="About Aniket"
        eyebrow={p.systemId}
        description="Human profile, engineering focus, and current direction."
        variant="editorial"
        status={<StatusBadge tone="ready" pulse>{p.availability}</StatusBadge>}
      />

      {/* Profile Header Block — Unclipped, natural sizing */}
      <Panel variant="editorial" className="relative shrink-0 overflow-hidden p-5">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Profile Image / Avatar Slot */}
            <div className="relative flex h-36 w-28 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-accent-copper/25 bg-slate-950/[0.55] shadow-[0_14px_34px_rgba(0,0,0,0.36),0_0_18px_rgba(213,145,94,0.08)] sm:h-40 sm:w-32">
            {p.profileImage.url ? (
              <Image
                src={p.profileImage.url}
                alt={p.profileImage.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 112px, 128px"
              />
            ) : (
              /* Typographic Portrait Badge Fallback */
              <div className="flex h-full w-full flex-col items-center justify-center space-y-1.5 bg-gradient-to-b from-white/[0.055] to-accent-copper/[0.050] p-3 text-center">
                <div className="text-2xl font-semibold tracking-tight text-accent-copper">
                  {p.profileImage.fallbackInitials}
                </div>
                <div className="w-6 h-[1px] bg-accent-copper/[0.45]" />
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/40 font-semibold">
                  IDENTITY
                </span>
                <span className="font-mono text-[0.48rem] text-accent-mint/70 uppercase">
                  ACTIVE
                </span>
              </div>
            )}
          </div>

          {/* Identity Stack */}
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <h1 className="os-text-display text-3xl font-semibold tracking-tight text-white">
                  {p.name}
                </h1>
                <p className="text-sm font-medium text-accent-copper">
                  {p.title}
                </p>
              </div>

              <span className="inline-flex sm:hidden">
                <StatusBadge tone="ready" pulse>Open to Opportunities</StatusBadge>
              </span>
            </div>

            <p className="font-mono text-xs text-white/80 font-medium">
              {p.role}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.68rem] text-white/60 pt-1 border-t border-white/8">
              <span className="flex items-center gap-1.5 text-accent-mint/90">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-mint" />
                <span>{p.systemId}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-white/40" />
                <span>{p.location}</span>
              </span>
            </div>

            <p className="os-text-editorial pt-2 text-sm">
              {p.intro}
            </p>
          </div>
        </div>
      </Panel>

      {/* Main Grid: 4 Core Sections */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        {/* Section 01: WHO I AM */}
        <section aria-labelledby="about-sec-01" className="os-panel os-panel-editorial rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <SectionHeading id="about-sec-01" label="Who I Am" kicker="01 · Human Context" icon={GraduationCap} />
            <p className="text-xs text-white/75 leading-relaxed">
              {p.whoIAm}
            </p>
          </div>
        </section>

        {/* Section 02: WHAT I BUILD */}
        <section aria-labelledby="about-sec-02" className="os-panel rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <SectionHeading id="about-sec-02" label="What I Build" kicker="02 · Builder Mode" icon={Code2} />
            <p className="text-xs text-white/75 leading-relaxed">
              {p.whatIBuild}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openApp("engineering-lab")}
            className="self-start inline-flex items-center gap-1 pt-2 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-accent-mint transition-colors hover:text-white"
          >
            <span>Explore Engineering Lab</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </section>

        {/* Section 03: WHAT I'M EXPLORING */}
        <section aria-labelledby="about-sec-03" className="os-panel os-panel-quiet rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <SectionHeading id="about-sec-03" label="What I'm Exploring" kicker="03 · Learning Track" icon={Sparkles} />
            <p className="text-xs text-white/75 leading-relaxed">
              {p.whatIExplore}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openApp("toolbox")}
            className="self-start inline-flex items-center gap-1 pt-2 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-accent-lavender transition-colors hover:text-white"
          >
            <span>Inspect Stack in Toolbox</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </section>

        {/* Section 04: WHAT I'M LOOKING FOR */}
        <section aria-labelledby="about-sec-04" className="os-panel rounded-xl p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <SectionHeading id="about-sec-04" label="What I'm Looking For" kicker="04 · Direction" icon={Briefcase} />

            <ul className="space-y-1.5">
              {p.whatILookFor.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent-mint shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Personal Work Style Panel */}
      <Panel variant="editorial" className="space-y-1.5">
        <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-accent-copper block">
          HOW I WORK
        </span>
        <p className="text-xs font-mono text-white/90 italic">
          &ldquo;{p.workStyle}&rdquo;
        </p>
      </Panel>

      {/* NOW Panel (Live Status) */}
      <Panel variant="quiet" className="space-y-2">
        <div className="flex items-center gap-1.5 font-mono text-[0.58rem] font-bold text-accent-lavender uppercase tracking-widest">
          <Compass className="h-3.5 w-3.5" />
          <span>CURRENT STATUS (NOW)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[0.65rem]">
          <div className="rounded border border-white/10 bg-white/[0.025] p-2 space-y-0.5">
            <span className="text-white/[0.35] uppercase block">Learning</span>
            <span className="text-white font-medium">{p.nowStatus.learning}</span>
          </div>

          <div className="rounded border border-white/10 bg-white/[0.025] p-2 space-y-0.5">
            <span className="text-white/[0.35] uppercase block">Building</span>
            <span className="text-white font-medium">{p.nowStatus.building}</span>
          </div>

          <div className="rounded border border-white/10 bg-white/[0.025] p-2 space-y-0.5">
            <span className="text-white/[0.35] uppercase block">Looking For</span>
            <span className="text-accent-mint font-medium">{p.nowStatus.lookingFor}</span>
          </div>
        </div>
      </Panel>

      {/* Navigation Quick Actions Footer */}
      <div className="pt-2 border-t border-white/10 space-y-2">
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/[0.35] block">
          Workstation Navigation
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => openApp("engineering-lab")}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] py-2 px-3 text-white/70 hover:border-accent/40 hover:text-accent transition-all text-[0.68rem] font-semibold"
          >
            <FlaskConical className="h-3.5 w-3.5 text-accent" />
            <span>EXPLORE WORK</span>
          </button>

          <button
            type="button"
            onClick={() => openApp("toolbox")}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] py-2 px-3 text-white/70 hover:border-accent/40 hover:text-accent transition-all text-[0.68rem] font-semibold"
          >
            <Wrench className="h-3.5 w-3.5 text-accent" />
            <span>SEE MY STACK</span>
          </button>

          <button
            type="button"
            onClick={() => openApp("journey")}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] py-2 px-3 text-white/70 hover:border-accent/40 hover:text-accent transition-all text-[0.68rem] font-semibold"
          >
            <Map className="h-3.5 w-3.5 text-accent" />
            <span>JOURNEY</span>
          </button>

          <button
            type="button"
            onClick={() => openApp("resume")}
            className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] py-2 px-3 text-white/70 hover:border-accent/40 hover:text-accent transition-all text-[0.68rem] font-semibold"
          >
            <FileText className="h-3.5 w-3.5 text-accent" />
            <span>VIEW PROFILE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
