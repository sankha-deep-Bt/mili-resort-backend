import { useState, useEffect, useCallback } from "react";
import api from "../utils/axios";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const useUser = () => {
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/auth/me", {
        withCredentials: true,
      });

      setProfile(res.data.user);
    } catch (err: any) {
      setProfile(null);
      setError(err.response?.data?.message || "Failed to fetch user");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    profile,
    loading,
    error,
    fetchUser, // expose refetch if needed
    isAdmin: profile?.role === "admin",
  };
};

export default useUser;
