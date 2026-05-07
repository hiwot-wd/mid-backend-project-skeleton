import db from "#configs/database.js";
import jwt from "jsonwebtoken";

/**
 * Create a new user
 * Used by POST /api/auth/signup
 */
export async function createUser({ email, password }) {
  const existing = await db("app_user").where({ email }).first();

  if (existing) {
    const error = new Error("Email already exists");
    error.status = 400;
    throw error;
  }

  const user = await db("app_user")
    .insert({
      email,
      password,
    })
    .returning(["id", "email", "created_at"])
    .then((rows) => rows[0]);

  return user;
}

/**
 * Find user by email
 * Used by login
 */
export async function findUserByEmail(email) {
  return db("app_user").where({ email }).first();
}

/**
 * Create JWT for a user
 */
export function createJwtForUser(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

/**
 * Get user by ID
 * Used by GET /api/auth/me
 */
export async function findUserById(id) {
  return db("app_user")
    .select("id", "email", "created_at")
    .where({ id })
    .first();
}
