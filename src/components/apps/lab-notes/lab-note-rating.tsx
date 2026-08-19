"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type LabNoteRatingProps = {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
};

export function LabNoteRating({
  value,
  onChange,
  disabled = false,
}: LabNoteRatingProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : value;

  const ratings = [1, 2, 3, 4, 5];

  const handleKeyDown = (e: React.KeyboardEvent, r: number) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange(r);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      if (r < 5) onChange(r + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      if (r > 1) onChange(r - 1);
    }
  };

  return (
    <div
      role="group"
      aria-label="Star rating selector (1 to 5 stars)"
      className="flex items-center gap-1.5"
    >
      {ratings.map((r) => {
        const isFilled = r <= displayRating;
        const isSelected = r === value;

        return (
          <button
            key={r}
            type="button"
            disabled={disabled}
            aria-label={`${r} star${r > 1 ? "s" : ""}`}
            aria-pressed={isSelected}
            onClick={() => onChange(r)}
            onMouseEnter={() => !disabled && setHoverRating(r)}
            onMouseLeave={() => !disabled && setHoverRating(null)}
            onKeyDown={(e) => handleKeyDown(e, r)}
            className={`p-1.5 rounded-lg transition-all border outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isFilled
                ? "border-accent/40 bg-accent/15 text-accent shadow-[0_0_12px_rgba(94,210,186,0.15)]"
                : "border-white/10 bg-white/[0.03] text-white/25 hover:border-white/20 hover:text-white/60"
            } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            <Star
              className={`h-5 w-5 ${
                isFilled ? "fill-accent text-accent" : "fill-transparent"
              }`}
            />
          </button>
        );
      })}

      <span className="font-mono text-xs text-accent/80 font-bold ml-2">
        {value > 0 ? `${value} / 5` : "Select rating"}
      </span>
    </div>
  );
}
