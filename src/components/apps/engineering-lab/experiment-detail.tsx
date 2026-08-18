import type { EngineeringExperiment } from "@/lib/experiments-data";
import { ArchitectureDiagram } from "./architecture-diagram";
import { ExternalLink, Github, CheckCircle2, Clock, Terminal } from "lucide-react";

export function ExperimentDetail({ experiment }: { experiment: EngineeringExperiment }) {
  const getStatusBadge = (status: EngineeringExperiment["status"]) => {
    switch (status) {
      case "COMPLETED":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-emerald-400">
            <CheckCircle2 className="h-3 w-3" />
            <span>COMPLETED</span>
          </span>
        );
      case "IN PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-amber-400">
            <Clock className="h-3 w-3" />
            <span>IN PROGRESS</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-[0.62rem] font-semibold uppercase tracking-wider text-accent">
            <Terminal className="h-3 w-3" />
            <span>PROJECT</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-white text-xs leading-relaxed max-w-3xl">
      {/* Experiment Header */}
      <div className="border-b border-white/12 pb-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-bold text-accent tracking-widest bg-accent/10 px-2.5 py-1 rounded border border-accent/25">
            {experiment.id}
          </span>
          <div className="flex items-center gap-2">
            {getStatusBadge(experiment.status)}
            <span className="font-mono text-[0.62rem] text-white/50 uppercase tracking-wider border border-white/10 px-2.5 py-0.5 rounded">
              {experiment.domain}
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white uppercase font-sans">
            {experiment.name}
          </h1>
          <p className="mt-1 font-mono text-xs text-accent/90 font-medium">
            {experiment.subtitle}
          </p>
        </div>

        <p className="text-white/80 text-xs leading-6">
          {experiment.summary}
        </p>
      </div>

      {/* 01 — OBJECTIVE */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <span>01 — OBJECTIVE</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-white/85">
          {experiment.objective}
        </div>
      </section>

      {/* 02 — PROBLEM */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <span>02 — PROBLEM</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-white/85">
          {experiment.problem}
        </div>
      </section>

      {/* 03 — APPROACH & TECH STACK */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <span>03 — APPROACH</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-white/85">
          {experiment.approach}
        </div>

        <div className="space-y-1.5 pt-1">
          <div className="font-mono text-[0.6rem] uppercase tracking-wider text-white/50">Technologies Utilized</div>
          <div className="flex flex-wrap gap-1.5">
            {experiment.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/14 bg-slate-900/60 px-2.5 py-1 font-mono text-[0.68rem] text-white/90"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — ARCHITECTURE VISUAL */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <span>04 — ARCHITECTURE</span>
        </div>
        <ArchitectureDiagram architecture={experiment.architecture} />
      </section>

      {/* 05 — ENGINEERING DECISIONS */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <span>05 — ENGINEERING DECISIONS</span>
        </div>
        <ul className="space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 list-disc list-inside text-white/85">
          {experiment.engineeringDecisions.map((decision, idx) => (
            <li key={idx} className="leading-6">
              {decision}
            </li>
          ))}
        </ul>
      </section>

      {/* 06 — CHALLENGES */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <span>06 — CHALLENGES</span>
        </div>
        <ul className="space-y-2 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 list-disc list-inside text-white/85">
          {experiment.challenges.map((challenge, idx) => (
            <li key={idx} className="leading-6">
              {challenge}
            </li>
          ))}
        </ul>
      </section>

      {/* 07 — OUTCOME */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
          <span>07 — OUTCOME</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-white/85">
          {experiment.outcome}
        </div>
      </section>

      {/* LINKS & SOURCE */}
      <div className="border-t border-white/12 pt-4 flex flex-wrap items-center gap-3 font-mono text-xs">
        {experiment.githubUrl && (
          <a
            href={experiment.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-4 py-2 font-semibold text-white transition-colors hover:bg-white/20 hover:border-accent"
          >
            <Github className="h-4 w-4 text-accent" />
            <span>Inspect Repository</span>
            <ExternalLink className="h-3 w-3 text-white/50" />
          </a>
        )}
        {experiment.liveUrl && (
          <a
            href={experiment.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-4 py-2 font-semibold text-accent transition-colors hover:bg-accent hover:text-slate-950"
          >
            <span>Live Demonstration</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
