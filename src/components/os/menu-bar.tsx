"use client";

import { Battery, Circle, Power, Wifi } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { DesktopAppId } from "@/types";
import { PowerMenu } from "./power-menu";

type MenuBarProps = {
  onOpenWindow?: (id: DesktopAppId) => void;
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

export function MenuBar({ onOpenWindow }: MenuBarProps) {
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
    <header className="fixed top-0 inset-x-0 z-50 flex h-8 items-center justify-between border-b border-white/10 bg-slate-950/40 px-3 text-white shadow-[0_4px_24px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:px-4">
      <div ref={navRef} className="relative flex items-center gap-1 sm:gap-2">
        {/* Brand / OS Logo Menu */}
        <div className="relative">
          <button
            type="button"
            aria-expanded={activeMenu === "OS"}
            className="flex items-center rounded px-2 py-0.5 text-xs font-bold tracking-wider text-accent transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            onClick={() => toggleMenu("OS")}
          >
            ANIKET OS
          </button>
          {activeMenu === "OS" && (
            <div className="absolute left-0 top-7 z-50 w-52 rounded-lg border border-white/12 bg-slate-950/90 py-1.5 shadow-2xl backdrop-blur-2xl text-xs text-white/80">
              <button
                type="button"
                className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
                onClick={() => handleMenuAction("about")}
              >
                About Aniket OS
              </button>
              <button
                type="button"
                className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
                onClick={() => handleMenuAction("settings")}
              >
                System Settings...
              </button>
              <div className="my-1 border-t border-white/10" />
              <button
                type="button"
                className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors"
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
                className={`rounded px-2.5 py-0.5 text-xs font-medium transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  activeMenu === menu ? "bg-white/12 text-white" : "text-white/75"
                }`}
                onClick={() => toggleMenu(menu)}
              >
                {menu}
              </button>

              {activeMenu === menu && (
                <div className="absolute left-0 top-7 z-50 w-48 rounded-lg border border-white/12 bg-slate-950/90 py-1.5 shadow-2xl backdrop-blur-2xl text-xs text-white/80">
                  {menu === "File" && (
                    <>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("engineering-lab")}>Open Engineering Lab</button>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("projects")}>Browse Projects</button>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("terminal")}>New Terminal Window</button>
                    </>
                  )}
                  {menu === "Edit" && (
                    <>
                      <button type="button" className="w-full text-left px-3 py-1.5 opacity-50 cursor-not-allowed" disabled>Undo (N/A)</button>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("toolbox")}>Inspect Stack & Tools</button>
                    </>
                  )}
                  {menu === "View" && (
                    <>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => setActiveMenu(null)}>Desktop Overview</button>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("journey")}>View Engineering Journey</button>
                    </>
                  )}
                  {menu === "Window" && (
                    <>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("engineering-lab")}>Bring Lab to Front</button>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("terminal")}>Bring Terminal to Front</button>
                    </>
                  )}
                  {menu === "Help" && (
                    <>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("contact")}>Contact / Inquiries</button>
                      <button type="button" className="w-full text-left px-3 py-1.5 hover:bg-white/10 hover:text-white transition-colors" onClick={() => handleMenuAction("about")}>Workstation Documentation</button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Center label */}
      <div className="hidden lg:block font-mono text-[0.66rem] uppercase tracking-widest text-white/35 pointer-events-none">
        Aniket Workstation v1.0
      </div>

      {/* Right System Indicators */}
      <div className="flex items-center gap-3 font-mono text-[0.65rem] text-white/75">
        <span className="hidden items-center gap-1.5 sm:inline-flex text-white/70">
          <Wifi aria-hidden="true" className="h-3.5 w-3.5 text-accent/90" />
          <span>Wi-Fi</span>
        </span>
        <span className="inline-flex items-center gap-1.5 text-white/70">
          <Battery aria-hidden="true" className="h-3.5 w-3.5 text-emerald-400" />
          <span>87%</span>
        </span>
        <span className="hidden items-center gap-1.5 md:inline-flex text-accent">
          <Circle aria-hidden="true" className="h-2 w-2 fill-accent text-accent animate-pulse" />
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
