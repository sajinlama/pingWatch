import { Pool } from "pg";
import "dotenv/config";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();

    console.log("PostgreSQL connected successfully!");

    client.release();
  } catch (error) {
    console.error(" Database connection failed:", error);
    process.exit(1);
  }
};