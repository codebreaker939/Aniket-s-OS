"use client";

import { useEffect, useReducer, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";

/* ─── Boot steps (honest, browser-meaningful) ───────────── */

const BOOT_STEPS = [
  "Interface core initialized",
  "Application registry loaded",
  "Workspace configured",
  "Engineering Lab ready",
  "Source Control ready",
  "Session initialized",
] as const;

const TOTAL_DURATION_MS = 2200; // target ~2.2s total, then transition
const STEP_INTERVAL_MS = Math.floor(TOTAL_DURATION_MS / (BOOT_STEPS.length + 1));

type BootState = {
  visibleCount: number;
  phase: "steps" | "ready" | "done";
};

type BootAction =
  | { type: "NEXT_STEP" }
  | { type: "MARK_READY" }
  | { type: "MARK_DONE" };

function bootReducer(state: BootState, action: BootAction): BootState {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, visibleCount: state.visibleCount + 1 };
    case "MARK_READY":
      return { ...state, phase: "ready" };
    case "MARK_DONE":
      return { ...state, phase: "done" };
    default:
      return state;
  }
}

type BootSequenceProps = {
  onComplete: () => void;
};

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [state, dispatch] = useReducer(bootReducer, {
    visibleCount: 0,
    phase: "steps",
  });
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Tick through each step
    BOOT_STEPS.forEach((_, i) => {
      setTimeout(() => {
        dispatch({ type: "NEXT_STEP" });
      }, STEP_INTERVAL_MS * (i + 1));
    });

    // Mark ready
    setTimeout(() => {
      dispatch({ type: "MARK_READY" });
    }, STEP_INTERVAL_MS * (BOOT_STEPS.length + 1));

    // Fire completion & transition out
    setTimeout(() => {
      dispatch({ type: "MARK_DONE" });
      onCompleteRef.current();
    }, TOTAL_DURATION_MS + 500);
  }, []);

  const skip = () => {
    dispatch({ type: "MARK_DONE" });
    onCompleteRef.current();
  };

  return (
    <motion.div
      key="boot"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center power-screen-bg"
    >
      <div aria-hidden="true" className="absolute inset-0 power-screen-atmosphere" />
      <div aria-hidden="true" className="absolute inset-0 power-screen-vignette" />

      <div
        className="relative z-10 flex flex-col gap-6 rounded-2xl border border-white/10 bg-slate-950/60 px-10 py-10 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-3xl"
        style={{ minWidth: "min(340px, 90vw)" }}
      >
        {/* Powering on label */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent shadow-[0_0_8px_rgba(154,209,196,0.7)]" />
          <span className="font-mono text-[0.58rem] uppercase tracking-[0.24em] text-accent/70">
            Powering On
          </span>
        </div>

        {/* Step list */}
        <ul className="space-y-2" aria-live="polite" aria-label="Boot steps">
          {BOOT_STEPS.map((step, i) => {
            const visible = i < state.visibleCount;
            return (
              <AnimatePresence key={step}>
                {visible && (
                  <motion.li
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex items-center gap-2.5"
                  >
                    <Check className="h-3 w-3 shrink-0 text-accent" aria-hidden="true" />
                    <span className="font-mono text-[0.68rem] text-white/70">
                      {step}
                    </span>
                  </motion.li>
                )}
              </AnimatePresence>
            );
          })}
        </ul>

        {/* Ready message */}
        <AnimatePresence>
          {state.phase === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-1 border-t border-white/10 pt-3"
            >
              <p className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/80">
                ANIKET OS Ready
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button */}
        <button
          type="button"
          onClick={skip}
          className="mt-1 self-end font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white/20 hover:text-white/50 transition-colors focus-visible:outline-none focus-visible:text-accent"
          aria-label="Skip boot sequence"
        >
          Skip →
        </button>
      </div>
    </motion.div>
  );
}
