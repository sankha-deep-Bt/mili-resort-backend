// src/hooks/useAuth.ts
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/auth/authStore";
import { useEffect } from "react";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  signUpThunk,
} from "../store/auth/authThunks";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user, isAuth, isLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Auto refresh on mount
  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  // Helpers
  const login = (email: string, password: string) =>
    dispatch(loginThunk({ email, password }));

  const signUp = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    phoneNumber: string
  ) =>
    dispatch(
      signUpThunk({ name, email, password, confirmPassword, phoneNumber })
    );

  const logout = () => dispatch(logoutThunk());

  return {
    user,
    isAuth,
    isLoading,
    error,
    signUp,
    login,
    logout,
  };
};
