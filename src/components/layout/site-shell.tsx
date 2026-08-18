"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { SystemBar } from "@/components/navigation/system-bar";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-accent focus:bg-background focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-foreground"
      >
        Skip to workspace
      </a>
      <SystemBar />
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pb-12 pt-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
