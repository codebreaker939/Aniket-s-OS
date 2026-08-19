"use client";

import { motion } from "motion/react";
import type { ToolCategoryMeta } from "@/lib/toolbox-data";

type ToolboxCategoriesProps = {
  categories: ToolCategoryMeta[];
  selectedId: string | null;
  counts: Record<string, number>;
  onSelectCategory: (id: string | null) => void;
};

export function ToolboxCategories({
  categories,
  selectedId,
  counts,
  onSelectCategory,
}: ToolboxCategoriesProps) {
  const isAll = selectedId === null;

  return (
    <nav aria-label="Toolbox categories" className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-white/10">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-white/40">
          Categories
        </p>
      </div>

      {/* All filter */}
      <div className="mb-1">
        <button
          type="button"
          aria-label="Show all technologies"
          aria-pressed={isAll}
          onClick={() => onSelectCategory(null)}
          className={`group w-full text-left rounded-lg px-3 py-2.5 transition-all duration-200 relative
            ${
              isAll
                ? "bg-accent/[0.12] border border-accent/50"
                : "bg-transparent border border-transparent hover:bg-white/[0.04] hover:border-white/10"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <span
              className={`font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] ${
                isAll ? "text-white" : "text-white/60"
              }`}
            >
              All
            </span>
            <span
              className={`font-mono text-[0.56rem] ${
                isAll ? "text-accent" : "text-white/25"
              }`}
            >
              {Object.values(counts).reduce((a, b) => a + b, 0)}
            </span>
          </div>
          {isAll && (
            <motion.div
              layoutId="toolbox-category-indicator"
              className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-accent rounded-full"
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
            />
          )}
        </button>
      </div>

      {/* Category list */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-0.5">
        {categories.map((cat) => {
          const isSelected = selectedId === cat.id;
          const count = counts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              type="button"
              aria-label={`Filter by ${cat.label}`}
              aria-pressed={isSelected}
              onClick={() => onSelectCategory(cat.id)}
              className={`group w-full text-left rounded-lg px-3 py-2.5 transition-all duration-200 relative
                ${
                  isSelected
                    ? "bg-accent/[0.12] border border-accent/50"
                    : "bg-transparent border border-transparent hover:bg-white/[0.04] hover:border-white/10"
                }
              `}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className={`font-mono text-[0.54rem] font-bold uppercase tracking-[0.2em] ${
                    isSelected ? "text-accent" : "text-white/30"
                  }`}
                >
                  {cat.index}
                </span>
                <span
                  className={`font-mono text-[0.52rem] ${
                    isSelected ? "text-accent/70" : "text-white/20"
                  }`}
                >
                  {count}
                </span>
              </div>
              <h3
                className={`font-mono text-[0.66rem] font-bold uppercase tracking-[0.1em] leading-tight ${
                  isSelected ? "text-white" : "text-white/60"
                }`}
              >
                {cat.label}
              </h3>

              {isSelected && (
                <motion.div
                  layoutId="toolbox-category-indicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
