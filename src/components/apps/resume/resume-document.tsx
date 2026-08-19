"use client";

import { useState } from "react";
import {
  profileData,
  educationData,
  leadershipData,
  projectRefsData,
  skillsSnapshotData,
  certificationsData,
  achievementsData,
  resumeConfig,
} from "@/lib/resume-data";
import { ResumeViewerModal } from "./resume-viewer-modal";
import type { DesktopAppId } from "@/types";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import {
  FileText,
  GraduationCap,
  Award,
  ExternalLink,
  Download,
  Wrench,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export function ResumeDocument() {
  const windowManager = useOptionalWindowManager();
  const openApp = (id: DesktopAppId) => {
    windowManager?.openApp(id);
  };
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const handleDownload = () => {
    if (resumeConfig.isAvailable && resumeConfig.pdfUrl) {
      const link = document.createElement("a");
      link.href = resumeConfig.pdfUrl;
      link.download = resumeConfig.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setIsViewerOpen(true);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-white">
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-accent" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
                SYSTEM PROFILE
              </h2>
              <span className="font-mono text-[0.55rem] px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.04] text-accent/80 font-semibold">
                {profileData.systemId}
              </span>
            </div>
            <p className="text-[0.68rem] text-white/60">
              Aniket Rai — Professional Profile & Verified Credentials
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[0.62rem] text-emerald-400 uppercase tracking-widest border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 rounded">
          <ShieldCheck className="h-3 w-3" />
          <span>VERIFIED DOSSIER</span>
        </div>
      </div>

      {/* Main Body - Editorial Document Layout */}
      <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-5">
        {/* Hero Profile Banner */}
        <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5 space-y-3 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white">
                  {profileData.name}
                </h1>
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              </div>
              <p className="font-mono text-xs text-accent font-medium">
                {profileData.headline}
              </p>
              <p className="text-xs text-white/60">
                {profileData.title} · {profileData.location}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsViewerOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent/15 border border-accent/30 font-mono text-xs font-semibold text-accent hover:bg-accent hover:text-slate-950 transition-all"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>View Full Resume</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
                  resumeConfig.isAvailable
                    ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    : "bg-white/5 border border-white/10 text-white/40"
                }`}
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center gap-2 text-[0.7rem] text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-accent shrink-0" />
            <span className="font-mono text-[0.62rem] text-accent/90 uppercase tracking-wider font-semibold">
              Status:
            </span>
            <span>{profileData.status}</span>
          </div>
        </div>

        {/* Section 01: Profile Summary */}
        <section aria-labelledby="section-summary" className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
            <span className="text-accent">01</span>
            <h3 id="section-summary">PROFILE SUMMARY</h3>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 text-xs text-white/80 leading-relaxed">
            {profileData.summary}
          </div>
        </section>

        {/* Section 02: Education */}
        <section aria-labelledby="section-education" className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
            <span className="text-accent">02</span>
            <h3 id="section-education">EDUCATION</h3>
          </div>
          <div className="space-y-2">
            {educationData.map((edu) => (
              <div
                key={edu.degree}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-4 space-y-1.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-accent shrink-0" />
                    <h4 className="font-semibold text-xs text-white">{edu.degree}</h4>
                  </div>
                  <span className="font-mono text-[0.68rem] text-accent font-semibold px-2 py-0.5 rounded bg-accent/10 border border-accent/20 w-fit">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-white/70">{edu.institution} — {edu.location}</p>
                {edu.details && (
                  <p className="text-[0.72rem] text-white/60 pt-1 leading-relaxed border-t border-white/5">
                    {edu.details}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 03: Experience & Leadership */}
        <section aria-labelledby="section-leadership" className="space-y-2">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
            <span className="text-accent">03</span>
            <h3 id="section-leadership">EXPERIENCE & LEADERSHIP</h3>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {leadershipData.map((item) => (
              <div
                key={item.role}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs text-white">{item.role}</h4>
                  <span className="font-mono text-[0.58rem] text-white/40 uppercase">
                    {item.organization}
                  </span>
                </div>
                <p className="text-[0.72rem] text-white/70 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 04: Selected Projects */}
        <section aria-labelledby="section-projects" className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
              <span className="text-accent">04</span>
              <h3 id="section-projects">SELECTED PROJECTS & EXPERIMENTS</h3>
            </div>
            <button
              type="button"
              onClick={() => openApp("engineering-lab")}
              className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-accent hover:underline uppercase tracking-wider"
            >
              <span>Inspect Lab</span>
              <ExternalLink className="h-2.5 w-2.5" />
            </button>
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            {projectRefsData.map((proj) => (
              <div
                key={proj.name}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-3.5 flex flex-col justify-between space-y-2 hover:border-white/20 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{proj.name}</span>
                    <span className="font-mono text-[0.58rem] font-bold text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                      {proj.labId}
                    </span>
                  </div>
                  <p className="text-[0.7rem] text-white/70 leading-relaxed line-clamp-2">
                    {proj.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex flex-wrap gap-1">
                    {proj.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[0.55rem] text-white/50 bg-white/5 px-1.5 py-0.5 rounded"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => openApp("engineering-lab")}
                    className="font-mono text-[0.58rem] text-accent/80 hover:text-accent flex items-center gap-0.5 font-semibold"
                  >
                    <span>Lab</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 05: Technical Skills Snapshot */}
        <section aria-labelledby="section-skills" className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
              <span className="text-accent">05</span>
              <h3 id="section-skills">TECHNICAL STACK SNAPSHOT</h3>
            </div>

            <button
              type="button"
              onClick={() => openApp("toolbox")}
              className="inline-flex items-center gap-1.5 rounded bg-accent/15 border border-accent/30 px-2.5 py-1 font-mono text-[0.62rem] font-bold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider"
            >
              <Wrench className="h-3 w-3" />
              <span>Open Toolbox</span>
            </button>
          </div>

          <div className="grid gap-2 grid-cols-2 sm:grid-cols-3">
            {skillsSnapshotData.map((item) => (
              <div
                key={item.category}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-1.5"
              >
                <span className="font-mono text-[0.58rem] font-bold text-accent/90 uppercase tracking-wider block">
                  {item.category}
                </span>
                <div className="flex flex-wrap gap-1">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[0.6rem] text-white/80 bg-slate-950/40 border border-white/10 px-1.5 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 06 & 07: Certifications & Achievements */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Certifications */}
          <section aria-labelledby="section-certifications" className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
              <span className="text-accent">06</span>
              <h3 id="section-certifications">CERTIFICATIONS</h3>
            </div>
            <div className="space-y-2">
              {certificationsData.map((cert) => (
                <div
                  key={cert.title}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white">{cert.title}</span>
                    {cert.status === "active" ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[0.55rem] text-emerald-400 font-bold uppercase">
                        <CheckCircle2 className="h-3 w-3" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-mono text-[0.55rem] text-amber-400 font-bold uppercase">
                        <Clock className="h-3 w-3" />
                        In Progress
                      </span>
                    )}
                  </div>
                  {cert.issuer && (
                    <p className="text-[0.68rem] text-white/60">{cert.issuer}</p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section aria-labelledby="section-achievements" className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
              <span className="text-accent">07</span>
              <h3 id="section-achievements">ACHIEVEMENTS</h3>
            </div>
            <div className="space-y-2">
              {achievementsData.map((ach) => (
                <div
                  key={ach.title}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-3 space-y-1"
                >
                  <div className="flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span className="font-semibold text-xs text-white">{ach.title}</span>
                  </div>
                  <p className="text-[0.7rem] text-white/65 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Bottom Actions Bar */}
        <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] text-white/40">
            <ShieldCheck className="h-3.5 w-3.5 text-accent" />
            <span>Aniket Rai Dossier · System Profile 1.0</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsViewerOpen(true)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-accent/20 border border-accent/40 font-mono text-xs font-semibold text-accent hover:bg-accent hover:text-slate-950 transition-all"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>View Full Resume</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-mono text-xs font-semibold transition-all ${
                resumeConfig.isAvailable
                  ? "bg-white/10 border border-white/20 text-white hover:bg-white/20"
                  : "bg-white/5 border border-white/10 text-white/40"
              }`}
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ResumeViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
      />
    </div>
  );
}
