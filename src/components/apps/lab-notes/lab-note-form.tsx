"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LAB_NOTE_CONTEXT_OPTIONS,
  type LabNoteContext,
} from "@/lib/lab-notes/types";
import { validateLabNoteSubmission } from "@/lib/lab-notes/validation";
import { LabNoteRating } from "./lab-note-rating";
import {
  PenTool,
  Send,
  Lock,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Loader2,
} from "lucide-react";

type LabNoteFormProps = {
  onSuccess?: () => void;
};

type SubmitState = "IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR";

type FormFields = {
  rating: number;
  name: string;
  email: string;
  message: string;
  context: LabNoteContext | undefined;
};

export function LabNoteForm({ onSuccess }: LabNoteFormProps) {
  const [fields, setFields] = useState<FormFields>({
    rating: 5,
    name: "",
    email: "",
    message: "",
    context: undefined,
  });

  const [submitState, setSubmitState] = useState<SubmitState>("IDLE");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const setField = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side pre-validation (UX convenience only — server re-validates)
    const clientValidation = validateLabNoteSubmission({
      rating: fields.rating,
      name: fields.name.trim() || undefined,
      email: fields.email.trim() || undefined,
      message: fields.message.trim(),
      context: fields.context,
    });

    if (!clientValidation.isValid) {
      setErrors(clientValidation.errors);
      return;
    }

    setErrors({});
    setSubmitState("SUBMITTING");

    try {
      const response = await fetch("/api/lab-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: fields.rating,
          name: fields.name.trim() || "",
          email: fields.email.trim() || "",
          message: fields.message.trim(),
          context: fields.context ?? "",
          honeypot: "", // Anti-spam honeypot — always empty for real users
        }),
      });

      if (response.status === 429) {
        setErrors({ message: "Too many submissions. Please try again later." });
        setSubmitState("ERROR");
        return;
      }

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        const serverMessage =
          typeof data?.error === "string" ? data.error : undefined;

        // Map server field errors back to form (if present)
        if (data?.fieldErrors) {
          const mapped: Partial<Record<string, string>> = {};
          for (const [field, msgs] of Object.entries(data.fieldErrors)) {
            if (Array.isArray(msgs) && msgs.length > 0) {
              mapped[field] = String(msgs[0]);
            }
          }
          setErrors(mapped);
        } else if (serverMessage) {
          setErrors({ message: serverMessage });
        }

        setSubmitState("ERROR");
        return;
      }

      // Success
      setSubmitState("SUCCESS");

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("os:lab-note-submitted"));
      }

      if (onSuccess) onSuccess();
    } catch {
      // Network / parse error — never expose internals
      setSubmitState("ERROR");
    }
  };

  const handleReset = () => {
    setFields({ rating: 5, name: "", email: "", message: "", context: undefined });
    setErrors({});
    setSubmitState("IDLE");
  };

  // ─── SUCCESS STATE ────────────────────────────────────────────────────────
  if (submitState === "SUCCESS") {
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
            <h3 className="text-base font-bold text-white tracking-tight">
              NOTE RECEIVED
            </h3>
            <p className="text-xs text-white/80 leading-relaxed max-w-md mx-auto">
              Your note has been sent for moderation.
              <br />
              It will appear publicly after approval.
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

  const isSubmitting = submitState === "SUBMITTING";
  const hasTopLevelError = submitState === "ERROR" && !Object.keys(errors).length;

  // ─── FORM STATE (IDLE | SUBMITTING | ERROR) ───────────────────────────────
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

      {/* Top-level error banner */}
      {hasTopLevelError && (
        <div className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/[0.06] px-3 py-2.5">
          <AlertCircle className="h-3.5 w-3.5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-mono text-[0.65rem] font-bold text-rose-400 uppercase tracking-wider">
              NOTE COULD NOT BE SUBMITTED
            </p>
            <p className="text-[0.65rem] text-rose-400/80">Please try again.</p>
          </div>
        </div>
      )}

      {/* 1. Rating Selector */}
      <div className="space-y-1.5">
        <label className="font-mono text-[0.62rem] font-bold text-white/80 uppercase tracking-wider block">
          HOW WAS YOUR EXPERIENCE? <span className="text-accent">*</span>
        </label>
        <LabNoteRating
          value={fields.rating}
          onChange={(r) => setField("rating", r)}
          disabled={isSubmitting}
        />
        {errors.rating && (
          <p className="font-mono text-[0.65rem] text-rose-400 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {errors.rating}
          </p>
        )}
      </div>

      {/* 2. Name & Email */}
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1">
          <label
            htmlFor="note-name"
            className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block"
          >
            NAME <span className="text-white/40 font-normal">(OPTIONAL)</span>
          </label>
          <input
            id="note-name"
            type="text"
            placeholder="Your name or blank for Anonymous"
            value={fields.name}
            onChange={(e) => setField("name", e.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white placeholder:text-white/25 outline-none focus:border-accent/50"
          />
          {errors.name && (
            <p className="font-mono text-[0.62rem] text-rose-400">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1">
          <label
            htmlFor="note-email"
            className="font-mono text-[0.62rem] font-bold text-white/70 uppercase tracking-wider block"
          >
            EMAIL <span className="text-white/40 font-normal">(OPTIONAL)</span>
          </label>
          <input
            id="note-email"
            type="email"
            placeholder="your.email@example.com"
            value={fields.email}
            onChange={(e) => setField("email", e.target.value)}
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

      {/* Honeypot (hidden from real users, filled by bots) */}
      <input
        type="text"
        name="website"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }}
        defaultValue=""
      />

      {/* 3. Message Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="note-message"
            className="font-mono text-[0.62rem] font-bold text-white/80 uppercase tracking-wider block"
          >
            WHAT STOOD OUT TO YOU? <span className="text-accent">*</span>
          </label>
          <span className="font-mono text-[0.6rem] text-white/40">
            {fields.message.length} / 500
          </span>
        </div>
        <textarea
          id="note-message"
          rows={4}
          placeholder="Tell me what you liked, what surprised you, or what could be improved..."
          value={fields.message}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              setField("message", e.target.value);
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
            const isSelected = fields.context === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setField("context", isSelected ? undefined : opt)}
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
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-accent/20 border border-accent/40 px-6 py-2.5 font-mono text-xs font-bold text-accent transition-all hover:bg-accent hover:text-slate-950 uppercase tracking-wider disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>NOTE SUBMITTING...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5" />
              <span>Submit Lab Note</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
