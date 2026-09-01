import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../config/db";
import { LoginInput, RegisterInput } from "./auth.validation.js";

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

interface UserRow {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}



const signToken = (userId: string) => {
  if (!JWT_SECRET) {
    throw new AppError(500, "JWT_SECRET is not configured on the server");
  }
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

// ── Register ────────────────────────────────────────────
export const registerUser = async (input: RegisterInput) => {
  if (!input?.email || !input?.password) {
    throw new AppError(400, "Email and password are required");
  }

  const existing = await pool.query<UserRow>(
    "SELECT id FROM users WHERE email = $1",
    [input.email]
  );

  if (existing.rows.length > 0) {
    throw new AppError(409, "An account with this email already exists");
  }

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);

  // Cleaned up INSERT — lets database handle gen_random_uuid() default
  const result = await pool.query<UserRow>(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [input.name, input.email, passwordHash]
  );

  const user = result.rows[0];
  const token = signToken(user.id);

  return { user, token };
};

// ── Login ───────────────────────────────────────────────
export const loginUser = async (input: LoginInput) => {
  if (!input?.email || !input?.password) {
    throw new AppError(400, "Email and password are required");
  }

  const result = await pool.query<UserRow>(
    "SELECT id, name, email, password_hash, created_at FROM users WHERE email = $1",
    [input.email]
  );

  const user = result.rows[0];

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(input.password, user.password_hash);
  if (!isMatch) {
    throw new AppError(401, "Invalid email or password");
  }

  const token = signToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
    token,
  };
};