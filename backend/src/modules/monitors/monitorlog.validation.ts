import { z } from "zod";

export const monitorSchema = z.object({
  id: z.string().uuid().optional(),
  user_id: z.string().uuid({ message: "Invalid user ID" }),

  name: z.string().min(1, { message: "Website name is required" }).nullable().optional(),
  url: z.string().url({ message: "Please enter a valid URL (e.g., https://example.com)" }),

  status: z.enum(["UP", "DOWN", "DEGRADED", "UNKNOWN"]).default("UNKNOWN"),

  check_interval_seconds: z
    .number()
    .int()
    .min(300, { message: "Minimum monitoring interval is 5 minutes (300 seconds)" })
    .default(300),
  timeout_seconds: z
    .number()
    .int()
    .gt(0)
    .max(60, { message: "Timeout cannot exceed 60 seconds" })
    .default(30),

  http_status: z.number().int().nullable().optional(),
  response_time: z.number().int().nonnegative().nullable().optional(),
  last_checked: z.coerce.date().nullable().optional(),

  is_active: z.boolean().default(true),

  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
});

export type Monitor = z.infer<typeof monitorSchema>;

// Input payload schema for creation (omits DB-generated/runtime fields)
export const createMonitorSchema = monitorSchema.omit({
  id: true,
  status: true,
  http_status: true,
  response_time: true,
  last_checked: true,
  created_at: true,
  updated_at: true,
});

export type CreateMonitorInput = z.infer<typeof createMonitorSchema>;