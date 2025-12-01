import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import { LoginInput, RegisterInput } from "../validation/auth.schema";
import {
  createUser,
  findByEmail,
  findUserById,
} from "../services/user.service";
import { generateTokens, verifyToken } from "../utils/jwt";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies";

export const register = asyncHandler(
  async (req: Request<{}, {}, RegisterInput>, res: Response) => {
    const { name, email, phoneNumber, password } = req.body;
    const newUser = await createUser({
      name,
      email,
      phoneNumber,
      password,
    });
    const { accessToken, refreshToken } = generateTokens({
      userId: String(newUser._id),
      role: newUser.role,
    });
    setAuthCookies({ res, accessToken, refreshToken });
    return res.status(201).json({
      message: "Account created successfully",
      user: newUser.omitPassword(),
      refreshToken,
      accessToken,
    });
  }
);

export const login = asyncHandler(
  async (req: Request<{}, {}, LoginInput>, res: Response) => {
    const { email, password } = req.body;

    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = generateTokens({
      userId: String(user._id),
      role: user.role,
    });

    setAuthCookies({ res, accessToken, refreshToken });

    return res.status(200).json({
      message: "Login successful",
      user: user.omitPassword(),
      refreshToken,
      accessToken,
    });
  }
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  //TODO: change to access token
  const accessToken =
    req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];

  const payload = verifyToken(accessToken || "");

  if (!payload) {
    return res.status(400).json({ message: "No refresh token provided" });
  }

  res.cookie("jwt", "", { maxAge: 0 });

  clearAuthCookies(res);

  return res.json({ message: "Logged out successfully" });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId as string;

  const user = await findUserById(userId);
  return res
    .status(200)
    .json({ message: "Profile fetched successfully", user });
});

export const refreshHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const refreshToken =
      req.cookies?.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token provided" });
    }

    const payload = verifyToken(refreshToken);
    if (!payload) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const { userId, role } = payload;

    const { accessToken: newAccessToken } = generateTokens({
      userId,
      role,
    });

    clearAuthCookies(res);

    setAuthCookies({
      res,
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    });

    return res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: refreshToken,
    });
  }
);
