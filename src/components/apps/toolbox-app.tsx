"use client";

import { useState, useMemo } from "react";
import { toolCategories, toolsData } from "@/lib/toolbox-data";
import { ToolboxCategories } from "./toolbox/toolbox-categories";
import { ToolboxInventory } from "./toolbox/toolbox-inventory";
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
      {/* Application Sub-Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-accent" />
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              TOOLBOX
            </h2>
            <p className="text-[0.68rem] text-white/60">
              Technical Stack / Working Knowledge
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[0.62rem] text-white/40 uppercase tracking-widest border border-white/10 px-2.5 py-1 rounded">
          <Layers className="h-3 w-3 text-accent" />
          <span>{toolsData.length} TOOLS</span>
        </div>
      </div>

      {/* Two-Panel Body */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[14rem_1fr] lg:grid-cols-[15.5rem_1fr] gap-4 min-h-[28rem]">
        {/* Left Panel: Categories */}
        <div
          className={`md:block border-r border-white/10 pr-0 md:pr-4 ${
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
          className={`flex flex-col min-h-0 ${
            showMobileInventory ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile Back */}
          {showMobileInventory && (
            <div className="md:hidden mb-3 pb-2 border-b border-white/10">
              <button
                type="button"
                onClick={() => setShowMobileInventory(false)}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-white transition-colors"
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
