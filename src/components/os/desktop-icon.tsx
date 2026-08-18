"use client";

import { motion, useReducedMotion } from "motion/react";
import type { KeyboardEvent } from "react";

import { desktopIconMap } from "@/components/os/icon-registry";
import { cn } from "@/lib/utils";
import type { DesktopApp } from "@/types";

type DesktopIconProps = {
  app: DesktopApp;
  selected: boolean;
  isOpen?: boolean;
  onSelect: (id: DesktopApp["id"]) => void;
  onOpen: (app: DesktopApp) => void;
};

export function DesktopIcon({ app, selected, isOpen = false, onSelect, onOpen }: DesktopIconProps) {
  const reduceMotion = useReducedMotion();
  const Icon = desktopIconMap[app.icon];

  const handleClick = () => {
    if (selected) {
      onOpen(app);
    } else {
      onSelect(app.id);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(app);
    }
  };

  return (
    <motion.button
      type="button"
      aria-label={`Open ${app.title}`}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-24 flex-col items-center gap-1.5 rounded-lg p-2 text-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        selected
          ? "bg-white/12 ring-1 ring-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
          : "hover:bg-white/[0.06]"
      )}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      onClick={handleClick}
      onDoubleClick={() => onOpen(app)}
      onKeyDown={handleKeyDown}
    >
      <div className="relative flex h-13 w-13 items-center justify-center">
        <span
          className={cn(
            "flex h-13 w-13 items-center justify-center rounded-2xl border border-white/15 bg-slate-950/45 text-white/90 shadow-[0_12px_28px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl transition-all duration-200 group-hover:border-accent/50 group-hover:bg-slate-900/60 group-hover:text-accent group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.45)]",
            selected && "border-accent/60 bg-accent/15 text-accent shadow-[0_0_20px_rgba(154,209,196,0.25)]",
            isOpen && "border-accent/40"
          )}
        >
          <Icon aria-hidden="true" className="h-6 w-6" />
        </span>

        {/* Active Open Window Dot Indicator */}
        {isOpen && (
          <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(154,209,196,0.8)]" />
        )}
      </div>

      <span
        className={cn(
          "max-w-22 truncate rounded px-1.5 py-0.5 font-mono text-[0.68rem] tracking-tight font-medium text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-colors",
          selected
            ? "bg-accent/25 text-white font-semibold"
            : "bg-slate-950/40 text-white/80 group-hover:bg-slate-950/70 group-hover:text-white"
        )}
      >
        {app.label}
      </span>
    </motion.button>
  );
}

