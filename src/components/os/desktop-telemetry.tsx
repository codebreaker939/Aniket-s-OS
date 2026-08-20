"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { useOSLifecycle } from "@/components/os/os-lifecycle";
import { useOptionalWindowManager } from "@/components/os/window-manager";
import { experimentsData, type EngineeringExperiment } from "@/lib/experiments-data";
import { appRegistry } from "@/lib/app-registry";
import { GITHUB_USERNAME } from "@/lib/github/config";
import {
  normalizeGitHubData,
  type RawGitHubRepoItem,
  type RawGitHubUserResponse,
} from "@/lib/github/mapper";
import type {
  GitHubConnectionStatus,
  GitHubNormalizedData,
  GitHubRepoData,
} from "@/lib/github/types";
import type { DesktopAppId } from "@/types";

type SourceControlDesktopStatus = GitHubConnectionStatus | "SYNCING";

type SourceControlTelemetry = {
  status: SourceControlDesktopStatus;
  isLoading: boolean;
  repositories: GitHubRepoData[];
  lastSyncedAt: number | null;
  syncLabel: string;
  error?: string;
  refresh: () => Promise<void>;
};

type DesktopTelemetryContextType = {
  clock: {
    time: string;
    date: string;
    menuLabel: string;
    iso: string;
  };
  uptime: string;
  online: boolean;
  viewport: "MOBILE" | "TABLET" | "DESKTOP";
  focusedAppId: DesktopAppId | null;
  focusedAppLabel: string;
  currentExperiment: EngineeringExperiment | null;
  sourceControl: SourceControlTelemetry;
};

const DesktopTelemetryContext = createContext<DesktopTelemetryContextType | null>(null);

function formatUptime(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600).toString().padStart(2, "0");
  const m = Math.floor((totalSec % 3600) / 60).toString().padStart(2, "0");
  const s = (totalSec % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function formatClock(date: Date) {
  return {
    time: new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date),
    date: new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date).toUpperCase(),
    menuLabel: new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    }).format(date),
    iso: date.toISOString(),
  };
}

function formatSyncAge(lastSyncedAt: number | null, now: number, status: SourceControlDesktopStatus) {
  if (status === "SYNCING") return "SYNCING";
  if (!lastSyncedAt) {
    if (status === "NOT_CONFIGURED") return "NOT CONFIGURED";
    if (status === "UNAVAILABLE") return "NOT SYNCED";
    return "SYNCED";
  }

  const minutes = Math.floor((now - lastSyncedAt) / 60_000);
  if (minutes < 1) return "SYNCED JUST NOW";
  if (minutes === 1) return "SYNCED 1 MIN AGO";
  return `SYNCED ${minutes} MIN AGO`;
}

function getViewportLabel(): "MOBILE" | "TABLET" | "DESKTOP" {
  if (typeof window === "undefined") return "DESKTOP";
  const width = window.innerWidth;
  if (width < 768) return "MOBILE";
  if (width < 1024) return "TABLET";
  return "DESKTOP";
}

const initialGitHubData: GitHubNormalizedData = {
  status: "UNAVAILABLE",
  profile: null,
  repositories: [],
  recentActivity: [],
};

export function DesktopTelemetryProvider({ children }: { children: ReactNode }) {
  const { osState, sessionStartTime } = useOSLifecycle();
  const windowManager = useOptionalWindowManager();
  const [now, setNow] = useState(() => Date.now());
  const [online, setOnline] = useState(true);
  const [viewport, setViewport] = useState<"MOBILE" | "TABLET" | "DESKTOP">("DESKTOP");
  const [selectedExperimentId, setSelectedExperimentId] = useState<string | null>(null);
  const [sourceData, setSourceData] = useState<GitHubNormalizedData>(initialGitHubData);
  const [isSourceLoading, setIsSourceLoading] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const hasFetchedSourceRef = useRef(false);
  const wasOnlineRef = useRef(true);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const updateNetwork = () => setOnline(navigator.onLine);
    updateNetwork();
    window.addEventListener("online", updateNetwork);
    window.addEventListener("offline", updateNetwork);
    return () => {
      window.removeEventListener("online", updateNetwork);
      window.removeEventListener("offline", updateNetwork);
    };
  }, []);

  useEffect(() => {
    const updateViewport = () => setViewport(getViewportLabel());
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  useEffect(() => {
    const handleSelectExperiment = (event: Event) => {
      const customEvent = event as CustomEvent<{ labId?: string }>;
      if (customEvent.detail?.labId) {
        setSelectedExperimentId(customEvent.detail.labId);
      }
    };

    window.addEventListener("os:select-lab-experiment", handleSelectExperiment);
    return () => {
      window.removeEventListener("os:select-lab-experiment", handleSelectExperiment);
    };
  }, []);

  const refreshSourceControl = useCallback(async () => {
    setIsSourceLoading(true);
    setSourceData((prev) => ({ ...prev, status: "UNAVAILABLE", error: undefined }));

    try {
      if (!GITHUB_USERNAME) {
        setSourceData({
          status: "NOT_CONFIGURED",
          profile: null,
          repositories: [],
          recentActivity: [],
          error: "GitHub username is not configured.",
        });
        return;
      }

      if (typeof navigator !== "undefined" && !navigator.onLine) {
        setSourceData({
          status: "UNAVAILABLE",
          profile: null,
          repositories: [],
          recentActivity: [],
          error: "Network is offline.",
        });
        return;
      }

      const headers = { Accept: "application/vnd.github.v3+json" };
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, { headers }),
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error(`GitHub API error: ${userRes.status} / ${reposRes.status}`);
      }

      const userJson = (await userRes.json()) as RawGitHubUserResponse;
      const reposJson = (await reposRes.json()) as RawGitHubRepoItem[];
      const normalized = normalizeGitHubData(userJson, reposJson);
      const syncedAt = Date.now();

      setSourceData(normalized);
      setLastSyncedAt(syncedAt);

      if (typeof window !== "undefined" && normalized.status === "CONNECTED") {
        window.dispatchEvent(
          new CustomEvent("os:github-synced", {
            detail: { count: normalized.repositories.length, status: normalized.status },
          })
        );
      }
    } catch {
      setSourceData({
        status: "UNAVAILABLE",
        profile: null,
        repositories: [],
        recentActivity: [],
        error: "GitHub API temporarily unavailable.",
      });
    } finally {
      setIsSourceLoading(false);
    }
  }, []);

  const desktopIsRunning = osState === "RUNNING" || osState === "SLEEPING";

  useEffect(() => {
    if (!desktopIsRunning || hasFetchedSourceRef.current) return;
    hasFetchedSourceRef.current = true;
    void refreshSourceControl();
  }, [desktopIsRunning, refreshSourceControl]);

  useEffect(() => {
    if (desktopIsRunning && online && !wasOnlineRef.current) {
      void refreshSourceControl();
    }
    wasOnlineRef.current = online;
  }, [desktopIsRunning, online, refreshSourceControl]);

  const clock = useMemo(() => formatClock(new Date(now)), [now]);
  const uptime =
    sessionStartTime && desktopIsRunning ? formatUptime(now - sessionStartTime) : "00:00:00";

  const focusedAppId =
    windowManager?.activeWindowId &&
    windowManager.windows[windowManager.activeWindowId]?.isOpen &&
    !windowManager.windows[windowManager.activeWindowId]?.isMinimized
      ? windowManager.activeWindowId
      : null;

  const focusedAppLabel = focusedAppId ? appRegistry[focusedAppId]?.label || focusedAppId : "IDLE";
  const currentExperiment =
    experimentsData.find((experiment) => experiment.id === selectedExperimentId) || null;

  const sourceStatus: SourceControlDesktopStatus = isSourceLoading
    ? "SYNCING"
    : !online
      ? "UNAVAILABLE"
      : sourceData.status;

  const sourceControl = useMemo<SourceControlTelemetry>(
    () => ({
      status: sourceStatus,
      isLoading: isSourceLoading,
      repositories: sourceStatus === "CONNECTED" ? sourceData.repositories : [],
      lastSyncedAt,
      syncLabel: formatSyncAge(lastSyncedAt, now, sourceStatus),
      error: sourceData.error,
      refresh: refreshSourceControl,
    }),
    [isSourceLoading, lastSyncedAt, now, refreshSourceControl, sourceData.error, sourceData.repositories, sourceStatus]
  );

  const value = useMemo<DesktopTelemetryContextType>(
    () => ({
      clock,
      uptime,
      online,
      viewport,
      focusedAppId,
      focusedAppLabel,
      currentExperiment,
      sourceControl,
    }),
    [clock, currentExperiment, focusedAppId, focusedAppLabel, online, sourceControl, uptime, viewport]
  );

  return (
    <DesktopTelemetryContext.Provider value={value}>
      {children}
    </DesktopTelemetryContext.Provider>
  );
}

export function useDesktopTelemetry() {
  const context = useContext(DesktopTelemetryContext);
  if (!context) {
    throw new Error("useDesktopTelemetry must be used within DesktopTelemetryProvider");
  }
  return context;
}
