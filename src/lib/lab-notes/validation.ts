import type { LabNoteSubmission } from "./types";

export type ValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof LabNoteSubmission, string>>;
};

/**
 * Clean client-side validation for Lab Note submissions.
 * Prepares contracts for future server-side validation API.
 */
export function validateLabNoteSubmission(
  data: Partial<LabNoteSubmission>
): ValidationResult {
  const errors: Partial<Record<keyof LabNoteSubmission, string>> = {};

  // 1. Rating validation (required, 1–5)
  if (data.rating === undefined || data.rating === null || data.rating === 0) {
    errors.rating = "Please select a rating between 1 and 5 stars.";
  } else if (data.rating < 1 || data.rating > 5) {
    errors.rating = "Rating must be between 1 and 5 stars.";
  }

  // 2. Message validation (required, 10–500 chars)
  const trimmedMessage = data.message?.trim() || "";
  if (!trimmedMessage) {
    errors.message = "Please write a short note about your experience.";
  } else if (trimmedMessage.length < 10) {
    errors.message = "Note is too short. Minimum 10 characters required.";
  } else if (trimmedMessage.length > 500) {
    errors.message = "Note exceeds maximum limit of 500 characters.";
  }

  // 3. Name validation (optional, max 50 chars)
  const trimmedName = data.name?.trim() || "";
  if (trimmedName && trimmedName.length > 50) {
    errors.name = "Name must not exceed 50 characters.";
  }

  // 4. Email validation (optional, format check)
  const trimmedEmail = data.email?.trim() || "";
  if (trimmedEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
