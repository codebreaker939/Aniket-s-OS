"use client";

import { motion } from "motion/react";
import type { JourneyStage } from "@/lib/journey-data";
import { useWindowManager } from "@/components/os/window-manager";
import {
  BookOpen,
  Wrench,
  ArrowRight,
  FlaskConical,
  CheckCircle2,
  CircleDot,
  Briefcase,
  Mail,
} from "lucide-react";

type JourneyDetailProps = {
  stage: JourneyStage;
};

export function JourneyDetail({ stage }: JourneyDetailProps) {
  const { openApp } = useWindowManager();

  const handleOpenExperiment = () => {
    // Open Engineering Lab window
    openApp("engineering-lab");
  };

  const isNextStage = stage.status === "next";

  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-6"
    >
      {/* Stage Header */}
      <header>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.22em] text-accent">
            {stage.version}
          </span>
          <span className="w-6 h-[1px] bg-accent/40" />
          <StageStatusBadge status={stage.status} />
        </div>

        <h2 className="text-xl font-bold tracking-tight text-white leading-snug">
          {stage.title}
        </h2>

        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/40">
            {stage.period}
          </span>
        </div>
      </header>

      {/* Narrative */}
      <div className="rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3.5">
        <p className="text-[0.82rem] text-white/75 leading-relaxed">
          {stage.narrative}
        </p>
      </div>

      {/* What I Learned */}
      {stage.whatLearned.length > 0 && (
        <section>
          <SectionLabel icon={<BookOpen className="h-3 w-3" />} label="What I Learned" />
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {stage.whatLearned.map((item) => (
              <span
                key={item}
                className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[0.64rem] text-white/65 tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Technologies */}
      {stage.technologies.length > 0 && (
        <section>
          <SectionLabel icon={<Wrench className="h-3 w-3" />} label="Tech Stack" />
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {stage.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded border border-accent/20 bg-accent/[0.06] px-2 py-0.5 font-mono text-[0.6rem] text-accent/80 tracking-wider uppercase"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* What I Built */}
      {stage.whatBuilt.length > 0 && (
        <section>
          <SectionLabel
            icon={<FlaskConical className="h-3 w-3" />}
            label="What I Built"
            sublabel="Connected Experiments"
          />
          <div className="mt-2.5 space-y-1.5">
            {stage.whatBuilt.map((project) => (
              <button
                key={project.name}
                type="button"
                onClick={() => project.labId && handleOpenExperiment()}
                disabled={!project.labId}
                className={`group w-full text-left rounded-lg border px-3.5 py-2.5 transition-all duration-200
                  ${
                    project.labId
                      ? "border-white/10 bg-white/[0.03] hover:border-accent/40 hover:bg-accent/[0.06] cursor-pointer"
                      : "border-white/6 bg-white/[0.015] cursor-default"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {project.labId && (
                      <span className="font-mono text-[0.56rem] font-bold text-accent/60 uppercase tracking-[0.16em]">
                        {project.labId}
                      </span>
                    )}
                    <span className="text-[0.74rem] font-medium text-white/80 group-hover:text-white transition-colors">
                      {project.name}
                    </span>
                  </div>
                  {project.labId && (
                    <span className="font-mono text-[0.54rem] text-white/30 group-hover:text-accent transition-colors uppercase tracking-wider">
                      Open in Lab →
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* What Changed */}
      {stage.whatChanged && (
        <section>
          <SectionLabel
            icon={<ArrowRight className="h-3 w-3" />}
            label="What Changed"
          />
          <div className="mt-2.5 rounded-lg border-l-2 border-accent/30 pl-3.5 py-1">
            <p className="text-[0.78rem] text-white/60 leading-relaxed italic">
              {stage.whatChanged}
            </p>
          </div>
        </section>
      )}

      {/* Next Stage — Career Objective */}
      {isNextStage && (
        <div className="space-y-5">
          {/* Looking For */}
          <section>
            <SectionLabel
              icon={<Briefcase className="h-3 w-3" />}
              label="Currently Looking For"
            />
            <div className="mt-2.5 space-y-1.5">
              {[
                "Software Engineering Internships",
                "Full-Stack Development Opportunities",
                "AI / ML-oriented Opportunities",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-lg border border-white/8 bg-white/[0.02] px-3.5 py-2.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/60 shrink-0" />
                  <span className="text-[0.76rem] text-white/70">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Direction */}
          <section>
            <SectionLabel
              icon={<ArrowRight className="h-3 w-3" />}
              label="Direction"
            />
            <div className="mt-2.5 rounded-lg border border-white/8 bg-white/[0.02] px-4 py-3.5">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[0.68rem] text-white/60">
                <span className="text-white/80">Full-Stack Development</span>
                <ArrowRight className="h-2.5 w-2.5 text-accent/50" />
                <span className="text-white/80">AI / ML</span>
                <ArrowRight className="h-2.5 w-2.5 text-accent/50" />
                <span className="text-accent font-semibold">Software / AI Engineering</span>
              </div>
              <p className="mt-2.5 text-[0.72rem] text-white/50 leading-relaxed">
                Currently exploring AI/ML with the goal of moving toward AI/ML engineering. Seeking professional experience to apply skills in real-world production systems.
              </p>
            </div>
          </section>

          {/* Connect CTA */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => openApp("contact")}
              className="inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2.5 font-mono text-[0.68rem] font-semibold text-accent uppercase tracking-wider transition-colors hover:bg-accent hover:text-slate-950"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Open Connection</span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ─── Helpers ────────────────────────────────────────────── */

function SectionLabel({
  icon,
  label,
  sublabel,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-accent/70">{icon}</span>
      <span className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/50">
        {label}
      </span>
      {sublabel && (
        <>
          <span className="w-3 h-[1px] bg-white/10" />
          <span className="font-mono text-[0.54rem] uppercase tracking-[0.12em] text-white/25">
            {sublabel}
          </span>
        </>
      )}
    </div>
  );
}

function StageStatusBadge({ status }: { status: JourneyStage["status"] }) {
  const config = {
    completed: {
      label: "COMPLETED",
      icon: <CheckCircle2 className="h-2.5 w-2.5" />,
      className: "text-emerald-400/80 border-emerald-400/20 bg-emerald-400/[0.06]",
    },
    active: {
      label: "ACTIVE",
      icon: <CircleDot className="h-2.5 w-2.5" />,
      className: "text-accent border-accent/20 bg-accent/[0.06]",
    },
    next: {
      label: "NEXT BUILD",
      icon: <ArrowRight className="h-2.5 w-2.5" />,
      className: "text-white/50 border-white/15 bg-white/[0.04]",
    },
  };

  const c = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[0.52rem] font-bold uppercase tracking-[0.14em] ${c.className}`}
    >
      {c.icon}
      {c.label}
    </span>
  );
}
