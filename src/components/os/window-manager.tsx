"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { DesktopAppId } from "@/types";
import { appRegistry } from "@/lib/app-registry";

export type WindowState = {
  id: DesktopAppId;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
};

type WindowManagerContextType = {
  windows: Record<DesktopAppId, WindowState>;
  activeWindowId: DesktopAppId | null;
  selectedAppId: DesktopAppId;
  setSelectedAppId: (id: DesktopAppId) => void;
  openApp: (id: DesktopAppId) => void;
  closeApp: (id: DesktopAppId) => void;
  minimizeApp: (id: DesktopAppId) => void;
  maximizeApp: (id: DesktopAppId) => void;
  focusApp: (id: DesktopAppId) => void;
  restoreApp: (id: DesktopAppId) => void;
};

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [selectedAppId, setSelectedAppId] = useState<DesktopAppId>("engineering-lab");
  const [activeWindowId, setActiveWindowId] = useState<DesktopAppId | null>(null);
  const [highestZIndex, setHighestZIndex] = useState(30);

  const [windows, setWindows] = useState<Record<DesktopAppId, WindowState>>(() => {
    const initial: Partial<Record<DesktopAppId, WindowState>> = {};
    (Object.keys(appRegistry) as DesktopAppId[]).forEach((id) => {
      initial[id] = {
        id,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 20
      };
    });
    return initial as Record<DesktopAppId, WindowState>;
  });

  const getTopVisibleApp = (excludeId?: DesktopAppId): DesktopAppId | null => {
    let topId: DesktopAppId | null = null;
    let maxZ = -1;
    (Object.keys(windows) as DesktopAppId[]).forEach((id) => {
      if (id === excludeId) return;
      const w = windows[id];
      if (w && w.isOpen && !w.isMinimized && w.zIndex > maxZ) {
        maxZ = w.zIndex;
        topId = id;
      }
    });
    return topId;
  };

  const focusApp = (id: DesktopAppId) => {
    const newZ = highestZIndex + 1;
    setHighestZIndex(newZ);
    setActiveWindowId(id);
    setSelectedAppId(id);
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: true,
        isMinimized: false,
        zIndex: newZ
      }
    }));
  };

  const openApp = (id: DesktopAppId) => {
    focusApp(id);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("os:app-opened", { detail: { appId: id } }));
    }
  };

  const restoreApp = (id: DesktopAppId) => {
    focusApp(id);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("os:app-restored", { detail: { appId: id } }));
    }
  };

  const closeApp = (id: DesktopAppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isOpen: false,
        isMinimized: false,
        isMaximized: false
      }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(getTopVisibleApp(id));
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("os:app-closed", { detail: { appId: id } }));
    }
  };

  const minimizeApp = (id: DesktopAppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMinimized: true
      }
    }));
    if (activeWindowId === id) {
      setActiveWindowId(getTopVisibleApp(id));
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("os:app-minimized", { detail: { appId: id } }));
    }
  };

  const maximizeApp = (id: DesktopAppId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id]?.isMaximized
      }
    }));
  };

  return (
    <WindowManagerContext.Provider
      value={{
        windows,
        activeWindowId,
        selectedAppId,
        setSelectedAppId,
        openApp,
        closeApp,
        minimizeApp,
        maximizeApp,
        focusApp,
        restoreApp
      }}
    >
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return context;
}

export function useOptionalWindowManager() {
  return useContext(WindowManagerContext);
}
