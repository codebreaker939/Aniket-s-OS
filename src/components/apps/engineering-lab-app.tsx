"use client";

import { useState } from "react";
import { experimentsData } from "@/lib/experiments-data";
import { ExperimentIndex } from "./engineering-lab/experiment-index";
import { ExperimentDetail } from "./engineering-lab/experiment-detail";
import { FlaskConical, ArrowLeft, Layers, Terminal } from "lucide-react";

export function EngineeringLabApp() {
  const [selectedId, setSelectedId] = useState<string | null>("LAB-002");
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  const selectedExperiment = experimentsData.find((e) => e.id === selectedId) || null;

  const handleSelectExperiment = (id: string) => {
    setSelectedId(id);
    setShowMobileDetail(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-white">
      {/* Top Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <FlaskConical className="h-4 w-4 text-accent" />
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              ENGINEERING LAB WORKBENCH
            </h2>
            <p className="text-[0.68rem] text-white/60">
              Technical case studies, system architecture diagrams, and build records.
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[0.62rem] text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
          <Layers className="h-3 w-3 text-accent" />
          <span>{experimentsData.length} LAB BUILD RECS</span>
        </div>
      </div>

      {/* Main Two-Panel Workbench Body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[16rem_1fr] lg:grid-cols-[18rem_1fr] gap-4 min-h-[28rem]">
        
        {/* Left Panel: Experiment Index */}
        <div className={`md:block border-r border-white/10 pr-0 md:pr-4 ${showMobileDetail ? "hidden md:block" : "block"}`}>
          <ExperimentIndex
            experiments={experimentsData}
            selectedId={selectedId}
            onSelectExperiment={handleSelectExperiment}
          />
        </div>

        {/* Right Panel: Detail View or Mobile Back Header */}
        <div className={`flex flex-col min-h-0 overflow-y-auto pr-1 no-scrollbar ${showMobileDetail ? "block" : "hidden md:block"}`}>
          {/* Mobile Back Button */}
          {showMobileDetail && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileDetail(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Experiment Index</span>
              </button>
            </div>
          )}

          {selectedExperiment ? (
            <ExperimentDetail experiment={selectedExperiment} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[20rem] rounded-xl border border-dashed border-white/15 p-8 text-center font-mono">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] text-accent mb-3">
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
