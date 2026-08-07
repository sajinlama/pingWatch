import { pool } from "../../config/db.js";
import type { CreateMonitorInput, Monitor } from "./validation.js";

// The controller adds user_id after validation, since it isn't (and shouldn't be)
// part of the client-supplied payload.
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

  const result = await pool.query<Monitor>(
    `INSERT INTO monitors (user_id, name, url, check_interval_seconds, timeout_seconds, is_active)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [user_id, name ?? null, url, check_interval_seconds, timeout_seconds, is_active]
  );

  return result.rows[0];
};

export default createMonitorUrl;