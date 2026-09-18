import { z } from "zod";

/**
 * Shared Zod schemas. Backend persistence (Supabase) lands in Part 8 —
 * schemas live here so forms and future API handlers share one source.
 */

export const PROJECT_TYPES = [
  "Custom Script",
  "Channel Review",
  "Partnership",
  "Other",
] as const;

export const customScriptSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  email: z.email("Enter a valid email address"),
  whatsapp: z
    .string()
    .regex(/^\+?[0-9][0-9\s-]{8,14}$/, "Enter a valid WhatsApp number"),
  projectType: z.enum(PROJECT_TYPES),
  message: z
    .string()
    .min(10, "Tell us a little more (10+ characters)")
    .max(1000, "Keep it under 1000 characters"),
});

export type CustomScriptFormValues = z.infer<typeof customScriptSchema>;

/* ---------- Contact page ---------- */

export const CONTACT_SUBJECTS = [
  "General Inquiry",
  "Custom Script",
  "Partnership",
  "Support",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  email: z.email("Enter a valid email address"),
  whatsapp: z
    .string()
    .regex(/^\+?[0-9][0-9\s-]{8,14}$/, "Enter a valid WhatsApp number"),
  subject: z.enum(CONTACT_SUBJECTS),
  message: z
    .string()
    .min(10, "Tell us a little more (10+ characters)")
    .max(1000, "Keep it under 1000 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
