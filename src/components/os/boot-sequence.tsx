"use client";

import { useEffect, useReducer, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, Cpu } from "lucide-react";

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
  const reduceMotion = useReducedMotion();
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
      initial={reduceMotion ? false : { opacity: 0, filter: "blur(8px)" }}
      animate={reduceMotion ? undefined : { opacity: 1, filter: "blur(0px)" }}
      exit={reduceMotion ? undefined : { opacity: 0, scale: 0.985, filter: "blur(8px)" }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center power-screen-bg"
    >
      <div aria-hidden="true" className="absolute inset-0 power-screen-atmosphere" />
      <div aria-hidden="true" className="absolute inset-0 power-screen-vignette" />
      <div aria-hidden="true" className="desktop-grain absolute inset-0 opacity-20" />

      <div
        className="os-surface-3 relative z-10 flex w-[min(24rem,88vw)] flex-col gap-6 rounded-2xl px-8 py-8"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="os-meta text-accent-mint/70">Activation</p>
            <h2 className="mt-1 text-xl font-semibold text-white">ANIKET OS</h2>
          </div>
          <motion.div
            animate={reduceMotion ? undefined : { opacity: [0.58, 1, 0.58], scale: [0.98, 1.03, 0.98] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent-mint/24 bg-accent-mint/10 text-accent-mint"
          >
            <Cpu className="h-4 w-4" />
          </motion.div>
        </div>

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
                    className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.026] px-3 py-2"
                  >
                    <Check className="h-3 w-3 shrink-0 text-accent-mint" aria-hidden="true" />
                    <span className="text-xs text-white/70">
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
              className="mt-1 rounded-lg border border-accent-mint/20 bg-accent-mint/[0.08] px-3 py-2"
            >
              <p className="font-mono text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-accent-mint">
                Desktop emergence ready
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Skip button */}
        <button
          type="button"
          onClick={skip}
          className="mt-1 self-end font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white/24 transition-colors hover:text-white/[0.58] focus-visible:outline-none focus-visible:text-accent-mint"
          aria-label="Skip boot sequence"
        >
          Skip →
        </button>
      </div>
    </motion.div>
  );
}
