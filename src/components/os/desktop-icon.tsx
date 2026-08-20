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

function iconTone(app: DesktopApp) {
  switch (app.id) {
    case "engineering-lab":
      return {
        icon: "text-accent-lavender",
        glowBg: "bg-accent-lavender/18",
        glow: "shadow-[0_0_28px_rgba(178,164,255,0.20)]",
        active: "border-accent-lavender/46 bg-accent-lavender/[0.14]",
      };
    case "github":
      return {
        icon: "text-semantic-info",
        glowBg: "bg-semantic-info/16",
        glow: "shadow-[0_0_28px_rgba(151,172,255,0.18)]",
        active: "border-semantic-info/44 bg-semantic-info/[0.12]",
      };
    case "projects":
    case "toolbox":
      return {
        icon: "text-accent-mint",
        glowBg: "bg-accent-mint/16",
        glow: "shadow-[0_0_28px_rgba(96,224,202,0.18)]",
        active: "border-accent-mint/44 bg-accent-mint/[0.12]",
      };
    case "contact":
      return {
        icon: "text-accent-copper",
        glowBg: "bg-accent-copper/16",
        glow: "shadow-[0_0_28px_rgba(213,145,94,0.16)]",
        active: "border-accent-copper/42 bg-accent-copper/[0.12]",
      };
    default:
      return {
        icon: "text-white/88",
        glowBg: "bg-white/12",
        glow: "shadow-[0_0_24px_rgba(255,255,255,0.10)]",
        active: "border-white/26 bg-white/[0.08]",
      };
  }
}

export function DesktopIcon({ app, selected, isOpen = false, onSelect, onOpen }: DesktopIconProps) {
  const reduceMotion = useReducedMotion();
  const Icon = desktopIconMap[app.icon];
  const tone = iconTone(app);

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
        "group relative flex w-full min-w-0 flex-col items-center gap-1.5 rounded-lg px-1.5 py-1.5 text-center text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mint",
        selected
          ? "bg-slate-950/[0.28] ring-1 ring-white/[0.12] shadow-[0_12px_32px_rgba(0,0,0,0.28)]"
          : "hover:bg-white/[0.028]"
      )}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      onClick={handleClick}
      onDoubleClick={() => onOpen(app)}
      onKeyDown={handleKeyDown}
    >
      <div className="relative flex h-12 w-12 items-center justify-center">
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-lg opacity-0 blur-xl transition-opacity duration-200 group-hover:opacity-100",
            tone.glowBg,
          )}
        />
        <span
          className={cn(
            "relative flex h-12 w-12 items-center justify-center rounded-lg border border-white/[0.12] bg-slate-950/[0.30] text-white/90 shadow-[0_16px_32px_rgba(0,0,0,0.30),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl transition-all duration-200 group-hover:border-white/[0.22] group-hover:bg-white/[0.075]",
            tone.icon,
            selected && tone.active,
            (selected || isOpen) && tone.glow
          )}
        >
          <Icon aria-hidden="true" className="h-6 w-6 transition-transform duration-200 group-hover:scale-105" />
        </span>

        {/* Active Open Window Dot Indicator */}
        {isOpen && (
          <span className="absolute -bottom-1 h-1.5 w-5 rounded-full bg-accent-mint shadow-[0_0_10px_rgba(96,224,202,0.85)]" />
        )}
      </div>

      <span
        className={cn(
          "max-w-full truncate rounded px-1.5 py-0.5 text-[0.62rem] font-medium leading-tight tracking-normal text-white/82 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-colors",
          selected
            ? "bg-slate-950/[0.64] text-white font-semibold"
            : "bg-slate-950/[0.18] text-white/72 group-hover:bg-slate-950/46 group-hover:text-white"
        )}
      >
        {app.label}
      </span>
    </motion.button>
  );
}
