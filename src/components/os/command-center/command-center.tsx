"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { searchCommandItems } from "@/lib/search";
import type { CommandItem } from "@/lib/search/command-data";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import { desktopIconMap } from "@/components/os/icon-registry";
import { Search, X, CornerDownLeft, ArrowDown, ArrowUp, Sparkles, Clock } from "lucide-react";

type CommandCenterProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CommandCenter({ isOpen, onClose }: CommandCenterProps) {
  const windowManager = useOptionalWindowManager();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentItems, setRecentItems] = useState<CommandItem[]>([]);

  const results = searchCommandItems(query);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Reset index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const selectedEl = resultsContainerRef.current.children[selectedIndex] as HTMLElement;
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Execute selected item action
  const handleExecute = (item: CommandItem) => {
    // Add to recent items (max 4, no duplicates)
    setRecentItems((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      return [item, ...filtered].slice(0, 4);
    });

    onClose();

    if (item.appId && windowManager) {
      windowManager.openApp(item.appId);
      if (item.labId) {
        // Dispatch lab experiment selection event
        window.dispatchEvent(
          new CustomEvent("os:select-lab-experiment", { detail: { labId: item.labId } })
        );
      }
    } else if (item.externalUrl) {
      window.open(item.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Keyboard navigation & Shortcuts inside modal
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = results[selectedIndex];
      if (item) {
        handleExecute(item);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Spotlight Command Palette"
        className="fixed inset-0 z-[200] flex items-start justify-center pt-14 sm:pt-20 p-4 bg-slate-950/75 backdrop-blur-md select-none"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-xl max-h-[78vh] flex flex-col rounded-2xl border border-white/15 bg-slate-950/95 text-white shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_24px_rgba(94,210,186,0.1)] overflow-hidden"
        >
          {/* Header Search Input Bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.03]">
            <Search className="h-4 w-4 text-accent shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search Aniket OS... (Apps, Lab Experiments, Stack, Actions)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white placeholder:text-white/35 outline-none"
              aria-label="Search Aniket OS"
            />

            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.6rem] font-bold text-accent px-1.5 py-0.5 rounded border border-accent/30 bg-accent/10">
                ⌘K
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-1 rounded text-white/40 hover:text-white transition-colors"
                aria-label="Close search"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Body: Recent Items or Results List */}
          <div className="flex-1 overflow-y-auto p-2 no-scrollbar min-h-[16rem]">
            {/* Show Recent Items if query is empty and recentItems exist */}
            {!query && recentItems.length > 0 && (
              <div className="mb-3 px-2 pt-1 space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[0.56rem] font-bold text-accent uppercase tracking-widest">
                  <Clock className="h-3 w-3" />
                  <span>Recently Opened</span>
                </div>
                <div className="space-y-1 pt-1">
                  {recentItems.map((rec) => (
                    <CommandItemRow
                      key={`rec-${rec.id}`}
                      item={rec}
                      isSelected={false}
                      onSelect={() => handleExecute(rec)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Results Count Header */}
            <div className="px-2 pb-1 flex items-center justify-between font-mono text-[0.56rem] text-white/40 uppercase tracking-wider">
              <span>{query ? `Search Results (${results.length})` : "All Commands & Apps"}</span>
              {results.length > 0 && <span>Selected: {selectedIndex + 1} / {results.length}</span>}
            </div>

            {/* Empty State */}
            {results.length === 0 ? (
              <div className="p-8 text-center space-y-2 font-mono">
                <Sparkles className="h-5 w-5 text-white/30 mx-auto" />
                <p className="text-xs text-white/60 font-bold uppercase">No matching results</p>
                <p className="text-[0.68rem] text-white/40">
                  Try searching for &quot;LockSync&quot;, &quot;Python&quot;, &quot;Resume&quot;, or &quot;Engineering Lab&quot;
                </p>
              </div>
            ) : (
              <div ref={resultsContainerRef} className="space-y-1">
                {results.map((item, idx) => (
                  <CommandItemRow
                    key={item.id}
                    item={item}
                    isSelected={idx === selectedIndex}
                    onSelect={() => handleExecute(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer Keyboard Hints */}
          <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/10 bg-white/[0.02] font-mono text-[0.6rem] text-white/40">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/10 border border-white/15 text-[0.55rem] font-bold text-white/80">
                  <ArrowUp className="h-2.5 w-2.5 inline" />
                  <ArrowDown className="h-2.5 w-2.5 inline" />
                </kbd>
                Navigate
              </span>

              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/10 border border-white/15 text-[0.55rem] font-bold text-white/80">
                  <CornerDownLeft className="h-2.5 w-2.5 inline" />
                </kbd>
                Open
              </span>

              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded bg-white/10 border border-white/15 text-[0.55rem] font-bold text-white/80">
                  ESC
                </kbd>
                Close
              </span>
            </div>

            <span className="text-accent/80 font-bold hidden sm:inline">ANIKET OS COMMAND</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ─── Command Item Row Component ─────────────────────────── */

function CommandItemRow({
  item,
  isSelected,
  onSelect,
  onMouseEnter,
}: {
  item: CommandItem;
  isSelected: boolean;
  onSelect: () => void;
  onMouseEnter?: () => void;
}) {
  const IconComp = desktopIconMap[item.iconName] || Search;

  return (
    <button
      type="button"
      onClick={onSelect}
      onMouseEnter={onMouseEnter}
      className={`w-full text-left rounded-xl px-3 py-2 flex items-center justify-between gap-3 transition-all ${
        isSelected
          ? "bg-accent/15 border border-accent/40 text-white shadow-sm"
          : "border border-transparent hover:bg-white/[0.04] text-white/80"
      }`}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg border shrink-0 transition-colors ${
            isSelected
              ? "border-accent/40 bg-accent/20 text-accent"
              : "border-white/10 bg-white/5 text-white/60"
          }`}
        >
          <IconComp className="h-4 w-4" />
        </div>

        <div className="min-w-0 space-y-0.5">
          <h4 className="font-semibold text-xs text-white truncate">
            {item.title}
          </h4>
          <p className="text-[0.68rem] text-white/55 truncate">
            {item.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0 font-mono text-[0.58rem]">
        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/40 uppercase">
          {item.category}
        </span>
        {isSelected && (
          <CornerDownLeft className="h-3 w-3 text-accent animate-pulse" />
        )}
      </div>
    </button>
  );
}
