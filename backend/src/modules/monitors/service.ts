import { pool } from "../../config/db.js";
import type { CreateMonitorInput, Monitor } from "./validation.js";

type CreateMonitorParams = CreateMonitorInput & { user_id: string };

const createMonitorUrl = async (
  data: CreateMonitorParams
): Promise<Monitor> => {
  const {
    user_id,
    name,
    url,
    check_interval_seconds,
    timeout_seconds,
    is_active,
  } = data;

  // 1. Check if the URL already exists for THIS user
  const existingUrl = await pool.query(
    `SELECT id FROM monitors WHERE user_id = $1 AND url = $2`,
    [user_id, url]
  );

  if (existingUrl.rows.length > 0) {
    const error = new Error("URL already exists");
    (error as any).statusCode = 409; // Conflict
    throw error;
  }

  // 2. Insert if not existing
  const result = await pool.query<Monitor>(
    `INSERT INTO monitors (user_id, name, url, check_interval_seconds, timeout_seconds, is_active)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      user_id,
      name ?? null,
      url,
      check_interval_seconds ?? 300,
      timeout_seconds ?? 30,
      is_active ?? true,
    ]
  );

  return result.rows[0];
};

export default createMonitorUrl;