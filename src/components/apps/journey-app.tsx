"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { journeyStages } from "@/lib/journey-data";
import { JourneyTimeline } from "./journey/journey-timeline";
import { JourneyDetail } from "./journey/journey-detail";
import { AppHeader, StatusBadge } from "@/components/ui/os-primitives";
import { GitBranch, ArrowLeft, Layers } from "lucide-react";

export function JourneyApp() {
  const [selectedId, setSelectedId] = useState("foundation");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const selectedStage =
    journeyStages.find((s) => s.id === selectedId) || null;

  const handleSelectStage = (id: string) => {
    setSelectedId(id);
    setShowMobileDetail(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-white">
      <AppHeader
        icon={GitBranch}
        title="Journey"
        eyebrow="Learning Timeline"
        description="Education, skills, projects, and what came next."
        variant="quiet"
        status={<StatusBadge tone="learning">{journeyStages.length} Stages</StatusBadge>}
        meta={
          <span className="hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-white/40 sm:flex">
            <Layers className="h-3 w-3 text-accent-lavender" />
            Journey
          </span>
        }
      />

      {/* Two-Panel Body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[15rem_1fr] lg:grid-cols-[16.5rem_1fr] gap-4 min-h-[28rem]">
        {/* Left Panel: Timeline */}
        <div
          className={`md:block rounded-xl border border-accent-lavender/[0.12] bg-white/[0.018] p-3 md:border-r md:border-white/10 md:bg-transparent md:p-0 md:pr-4 ${
            showMobileDetail ? "hidden md:block" : "block"
          }`}
        >
          <JourneyTimeline
            stages={journeyStages}
            selectedId={selectedId}
            onSelectStage={handleSelectStage}
          />
        </div>

        {/* Right Panel: Detail */}
        <div
          className={`os-panel os-panel-quiet flex flex-col min-h-0 overflow-y-auto rounded-xl p-4 pr-3 no-scrollbar ${
            showMobileDetail ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile Back */}
          {showMobileDetail && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileDetail(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-lavender hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Timeline</span>
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {selectedStage ? (
              <JourneyDetail key={selectedStage.id} stage={selectedStage} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[20rem] rounded-xl border border-dashed border-white/[0.15] p-8 text-center font-mono">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-lavender/20 bg-accent-lavender/10 text-accent-lavender mb-3">
                  <GitBranch className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  JOURNEY
                </h3>
                <p className="mt-1 text-xs text-white/50 max-w-sm">
                  Select a stage from the timeline.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
