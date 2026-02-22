"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const PHONE_KEY = "govapp_phone";

type AuthContextType = {
  phone: string | null;
  setPhone: (phone: string | null) => void;
  isLoggedIn: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [phone, setPhoneState] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = typeof window !== "undefined" ? localStorage.getItem(PHONE_KEY) : null;
    if (stored) setPhoneState(stored);
  }, []);

  const setPhone = (value: string | null) => {
    setPhoneState(value);
    if (typeof window !== "undefined") {
      if (value) localStorage.setItem(PHONE_KEY, value);
      else localStorage.removeItem(PHONE_KEY);
    }
  };

  return (
    <AuthContext.Provider value={{ phone, setPhone, isLoggedIn: !!phone }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
