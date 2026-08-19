"use client";

import { useState, useEffect } from "react";
import { experimentsData } from "@/lib/experiments-data";
import { ExperimentIndex } from "./engineering-lab/experiment-index";
import { ExperimentDetail } from "./engineering-lab/experiment-detail";
import { AppHeader, StatusBadge } from "@/components/ui/os-primitives";
import { FlaskConical, ArrowLeft, Layers, Terminal } from "lucide-react";

export function EngineeringLabApp() {
  const [selectedId, setSelectedId] = useState<string | null>("LAB-002");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  useEffect(() => {
    const handleSelectExperiment = (e: Event) => {
      const customEvent = e as CustomEvent<{ labId: string }>;
      if (customEvent.detail?.labId) {
        setSelectedId(customEvent.detail.labId);
        setShowMobileDetail(true);
      }
    };

    window.addEventListener("os:select-lab-experiment", handleSelectExperiment);
    return () => {
      window.removeEventListener("os:select-lab-experiment", handleSelectExperiment);
    };
  }, []);

  const selectedExperiment = experimentsData.find((e) => e.id === selectedId) || null;

  const handleSelectExperiment = (id: string) => {
    setSelectedId(id);
    setShowMobileDetail(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-white">
      <AppHeader
        icon={FlaskConical}
        title="Engineering Lab Workbench"
        eyebrow="Technical Investigation"
        description="Case studies, system architecture diagrams, and build records."
        variant="technical"
        status={<StatusBadge tone="ready" pulse>{experimentsData.length} Lab Records</StatusBadge>}
        meta={
          <span className="hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-white/40 sm:flex">
            <Layers className="h-3 w-3 text-accent-mint" />
            Active Workbench
          </span>
        }
      />

      {/* Main Two-Panel Workbench Body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[16rem_1fr] lg:grid-cols-[18rem_1fr] gap-4 min-h-[28rem]">
        
        {/* Left Panel: Experiment Index */}
        <div className={`md:block rounded-xl border border-accent-mint/[0.12] bg-white/[0.018] p-3 md:border-r md:border-white/10 md:bg-transparent md:p-0 md:pr-4 ${showMobileDetail ? "hidden md:block" : "block"}`}>
          <ExperimentIndex
            experiments={experimentsData}
            selectedId={selectedId}
            onSelectExperiment={handleSelectExperiment}
          />
        </div>

        {/* Right Panel: Detail View or Mobile Back Header */}
        <div className={`os-panel os-panel-technical flex flex-col min-h-0 overflow-y-auto rounded-xl p-4 pr-3 no-scrollbar ${showMobileDetail ? "block" : "hidden md:block"}`}>
          {/* Mobile Back Button */}
          {showMobileDetail && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileDetail(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-mint hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Experiment Index</span>
              </button>
            </div>
          )}

          {selectedExperiment ? (
            <ExperimentDetail experiment={selectedExperiment} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[20rem] rounded-xl border border-dashed border-white/[0.15] p-8 text-center font-mono">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent-mint/20 bg-accent-mint/10 text-accent-mint mb-3">
                <Terminal className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">ENGINEERING LAB</h3>
              <p className="mt-1 text-xs text-white/50 max-w-sm">
                Select an experiment from the index on the left to inspect its objective, problem architecture, and engineering decisions.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
