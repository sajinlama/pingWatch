import { randomBytes } from "crypto"
import { pool } from "../config/db"

export const generateCode = (): string => {
  return randomBytes(4).toString("hex")
}

export const createTelegramLinkCode = async (userId: string): Promise<string> => {
  const code = generateCode()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) 

  await pool.query(
    `INSERT INTO telegram_link_codes (user_id, code, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, code, expiresAt]
  )

  return code
}

export const getTelegramLinkStatus = async (userId: string): Promise<boolean> => {
  const { rows } = await pool.query(
    `SELECT telegram_chat_id FROM users WHERE id = $1`,
    [userId]
  )
  return !!rows[0]?.telegram_chat_id
}