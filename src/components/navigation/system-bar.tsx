"use client";

import Link from "next/link";
import { Command, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { primaryNavigation, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function SystemBar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/[0.88] backdrop-blur-xl">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex min-w-0 items-center gap-3 focus-visible:outline-none"
          aria-label="Open Aniket OS workspace"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-accent/40 bg-accent/10 text-accent shadow-thin-inset">
            <Command aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-mono text-sm font-semibold uppercase tracking-normal text-foreground">
              {siteConfig.name}
            </span>
            <span className="hidden font-mono text-[0.68rem] uppercase tracking-normal text-muted-foreground sm:block">
              {siteConfig.version}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-3 py-2 font-mono text-xs uppercase tracking-normal text-muted-foreground transition-colors hover:text-foreground",
                pathname === item.href && "text-accent"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center gap-2 border border-border bg-surface px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-normal text-muted-foreground shadow-thin-inset">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Build Mode
          </div>
          <div className="font-mono text-[0.68rem] uppercase tracking-normal text-muted-foreground">
            IST
          </div>
        </div>

        <Button
          type="button"
          variant="secondary"
          size="icon"
          className="md:hidden"
          aria-label="Toggle workspace navigation"
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X aria-hidden="true" className="h-4 w-4" /> : <Menu aria-hidden="true" className="h-4 w-4" />}
        </Button>
      </div>

      {isOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border bg-background px-4 py-3 md:hidden"
        >
          <div className="grid gap-1">
            {primaryNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border border-transparent px-3 py-3 font-mono text-xs uppercase tracking-normal text-muted-foreground transition-colors hover:border-border hover:bg-surface hover:text-foreground",
                  pathname === item.href && "border-accent/[0.35] bg-accent/10 text-accent"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
