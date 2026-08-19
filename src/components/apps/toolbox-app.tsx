"use client";

import { useState, useMemo } from "react";
import { toolCategories, toolsData } from "@/lib/toolbox-data";
import { ToolboxCategories } from "./toolbox/toolbox-categories";
import { ToolboxInventory } from "./toolbox/toolbox-inventory";
import { AppHeader, StatusBadge } from "@/components/ui/os-primitives";
import { Wrench, ArrowLeft, Layers } from "lucide-react";

export function ToolboxApp() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileInventory, setShowMobileInventory] = useState(false);

  // Count tools per category for the sidebar
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of toolCategories) {
      counts[cat.id] = toolsData.filter((t) => t.category === cat.id).length;
    }
    return counts;
  }, []);

  const handleSelectCategory = (id: string | null) => {
    setSelectedCategory(id);
    setShowMobileInventory(true);
  };

  return (
    <div className="flex flex-col h-full space-y-4 text-white">
      <AppHeader
        icon={Wrench}
        title="Toolbox"
        eyebrow="System Utility"
        description="Technical stack, working knowledge, and tools grouped for inspection."
        variant="technical"
        status={<StatusBadge tone="neutral">{toolsData.length} Tools</StatusBadge>}
        meta={
          <span className="hidden items-center gap-2 font-mono text-[0.62rem] uppercase tracking-widest text-white/40 sm:flex">
            <Layers className="h-3 w-3 text-accent-mint" />
            Inventory
          </span>
        }
      />

      {/* Two-Panel Body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[14rem_1fr] lg:grid-cols-[15.5rem_1fr] gap-4 min-h-[28rem]">
        {/* Left Panel: Categories */}
        <div
          className={`md:block rounded-xl border border-white/10 bg-white/[0.018] p-3 md:border-r md:bg-transparent md:p-0 md:pr-4 ${
            showMobileInventory ? "hidden md:block" : "block"
          }`}
        >
          <ToolboxCategories
            categories={toolCategories}
            selectedId={selectedCategory}
            counts={categoryCounts}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Right Panel: Inventory */}
        <div
          className={`os-panel os-panel-technical flex flex-col min-h-0 rounded-xl p-3 ${
            showMobileInventory ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile Back */}
          {showMobileInventory && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileInventory(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-mint hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Categories</span>
              </button>
            </div>
          )}

          <ToolboxInventory
            tools={toolsData}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>
    </div>
  );
}
