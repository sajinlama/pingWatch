import dotenv from "dotenv";
import app from "./app.ts";
import { connectDB } from "./config/db.ts";

dotenv.config();

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Connect to PostgreSQL
    await connectDB();

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();