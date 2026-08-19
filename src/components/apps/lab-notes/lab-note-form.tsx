"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LAB_NOTE_CONTEXT_OPTIONS,
  type LabNoteContext,
  type LabNoteSubmission,
} from "@/lib/lab-notes/types";
import { validateLabNoteSubmission } from "@/lib/lab-notes/validation";
import { submitLabNoteDemo } from "@/lib/lab-notes/repository";
import { LabNoteRating } from "./lab-note-rating";
import {
  PenTool,
  Send,
  Lock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type LabNoteFormProps = {
  onSuccess?: () => void;
};

export function LabNoteForm({ onSuccess }: LabNoteFormProps) {
  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [context, setContext] = useState<LabNoteContext | undefined>(undefined);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LabNoteSubmission, string>>>({});
  const [submittedResponse, setSubmittedResponse] = useState<{
    noteId: string;
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submission: LabNoteSubmission = {
      rating,
      name: name.trim() || undefined,
      email: email.trim() || undefined,
      message: message.trim(),
      context,
    };

    const validation = validateLabNoteSubmission(submission);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await submitLabNoteDemo(submission);
      setSubmittedResponse({
        noteId: res.noteId,
        message: res.message,
      });
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("os:lab-note-prepared", { detail: { noteId: res.noteId } })
        );
      }
      if (onSuccess) onSuccess();
    } catch {
      setErrors({ message: "Failed to submit note. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setRating(5);
    setName("");
    setEmail("");
    setMessage("");
    setContext(undefined);
    setErrors({});
    setSubmittedResponse(null);
  };

  if (submittedResponse) {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-xl border border-accent/30 bg-accent/[0.04] p-6 space-y-4 text-center font-sans"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/40 bg-accent/15 text-accent mx-auto">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[0.62rem] font-bold text-accent uppercase tracking-[0.2em] px-2.5 py-0.5 rounded border border-accent/30 bg-accent/10">
              {submittedResponse.noteId}
            </span>
            <h3 className="text-base font-bold text-white tracking-tight mt-2">
              NOTE RECEIVED
            </h3>
            <p className="text-xs text-white/80 leading-relaxed max-w-md mx-auto">
              {submittedResponse.message}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-950/40 p-3 text-left space-y-1.5 font-mono text-[0.65rem] text-white/50">
            <div className="flex items-center gap-1.5 text-accent">
              <Sparkles className="h-3 w-3" />
              <span className="font-semibold uppercase">Local Submission State</span>
            </div>
            <p className="leading-relaxed">
              Your note has been formatted according to the future backend contract. Once database and email moderation APIs are deployed in the backend milestone, submitted notes will sync automatically.
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/20 px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-white/20 transition-all uppercase tracking-wider"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Submit Another Note</span>
          </button>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 font-sans">
      {/* Title Header */}
      <div className="border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider">
          <PenTool className="h-3.5 w-3.5" />
          <span>LEAVE A LAB NOTE</span>
        </div>
        <p className="text-xs text-white/60 mt-0.5">
          Share your field observations, feedback, or suggestions about Aniket OS.
        </p>
      </div>

      {/* 1. Rating Selector */}
      <div className="space-y-1.5">
        <label className="font-mono text-[0.62rem] font-bold text-white/80 uppercase tracking-wider block">
          HOW WAS YOUR EXPERIENCE? <span className="text-accent">*</span>
        </label>
        <LabNoteRating
          value={rating}
          onChange={(r) => {
            setRating(r);
            if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
          }}
          disabled={isSubmitting}
        />
        {errors.rating && (
          <p className="font-mono text-[0.65rem] text-rose-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.rating}
          </p>
        )}
      </div>

      {/* 2. Name & Email (2-Column Desktop Grid) */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Name */}
        <div className="space-y-1">
          <label htmlFor="note-name" className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block">
            NAME <span className="text-white/40 font-normal">(OPTIONAL)</span>
          </label>
          <input
            id="note-name"
            type="text"
            placeholder="Your name or blank for Anonymous"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/50"
          />
          {errors.name && (
            <p className="font-mono text-[0.62rem] text-rose-400">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="note-email" className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block">
            EMAIL <span className="text-white/40 font-normal">(OPTIONAL)</span>
          </label>
          <input
            id="note-email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/50"
          />
          {errors.email && (
            <p className="font-mono text-[0.62rem] text-rose-400">{errors.email}</p>
          )}
        </div>
      </div>

      {/* Privacy note */}
      <div className="flex items-center gap-1.5 text-[0.65rem] text-white/45 font-mono">
        <Lock className="h-3 w-3 text-accent shrink-0" />
        <span>Your email will never be displayed publicly.</span>
      </div>

      {/* 3. Message Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label htmlFor="note-message" className="font-mono text-[0.62rem] font-bold text-white/80 uppercase tracking-wider block">
            WHAT STOOD OUT TO YOU? <span className="text-accent">*</span>
          </label>
          <span className="font-mono text-[0.6rem] text-white/40">
            {message.length} / 500
          </span>
        </div>
        <textarea
          id="note-message"
          rows={4}
          placeholder="Tell me what you liked, what surprised you, or what could be improved..."
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setMessage(e.target.value);
              if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
            }
          }}
          disabled={isSubmitting}
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/50 leading-relaxed resize-none"
        />
        {errors.message && (
          <p className="font-mono text-[0.65rem] text-rose-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.message}
          </p>
        )}
      </div>

      {/* 4. Optional Visit Context */}
      <div className="space-y-1.5">
        <label className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block">
          WHAT DID YOU EXPLORE? <span className="text-white/40 font-normal">(OPTIONAL)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {LAB_NOTE_CONTEXT_OPTIONS.map((opt) => {
            const isSelected = context === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setContext(isSelected ? undefined : opt)}
                disabled={isSubmitting}
                className={`rounded-md border px-2.5 py-1 font-mono text-[0.6rem] font-medium transition-all ${
                  isSelected
                    ? "border-accent/50 bg-accent/15 text-accent"
                    : "border-white/10 bg-white/[0.02] text-white/50 hover:bg-white/5 hover:text-white/80"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Moderation Note & Submit */}
      <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[0.68rem] text-white/40 leading-tight">
          Notes are reviewed before appearing in the public archive.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-6 py-2.5 font-mono text-xs font-bold text-accent transition-all hover:bg-accent hover:text-slate-950 uppercase tracking-wider"
        >
          <Send className="h-3.5 w-3.5" />
          <span>{isSubmitting ? "Submitting..." : "Submit Lab Note"}</span>
        </button>
      </div>
    </form>
  );
}
