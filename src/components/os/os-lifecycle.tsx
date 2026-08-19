"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

/* ─── Types ─────────────────────────────────────────────── */

export type OSState =
  | "POWERED_OFF"
  | "BOOTING"
  | "RUNNING"
  | "SHUTTING_DOWN"
  | "SLEEPING";

type OSLifecycleContextType = {
  osState: OSState;
  sessionStartTime: number | null;
  powerOn: () => void;
  shutdown: () => void;
  restart: () => void;
  sleep: () => void;
  wake: () => void;
};

/* ─── Context ───────────────────────────────────────────── */

const OSLifecycleContext = createContext<OSLifecycleContextType | null>(null);

export function OSLifecycleProvider({ children }: { children: ReactNode }) {
  const [osState, setOsState] = useState<OSState>("POWERED_OFF");
  const [sessionStartTime, setSessionStartTime] = useState<number | null>(null);
  // Guard against React Strict Mode double-fire
  const transitioningRef = useRef(false);

  const powerOn = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setOsState("BOOTING");
  }, []);

  /** Called by BootSequence when it finishes */
  const bootComplete = useCallback(() => {
    transitioningRef.current = false;
    setSessionStartTime(Date.now());
    setOsState("RUNNING");
  }, []);

  const shutdown = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setOsState("SHUTTING_DOWN");
    setTimeout(() => {
      transitioningRef.current = false;
      setSessionStartTime(null);
      setOsState("POWERED_OFF");
    }, 1400);
  }, []);

  const restart = useCallback(() => {
    if (transitioningRef.current) return;
    transitioningRef.current = true;
    setOsState("SHUTTING_DOWN");
    setTimeout(() => {
      setSessionStartTime(null);
      setOsState("BOOTING");
      // bootComplete will be called again by BootSequence component
      transitioningRef.current = false;
    }, 1200);
  }, []);

  const sleep = useCallback(() => {
    setOsState("SLEEPING");
  }, []);

  const wake = useCallback(() => {
    setOsState("RUNNING");
  }, []);

  return (
    <OSLifecycleContext.Provider
      value={{
        osState,
        sessionStartTime,
        powerOn,
        shutdown,
        restart,
        sleep,
        wake,
      }}
    >
      {/* Expose bootComplete via a hidden event so BootSequence can call it */}
      <BootCompleteRegistrar bootComplete={bootComplete} />
      {children}
    </OSLifecycleContext.Provider>
  );
}

/** Small helper that puts bootComplete on a stable ref accessible via custom event */
function BootCompleteRegistrar({
  bootComplete,
}: {
  bootComplete: () => void;
}) {
  // Store on window so BootSequence can invoke it without prop drilling
  if (typeof window !== "undefined") {
    (window as Window & { __osBootComplete?: () => void }).__osBootComplete =
      bootComplete;
  }
  return null;
}

export function useOSLifecycle() {
  const ctx = useContext(OSLifecycleContext);
  if (!ctx)
    throw new Error("useOSLifecycle must be used within OSLifecycleProvider");
  return ctx;
}
