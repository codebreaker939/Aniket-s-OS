"use client";

import { Minus, Maximize2, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type DesktopWindowPosition = Partial<Record<"top" | "right" | "bottom" | "left", string | number>>;
type DesktopWindowSize = Partial<Record<"width" | "height" | "minWidth" | "maxWidth" | "maxHeight", string | number>>;

export type DesktopWindowProps = {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  toolbar?: ReactNode;
  defaultPosition?: DesktopWindowPosition;
  defaultSize?: DesktopWindowSize;
  state?: "active" | "inactive";
  zIndex?: number;
  isMaximized?: boolean;
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onFocus?: () => void;
};

export function DesktopWindow({
  title,
  icon,
  children,
  toolbar,
  defaultPosition,
  defaultSize,
  state = "active",
  zIndex,
  isMaximized = false,
  className,
  onClose,
  onMinimize,
  onMaximize,
  onFocus
}: DesktopWindowProps) {
  const reduceMotion = useReducedMotion();

  // Dynamically clamp max-height based on window top offset to prevent extending below usable viewport
  const topOffset = defaultPosition?.top ? String(defaultPosition.top) : "4.5rem";
  const style: CSSProperties = {
    ...defaultPosition,
    ...defaultSize,
    maxHeight: isMaximized ? undefined : `calc(100dvh - ${topOffset} - 5.5rem)`,
    zIndex
  };

  return (
    <motion.section
      aria-label={title}
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-white/16 bg-slate-950/85 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-all duration-200 min-h-[16rem]",
        state === "inactive" && "opacity-85 border-white/10 shadow-lg",
        isMaximized
          ? "!fixed !inset-x-3 !top-11 !bottom-20 !w-auto !h-auto !max-w-none !max-h-none z-40"
          : "max-h-[calc(100dvh-7rem)] max-w-[calc(100vw-2rem)]",
        className
      )}
      style={isMaximized ? { zIndex } : style}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onClick={onFocus}
    >
      {/* Fixed Title Bar */}
      <div className="group flex h-9 shrink-0 items-center justify-between border-b border-white/10 bg-white/[0.05] px-3 select-none">
        {/* Left: Window Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Close ${title}`}
              className="group/btn flex h-3 w-3 items-center justify-center rounded-full bg-rose-500/80 transition-colors hover:bg-rose-500 border border-rose-400/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-rose-400"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
            >
              <X aria-hidden="true" className="h-2 w-2 text-rose-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
            <button
              type="button"
              aria-label={`Minimize ${title}`}
              className="group/btn flex h-3 w-3 items-center justify-center rounded-full bg-amber-500/80 transition-colors hover:bg-amber-500 border border-amber-400/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize?.();
              }}
            >
              <Minus aria-hidden="true" className="h-2 w-2 text-amber-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
            <button
              type="button"
              aria-label={`Maximize ${title}`}
              className="group/btn flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500/80 transition-colors hover:bg-emerald-500 border border-emerald-400/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-400"
              onClick={(e) => {
                e.stopPropagation();
                onMaximize?.();
              }}
            >
              <Maximize2 aria-hidden="true" className="h-2 w-2 text-emerald-950 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
            </button>
          </div>
          {icon && <span className="ml-1 text-accent/80">{icon}</span>}
        </div>

        {/* Center: Title */}
        <div className="min-w-0 truncate text-center font-mono text-xs font-semibold text-white/85 tracking-tight">
          {title}
        </div>

        {/* Right Spacer / Controls balance */}
        <div className="w-12" aria-hidden="true" />
      </div>

      {/* Optional Fixed Toolbar */}
      {toolbar ? <div className="shrink-0 border-b border-white/8 bg-slate-950/40 px-3.5 py-1.5">{toolbar}</div> : null}

      {/* Primary Scrollable Content Area */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col">{children}</div>
    </motion.section>
  );
}
