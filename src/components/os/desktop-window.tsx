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

  const topOffset = defaultPosition?.top ? String(defaultPosition.top) : "4.5rem";
  const style: CSSProperties = {
    ...defaultPosition,
    ...defaultSize,
    maxHeight: isMaximized ? undefined : `calc(100dvh - ${topOffset} - 9rem)`,
    zIndex
  };

  return (
    <motion.section
      aria-label={title}
      className={cn(
        "os-surface-2 flex min-h-[16rem] flex-col overflow-hidden rounded-xl text-white transition-[box-shadow,border-color,opacity,transform] duration-200",
        state === "active"
          ? "border-accent-mint/[0.18] shadow-os-window-focus"
          : "opacity-90 border-white/10 shadow-os-window",
        isMaximized
          ? "!fixed !inset-x-3 !top-11 !bottom-24 !w-auto !h-auto !max-w-none !max-h-none z-40"
          : "max-h-[calc(100dvh-10rem)] max-w-[calc(100vw-2rem)]",
        className
      )}
      style={isMaximized ? { zIndex } : style}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 10 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      onClick={onFocus}
    >
      <div className="group flex h-10 shrink-0 items-center justify-between border-b border-white/10 bg-gradient-to-r from-white/[0.075] via-white/[0.035] to-white/[0.015] px-3 select-none">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Close ${title}`}
              className="group/btn flex h-5 w-5 items-center justify-center rounded-full border border-semantic-error/40 bg-semantic-error/70 transition-all hover:bg-semantic-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-error"
              onClick={(e) => {
                e.stopPropagation();
                onClose?.();
              }}
            >
              <X aria-hidden="true" className="h-2.5 w-2.5 text-slate-950 opacity-0 transition-opacity group-hover/btn:opacity-100" />
            </button>
            <button
              type="button"
              aria-label={`Minimize ${title}`}
              className="group/btn flex h-5 w-5 items-center justify-center rounded-full border border-semantic-attention/40 bg-semantic-attention/70 transition-all hover:bg-semantic-attention focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-semantic-attention"
              onClick={(e) => {
                e.stopPropagation();
                onMinimize?.();
              }}
            >
              <Minus aria-hidden="true" className="h-2.5 w-2.5 text-slate-950 opacity-0 transition-opacity group-hover/btn:opacity-100" />
            </button>
            <button
              type="button"
              aria-label={`Maximize ${title}`}
              className="group/btn flex h-5 w-5 items-center justify-center rounded-full border border-accent-mint/40 bg-accent-mint/70 transition-all hover:bg-accent-mint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mint"
              onClick={(e) => {
                e.stopPropagation();
                onMaximize?.();
              }}
            >
              <Maximize2 aria-hidden="true" className="h-2.5 w-2.5 text-slate-950 opacity-0 transition-opacity group-hover/btn:opacity-100" />
            </button>
          </div>
          {icon && <span className="ml-1 text-accent-mint/80">{icon}</span>}
        </div>

        <div className="min-w-0 truncate text-center text-xs font-semibold tracking-[0.02em] text-white/85">
          {title}
        </div>

        <div className="w-12" aria-hidden="true" />
      </div>

      {toolbar ? <div className="shrink-0 border-b border-white/10 bg-surface-1/[0.45] px-3.5 py-1.5">{toolbar}</div> : null}

      <div className="custom-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto p-4">{children}</div>
    </motion.section>
  );
}
