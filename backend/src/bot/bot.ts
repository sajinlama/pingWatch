import { Bot } from "grammy";
import dotenv from "dotenv"

dotenv.config()

export const telBot = new Bot(process.env.TELEGRAM_BOT_TOKEN!)

