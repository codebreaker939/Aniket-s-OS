"use client";

import { motion } from "motion/react";
import type { SourceControlSection } from "@/lib/github-data";
import { User, FolderGit2, Activity } from "lucide-react";

type SourceControlSidebarProps = {
  sections: { id: SourceControlSection; label: string }[];
  selectedId: SourceControlSection;
  repoCounts: number;
  onSelectSection: (id: SourceControlSection) => void;
};

const sectionIcons: Record<SourceControlSection, typeof User> = {
  profile: User,
  repositories: FolderGit2,
  activity: Activity,
};

export function SourceControlSidebar({
  sections,
  selectedId,
  repoCounts,
  onSelectSection,
}: SourceControlSidebarProps) {
  return (
    <nav aria-label="Source control sections" className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-white/10">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">
          Navigation
        </p>
      </div>

      {/* Section list */}
      <div className="flex-1 space-y-1">
        {sections.map((section) => {
          const isSelected = selectedId === section.id;
          const Icon = sectionIcons[section.id];

          return (
            <button
              key={section.id}
              type="button"
              aria-label={`View ${section.label}`}
              aria-pressed={isSelected}
              onClick={() => onSelectSection(section.id)}
              className={`group w-full text-left rounded-lg px-3 py-2.5 transition-all duration-200 relative
                ${
                  isSelected
                    ? "bg-accent/[0.12] border border-accent/50"
                    : "bg-transparent border border-transparent hover:bg-white/[0.04] hover:border-white/10"
                }
              `}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`h-3.5 w-3.5 shrink-0 ${
                    isSelected ? "text-accent" : "text-white/30"
                  }`}
                />
                <span
                  className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] ${
                    isSelected ? "text-white" : "text-white/60"
                  }`}
                >
                  {section.label}
                </span>
                {section.id === "repositories" && (
                  <span
                    className={`ml-auto font-mono text-[0.52rem] ${
                      isSelected ? "text-accent/70" : "text-white/20"
                    }`}
                  >
                    {repoCounts}
                  </span>
                )}
              </div>

              {isSelected && (
                <motion.div
                  layoutId="source-control-section-indicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Connection status */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2.5">
          <div className="flex items-center gap-2 mb-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
            <span className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-white/40">
              Awaiting GitHub Sync
            </span>
          </div>
          <p className="font-mono text-[0.56rem] text-white/30 leading-relaxed">
            Static repository data. Live sync not yet configured.
          </p>
        </div>
      </div>
    </nav>
  );
}
