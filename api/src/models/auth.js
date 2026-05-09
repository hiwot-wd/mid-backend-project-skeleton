import db from "#configs/database.js";
import jwt from "jsonwebtoken";

//Fetch user by Id
export async function getUserById(id, options = {}) {
  const { trx } = options;

  return db("app_user")
    .select("id", "email", "created_at")
    .where({ id })
    .first()
    .transacting(trx);
}
//Signup user
export async function signupUser({ email, password }) {
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

//Find user by email

export async function findUserByEmail(email) {
  return db("app_user").where({ email }).first();
}

//Login user(New)
export async function loginUser({ email, password }) {
  const user = await findUserByEmail(email);

  if (!user || user.password !== password) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

  return token;
}
