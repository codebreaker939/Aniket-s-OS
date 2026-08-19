"use client";

import { motion } from "motion/react";
import {
  resumeConfig,
  profileData,
  educationData,
  leadershipData,
  skillsSnapshotData,
} from "@/lib/resume-data";
import { X, Download, FileText, CheckCircle2, AlertCircle } from "lucide-react";

type ResumeViewerModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function ResumeViewerModal({ isOpen, onClose }: ResumeViewerModalProps) {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (resumeConfig.isAvailable && resumeConfig.pdfUrl) {
      const link = document.createElement("a");
      link.href = resumeConfig.pdfUrl;
      link.download = resumeConfig.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-viewer-title"
      className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl border border-white/15 bg-slate-950/95 text-white shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-2.5">
            <FileText className="h-4 w-4 text-accent" />
            <div>
              <h3
                id="resume-viewer-title"
                className="font-mono text-xs font-bold uppercase tracking-wider text-white"
              >
                {resumeConfig.filename}
              </h3>
              <p className="font-mono text-[0.6rem] text-white/50">
                System Profile Document · Updated {resumeConfig.lastUpdated}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={!resumeConfig.isAvailable}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-[0.65rem] font-semibold transition-all ${
                resumeConfig.isAvailable
                  ? "bg-accent/20 border border-accent/40 text-accent hover:bg-accent hover:text-slate-950"
                  : "bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
              }`}

            >
              <Download className="h-3 w-3" />
              <span>{resumeConfig.isAvailable ? "Download PDF" : "PDF Pending"}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close document viewer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Viewer Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {resumeConfig.isAvailable && resumeConfig.pdfUrl ? (
            <iframe
              src={resumeConfig.pdfUrl}
              title="Aniket Rai Resume PDF"
              className="w-full h-[60vh] border-0 rounded"
            />
          ) : (
            <div className="space-y-6">
              {/* Status Notice */}
              <div className="flex items-start gap-3 rounded-lg border border-amber-400/20 bg-amber-400/[0.05] p-3.5">
                <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <p className="font-mono font-semibold text-amber-300 uppercase tracking-wider text-[0.68rem]">
                    PDF Asset Status: Pending Upload
                  </p>
                  <p className="text-white/70 text-[0.72rem] leading-relaxed">
                    The raw PDF resume document is awaiting repository upload. The system profile document below reflects the verified content of the resume.
                  </p>
                </div>
              </div>

              {/* Verified Document Preview */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 space-y-6 font-sans">
                {/* Header */}
                <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    <h2 className="text-xl font-bold text-white tracking-tight">{profileData.name}</h2>
                    <p className="font-mono text-xs text-accent mt-0.5">{profileData.headline}</p>
                  </div>
                  <div className="font-mono text-[0.65rem] text-white/50">
                    <p>{profileData.location}</p>
                    <p className="text-emerald-400/90 font-semibold">{profileData.status}</p>
                  </div>
                </div>

                {/* Summary */}
                <div>
                  <h4 className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40 mb-1.5 font-bold">
                    Professional Summary
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed">{profileData.summary}</p>
                </div>

                {/* Education */}
                <div>
                  <h4 className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40 mb-2 font-bold">
                    Education
                  </h4>
                  {educationData.map((edu) => (
                    <div key={edu.degree} className="text-xs space-y-1">
                      <div className="flex justify-between font-medium text-white">
                        <span>{edu.degree}</span>
                        <span className="font-mono text-accent text-[0.68rem]">{edu.period}</span>
                      </div>
                      <p className="text-white/60 text-[0.72rem]">{edu.institution} — {edu.location}</p>
                    </div>
                  ))}
                </div>

                {/* Leadership & Activities */}
                <div>
                  <h4 className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40 mb-2 font-bold">
                    Leadership & Extracurriculars
                  </h4>
                  <div className="space-y-3">
                    {leadershipData.map((lead) => (
                      <div key={lead.role} className="text-xs space-y-0.5">
                        <div className="flex items-center justify-between font-medium text-white">
                          <span>{lead.role}</span>
                          <span className="font-mono text-white/40 text-[0.65rem]">{lead.organization}</span>
                        </div>
                        <p className="text-white/70 text-[0.72rem] leading-relaxed">{lead.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technical Skills Snapshot */}
                <div>
                  <h4 className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40 mb-2 font-bold">
                    Technical Stack Overview
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {skillsSnapshotData.map((group) => (
                      <div key={group.category} className="rounded bg-white/[0.03] p-2 border border-white/5">
                        <span className="font-mono text-[0.6rem] text-accent font-semibold uppercase block mb-1">
                          {group.category}
                        </span>
                        <p className="text-[0.68rem] text-white/75 leading-tight">
                          {group.skills.join(" • ")}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/10 bg-white/[0.02] text-xs font-mono">
          <span className="text-white/40 text-[0.62rem] flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-accent" />
            Verified Dossier Format
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            Close Preview
          </button>
        </div>
      </motion.div>
    </div>
  );
}
