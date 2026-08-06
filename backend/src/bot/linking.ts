import { telBot } from "./bot"
import { pool } from "../config/db"

export const linkingToUsers = () => {
  telBot.command("start", async (ctx) => {
    const code = ctx.match?.trim()
    const chatId = ctx.chat.id

    if (!code) {
      await ctx.reply(
        "Welcome! Send /start <code> using the code shown in your dashboard to link your account."
      )
      return
    }

    const client = await pool.connect()
    try {
      await client.query("BEGIN")

      const { rows } = await client.query(
        `SELECT id, user_id, expires_at, used_at
         FROM telegram_link_codes
         WHERE code = $1
         FOR UPDATE`,
        [code]
      )

      const linkCode = rows[0]

      if (!linkCode) {
        await ctx.reply("That code isn't valid. Please generate a new one from your dashboard.")
        await client.query("ROLLBACK")
        return
      }

      if (linkCode.used_at) {
        await ctx.reply("That code has already been used.")
        await client.query("ROLLBACK")
        return
      }

      if (new Date(linkCode.expires_at) < new Date()) {
        await ctx.reply("That code has expired. Please generate a new one.")
        await client.query("ROLLBACK")
        return
      }

      await client.query(
        `UPDATE users SET telegram_chat_id = $1 WHERE id = $2`,
        [chatId, linkCode.user_id]
      )

      await client.query(
        `UPDATE telegram_link_codes SET used_at = NOW() WHERE id = $1`,
        [linkCode.id]
      )

      await client.query("COMMIT")
      await ctx.reply("✅ Your Telegram account is now linked!")
    } catch (err) {
      await client.query("ROLLBACK")
      console.error("Telegram linking error:", err)
      await ctx.reply("Something went wrong linking your account. Please try again.")
    } finally {
      client.release()
    }
  })
}