import { signupUser, loginUser, getUserById } from "#models/auth.js";
import { AuthSignupInput, AuthLoginInput } from "#schemas/auth.js";

export async function signup(req, res, next) {
  try {
    const input = AuthSignupInput.parse(req.body);
    const user = await signupUser(input);
    res.status(201).json({ data: user });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const input = AuthLoginInput.parse(req.body);
    const token = await loginUser(input);
    res.json({ data: { token } });
  } catch (error) {
    next(error);
  }
}

export async function me(req, res, next) {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
}
