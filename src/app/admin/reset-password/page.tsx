"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { account } from "../../../lib/appwrite/client";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const userId = searchParams?.get("userId");
    const secret = searchParams?.get("secret");

    if (userId && secret) {
      setToken(`${userId}:${secret}`);
    } else {
      setError("Invalid or expired reset link. Please request a new one.");
    }
  }, [searchParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const [userId, secret] = token.split(":");
      await account.updateRecovery(userId, secret, password);
      
      setSuccessMessage("Password reset successfully!");
      setTimeout(() => {
        router.push("/admin/login");
      }, 2000);
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(err?.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] px-4">
      <div className="w-full max-w-md bg-[#FFFFFF] rounded-[8px] border border-[#E8E8EC] p-8 shadow-sm">
        <button
          onClick={() => router.push("/admin/login")}
          className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#000000] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[0.75rem] font-light">Back to Login</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-[#F5F5F7]" />
          </div>
          <h1 className="font-serif text-[1.5rem] font-medium text-[#000000]">
            Set New Password
          </h1>
          <p className="text-[0.875rem] text-[#8A8A8A] font-light mt-1">
            Enter your new password below
          </p>
        </div>

        {error && <p className="text-[0.75rem] text-[#B91C1C] mb-4">{error}</p>}
        {successMessage && (
          <p className="text-[0.75rem] text-[#10B981] mb-4">{successMessage}</p>
        )}

        <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
          <div>
            <label htmlFor="new-password" className="label text-[0.55rem] text-[#8A8A8A] mb-1 block">
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (min 8 characters)"
              className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
              required
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="confirm-new-password" className="label text-[0.55rem] text-[#8A8A8A] mb-1 block">
              Confirm New Password
            </label>
            <input
              id="confirm-new-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className="inline-flex items-center justify-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-6 py-3 rounded-[4px] transition-colors duration-300 ease-out bg-[#000000] text-[#F5F5F7] hover:bg-[#2E2E2E] active:bg-[#000000] cursor-pointer no-underline w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}