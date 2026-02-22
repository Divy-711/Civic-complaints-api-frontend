"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { sendOtp, verifyOtp, setPassword, loginPassword } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/file-complaint";
  const { setPhone } = useAuth();
  const [phoneInput, setPhoneInput] = useState("");
  const [password, setPasswordInput] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"password" | "otp-sent" | "verify-otp" | "set-password">("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const phone = phoneInput.replace(/\D/g, "");

  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await loginPassword(phone, password);
      if (data.error) {
        setError(data.error);
        return;
      }
      setPhone(phone);
      router.push(redirectTo);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendOtp() {
    if (phone.length !== 10) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await sendOtp(phone);
      if (data.error) {
        setError(data.error);
        return;
      }
      setStep("otp-sent");
      setOtp("");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Enter 6-digit OTP");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await verifyOtp(phone, otp);
      if (data.error) {
        setError(data.error);
        return;
      }
      setStep("set-password");
      setNewPassword("");
    } finally {
      setLoading(false);
    }
  }

  async function handleSetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const data = await setPassword(phone, newPassword);
      if (data.error) {
        setError(data.error);
        return;
      }
      setPhone(phone);
      router.push(redirectTo);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card p-8 shadow-lg">
          <div className="text-center mb-8">
            <span className="text-4xl">🇮🇳</span>
            <h1 className="mt-2 text-2xl font-bold text-stone-800">AI Grievance Portal</h1>
            <p className="mt-1 text-sm text-stone-500">Sign in to file and track complaints</p>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-stone-700">Mobile number</label>
            <div className="flex gap-2">
              <span className="flex items-center rounded-lg border border-stone-300 bg-stone-50 px-3 text-stone-600">+91</span>
              <input
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ""))}
                className="input flex-1"
              />
            </div>
          </div>

          {step === "password" && (
            <form onSubmit={handlePasswordLogin} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="input mt-1"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="btn btn-primary w-full py-2.5" disabled={loading}>
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>
          )}

          {step === "password" && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading || phone.length !== 10}
                className="text-sm text-primary hover:underline"
              >
                First time? Login with OTP
              </button>
            </div>
          )}

          {step === "otp-sent" && (
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
              <p className="text-sm text-stone-600">OTP sent to +91 {phone}. Check server console for dev OTP.</p>
              <div>
                <label className="block text-sm font-medium text-stone-700">Enter OTP</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="input mt-1 text-center text-lg tracking-widest"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="btn btn-primary w-full py-2.5" disabled={loading || otp.length !== 6}>
                {loading ? "Verifying…" : "Verify OTP"}
              </button>
              <button type="button" onClick={() => setStep("password")} className="btn btn-secondary w-full py-2 text-sm">
                Back
              </button>
            </form>
          )}

          {step === "set-password" && (
            <form onSubmit={handleSetPassword} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700">Set password (for next time)</label>
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="input mt-1"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="btn btn-primary w-full py-2.5" disabled={loading}>
                {loading ? "Setting…" : "Set password & continue"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-stone-500">
          <Link href="/" className="text-primary hover:underline">Continue as guest</Link>
        </p>
      </div>
    </div>
  );
}
