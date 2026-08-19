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
        "group relative flex w-24 flex-col items-center gap-1.5 rounded-lg p-2 text-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mint",
        selected
          ? "bg-white/[0.075] ring-1 ring-accent-mint/[0.22] shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
          : "hover:bg-white/[0.035]"
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
      <div className="relative flex h-12 w-12 items-center justify-center">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.12] bg-surface-1/[0.46] text-white/90 shadow-os-widget backdrop-blur-xl transition-all duration-200 group-hover:border-accent-mint/40 group-hover:bg-white/[0.070] group-hover:text-accent-mint group-hover:shadow-[0_16px_34px_rgba(0,0,0,0.42)]",
            selected && "border-accent-mint/[0.55] bg-accent-mint/14 text-accent-mint shadow-[0_0_24px_rgba(96,224,202,0.22)]",
            isOpen && "border-accent-mint/34"
          )}
        >
          <Icon aria-hidden="true" className="h-6 w-6" />
        </span>

        {/* Active Open Window Dot Indicator */}
        {isOpen && (
          <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-accent-mint shadow-[0_0_8px_rgba(96,224,202,0.8)]" />
        )}
      </div>

      <span
        className={cn(
          "max-w-22 truncate rounded px-1.5 py-0.5 text-[0.68rem] font-medium tracking-tight text-white/85 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-colors",
          selected
            ? "bg-slate-950/[0.58] text-white font-semibold"
            : "bg-slate-950/[0.24] text-white/75 group-hover:bg-slate-950/50 group-hover:text-white"
        )}
      >
        {app.label}
      </span>
    </motion.button>
  );
}
