import { CreateMonitorInput, Monitor } from "./monitorlog.validation";

import { pool } from "../../config/db";

export const addMonitorValue = async (
  inputData: CreateMonitorInput
): Promise<Monitor> => {
  const {
    user_id,
    name,
    url,
    check_interval_seconds = 300,
    timeout_seconds = 30,
    is_active = true,
  } = inputData;

  const query = `
    INSERT INTO monitors (
      user_id,
      name,
      url,
      check_interval_seconds,
      timeout_seconds,
      is_active
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const values = [
    user_id,
    name ?? null,
    url,
    check_interval_seconds,
    timeout_seconds,
    is_active,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};