// src/store/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/axios";

type DecodedToken = {
  userId: string;
  role: string;
  exp: number;
};

// ⭐ SIGNUP
export const signUpThunk = createAsyncThunk(
  "auth/signup",
  async (
    {
      name,
      email,
      password,
      confirmPassword,
      phoneNumber,
    }: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      phoneNumber: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        confirmPassword,
        phoneNumber,
      });

      const user = res.data.user;
      const decoded: DecodedToken = jwtDecode(res.data.accessToken);

      return decoded && user;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Signup failed");
    }
  }
);

// ⭐ LOGIN
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const user = res.data.user;
      const decoded: DecodedToken = jwtDecode(res.data.accessToken);

      return decoded && user;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Login failed");
    }
  }
);

// ⭐ REFRESH TOKEN (Auto logout if no access token)
export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/refresh", {
        withCredentials: true,
      });

      const token = res.data?.accessToken;

      // ❗ If no access token → force logout
      if (!token) {
        return rejectWithValue("NO_ACCESS_TOKEN");
      }

      const decoded: DecodedToken = jwtDecode(token);

      return decoded;
    } catch (err) {
      return rejectWithValue("REFRESH_FAILED");
    }
  }
);

// ⭐ LOGOUT
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await api.post("/auth/logout");
  } catch (err) {}

  return true;
});
