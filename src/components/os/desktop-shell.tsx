"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DesktopHero } from "@/components/os/desktop-hero";
import { DesktopIcon } from "@/components/os/desktop-icon";
import { desktopIconMap } from "@/components/os/icon-registry";
import { DesktopWallpaper } from "@/components/os/desktop-wallpaper";
import { DesktopWindow } from "@/components/os/desktop-window";
import { Dock } from "@/components/os/dock";
import { MenuBar } from "@/components/os/menu-bar";
import { SystemWidget } from "@/components/os/system-widget";
import { WindowManagerProvider, useWindowManager } from "@/components/os/window-manager";
import { OSLifecycleProvider, useOSLifecycle } from "@/components/os/os-lifecycle";
import { PowerScreen } from "@/components/os/power-screen";
import { BootSequence } from "@/components/os/boot-sequence";
import { CommandCenter } from "@/components/os/command-center/command-center";
import { appRegistry } from "@/lib/app-registry";
import { desktopApps } from "@/data/desktop";
import { SystemActivityProvider } from "@/components/os/system-activity-context";
import { SystemActivityWidget } from "@/components/os/system-activity-widget";
import { AppRenderer } from "@/components/apps/app-renderer";
import type { DesktopApp, DesktopAppId } from "@/types";

/* ─── Root Shell ─────────────────────────────────────────── */

export function DesktopShell() {
  return (
    <OSLifecycleProvider>
      <WindowManagerProvider>
        <SystemActivityProvider>
          <OSController />
        </SystemActivityProvider>
      </WindowManagerProvider>
    </OSLifecycleProvider>
  );
}

/* ─── OS Lifecycle Controller ────────────────────────────── */

function OSController() {
  const { osState } = useOSLifecycle();

  const handleBootComplete = () => {
    const fn = (window as Window & { __osBootComplete?: () => void }).__osBootComplete;
    if (fn) fn();
  };

  return (
    <>
      {/* Base Wallpaper Layer */}
      <DesktopWallpaper />

      <AnimatePresence mode="wait">
        {/* POWERED OFF → power screen */}
        {osState === "POWERED_OFF" && (
          <motion.div key="power-off" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <PowerScreen />
          </motion.div>
        )}

        {/* BOOTING → boot sequence */}
        {osState === "BOOTING" && (
          <BootSequence key="booting" onComplete={handleBootComplete} />
        )}

        {/* RUNNING → full desktop */}
        {(osState === "RUNNING" || osState === "SLEEPING") && (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <DesktopShellInner />
            {/* Sleep overlay */}
            <AnimatePresence>
              {osState === "SLEEPING" && (
                <SleepOverlay />
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* SHUTTING_DOWN → fade out */}
        {osState === "SHUTTING_DOWN" && (
          <motion.div
            key="shutting-down"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-[#04060c]"
          >
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-white/30">
              Shutting Down…
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─── Sleep Overlay ──────────────────────────────────────── */

function SleepOverlay() {
  const { wake } = useOSLifecycle();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="sleep-overlay fixed inset-0 z-[150] flex items-center justify-center cursor-pointer"
      onClick={wake}
      role="button"
      aria-label="Click to wake Aniket OS"
    >
      <div className="text-center space-y-2">
        <p className="font-mono text-2xl font-bold text-white/20">ANIKET OS</p>
        <p className="font-mono text-[0.56rem] uppercase tracking-[0.28em] text-white/15">
          Click anywhere to wake
        </p>
      </div>
    </motion.div>
  );
}

/* ─── Main Desktop Workstation Layout ─────────────────────── */

function DesktopShellInner() {
  const {
    windows,
    activeWindowId,
    selectedAppId,
    setSelectedAppId,
    openApp,
    closeApp,
    minimizeApp,
    maximizeApp,
    focusApp,
  } = useWindowManager();

  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState(false);

  // Global Keyboard Shortcut: ⌘+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandCenterOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openWindowsList = (Object.keys(windows) as DesktopAppId[]).filter(
    (id) => windows[id]?.isOpen && !windows[id]?.isMinimized
  );

  const minimizedWindowsList = (Object.keys(windows) as DesktopAppId[]).filter(
    (id) => windows[id]?.isOpen && windows[id]?.isMinimized
  );

  const handleOpenApp = (app: DesktopApp | DesktopAppId) => {
    const id = typeof app === "string" ? app : app.id;
    openApp(id);
  };

  return (
    <div className="fixed inset-0 h-svh w-screen overflow-hidden text-white select-none">
      {/* Spotlight Command Center Modal */}
      <CommandCenter
        isOpen={isCommandCenterOpen}
        onClose={() => setIsCommandCenterOpen(false)}
      />

      {/* Top OS Menu Bar (Fixed Top) */}
      <MenuBar
        onOpenWindow={handleOpenApp}
        onOpenSearch={() => setIsCommandCenterOpen(true)}
      />

      {/* Background Desktop Canvas (Hero, Icons, Widgets) */}
      <div className="absolute inset-0 pt-9 pb-20 overflow-hidden z-10">
        <div className="relative mx-auto h-full w-full max-w-[1720px] px-4 overflow-hidden">
          {/* Desktop Hero Canvas */}
          <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center pb-8 pt-4 md:px-24">
            <DesktopHero align="center" />
          </div>

          {/* Desktop Icons */}
          <div
            aria-label="Desktop icons"
            className="hidden md:grid md:absolute md:left-6 md:top-6 md:z-20 md:grid-flow-col md:grid-rows-5 md:gap-x-2 md:gap-y-3"
          >
            {desktopApps.map((app) => (
              <DesktopIcon
                key={app.id}
                app={app}
                selected={selectedAppId === app.id}
                isOpen={windows[app.id]?.isOpen && !windows[app.id]?.isMinimized}
                onSelect={(id) => setSelectedAppId(id)}
                onOpen={() => handleOpenApp(app.id)}
              />
            ))}
          </div>

          {/* System Widgets */}
          <div className="hidden lg:flex lg:flex-col lg:items-end lg:gap-3 lg:absolute lg:right-6 lg:top-6 lg:z-10">
            <SystemWidget onOpenApp={(id) => handleOpenApp(id)} />
            <SystemActivityWidget />
          </div>

          {/* Mobile App Launcher */}
          <MobileLaunchPad
            selectedApp={selectedAppId}
            onSelect={(id) => setSelectedAppId(id)}
            onOpen={(app) => handleOpenApp(app.id)}
          />
        </div>
      </div>

      {/* Desktop Multi-Window Surface (Floating Window Layer) */}
      <div className="pointer-events-none absolute inset-x-0 top-9 bottom-16 z-30 hidden md:block overflow-hidden">
        <AnimatePresence>
          {openWindowsList.map((winId) => {
            const appDef = appRegistry[winId];
            if (!appDef) return null;
            const IconComp = desktopIconMap[appDef.icon];
            const winState = windows[winId];
            const isFocused = activeWindowId === winId;

            return (
              <DesktopWindow
                key={winId}
                title={appDef.title}
                icon={<IconComp aria-hidden="true" className="h-4 w-4 text-accent" />}
                className="pointer-events-auto absolute"
                zIndex={winState.zIndex}
                state={isFocused ? "active" : "inactive"}
                isMaximized={winState.isMaximized}
                defaultPosition={appDef.defaultPosition}
                defaultSize={appDef.defaultSize}
                onFocus={() => focusApp(winId)}
                onClose={() => closeApp(winId)}
                onMinimize={() => minimizeApp(winId)}
                onMaximize={() => maximizeApp(winId)}
              >
                <AppRenderer id={winId} />
              </DesktopWindow>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Mobile Active Window Overlay (Mobile Viewport Window Layer) */}
      <div className="md:hidden fixed inset-x-2 top-11 bottom-16 z-40 flex flex-col pointer-events-none">
        <AnimatePresence>
          {activeWindowId &&
            windows[activeWindowId]?.isOpen &&
            !windows[activeWindowId]?.isMinimized ? (
            <DesktopWindow
              key={activeWindowId}
              title={appRegistry[activeWindowId]?.title || activeWindowId}
              icon={
                appRegistry[activeWindowId]?.icon
                  ? (() => {
                      const IconC = desktopIconMap[appRegistry[activeWindowId]!.icon];
                      return <IconC className="h-4 w-4 text-accent" />;
                    })()
                  : null
              }
              className="pointer-events-auto h-full w-full"
              onClose={() => closeApp(activeWindowId)}
              onMinimize={() => minimizeApp(activeWindowId)}
              onMaximize={() => maximizeApp(activeWindowId)}
            >
              <AppRenderer id={activeWindowId} />
            </DesktopWindow>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Dock (Fixed Bottom) */}
      <Dock
        activeWindow={activeWindowId}
        openWindows={openWindowsList}
        minimizedWindows={minimizedWindowsList}
        onOpenWindow={handleOpenApp}
        onMinimizeWindow={(id) => minimizeApp(id)}
      />
    </div>
  );
}

/* ─── Mobile Launch Pad ──────────────────────────────────── */

type MobileLaunchPadProps = {
  selectedApp: DesktopAppId;
  onSelect: (id: DesktopAppId) => void;
  onOpen: (app: DesktopApp) => void;
};

function MobileLaunchPad({ selectedApp, onSelect, onOpen }: MobileLaunchPadProps) {
  return (
    <div className="md:hidden mt-4 pb-20 space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            app={app}
            selected={selectedApp === app.id}
            onSelect={(id) => onSelect(id)}
            onOpen={() => onOpen(app)}
          />
        ))}
      </div>
    </div>
  );
}
