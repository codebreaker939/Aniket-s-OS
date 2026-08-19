"use client";

import { motion, useReducedMotion } from "motion/react";
import { useOSLifecycle } from "./os-lifecycle";
import { Power } from "lucide-react";

export function PowerScreen() {
  const { powerOn } = useOSLifecycle();
  const reduceMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center power-screen-bg">
      {/* Atmospheric layers */}
      <div aria-hidden="true" className="absolute inset-0 power-screen-atmosphere" />
      <div aria-hidden="true" className="absolute inset-0 power-screen-vignette" />
      <div aria-hidden="true" className="desktop-grain absolute inset-0 opacity-25" />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97, filter: "blur(10px)" }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex w-[min(27rem,88vw)] flex-col items-center gap-9 text-center"
      >
        <div className="relative flex h-24 w-24 items-center justify-center">
          <motion.span
            aria-hidden="true"
            animate={reduceMotion ? undefined : { opacity: [0.32, 0.74, 0.32], scale: [0.96, 1.04, 0.96] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-accent-mint/25 shadow-[0_0_42px_rgba(96,224,202,0.13)]"
          />
          <span aria-hidden="true" className="absolute inset-4 rounded-full border border-white/10 bg-white/[0.025]" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-accent-mint/30 bg-accent-mint/10 text-accent-mint shadow-[0_0_28px_rgba(96,224,202,0.16)]">
            <Power className="h-4 w-4" />
          </span>
        </div>

        <div className="space-y-3">
          <p className="os-meta text-white/30">SYSTEM 1.0</p>
          <h1 className="os-text-display text-4xl font-semibold text-white sm:text-5xl">
            ANIKET OS
          </h1>
          <p className="text-sm uppercase tracking-[0.18em] text-white/40">
            Personal Engineering Workstation
          </p>
        </div>

        <motion.button
          type="button"
          onClick={powerOn}
          whileHover={reduceMotion ? undefined : { scale: 1.025, y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.975 }}
          className="group flex min-h-11 items-center gap-2.5 rounded-full border border-accent-mint/30 bg-accent-mint/10 px-8 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-mint shadow-[0_0_28px_rgba(96,224,202,0.10)] transition-all duration-200 hover:border-accent-mint/60 hover:bg-accent-mint/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mint"
          aria-label="Power on Aniket OS"
        >
          <Power className="h-3.5 w-3.5" />
          Power On
        </motion.button>

        <p className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-white/20">
          Idle · Ready for activation
        </p>
      </motion.div>
    </div>
  );
}
