"use client";

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

export function Dock({
  activeWindow,
  openWindows = [],
  minimizedWindows = [],
  onOpenWindow,
  onMinimizeWindow
}: DockProps) {
  return (
    <>
      {/* Desktop Dock */}
      <nav aria-label="Desktop dock" className="pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-center md:flex">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="os-surface-1 pointer-events-auto flex items-end gap-1.5 rounded-2xl px-3 py-2"
        >
          {dockApps.map((app) => {
            const isOpen = openWindows.includes(app.id) || activeWindow === app.id;
            const isMinimized = minimizedWindows.includes(app.id);
            const isFocused = activeWindow === app.id && !isMinimized;
            return (
              <DockItem
                key={app.id}
                app={app}
                isOpen={isOpen}
                isMinimized={isMinimized}
                isFocused={isFocused}
                onOpenWindow={onOpenWindow}
                onMinimizeWindow={onMinimizeWindow}
              />
            );
          })}
        </motion.div>
      </nav>

      {/* Mobile Workspace Dock */}
      <nav aria-label="Mobile workspace dock" className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <div className="os-surface-1 flex gap-2 overflow-x-auto rounded-2xl px-2.5 py-2 no-scrollbar">
          {dockApps.map((app) => {
            const isOpen = openWindows.includes(app.id) || activeWindow === app.id;
            const isMinimized = minimizedWindows.includes(app.id);
            const isFocused = activeWindow === app.id && !isMinimized;
            return (
              <DockItem
                key={app.id}
                app={app}
                isOpen={isOpen}
                isMinimized={isMinimized}
                isFocused={isFocused}
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
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  compact?: boolean;
  onOpenWindow: (id: DesktopAppId) => void;
  onMinimizeWindow?: (id: DesktopAppId) => void;
};

function DockItem({
  app,
  isOpen,
  isMinimized,
  isFocused,
  compact = false,
  onOpenWindow,
  onMinimizeWindow
}: DockItemProps) {
  const reduceMotion = useReducedMotion();
  const Icon = desktopIconMap[app.icon];

  const handleClick = () => {
    if (isFocused && onMinimizeWindow) {
      onMinimizeWindow(app.id);
    } else {
      onOpenWindow(app.id);
    }
  };

  const itemClassName = cn(
    "group relative flex shrink-0 items-center justify-center rounded-xl border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mint",
    isFocused
      ? "border-accent-mint/[0.55] bg-accent-mint/[0.18] text-accent-mint shadow-[0_0_22px_rgba(96,224,202,0.26)]"
      : isOpen
        ? isMinimized
          ? "border-white/14 bg-white/[0.06] text-white/[0.55]"
          : "border-white/[0.18] bg-white/[0.10] text-white"
        : "border-white/10 bg-white/[0.040] text-white/75 hover:border-accent-mint/30 hover:bg-white/[0.085] hover:text-accent-mint",
    compact ? "h-11 w-11" : "h-12 w-12"
  );

  return (
    <motion.div
      className="relative"
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -8, scale: 1.13 }}
      whileTap={reduceMotion ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        aria-label={`Open ${app.label}`}
        className={itemClassName}
        onClick={handleClick}
      >
        <Icon aria-hidden="true" className={cn("transition-transform duration-200", compact ? "h-5 w-5" : "h-6 w-6")} />

        {/* Active / Minimized Dot Indicator */}
        {isOpen && (
          <span
            aria-hidden="true"
            className={cn(
              "absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full transition-all duration-200",
              isFocused
                ? "h-1.5 w-5 bg-accent-mint shadow-[0_0_10px_rgba(96,224,202,0.85)]"
                : isMinimized
                  ? "h-1.5 w-1.5 bg-white/40"
                  : "h-1.5 w-1.5 bg-white/80"
            )}
          />
        )}

        {/* Tooltip */}
        {!compact && (
          <div className="pointer-events-none absolute bottom-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 flex flex-col items-center opacity-0 transition-all duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:-translate-y-1">
            <span className="whitespace-nowrap rounded-md border border-white/[0.15] bg-surface-3/95 px-2.5 py-1 text-[0.7rem] font-medium text-white/95 shadow-os-widget backdrop-blur-xl">
              {app.label}
            </span>
            <span className="h-1 w-2 border-x-4 border-t-4 border-x-transparent border-t-slate-950/90" />
          </div>
        )}
      </button>
    </motion.div>
  );
}
