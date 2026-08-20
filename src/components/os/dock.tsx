"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { desktopIconMap } from "@/components/os/icon-registry";
import { dockApps } from "@/data/desktop";
import { cn } from "@/lib/utils";
import type { DesktopAppId, DockApp } from "@/types";

type DockProps = {
  activeWindow: DesktopAppId | null;
  openWindows?: DesktopAppId[];
  minimizedWindows?: DesktopAppId[];
  onOpenWindow: (id: DesktopAppId) => void;
  onMinimizeWindow?: (id: DesktopAppId) => void;
};

function dockTone(appId: DesktopAppId) {
  if (appId === "engineering-lab") return "text-accent-lavender";
  if (appId === "github") return "text-semantic-info";
  if (appId === "projects" || appId === "toolbox") return "text-accent-mint";
  if (appId === "contact") return "text-accent-copper";
  if (appId === "terminal" || appId === "settings") return "text-white/86";
  return "text-white/76";
}

function proximityScale(index: number, hoveredIndex: number | null) {
  if (hoveredIndex === null) return 1;
  const distance = Math.abs(index - hoveredIndex);
  if (distance === 0) return 1.18;
  if (distance === 1) return 1.08;
  if (distance === 2) return 1.03;
  return 1;
}

export function Dock({
  activeWindow,
  openWindows = [],
  minimizedWindows = [],
  onOpenWindow,
  onMinimizeWindow,
}: DockProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <>
      <nav
        aria-label="Desktop dock"
        className="pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-center md:flex"
      >
        <motion.div
          initial={{ y: 24, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="desktop-dock-shell pointer-events-auto flex items-end gap-1.5 px-2.5 py-2"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {dockApps.map((app, index) => {
            const isOpen = openWindows.includes(app.id) || activeWindow === app.id;
            const isMinimized = minimizedWindows.includes(app.id);
            const isFocused = activeWindow === app.id && !isMinimized;
            return (
              <DockItem
                key={app.id}
                app={app}
                index={index}
                hoveredIndex={hoveredIndex}
                isOpen={isOpen}
                isMinimized={isMinimized}
                isFocused={isFocused}
                onHover={setHoveredIndex}
                onOpenWindow={onOpenWindow}
                onMinimizeWindow={onMinimizeWindow}
              />
            );
          })}
        </motion.div>
      </nav>

      <nav aria-label="Mobile workspace dock" className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <div className="desktop-dock-shell flex gap-2 overflow-x-auto px-2.5 py-2 no-scrollbar">
          {dockApps.map((app) => {
            const isOpen = openWindows.includes(app.id) || activeWindow === app.id;
            const isMinimized = minimizedWindows.includes(app.id);
            const isFocused = activeWindow === app.id && !isMinimized;
            return (
              <DockItem
                key={app.id}
                app={app}
                index={0}
                hoveredIndex={null}
                isOpen={isOpen}
                isMinimized={isMinimized}
                isFocused={isFocused}
                onHover={() => undefined}
                onOpenWindow={onOpenWindow}
                onMinimizeWindow={onMinimizeWindow}
                compact
              />
            );
          })}
        </div>
      </nav>
    </>
  );
}

type DockItemProps = {
  app: DockApp;
  index: number;
  hoveredIndex: number | null;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  compact?: boolean;
  onHover: (index: number | null) => void;
  onOpenWindow: (id: DesktopAppId) => void;
  onMinimizeWindow?: (id: DesktopAppId) => void;
};

function DockItem({
  app,
  index,
  hoveredIndex,
  isOpen,
  isMinimized,
  isFocused,
  compact = false,
  onHover,
  onOpenWindow,
  onMinimizeWindow,
}: DockItemProps) {
  const reduceMotion = useReducedMotion();
  const Icon = desktopIconMap[app.icon];
  const scale = reduceMotion || compact ? 1 : proximityScale(index, hoveredIndex);
  const lift = reduceMotion || compact ? 0 : hoveredIndex === index ? -10 : isFocused ? -5 : 0;

  const handleClick = () => {
    if (isFocused && onMinimizeWindow) {
      onMinimizeWindow(app.id);
    } else {
      onOpenWindow(app.id);
    }
  };

  return (
    <motion.div
      className="relative"
      animate={{ scale, y: lift }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => onHover(index)}
    >
      <button
        type="button"
        aria-label={`Open ${app.label}`}
        className={cn(
          "group relative flex shrink-0 items-center justify-center rounded-lg border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mint",
          compact ? "h-11 w-11" : "h-12 w-12",
          isFocused
            ? "border-accent-mint/45 bg-accent-mint/[0.15] text-accent-mint shadow-[0_0_24px_rgba(96,224,202,0.24)]"
            : isOpen
              ? isMinimized
                ? "border-white/12 bg-white/[0.04] text-white/48"
                : "border-white/18 bg-white/[0.08] text-white"
              : "border-white/10 bg-white/[0.035] text-white/68 hover:border-white/20 hover:bg-white/[0.075]",
        )}
        onClick={handleClick}
      >
        <Icon aria-hidden="true" className={cn("transition-colors duration-200", compact ? "h-5 w-5" : "h-6 w-6", dockTone(app.id))} />

        {isFocused && (
          <span
            aria-hidden="true"
            className="desktop-dock-active-light absolute -bottom-2 left-1/2 h-1.5 w-7 -translate-x-1/2 rounded-full bg-accent-mint"
          />
        )}

        {isOpen && !isFocused && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -bottom-1 left-1/2 h-1.5 -translate-x-1/2 rounded-full",
              isMinimized ? "w-1.5 bg-white/36" : "w-3 bg-white/70"
            )}
          />
        )}

        {!compact && (
          <span className="pointer-events-none absolute bottom-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 rounded-md border border-white/[0.14] bg-slate-950/88 px-2.5 py-1 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.08em] text-white/88 opacity-0 shadow-[0_14px_30px_rgba(0,0,0,0.42)] backdrop-blur-xl transition-all duration-150 group-hover:-translate-y-1 group-hover:opacity-100 group-focus-visible:opacity-100">
            {app.label}
          </span>
        )}
      </button>
    </motion.div>
  );
}
