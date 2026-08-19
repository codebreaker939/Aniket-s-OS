"use client";

import { useEffect, useRef } from "react";
import { Moon, Power, RotateCcw, X } from "lucide-react";
import { useOSLifecycle } from "./os-lifecycle";

type PowerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function PowerMenu({ isOpen, onClose }: PowerMenuProps) {
  const { shutdown, restart, sleep } = useOSLifecycle();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      label: "Sleep",
      icon: Moon,
      action: () => { sleep(); onClose(); },
      className: "text-white/70",
    },
    {
      label: "Restart",
      icon: RotateCcw,
      action: () => { restart(); onClose(); },
      className: "text-white/70",
    },
    {
      label: "Shut Down",
      icon: Power,
      action: () => { shutdown(); onClose(); },
      className: "text-rose-400/80",
    },
  ];

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label="Power controls"
      className="absolute right-0 top-7 z-50 w-44 rounded-lg border border-white/12 bg-slate-950/90 py-1.5 shadow-2xl backdrop-blur-2xl"
    >
      {actions.map((item) => (
        <button
          key={item.label}
          type="button"
          role="menuitem"
          onClick={item.action}
          className={`flex w-full items-center gap-2.5 px-3 py-1.5 text-xs transition-colors hover:bg-white/10 ${item.className}`}
        >
          <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {item.label}
        </button>
      ))}
      <div className="my-1 border-t border-white/10" />
      <button
        type="button"
        role="menuitem"
        onClick={onClose}
        className="flex w-full items-center gap-2.5 px-3 py-1.5 text-xs text-white/40 transition-colors hover:bg-white/10 hover:text-white/70"
      >
        <X className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Cancel
      </button>
    </div>
  );
}
