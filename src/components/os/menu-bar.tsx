"use client";

import { Battery, Circle, Power, Wifi, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { DesktopAppId } from "@/types";
import { PowerMenu } from "./power-menu";

type MenuBarProps = {
  onOpenWindow?: (id: DesktopAppId) => void;
  onOpenSearch?: () => void;
};

type MenuCategory = "File" | "Edit" | "View" | "Window" | "Help";

function formatMenuTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

export function MenuBar({ onOpenWindow, onOpenSearch }: MenuBarProps) {
  const [clock, setClock] = useState({ label: "", iso: "" });
  const [activeMenu, setActiveMenu] = useState<MenuCategory | "OS" | null>(null);
  const [powerMenuOpen, setPowerMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock({ label: formatMenuTime(now), iso: now.toISOString() });
    };
    updateTime();
    const interval = window.setInterval(updateTime, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (menu: MenuCategory | "OS") => {
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const handleMenuAction = (actionId?: DesktopAppId) => {
    setActiveMenu(null);
    if (actionId && onOpenWindow) {
      onOpenWindow(actionId);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex h-8 items-center justify-between border-b border-white/10 bg-surface-1/[0.58] px-3 text-white shadow-[0_6px_28px_rgba(0,0,0,0.30)] backdrop-blur-2xl md:px-4">
      <div ref={navRef} className="relative flex items-center gap-1 sm:gap-2">
        {/* Brand / OS Logo Menu */}
        <div className="relative">
          <button
            type="button"
            aria-expanded={activeMenu === "OS"}
            className="flex items-center rounded px-2 py-0.5 text-xs font-semibold tracking-[0.03em] text-accent-mint transition-colors hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-mint"
            onClick={() => toggleMenu("OS")}
          >
            ANIKET OS
          </button>
          {activeMenu === "OS" && (
            <div className="os-surface-3 absolute left-0 top-7 z-50 w-52 rounded-lg py-1.5 text-xs text-white/80">
              <button
                type="button"
                className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white"
                onClick={() => handleMenuAction("about")}
              >
                About Aniket OS
              </button>
              <button
                type="button"
                className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white"
                onClick={() => handleMenuAction("settings")}
              >
                System Settings...
              </button>
              <div className="my-1 border-t border-white/10" />
              <button
                type="button"
                className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white"
                onClick={() => handleMenuAction("terminal")}
              >
                Launch Terminal
              </button>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav aria-label="Desktop menus" className="hidden items-center gap-0.5 sm:flex">
          {(["File", "Edit", "View", "Window", "Help"] as const).map((menu) => (
            <div key={menu} className="relative">
              <button
                type="button"
                aria-expanded={activeMenu === menu}
                className={`rounded px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-white/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-mint ${
                  activeMenu === menu ? "bg-white/10 text-white" : "text-white/[0.68]"
                }`}
                onClick={() => toggleMenu(menu)}
              >
                {menu}
              </button>

              {activeMenu === menu && (
                <div className="os-surface-3 absolute left-0 top-7 z-50 w-48 rounded-lg py-1.5 text-xs text-white/80">
                  {menu === "File" && (
                    <>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("engineering-lab")}>Open Engineering Lab</button>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("projects")}>Browse Projects</button>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("terminal")}>New Terminal Window</button>
                    </>
                  )}
                  {menu === "Edit" && (
                    <>
                      <button type="button" className="w-full cursor-not-allowed px-3 py-1.5 text-left opacity-50" disabled>Undo (N/A)</button>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("toolbox")}>Inspect Stack & Tools</button>
                    </>
                  )}
                  {menu === "View" && (
                    <>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => setActiveMenu(null)}>Desktop Overview</button>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("journey")}>View Engineering Journey</button>
                    </>
                  )}
                  {menu === "Window" && (
                    <>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("engineering-lab")}>Bring Lab to Front</button>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("terminal")}>Bring Terminal to Front</button>
                    </>
                  )}
                  {menu === "Help" && (
                    <>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("contact")}>Contact / Inquiries</button>
                      <button type="button" className="w-full px-3 py-1.5 text-left transition-colors hover:bg-white/[0.08] hover:text-white" onClick={() => handleMenuAction("about")}>Workstation Documentation</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Center label */}
      <div className="hidden lg:block font-mono text-[0.66rem] uppercase tracking-widest text-white/[0.35] pointer-events-none">
        Aniket Workstation v1.0
      </div>

      {/* Right System Indicators */}
      <div className="flex items-center gap-2.5 font-mono text-[0.65rem] text-white/75">
        {/* Spotlight Search Trigger Button */}
        <button
          type="button"
          aria-label="Open Spotlight Search (⌘K)"
          onClick={onOpenSearch}
        className="flex items-center gap-1 rounded border border-white/10 bg-white/[0.045] px-2 py-0.5 font-mono text-[0.6rem] font-semibold text-white/70 transition-colors hover:border-accent-mint/40 hover:bg-white/10 hover:text-accent-mint"
        >
          <Search aria-hidden="true" className="h-3 w-3 text-accent-mint" />
          <span className="hidden sm:inline">⌘K</span>
        </button>

        <span className="hidden items-center gap-1.5 sm:inline-flex text-white/70">
          <Wifi aria-hidden="true" className="h-3.5 w-3.5 text-accent-mint/90" />
          <span>Wi-Fi</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-white/70">
          <Battery aria-hidden="true" className="h-3.5 w-3.5 text-accent-mint" />
          <span>87%</span>
        </span>
        <span className="hidden items-center gap-1.5 md:inline-flex text-accent-lavender">
          <Circle aria-hidden="true" className="h-2 w-2 fill-accent-lavender text-accent-lavender os-status-pulse" />
          <span className="uppercase tracking-wider text-[0.62rem] font-semibold">BUILDING</span>
        </span>
        <time dateTime={clock.iso || undefined} className="normal-case font-mono text-white/90 text-[0.68rem] tracking-tight tabular-nums">
          {clock.label}
        </time>

        {/* Power button */}
        <div className="relative">
          <button
            type="button"
            aria-label="Power controls"
            aria-expanded={powerMenuOpen}
            onClick={() => setPowerMenuOpen((prev) => !prev)}
            className="flex items-center justify-center rounded p-0.5 text-white/40 transition-colors hover:bg-white/10 hover:text-white/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <Power className="h-3.5 w-3.5" />
          </button>
          <PowerMenu
            isOpen={powerMenuOpen}
            onClose={() => setPowerMenuOpen(false)}
          />
        </div>
      </div>
    </header>
  );
}
