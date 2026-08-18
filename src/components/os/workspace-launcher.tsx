"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { desktopIconMap } from "@/components/os/icon-registry";
import { StatusPill } from "@/components/ui/status-pill";
import { desktopApps } from "@/data/desktop";

const statusLabel = {
  ready: "Ready",
  building: "Building",
  planned: "Planned"
} as const;

export function WorkspaceLauncher() {
  const reduceMotion = useReducedMotion();

  return (
    <section aria-labelledby="workspace-launcher-title" className="border border-border bg-surface/[0.78] shadow-shell">
      <div className="flex flex-col gap-3 border-b border-border px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-normal text-accent">Workspace</p>
          <h2 id="workspace-launcher-title" className="mt-1 text-lg font-semibold text-foreground">
            Launch Surface
          </h2>
        </div>
        <div className="font-mono text-[0.68rem] uppercase tracking-normal text-muted-foreground">
          {desktopApps.length} modules indexed
        </div>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-5">
        {desktopApps.map((item, index) => {
          const Icon = desktopIconMap[item.icon];

          return (
            <Link key={`${item.systemLabel}-${item.href}`} href={item.href} className="group block focus-visible:outline-none">
              <motion.div
                className="min-h-[12rem] bg-surface p-4 transition-colors group-hover:bg-elevated group-focus-visible:bg-elevated sm:min-h-[13rem]"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: index * 0.025, ease: [0.16, 1, 0.3, 1] }}
                whileHover={reduceMotion ? undefined : { y: -2 }}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="flex h-9 w-9 items-center justify-center border border-border bg-background text-muted-foreground transition-colors group-hover:border-accent/50 group-hover:text-accent">
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </span>
                  <StatusPill tone={item.status === "ready" ? "accent" : "muted"}>
                    {statusLabel[item.status]}
                  </StatusPill>
                </div>
                <div className="font-mono text-[0.68rem] uppercase tracking-normal text-muted-foreground">
                  {item.systemLabel}
                </div>
                <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
