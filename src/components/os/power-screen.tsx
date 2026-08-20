"use client";

import { motion, useReducedMotion } from "motion/react";
import { useOSLifecycle } from "./os-lifecycle";
import { Power } from "lucide-react";
import { personalProfile } from "@/lib/profile-content";

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
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 10 }}
        animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="power-profile-card relative z-10 w-[min(25rem,88vw)] px-7 py-7 text-center sm:px-8 sm:py-8"
      >
        <div className="space-y-3">
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-accent-mint/72">
            {personalProfile.osName}
          </p>
          <h1 className="os-text-display text-4xl font-semibold leading-none text-white sm:text-5xl">
            {personalProfile.name.toUpperCase()}
          </h1>
          <p className="text-sm font-medium text-white/72">
            {personalProfile.education} · {personalProfile.role}
          </p>
          <p className="text-sm text-accent-lavender/86">
            {personalProfile.focus}
          </p>
        </div>

        <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

        <div className="space-y-2">
          <p className="text-lg font-semibold text-white">{personalProfile.osName}</p>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/38">
            Personal Developer Workspace
          </p>
        </div>

        <motion.button
          type="button"
          onClick={powerOn}
          whileHover={reduceMotion ? undefined : { scale: 1.025, y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.975 }}
          className="mx-auto mt-7 flex min-h-11 items-center gap-2.5 rounded-full border border-accent-mint/36 bg-accent-mint/12 px-8 py-3 font-mono text-xs font-semibold uppercase tracking-[0.16em] text-accent-mint shadow-[0_0_28px_rgba(96,224,202,0.10)] transition-all duration-200 hover:border-accent-mint/60 hover:bg-accent-mint/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-mint"
          aria-label="Power on Aniket OS"
        >
          <Power className="h-3.5 w-3.5" />
          Power On
        </motion.button>

        <p className="mt-5 font-mono text-[0.56rem] uppercase tracking-[0.16em] text-white/26">
          System ready
        </p>
      </motion.div>
    </div>
  );
}
