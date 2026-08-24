import { z } from "zod";

// ---- Status Enum ----
export const monitorStatusEnum = z.enum(["UP", "DOWN", "UNKNOWN", "PAUSED"]);
export type MonitorStatus = z.infer<typeof monitorStatusEnum>;

// ---- Shared Field Validations ----
const name = z.string().trim().min(1, "Name is required").max(255).optional();

// Strict HTTPS validator requiring standard double slashes 'https://'
const url = z
  .string()
  .trim()
  .min(1, "URL is required")
  .max(2048)
  .regex(
    /^https:\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+(:\d+)?(\/.*)?$/,
    "Must be a valid HTTPS URL with double slashes (e.g., https://example.com)"
  )
  .refine(
    (val) => {
      try {
        const parsed = new URL(val);
        return parsed.protocol === "https:" && parsed.hostname.includes(".");
      } catch {
        return false;
      }
    },
    { message: "Invalid URL structure" }
  );

const timeoutSeconds = z
  .number()
  .int()
  .positive("timeout_seconds must be > 0")
  .default(30);

const isActive = z.boolean().default(true);

// ---- Create Payload Schema ----
// Accepts either `duration` or `check_interval_seconds` and normalizes to `check_interval_seconds`
export const createMonitorSchema = z
  .object({
    name,
    url,
    duration: z
      .number()
      .int()
      .min(30, "duration must be >= 30 seconds")
      .optional(),
    check_interval_seconds: z
      .number()
      .int()
      .min(30, "check_interval_seconds must be >= 30")
      .optional(),
    timeout_seconds: timeoutSeconds,
    is_active: isActive,
  })
  .strict()
  .transform((data) => ({
    name: data.name,
    url: data.url,
    check_interval_seconds: data.duration ?? data.check_interval_seconds ?? 300,
    timeout_seconds: data.timeout_seconds,
    is_active: data.is_active,
  }));

export type CreateMonitorInput = z.infer<typeof createMonitorSchema>;

// ---- Update Payload Schema: all fields optional, at least one required ----
const updateBaseSchema = z
  .object({
    name,
    url,
    duration: z
      .number()
      .int()
      .min(30, "duration must be >= 30 seconds")
      .optional(),
    check_interval_seconds: z
      .number()
      .int()
      .min(30, "check_interval_seconds must be >= 30")
      .optional(),
    timeout_seconds: z.number().int().positive().optional(),
    is_active: z.boolean().optional(),
    status: monitorStatusEnum.optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  })
  .transform((data) => ({
    ...data,
    ...(data.duration !== undefined || data.check_interval_seconds !== undefined
      ? { check_interval_seconds: data.duration ?? data.check_interval_seconds }
      : {}),
  }));

export const updateMonitorSchema = updateBaseSchema;
export type UpdateMonitorInput = z.infer<typeof updateMonitorSchema>;

// ---- Full DB Row Schema (shape returned from Postgres / Prisma) ----
export const monitorSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),

  name: z.string().nullable(),
  url,

  status: monitorStatusEnum,

  check_interval_seconds: z.number().int().min(30),
  timeout_seconds: z.number().int().positive(),

  http_status: z.number().int().nullable(),
  response_time: z.number().int().min(0).nullable(), // ms
  last_checked: z.coerce.date().nullable(),

  is_active: z.boolean(),

  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type Monitor = z.infer<typeof monitorSchema>;