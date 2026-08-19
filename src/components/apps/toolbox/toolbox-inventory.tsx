"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Tool, ToolCategory, ToolProficiency } from "@/lib/toolbox-data";
import { useWindowManager } from "@/components/os/window-manager";
import {
  Search,
  ChevronDown,
  ChevronUp,
  FlaskConical,
} from "lucide-react";

type ToolboxInventoryProps = {
  tools: Tool[];
  selectedCategory: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
};

export function ToolboxInventory({
  tools,
  selectedCategory,
  searchQuery,
  onSearchChange,
}: ToolboxInventoryProps) {
  const [expandedToolId, setExpandedToolId] = useState<string | null>(null);

  const filteredTools = tools.filter((t) => {
    const matchesCategory = selectedCategory
      ? t.category === selectedCategory
      : true;
    const matchesSearch = searchQuery
      ? t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedToolId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="mb-4 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
        <input
          type="text"
          placeholder="Search toolbox..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-9 pr-3 py-2 font-mono text-[0.72rem] text-white/80 placeholder:text-white/25 outline-none transition-colors focus:border-accent/50 focus:bg-white/[0.05]"
          aria-label="Search technologies"
        />
      </div>

      {/* Results count */}
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/30">
          {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
          {selectedCategory && " in category"}
        </span>
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="font-mono text-[0.54rem] text-accent/60 hover:text-accent transition-colors uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </div>

      {/* Tool list */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1.5">
        {filteredTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[12rem] rounded-lg border border-dashed border-white/10 p-6 text-center">
            <p className="font-mono text-[0.68rem] text-white/40">
              No tools match the current filter.
            </p>
          </div>
        ) : (
          filteredTools.map((tool) => (
            <ToolRow
              key={tool.id}
              tool={tool}
              isExpanded={expandedToolId === tool.id}
              onToggle={() => toggleExpand(tool.id)}
            />
          ))
        )}
      </div>

      {/* AI/ML exploration note */}
      {(selectedCategory === "ai-ml" || selectedCategory === null) &&
        !searchQuery && (
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="rounded-lg border border-accent/15 bg-accent/[0.04] px-3.5 py-2.5">
              <p className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-accent/60 mb-1">
                Current Exploration
              </p>
              <p className="text-[0.7rem] text-white/55 leading-relaxed">
                Building stronger foundations in AI/ML with the goal of moving
                toward AI/ML engineering.
              </p>
            </div>
          </div>
        )}
    </div>
  );
}

/* ─── Tool Row ───────────────────────────────────────────── */

function ToolRow({
  tool,
  isExpanded,
  onToggle,
}: {
  tool: Tool;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const { openApp } = useWindowManager();

  return (
    <div
      className={`rounded-lg border transition-all duration-200 ${
        isExpanded
          ? "border-white/15 bg-white/[0.04]"
          : "border-white/8 bg-white/[0.02] hover:border-white/12 hover:bg-white/[0.03]"
      }`}
    >
      {/* Compact header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-label={`${tool.name} — ${tool.proficiency}`}
        className="w-full text-left px-3.5 py-2.5 flex items-center gap-3 group"
      >
        {/* Name */}
        <span className="flex-1 font-mono text-[0.74rem] font-semibold text-white/85 group-hover:text-white transition-colors">
          {tool.name}
        </span>

        {/* Category tag */}
        <span className="hidden sm:inline-flex font-mono text-[0.52rem] uppercase tracking-[0.12em] text-white/25 shrink-0">
          {formatCategoryLabel(tool.category)}
        </span>

        {/* Proficiency badge */}
        <ProficiencyBadge proficiency={tool.proficiency} />

        {/* Expand icon */}
        {isExpanded ? (
          <ChevronUp className="h-3 w-3 text-white/30 shrink-0" />
        ) : (
          <ChevronDown className="h-3 w-3 text-white/20 shrink-0" />
        )}
      </button>

      {/* Expandable detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-3.5 pb-3.5 pt-1 border-t border-white/8 space-y-3">
              {/* Summary */}
              <p className="text-[0.72rem] text-white/60 leading-relaxed">
                {tool.summary}
              </p>

              {/* Used in */}
              {tool.usedIn && tool.usedIn.length > 0 && (
                <div>
                  <span className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-white/30 block mb-1.5">
                    Used in
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {tool.usedIn.map((use) => (
                      <span
                        key={use}
                        className="inline-flex items-center rounded border border-white/8 bg-white/[0.03] px-2 py-0.5 font-mono text-[0.58rem] text-white/50"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related experiments */}
              {tool.relatedExperiments &&
                tool.relatedExperiments.length > 0 && (
                  <div>
                    <span className="font-mono text-[0.54rem] uppercase tracking-[0.14em] text-white/30 flex items-center gap-1.5 mb-1.5">
                      <FlaskConical className="h-2.5 w-2.5 text-accent/50" />
                      Related Experiments
                    </span>
                    <div className="space-y-1">
                      {tool.relatedExperiments.map((exp) => (
                        <button
                          key={exp.labId}
                          type="button"
                          onClick={() => openApp("engineering-lab")}
                          className="group/exp w-full text-left flex items-center gap-2 rounded border border-white/6 bg-white/[0.02] px-2.5 py-1.5 hover:border-accent/30 hover:bg-accent/[0.04] transition-all"
                        >
                          <span className="font-mono text-[0.54rem] font-bold text-accent/50 uppercase tracking-[0.14em] group-hover/exp:text-accent transition-colors">
                            {exp.labId}
                          </span>
                          <span className="text-[0.66rem] text-white/60 group-hover/exp:text-white/80 transition-colors">
                            {exp.name}
                          </span>
                          <span className="ml-auto font-mono text-[0.5rem] text-white/20 group-hover/exp:text-accent/60 transition-colors uppercase tracking-wider">
                            Open →
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Helpers ────────────────────────────────────────────── */

function ProficiencyBadge({
  proficiency,
}: {
  proficiency: ToolProficiency;
}) {
  const config: Record<
    ToolProficiency,
    { className: string }
  > = {
    CORE: {
      className:
        "text-emerald-400/80 border-emerald-400/20 bg-emerald-400/[0.06]",
    },
    "WORKING WITH": {
      className: "text-accent border-accent/20 bg-accent/[0.06]",
    },
    FAMILIAR: {
      className: "text-blue-400/70 border-blue-400/15 bg-blue-400/[0.05]",
    },
    EXPLORING: {
      className: "text-amber-400/70 border-amber-400/15 bg-amber-400/[0.05]",
    },
  };

  const c = config[proficiency];

  return (
    <span
      className={`inline-flex items-center shrink-0 rounded border px-1.5 py-0.5 font-mono text-[0.5rem] font-bold uppercase tracking-[0.12em] ${c.className}`}
    >
      {proficiency}
    </span>
  );
}

function formatCategoryLabel(category: ToolCategory): string {
  const map: Record<ToolCategory, string> = {
    languages: "LANG",
    frontend: "FE",
    backend: "BE",
    database: "DB",
    engineering: "ENG",
    "ai-ml": "AI/ML",
  };
  return map[category];
}
