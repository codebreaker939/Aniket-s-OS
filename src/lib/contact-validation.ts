import type { ContactMessageForm } from "./contact-data";

export type ContactValidationResult = {
  isValid: boolean;
  errors: Partial<Record<keyof ContactMessageForm, string>>;
};

/**
 * Client-side validation for contact form messages.
 * Prepares contracts for future POST /api/contact endpoint.
 */
export function validateContactForm(
  data: Partial<ContactMessageForm>
): ContactValidationResult {
  const errors: Partial<Record<keyof ContactMessageForm, string>> = {};

  // 1. Name validation
  const name = data.name?.trim() || "";
  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters.";
  } else if (name.length > 50) {
    errors.name = "Name cannot exceed 50 characters.";
  }

  // 2. Email validation
  const email = data.email?.trim() || "";
  if (!email) {
    errors.email = "Please enter your email address.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Please enter a valid email address.";
    }
  }

  // 3. Subject validation
  const subject = data.subject?.trim() || "";
  if (!subject) {
    errors.subject = "Please enter a message subject.";
  } else if (subject.length < 5) {
    errors.subject = "Subject must be at least 5 characters.";
  } else if (subject.length > 100) {
    errors.subject = "Subject cannot exceed 100 characters.";
  }

  // 4. Message validation
  const message = data.message?.trim() || "";
  if (!message) {
    errors.message = "Please enter your message.";
  } else if (message.length < 10) {
    errors.message = "Message must be at least 10 characters.";
  } else if (message.length > 500) {
    errors.message = "Message cannot exceed 500 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
