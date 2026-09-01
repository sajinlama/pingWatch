import { pool } from "../config/db";

const query = `
  SELECT code
  FROM telegram_link_codes
  WHERE user_id = $1
  ORDER BY created_at DESC
  LIMIT 1
`;

export const getCode = async (userId: string): Promise<string | null> => {
  const result = await pool.query(query, [userId]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0].code;
};


export const getTelegramLinkStatus = async (userId: string): Promise<boolean> => {
  const { rows } = await pool.query(
    `SELECT telegram_chat_id FROM users WHERE id = $1`,
    [userId]
  )
  return !!rows[0]?.telegram_chat_id
}