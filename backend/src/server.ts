import dotenv from "dotenv";
import app from "./app.ts";
import { connectDB } from "./config/db.ts";
import { telBot } from "./bot/bot"
import { linkingToUsers } from "./bot/linking"

dotenv.config();

const PORT = process.env.PORT || 3001;

let server: ReturnType<typeof app.listen>;

const startServer = async () => {
  try {
    await connectDB();

    linkingToUsers();

    telBot.start({
      onStart: (botInfo) => {
        console.log(`✅ Telegram bot @${botInfo.username} started`);
      },
    }).catch((err) => {
      console.error("Telegram bot crashed:", err);
    });

    // Start Express server
    server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

const shutdown = async (signal: string) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  try {
    await telBot.stop(); 
    console.log("✅ Telegram bot stopped");
  } catch (err) {
    console.error("Error stopping bot:", err);
  }

  if (server) {
    server.close(() => {
      console.log(" HTTP server closed");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.once("SIGINT", () => shutdown("SIGINT"));   // Ctrl+C
process.once("SIGTERM", () => shutdown("SIGTERM")); // process managers, Docker stop
process.once("SIGUSR2", async () => {                // nodemon restart signal
  await telBot.stop();
  process.kill(process.pid, "SIGUSR2");
});

startServer();