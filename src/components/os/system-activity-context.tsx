"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import type { SystemActivityEvent } from "@/lib/activity-types";
import type { DesktopAppId } from "@/types";
import { appRegistry } from "@/lib/app-registry";

type LogEventPayload = Omit<SystemActivityEvent, "id" | "timestamp">;

type SystemActivityContextType = {
  events: SystemActivityEvent[];
  logEvent: (payload: LogEventPayload) => void;
  clearEvents: () => void;
};

const SystemActivityContext = createContext<SystemActivityContextType | null>(null);

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export function SystemActivityProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<SystemActivityEvent[]>([]);
  const lastLoggedRef = useRef<{ key: string; time: number } | null>(null);

  const logEvent = useCallback((payload: LogEventPayload) => {
    const key = `${payload.category}:${payload.title}:${payload.appId || ""}:${payload.labId || ""}`;
    const now = Date.now();

    // Deduplication check: ignore if exact same event was logged in last 1200ms
    if (
      lastLoggedRef.current &&
      lastLoggedRef.current.key === key &&
      now - lastLoggedRef.current.time < 1200
    ) {
      return;
    }

    lastLoggedRef.current = { key, time: now };

    const newEvent: SystemActivityEvent = {
      ...payload,
      id: `act-${now}-${Math.floor(Math.random() * 1000)}`,
      timestamp: formatTime(new Date()),
    };

    setEvents((prev) => [newEvent, ...prev].slice(0, 30));
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  // System Initializer & Real Window Event Subscriptions (Runs once on mount)
  useEffect(() => {
    // 1. Initial System Booted Event
    logEvent({
      category: "SYSTEM",
      title: "System Initialized",
      description: "Aniket OS developer workstation operational.",
    });

    // 2. Initial Network Check
    if (typeof window !== "undefined" && navigator.onLine) {
      logEvent({
        category: "NETWORK",
        title: "Connection Detected",
        description: "Network interface active (ONLINE).",
      });
    }

    // 3. Network Listeners
    const handleOnline = () => {
      logEvent({
        category: "NETWORK",
        title: "Connection Restored",
        description: "Network connectivity re-established.",
      });
    };

    const handleOffline = () => {
      logEvent({
        category: "NETWORK",
        title: "Connection Lost",
        description: "Network interface offline.",
      });
    };

    // 4. Lab Experiment Selection Listener
    const handleSelectLab = (e: Event) => {
      const customEvent = e as CustomEvent<{ labId: string }>;
      if (customEvent.detail?.labId) {
        logEvent({
          category: "ENGINEERING",
          title: `Experiment Selected (${customEvent.detail.labId})`,
          description: `Loaded engineering case study ${customEvent.detail.labId} in workbench.`,
          appId: "engineering-lab",
          labId: customEvent.detail.labId,
        });
      }
    };

    // 5. App Window Life Cycle Listeners
    const handleAppOpened = (e: Event) => {
      const customEvent = e as CustomEvent<{ appId: DesktopAppId }>;
      const appId = customEvent.detail?.appId;
      if (appId) {
        const appTitle = appRegistry[appId]?.title || appId;
        logEvent({
          category: "APPLICATION",
          title: `${appTitle} Opened`,
          description: `Launched window ${appTitle}.`,
          appId,
        });
      }
    };

    const handleAppClosed = (e: Event) => {
      const customEvent = e as CustomEvent<{ appId: DesktopAppId }>;
      const appId = customEvent.detail?.appId;
      if (appId) {
        const appTitle = appRegistry[appId]?.title || appId;
        logEvent({
          category: "APPLICATION",
          title: `${appTitle} Closed`,
          description: `Closed window ${appTitle}.`,
          appId,
        });
      }
    };

    const handleAppMinimized = (e: Event) => {
      const customEvent = e as CustomEvent<{ appId: DesktopAppId }>;
      const appId = customEvent.detail?.appId;
      if (appId) {
        const appTitle = appRegistry[appId]?.title || appId;
        logEvent({
          category: "APPLICATION",
          title: `${appTitle} Minimized`,
          description: `Minimized window ${appTitle} to dock.`,
          appId,
        });
      }
    };

    const handleAppRestored = (e: Event) => {
      const customEvent = e as CustomEvent<{ appId: DesktopAppId }>;
      const appId = customEvent.detail?.appId;
      if (appId) {
        const appTitle = appRegistry[appId]?.title || appId;
        logEvent({
          category: "APPLICATION",
          title: `${appTitle} Restored`,
          description: `Restored window ${appTitle} from dock.`,
          appId,
        });
      }
    };

    // 6. GitHub Sync & Lab Note Listeners
    const handleGitHubSynced = (e: Event) => {
      const customEvent = e as CustomEvent<{ count?: number; status: string }>;
      logEvent({
        category: "SOURCE_CONTROL",
        title: "GitHub Synchronization Completed",
        description: `Retrieved ${customEvent.detail?.count || 0} public repositories from GitHub API.`,
        appId: "github",
      });
    };

    const handleLabNotePrepared = (e: Event) => {
      const customEvent = e as CustomEvent<{ noteId: string }>;
      logEvent({
        category: "LAB_NOTES",
        title: "Visitor Note Prepared",
        description: `Feedback note ${customEvent.detail?.noteId || "DEMO"} prepared for moderation.`,
        appId: "lab-notes",
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("os:select-lab-experiment", handleSelectLab);
    window.addEventListener("os:app-opened", handleAppOpened);
    window.addEventListener("os:app-closed", handleAppClosed);
    window.addEventListener("os:app-minimized", handleAppMinimized);
    window.addEventListener("os:app-restored", handleAppRestored);
    window.addEventListener("os:github-synced", handleGitHubSynced);
    window.addEventListener("os:lab-note-prepared", handleLabNotePrepared);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("os:select-lab-experiment", handleSelectLab);
      window.removeEventListener("os:app-opened", handleAppOpened);
      window.removeEventListener("os:app-closed", handleAppClosed);
      window.removeEventListener("os:app-minimized", handleAppMinimized);
      window.removeEventListener("os:app-restored", handleAppRestored);
      window.removeEventListener("os:github-synced", handleGitHubSynced);
      window.removeEventListener("os:lab-note-prepared", handleLabNotePrepared);
    };
  }, [logEvent]);

  return (
    <SystemActivityContext.Provider value={{ events, logEvent, clearEvents }}>
      {children}
    </SystemActivityContext.Provider>
  );
}

export function useSystemActivity() {
  const context = useContext(SystemActivityContext);
  if (!context) {
    throw new Error("useSystemActivity must be used within a SystemActivityProvider");
  }
  return context;
}

export function useOptionalSystemActivity() {
  return useContext(SystemActivityContext);
}
