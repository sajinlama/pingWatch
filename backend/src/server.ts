import dotenv from "dotenv";
import app from "./app.ts";
import { connectDB } from "./config/db.ts";
import { telBot } from "./bot/bot"
import { linkingToUsers } from "./bot/linking"

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Connect to PostgreSQL
    await connectDB();

    // Start Express server
    linkingToUsers()

telBot.start().catch((err) => {
  console.error("Telegram bot crashed:", err)
})
console.log("✅ Telegram bot starting (long polling)")
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();