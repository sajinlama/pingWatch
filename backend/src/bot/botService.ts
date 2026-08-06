import { randomBytes } from "crypto"
import { pool } from "../config/db"

export const createTelegramLinkCode = async (userId: string) => {
  const code = randomBytes(4).toString("hex") // e.g. "a1b2c3d4"
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 min

  await pool.query(
    `INSERT INTO telegram_link_codes (user_id, code, expires_at)
     VALUES ($1, $2, $3)`,
    [userId, code, expiresAt]
  )

  return code
}
