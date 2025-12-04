// src/store/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

axios.defaults.withCredentials = true;

type DecodedToken = {
  userId: string;
  role: string;
  exp: number;
};

// SIGNUP
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
      const res = await axios.post(
        "http://localhost:3000/api/v1/auth/register",
        {
          name,
          email,
          password,
          confirmPassword,
          phoneNumber,
        }
      );

      // If backend returns user + token
      const user = res.data.user;
      const decoded: DecodedToken = jwtDecode(res.data.accessToken);

      return decoded && user;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message || "Signup failed");
    }
  }
);

// LOGIN
export const loginThunk = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", {
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

// REFRESH TOKEN
export const refreshThunk = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/auth/refresh", {
        withCredentials: true,
      });

      if (!res.data?.accessToken) {
        return rejectWithValue("No token");
      }

      const decoded: DecodedToken = jwtDecode(res.data.accessToken);
      return decoded;
    } catch (err) {
      return rejectWithValue("Refresh failed");
    }
  }
);

// LOGOUT
export const logoutThunk = createAsyncThunk("auth/logout", async () => {
  try {
    await axios.post("http://localhost:3000/api/v1/auth/logout");
  } catch (err) {}
  return true;
});
