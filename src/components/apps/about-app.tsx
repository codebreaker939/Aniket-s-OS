"use client";

import Image from "next/image";
import { aboutProfileData } from "@/lib/about-data";
import { useOptionalWindowManager } from "@/components/os/window-manager";
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
    <div className="flex flex-col h-full space-y-5 text-white select-none font-sans overflow-y-auto pr-1 no-scrollbar">
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-accent" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                ABOUT
              </h2>
              <span className="font-mono text-[0.55rem] px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-accent/80 font-semibold">
                {p.systemId}
              </span>
            </div>
            <p className="text-[0.68rem] text-white/60">
              Aniket Rai / Developer Profile & Engineering Focus
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[0.62rem] text-emerald-400 font-semibold uppercase tracking-wider border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 rounded">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{p.availability}</span>
        </div>
      </div>

      {/* Profile Header Block — Unclipped, natural sizing */}
      <div className="rounded-2xl border border-white/12 bg-white/[0.03] p-5 space-y-4 relative overflow-hidden shrink-0">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Profile Image / Avatar Slot */}
          <div className="relative shrink-0 w-28 h-36 sm:w-32 sm:h-40 rounded-xl border border-accent/30 bg-slate-950/60 shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_16px_rgba(94,210,186,0.1)] overflow-hidden flex flex-col items-center justify-center">
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
              <div className="flex flex-col items-center justify-center p-3 text-center space-y-1.5 h-full w-full bg-gradient-to-b from-white/[0.04] to-accent/[0.05]">
                <div className="font-mono text-2xl font-bold tracking-tighter text-accent">
                  {p.profileImage.fallbackInitials}
                </div>
                <div className="w-6 h-[1px] bg-accent/40" />
                <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-white/40 font-semibold">
                  IDENTITY
                </span>
                <span className="font-mono text-[0.48rem] text-accent/70 uppercase">
                  ACTIVE
                </span>
              </div>
            )}
          </div>

          {/* Identity Stack */}
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="space-y-0.5">
                <h1 className="text-2xl font-bold tracking-tight text-white">
                  {p.name}
                </h1>
                <p className="font-mono text-xs text-accent font-semibold">
                  {p.title}
                </p>
              </div>

              <span className="inline-flex sm:hidden items-center gap-1.5 font-mono text-[0.58rem] text-emerald-400 font-semibold uppercase tracking-wider border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 rounded">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>OPEN TO OPPORTUNITIES</span>
              </span>
            </div>

            <p className="font-mono text-xs text-white/80 font-medium">
              {p.role}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.68rem] text-white/60 pt-1 border-t border-white/8">
              <span className="flex items-center gap-1.5 text-accent/90">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>{p.systemId}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-white/40" />
                <span>{p.location}</span>
              </span>
            </div>

            <p className="text-xs text-white/80 leading-relaxed pt-2">
              {p.intro}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: 4 Core Sections */}
      <div className="grid gap-3.5 sm:grid-cols-2">
        {/* Section 01: WHO I AM */}
        <section aria-labelledby="about-sec-01" className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
                <span className="text-accent">01</span>
                <h3 id="about-sec-01">WHO I AM</h3>
              </div>
              <GraduationCap className="h-3.5 w-3.5 text-accent/60" />
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              {p.whoIAm}
            </p>
          </div>
        </section>

        {/* Section 02: WHAT I BUILD */}
        <section aria-labelledby="about-sec-02" className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
                <span className="text-accent">02</span>
                <h3 id="about-sec-02">WHAT I BUILD</h3>
              </div>
              <Code2 className="h-3.5 w-3.5 text-accent/60" />
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              {p.whatIBuild}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openApp("engineering-lab")}
            className="self-start inline-flex items-center gap-1 font-mono text-[0.6rem] font-semibold text-accent hover:underline uppercase tracking-wider pt-2"
          >
            <span>Explore Engineering Lab</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </section>

        {/* Section 03: WHAT I'M EXPLORING */}
        <section aria-labelledby="about-sec-03" className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
                <span className="text-accent">03</span>
                <h3 id="about-sec-03">WHAT I&apos;M EXPLORING</h3>
              </div>
              <Sparkles className="h-3.5 w-3.5 text-accent/60" />
            </div>
            <p className="text-xs text-white/80 leading-relaxed">
              {p.whatIExplore}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openApp("toolbox")}
            className="self-start inline-flex items-center gap-1 font-mono text-[0.6rem] font-semibold text-accent hover:underline uppercase tracking-wider pt-2"
          >
            <span>Inspect Stack in Toolbox</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </section>

        {/* Section 04: WHAT I'M LOOKING FOR */}
        <section aria-labelledby="about-sec-04" className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
                <span className="text-accent">04</span>
                <h3 id="about-sec-04">WHAT I&apos;M LOOKING FOR</h3>
              </div>
              <Briefcase className="h-3.5 w-3.5 text-emerald-400/70" />
            </div>

            <ul className="space-y-1.5">
              {p.whatILookFor.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      {/* Personal Work Style Panel */}
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-1.5">
        <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.18em] text-accent block">
          HOW I WORK
        </span>
        <p className="text-xs font-mono text-white/90 italic">
          &ldquo;{p.workStyle}&rdquo;
        </p>
      </div>

      {/* NOW Panel (Live Status) */}
      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 space-y-2">
        <div className="flex items-center gap-1.5 font-mono text-[0.58rem] font-bold text-accent uppercase tracking-widest">
          <Compass className="h-3.5 w-3.5" />
          <span>CURRENT STATUS (NOW)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[0.65rem]">
          <div className="rounded bg-white/[0.02] border border-white/5 p-2 space-y-0.5">
            <span className="text-white/35 uppercase block">Learning</span>
            <span className="text-white font-medium">{p.nowStatus.learning}</span>
          </div>

          <div className="rounded bg-white/[0.02] border border-white/5 p-2 space-y-0.5">
            <span className="text-white/35 uppercase block">Building</span>
            <span className="text-white font-medium">{p.nowStatus.building}</span>
          </div>

          <div className="rounded bg-white/[0.02] border border-white/5 p-2 space-y-0.5">
            <span className="text-white/35 uppercase block">Looking For</span>
            <span className="text-emerald-400 font-medium">{p.nowStatus.lookingFor}</span>
          </div>
        </div>
      </div>

      {/* Navigation Quick Actions Footer */}
      <div className="pt-2 border-t border-white/10 space-y-2">
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/35 block">
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
