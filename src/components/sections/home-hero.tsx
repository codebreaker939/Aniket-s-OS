"use client";

import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { StatusPanel } from "@/components/os/status-panel";
import { Button } from "@/components/ui/button";
import { StatusPill } from "@/components/ui/status-pill";
import { siteConfig } from "@/lib/constants";

export function HomeHero() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      aria-labelledby="home-title"
      className="grid min-h-[calc(100svh-5.5rem)] content-center gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-12"
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      transition={reduceMotion ? undefined : { duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="border border-border bg-surface/70 p-5 shadow-shell sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <StatusPill tone="accent">Aniket OS</StatusPill>
          <StatusPill>Engineering Lab</StatusPill>
        </div>

        <p className="font-mono text-xs font-medium uppercase tracking-normal text-accent">{siteConfig.name}</p>
        <h1 id="home-title" className="mt-4 max-w-4xl text-5xl font-semibold tracking-normal text-foreground sm:text-6xl lg:text-7xl">
          Aniket Rai
        </h1>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-normal text-muted-foreground">
          <span>B.Tech CSE Student</span>
          <span aria-hidden="true" className="text-border">/</span>
          <span>Full-Stack Developer</span>
          <span aria-hidden="true" className="text-border">/</span>
          <span>Exploring AI/ML</span>
        </div>

        <p className="mt-8 max-w-2xl text-balance text-xl leading-8 text-muted-foreground">
          I build web applications and backend systems, and I&apos;m currently building my foundation in AI/ML.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#workspace">
              Enter Workspace
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/resume">
              View Resume
              <FileText aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <StatusPanel />
    </motion.section>
  );
}
