import { useState } from "react";
import type { EngineeringExperiment } from "@/lib/experiments-data";
import { Search, FlaskConical, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ExperimentIndexProps = {
  experiments: EngineeringExperiment[];
  selectedId: string | null;
  onSelectExperiment: (id: string) => void;
};

export function ExperimentIndex({
  experiments,
  selectedId,
  onSelectExperiment
}: ExperimentIndexProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = experiments.filter((exp) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      exp.id.toLowerCase().includes(q) ||
      exp.name.toLowerCase().includes(q) ||
      exp.domain.toLowerCase().includes(q) ||
      exp.technologies.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col h-full space-y-3 font-mono text-white select-none">
      {/* Search & Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[0.66rem] uppercase tracking-widest text-accent font-semibold">
            <FlaskConical className="h-3.5 w-3.5" />
            <span>Experiment Index</span>
          </div>
          <span className="text-[0.62rem] text-white/40 uppercase tracking-widest">
            {experiments.length} Active
          </span>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-white/40" />
          <input
            type="text"
            placeholder="Search experiments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-white/12 bg-black/40 pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/40 focus:border-accent focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Index List */}
      <div className="flex-1 space-y-1.5 overflow-y-auto pr-1 no-scrollbar min-h-[16rem]">
        {filtered.map((exp) => {
          const isSelected = selectedId === exp.id;
          return (
            <button
              key={exp.id}
              type="button"
              onClick={() => onSelectExperiment(exp.id)}
              className={cn(
                "w-full text-left rounded-xl border p-3 transition-all duration-150 group flex items-start justify-between gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                isSelected
                  ? "border-accent/60 bg-accent/15 shadow-[0_0_16px_rgba(154,209,196,0.15)]"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
              )}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-mono text-[0.65rem] font-bold tracking-wider rounded px-1.5 py-0.2 border",
                      isSelected
                        ? "bg-accent/20 border-accent/40 text-accent"
                        : "bg-white/5 border-white/10 text-white/60 group-hover:text-accent"
                    )}
                  >
                    {exp.id}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-[0.6rem] uppercase tracking-wider",
                      isSelected ? "text-accent/90" : "text-white/45"
                    )}
                  >
                    {exp.domain}
                  </span>
                </div>

                <div className={cn("text-xs font-bold tracking-tight truncate", isSelected ? "text-white" : "text-white/85 group-hover:text-white")}>
                  {exp.name}
                </div>

                <div className="text-[0.65rem] text-white/50 truncate font-sans">
                  {exp.subtitle}
                </div>
              </div>

              <div className="flex flex-col items-end shrink-0 pt-0.5">
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform duration-150",
                    isSelected ? "text-accent translate-x-0.5" : "text-white/20 group-hover:text-white/50"
                  )}
                />
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed border-white/15 p-6 text-center text-xs text-white/40">
            No experiments match &quot;{searchQuery}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
