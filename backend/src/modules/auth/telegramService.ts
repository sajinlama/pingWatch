import { randomBytes } from "crypto";
import { pool } from "../../config/db";
export const getCode = ():string=>{
    const code = randomBytes(4).toString("hex")
    return code 
}

export const createTelegramLinkCode = async (userId: string): Promise<string> => {
  const code = getCode()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) 

 const result = await pool.query(
    `INSERT INTO telegram_link_codes (user_id, code, expires_at)
     VALUES ($1, $2, $3)
        RETURNING *`,
    [userId, code, expiresAt]
  )
  console.log(result.rows,"this is result form the auth ")

  return code
}
