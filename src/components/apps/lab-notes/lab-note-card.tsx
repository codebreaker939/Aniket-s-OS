"use client";

import { Star, User } from "lucide-react";

type PublicLabNote = {
  id: string;
  rating: number;
  name: string;
  message: string;
  context: string | null;
  createdAt: string;
};

type LabNoteCardProps = {
  note: PublicLabNote;
};

export function LabNoteCard({ note }: LabNoteCardProps) {
  const displayName = note.name || "Anonymous";
  const formattedDate = new Date(note.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.02] p-4 space-y-3 relative overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/8 pb-2.5">
        {/* Rating Stars */}
        <div className="flex items-center gap-1" aria-label={`Rating: ${note.rating} out of 5 stars`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3.5 w-3.5 ${
                star <= note.rating
                  ? "fill-accent text-accent"
                  : "text-white/20 fill-transparent"
              }`}
            />
          ))}
        </div>

        {/* Note ID / Context */}
        <div className="flex items-center gap-2">
          {note.context && (
            <span className="font-mono text-[0.58rem] font-bold text-accent/90 uppercase px-2 py-0.5 rounded bg-accent/10 border border-accent/20">
              {note.context}
            </span>
          )}
          <span className="font-mono text-[0.55rem] text-white/30 uppercase">
            {note.id}
          </span>
        </div>
      </div>

      {/* Message Body */}
      <p className="text-xs text-white/80 leading-relaxed italic">
        &ldquo;{note.message}&rdquo;
      </p>

      {/* Footer Meta */}
      <div className="flex items-center justify-between pt-1 font-mono text-[0.62rem] text-white/45">
        <div className="flex items-center gap-1.5">
          <User className="h-3 w-3 text-white/30" />
          <span className="text-white/80 font-medium">{displayName}</span>
        </div>
        <span>{formattedDate}</span>
      </div>
    </article>
  );
}
