import { z } from "zod";


export const monitorStatusEnum = z.enum(["UP", "DOWN", "UNKNOWN", "PAUSED"]);
export type MonitorStatus = z.infer<typeof monitorStatusEnum>;


const name = z.string().trim().min(1, "Name is required").max(255).optional();

const url = z
  .string()
  .trim()
  .min(1, "URL is required")
  .url("Must be a valid URL")
  .max(2048);

const checkIntervalSeconds = z
  .number()
  .int()
  .min(30, "check_interval_seconds must be >= 30")
  .default(300);

const timeoutSeconds = z
  .number()
  .int()
  .positive("timeout_seconds must be > 0")
  .default(30);

const isActive = z.boolean().default(true);


export const createMonitorSchema = z.object({
  name,
  url,
  check_interval_seconds: checkIntervalSeconds,
  timeout_seconds: timeoutSeconds,
  is_active: isActive,
});
export type CreateMonitorInput = z.infer<typeof createMonitorSchema>;

// ---- Update payload: all fields optional, at least one required ----
export const updateMonitorSchema = createMonitorSchema
  .partial()
  .extend({
    status: monitorStatusEnum.optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });
export type UpdateMonitorInput = z.infer<typeof updateMonitorSchema>;

// ---- Full row: shape returned from the DB (e.g. after a SELECT) ----
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