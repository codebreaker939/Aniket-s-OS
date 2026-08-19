"use client";

import { motion } from "motion/react";
import { useOSLifecycle } from "./os-lifecycle";
import { Power } from "lucide-react";

export function PowerScreen() {
  const { powerOn } = useOSLifecycle();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center power-screen-bg">
      {/* Atmospheric layers */}
      <div aria-hidden="true" className="absolute inset-0 power-screen-atmosphere" />
      <div aria-hidden="true" className="absolute inset-0 power-screen-vignette" />

      {/* Power card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center gap-8 rounded-2xl border border-white/10 bg-slate-950/60 px-10 py-12 shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-3xl sm:px-16 sm:py-14"
        style={{ minWidth: "min(380px, 90vw)" }}
      >
        {/* System indicator dot */}
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent/60 shadow-[0_0_6px_rgba(154,209,196,0.5)]" />
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.28em] text-white/30">
            Personal Engineering Workstation
          </span>
        </div>

        {/* Title block */}
        <div className="text-center space-y-2">
          <h1 className="font-mono text-4xl font-bold tracking-tight text-white">
            ANIKET OS
          </h1>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-white/25">
            System 1.0 · Ready
          </p>
        </div>

        {/* Power On button */}
        <motion.button
          type="button"
          onClick={powerOn}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center gap-2.5 rounded-xl border border-accent/30 bg-accent/10 px-8 py-3 font-mono text-sm font-bold uppercase tracking-[0.18em] text-accent shadow-[0_0_24px_rgba(154,209,196,0.12)] transition-all hover:border-accent/60 hover:bg-accent/20 hover:shadow-[0_0_32px_rgba(154,209,196,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          aria-label="Power on Aniket OS"
        >
          <Power className="h-4 w-4" />
          Power On
        </motion.button>

        {/* Footer line */}
        <p className="font-mono text-[0.52rem] uppercase tracking-[0.2em] text-white/15">
          A personal developer workstation
        </p>
      </motion.div>
    </div>
  );
}
