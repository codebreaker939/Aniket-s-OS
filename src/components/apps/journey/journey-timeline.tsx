"use client";

import { motion } from "motion/react";
import type { JourneyStage } from "@/lib/journey-data";
import {
  CheckCircle2,
  CircleDot,
  ArrowRight,
} from "lucide-react";

type JourneyTimelineProps = {
  stages: JourneyStage[];
  selectedId: string;
  onSelectStage: (id: string) => void;
};

export function JourneyTimeline({
  stages,
  selectedId,
  onSelectStage,
}: JourneyTimelineProps) {
  return (
    <nav
      aria-label="System evolution timeline"
      className="flex flex-col h-full"
    >
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-white/10">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">
          System Evolution
        </p>
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30 mt-0.5">
          {stages.length} stages
        </p>
      </div>

      {/* Stage List */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1">
        {stages.map((stage, index) => {
          const isSelected = selectedId === stage.id;
          const isLast = index === stages.length - 1;

          return (
            <div key={stage.id} className="relative">
              <button
                type="button"
                aria-label={`View ${stage.label} stage`}
                aria-pressed={isSelected}
                onClick={() => onSelectStage(stage.id)}
                className={`group w-full text-left rounded-lg px-3 py-3 transition-all duration-200 relative
                  ${
                    isSelected
                      ? "bg-accent/[0.12] border border-accent/50"
                      : "bg-transparent border border-transparent hover:bg-white/[0.04] hover:border-white/10"
                  }
                `}
              >
                {/* Version badge */}
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`font-mono text-[0.58rem] font-bold uppercase tracking-[0.2em] ${
                      isSelected ? "text-accent" : "text-white/35"
                    }`}
                  >
                    {stage.version}
                  </span>
                  <StatusIcon status={stage.status} isSelected={isSelected} />
                </div>

                {/* Label */}
                <h3
                  className={`font-mono text-[0.72rem] font-bold uppercase tracking-[0.12em] leading-tight ${
                    isSelected ? "text-white" : "text-white/70"
                  }`}
                >
                  {stage.label}
                </h3>

                {/* Period */}
                <p
                  className={`font-mono text-[0.56rem] mt-0.5 tracking-wide ${
                    isSelected ? "text-white/60" : "text-white/30"
                  }`}
                >
                  {stage.period}
                </p>

                {/* Selection indicator bar */}
                {isSelected && (
                  <motion.div
                    layoutId="journey-selection-indicator"
                    className="absolute left-0 top-2 bottom-2 w-[2px] bg-accent rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
              </button>

              {/* Connector line between stages */}
              {!isLast && (
                <div className="flex justify-center py-0.5">
                  <div className="w-[1px] h-3 bg-white/10" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer positioning */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5">
          <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30 mb-1">
            Current Direction
          </p>
          <p className="font-mono text-[0.62rem] text-white/60 leading-relaxed">
            Full-Stack Development → AI / ML → Software Engineering
          </p>
        </div>
      </div>
    </nav>
  );
}

function StatusIcon({
  status,
  isSelected,
}: {
  status: JourneyStage["status"];
  isSelected: boolean;
}) {
  const baseClass = `h-3 w-3 ${isSelected ? "text-accent" : "text-white/25"}`;

  switch (status) {
    case "completed":
      return <CheckCircle2 className={baseClass} />;
    case "active":
      return <CircleDot className={baseClass} />;
    case "next":
      return <ArrowRight className={baseClass} />;
    default:
      return null;
  }
}
