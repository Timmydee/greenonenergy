"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export function useAuth() {
  const [user, setUser] = useState<{ role: string } | null>(null);

  const fetchSession = async () => {
    try {
      const response = await axios.get("/api/auth/session", {
        withCredentials: true,
      });
      const userData = response.data?.user || null;
      setUser(userData);
      return userData;
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return { user, fetchSession };
}
