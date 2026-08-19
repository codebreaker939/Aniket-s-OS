import { z } from "zod";
import { LAB_NOTE_CONTEXT_OPTIONS } from "@/lib/lab-notes/types";

/**
 * Server-side Zod schema for POST /api/lab-notes request body.
 *
 * The honeypot field MUST be an empty string — any bot that fills it in
 * will fail validation silently (same 400 as any other bad input).
 *
 * Note: Updated for Zod v4 API (required_error → message, errorMap → error).
 */
export const labNoteSubmitSchema = z.object({
  rating: z
    .number({ message: "Rating must be a number between 1 and 5." })
    .int("Rating must be a whole number.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating must be at most 5."),

  name: z
    .string()
    .trim()
    .max(50, "Name must not exceed 50 characters.")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(200, "Email must not exceed 200 characters.")
    .optional()
    .or(z.literal(""))
    .transform((v) => (v === "" ? undefined : v)),

  message: z
    .string({ message: "Message is required." })
    .trim()
    .min(10, "Note is too short. Minimum 10 characters required.")
    .max(500, "Note exceeds maximum limit of 500 characters."),

  context: z
    .enum(LAB_NOTE_CONTEXT_OPTIONS as [string, ...string[]])
    .optional()
    .or(z.literal("").transform(() => undefined)),

  // Honeypot — bots fill this in, humans leave it empty
  honeypot: z.literal("", { message: "Invalid submission." }),
});

export type LabNoteSubmitInput = z.infer<typeof labNoteSubmitSchema>;
