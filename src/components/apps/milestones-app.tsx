"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  milestonesData,
  milestoneCategoryFilters,
  type MilestoneItem,
  type MilestoneCategory,
} from "@/lib/milestones-data";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import type { DesktopAppId } from "@/types";
import {
  Award,
  Search,
  ExternalLink,
  Wrench,
  FlaskConical,
  ArrowLeft,
  Layers,
  Calendar,
  Briefcase,
  ChevronRight,
} from "lucide-react";

export function MilestonesApp() {
  const windowManager = useOptionalWindowManager();
  const openApp = (id: DesktopAppId) => {
    windowManager?.openApp(id);
  };

  const [selectedCategory, setSelectedCategory] = useState<MilestoneCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(milestonesData[0].id);
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  // Filtering
  const filteredMilestones = milestonesData.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.organization && item.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.skills && item.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const selectedMilestone =
    filteredMilestones.find((m) => m.id === selectedMilestoneId) ||
    filteredMilestones[0] ||
    null;

  const handleSelectMilestone = (id: string) => {
    setSelectedMilestoneId(id);
    setShowMobileDetail(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-white select-none">
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-accent" />
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              MILESTONES
            </h2>
            <p className="text-[0.68rem] text-white/60">
              Achievements / Competitions / Leadership Log
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[0.62rem] text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
          <Layers className="h-3 w-3 text-accent" />
          <span>{milestonesData.length} RECORDED MILESTONES</span>
        </div>
      </div>

      {/* Main Two-Panel Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[16rem_1fr] gap-4 min-h-[28rem]">
        {/* Left Panel: Category Filter + Search + Chronological Timeline Index */}
        <div
          className={`flex flex-col gap-3 border-r border-white/10 pr-0 md:pr-4 ${
            showMobileDetail ? "hidden md:flex" : "flex"
          }`}
        >
          {/* Category Filters */}
          <div className="space-y-1">
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-white/35 block mb-1">
              Category Filter
            </span>
            <div className="grid grid-cols-2 md:grid-cols-1 gap-1">
              {milestoneCategoryFilters.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative w-full text-left rounded-lg px-2.5 py-1.5 font-mono text-[0.62rem] font-bold uppercase tracking-wider transition-all ${
                      isSelected
                        ? "bg-accent/15 border border-accent/40 text-accent"
                        : "bg-white/[0.02] border border-white/5 text-white/50 hover:bg-white/5 hover:text-white/80"
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="milestone-cat-indicator"
                        className="absolute left-0 top-1 bottom-1 w-[2px] bg-accent rounded-full hidden md:block"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
            <input
              type="text"
              placeholder="Search milestones..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-8 pr-3 py-1.5 font-mono text-[0.7rem] text-white placeholder:text-white/30 outline-none focus:border-accent/40"
              aria-label="Search milestones"
            />
          </div>

          {/* Milestone Timeline List */}
          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 no-scrollbar min-h-[14rem]">
            {filteredCredentialsLength(filteredMilestones) === 0 ? (
              <div className="rounded-lg border border-dashed border-white/10 p-5 text-center space-y-1">
                <p className="font-mono text-xs text-white/50 font-bold uppercase">
                  MILESTONE ARCHIVE
                </p>
                <p className="text-[0.68rem] text-white/40 leading-relaxed">
                  No documented activities in this category yet.
                </p>
              </div>
            ) : (
              filteredMilestones.map((item) => {
                const isSelected = selectedMilestone?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectMilestone(item.id)}
                    className={`w-full text-left rounded-lg border p-3 transition-all ${
                      isSelected
                        ? "border-accent/50 bg-accent/10 shadow-sm"
                        : "border-white/8 bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-mono text-[0.58rem] font-bold text-accent px-1.5 py-0.5 rounded bg-accent/10 border border-accent/20">
                        {item.id}
                      </span>
                      <span className="font-mono text-[0.55rem] text-white/35 uppercase">
                        {item.period}
                      </span>
                    </div>

                    <h4 className="font-semibold text-xs text-white line-clamp-1">
                      {item.title}
                    </h4>

                    {item.organization && (
                      <p className="text-[0.68rem] text-white/60 truncate mt-0.5">
                        {item.organization}
                      </p>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Panel: Selected Milestone Detail */}
        <div
          className={`flex flex-col min-h-0 overflow-y-auto pr-1 no-scrollbar ${
            showMobileDetail ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile Back Button */}
          {showMobileDetail && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileDetail(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Milestones List</span>
              </button>
            </div>
          )}

          {selectedMilestone ? (
            <div className="space-y-4">
              {/* Header Card */}
              <div className="rounded-xl border border-white/12 bg-white/[0.03] p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-accent px-2.5 py-0.5 rounded bg-accent/15 border border-accent/30">
                      {selectedMilestone.id}
                    </span>
                    <CategoryBadge category={selectedMilestone.category} />
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[0.62rem] text-white/50">
                    <Calendar className="h-3 w-3 text-accent" />
                    <span>{selectedMilestone.period}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {selectedMilestone.title}
                  </h3>
                  {selectedMilestone.role && (
                    <p className="text-xs font-mono text-accent/90 mt-1 flex items-center gap-1.5">
                      <Briefcase className="h-3 w-3 shrink-0" />
                      <span>{selectedMilestone.role}</span>
                      {selectedMilestone.organization && (
                        <span className="text-white/40">· {selectedMilestone.organization}</span>
                      )}
                    </p>
                  )}
                </div>
              </div>

              {/* Summary & Context */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <div>
                  <h4 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40 mb-1">
                    SUMMARY
                  </h4>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {selectedMilestone.summary}
                  </p>
                </div>

                {selectedMilestone.context && (
                  <div className="pt-2 border-t border-white/5">
                    <h4 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40 mb-1">
                      CONTEXT & OBJECTIVE
                    </h4>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {selectedMilestone.context}
                    </p>
                  </div>
                )}

                {selectedMilestone.outcome && (
                  <div className="pt-2 border-t border-white/5">
                    <h4 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40 mb-1">
                      OUTCOME & IMPACT
                    </h4>
                    <p className="text-xs text-white/75 leading-relaxed">
                      {selectedMilestone.outcome}
                    </p>
                  </div>
                )}
              </div>

              {/* Cross-App Integrations: Related Experiment */}
              {selectedMilestone.relatedExperiment && (
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <FlaskConical className="h-4 w-4 text-accent shrink-0" />
                    <div>
                      <span className="font-mono text-[0.6rem] font-bold text-accent uppercase tracking-wider block">
                        LAB EXPERIMENT REFERENCE
                      </span>
                      <p className="text-xs text-white/80 font-medium">
                        {selectedMilestone.relatedExperiment.labId} — {selectedMilestone.relatedExperiment.name}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => openApp("engineering-lab")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/20 border border-accent/40 font-mono text-xs font-semibold text-accent hover:bg-accent hover:text-slate-950 transition-all uppercase tracking-wider w-fit"
                  >
                    <span>Open in Lab</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {/* Skills Associated */}
              {selectedMilestone.skills && selectedMilestone.skills.length > 0 && (
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/40">
                      ASSOCIATED SKILLS
                    </h4>
                    <button
                      type="button"
                      onClick={() => openApp("toolbox")}
                      className="inline-flex items-center gap-1 font-mono text-[0.6rem] text-accent hover:underline uppercase tracking-wider"
                    >
                      <Wrench className="h-3 w-3" />
                      <span>View in Toolbox</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedMilestone.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[0.62rem] text-white/80 bg-slate-950/40 border border-white/10 px-2 py-0.5 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Optional Link */}
              {selectedMilestone.link && (
                <div className="pt-2 flex justify-end">
                  <a
                    href={selectedMilestone.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:underline"
                  >
                    <span>View External Reference</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ─── Helpers ────────────────────────────────────────────── */

function filteredCredentialsLength(items: MilestoneItem[]): number {
  return items.length;
}

function CategoryBadge({ category }: { category: MilestoneCategory }) {
  const labels: Record<MilestoneCategory, string> = {
    leadership: "LEADERSHIP",
    projects: "PROJECT",
    academic: "ACADEMIC",
    competitions: "COMPETITION",
    hackathons: "HACKATHON",
    other: "ACTIVITY",
  };

  return (
    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/5 text-white/70">
      {labels[category] || category}
    </span>
  );
}
