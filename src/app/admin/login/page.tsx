"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Loader2, ArrowLeft, Key } from "lucide-react";
import { account } from "../../../lib/appwrite/client";
import { ID } from "appwrite";

// Only these emails can access the admin dashboard
const ALLOWED_EMAILS = [
  "slatif200426@gmail.com",
  "thelateefco@gmail.com",
];

function AdminLoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    const checkSession = async () => {
      try {
        const session = await account.get();
        if (session && ALLOWED_EMAILS.includes(session.email)) {
          // Already logged in, redirect to dashboard
          router.replace("/admin/dashboard");
          return;
        }
      } catch {
        // Not logged in - stay on login page
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkSession();
  }, [router]);

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#000000] border-t-transparent rounded-full animate-spin" />
          <span className="label text-[#8A8A8A]">Loading...</span>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (!ALLOWED_EMAILS.includes(email)) {
        setError("Access denied. Only authorized admins can log in.");
        setIsLoading(false);
        return;
      }

      await account.createEmailPasswordSession(email, password);
      const user = await account.get();
      
      sessionStorage.setItem("adminLoggedIn", "true");
      sessionStorage.setItem("adminEmail", user.email);
      sessionStorage.setItem("adminName", user.name || "");
      
      router.replace("/admin/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err?.message?.includes("Invalid credentials")) {
        setError("Invalid email or password. Please try again.");
      } else if (err?.message?.includes("User not found")) {
        setError("Account not found. Please sign up first.");
      } else {
        setError(err?.message || "Invalid email or password");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (!ALLOWED_EMAILS.includes(email)) {
        setError("Access denied. Only authorized admins can sign up.");
        setIsLoading(false);
        return;
      }

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

      await account.create(ID.unique(), email, password, name);
      
      setSuccessMessage("Account created successfully! Please login.");
      setIsLogin(true);
      setPassword("");
      setConfirmPassword("");
      
      // Auto-login after signup
      await account.createEmailPasswordSession(email, password);
      
      sessionStorage.setItem("adminLoggedIn", "true");
      sessionStorage.setItem("adminEmail", email);
      sessionStorage.setItem("adminName", name);
      
      router.replace("/admin/dashboard");
    } catch (err: any) {
      console.error("Signup error:", err);
      if (err?.message?.includes("already exists")) {
        setError("This email is already registered. Please login.");
      } else {
        setError(err?.message || "Failed to create account");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      if (!ALLOWED_EMAILS.includes(email)) {
        setError("Access denied. Only authorized admins can reset password.");
        setIsLoading(false);
        return;
      }

      await account.createRecovery(email, `${window.location.origin}/admin/reset-password`);
      
      setSuccessMessage("Password reset link sent to your email!");
      setEmail("");
      setIsForgotPassword(false);
    } catch (err: any) {
      console.error("Forgot password error:", err);
      setError(err?.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password View
  if (isForgotPassword) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] px-4">
        <div className="w-full max-w-md bg-[#FFFFFF] rounded-[8px] border border-[#E8E8EC] p-8 shadow-sm">
          <button
            onClick={() => {
              setIsForgotPassword(false);
              setError("");
              setSuccessMessage("");
            }}
            className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#000000] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[0.75rem] font-light">Back to Login</span>
          </button>

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-4">
              <Key className="w-5 h-5 text-[#F5F5F7]" />
            </div>
            <h1 className="font-serif text-[1.5rem] font-medium text-[#000000]">
              Reset Password
            </h1>
            <p className="text-[0.875rem] text-[#8A8A8A] font-light mt-1">
              Enter your email to receive a reset link
            </p>
          </div>

          <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
            <div>
              <label htmlFor="reset-email" className="label text-[0.55rem] text-[#8A8A8A] mb-1 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
                <input
                  id="reset-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-7 bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
                  required
                />
              </div>
            </div>

            {error && <p className="text-[0.75rem] text-[#B91C1C]">{error}</p>}
            {successMessage && (
              <p className="text-[0.75rem] text-[#10B981]">{successMessage}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-6 py-3 rounded-[4px] transition-colors duration-300 ease-out bg-[#000000] text-[#F5F5F7] hover:bg-[#2E2E2E] active:bg-[#000000] cursor-pointer no-underline w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Main Login/Signup View
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] px-4">
      <div className="w-full max-w-md bg-[#FFFFFF] rounded-[8px] border border-[#E8E8EC] p-8 shadow-sm">
        {/* Back to Home */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-[#8A8A8A] hover:text-[#000000] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-[0.75rem] font-light">Back to Home</span>
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-[#F5F5F7]" />
          </div>
          <h1 className="font-serif text-[1.5rem] font-medium text-[#000000]">
            {isLogin ? "Admin Login" : "Create Account"}
          </h1>
          <p className="text-[0.875rem] text-[#8A8A8A] font-light mt-1">
            {isLogin ? "Sign in to access the dashboard" : "Create your admin account"}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#FEE2E2] border border-[#B91C1C] rounded-[4px]">
            <p className="text-[0.75rem] text-[#B91C1C]">{error}</p>
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-[#D1FAE5] border border-[#10B981] rounded-[4px]">
            <p className="text-[0.75rem] text-[#10B981]">{successMessage}</p>
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleSignUp} className="flex flex-col gap-4">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="label text-[0.55rem] text-[#8A8A8A] mb-1 block">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-7 bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="label text-[0.55rem] text-[#8A8A8A] mb-1 block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A8A8A]" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-7 bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="label text-[0.55rem] text-[#8A8A8A] mb-1 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={isLogin ? "Enter your password" : "Create a strong password (min 8 characters)"}
              className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
              required
              minLength={8}
            />
          </div>

          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="label text-[0.55rem] text-[#8A8A8A] mb-1 block">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
                required
                minLength={8}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-6 py-3 rounded-[4px] transition-colors duration-300 ease-out bg-[#000000] text-[#F5F5F7] hover:bg-[#2E2E2E] active:bg-[#000000] cursor-pointer no-underline w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isLogin ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              isLogin ? "Access Dashboard" : "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#E8E8EC] flex flex-col items-center gap-3">
          {isLogin ? (
            <>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-[0.75rem] text-[#8A8A8A] hover:text-[#000000] transition-colors"
              >
                Don't have an account? <span className="text-[#000000] font-medium">Sign Up</span>
              </button>
              <button
                onClick={() => {
                  setIsForgotPassword(true);
                  setError("");
                  setSuccessMessage("");
                }}
                className="text-[0.7rem] text-[#4A6CF7] hover:text-[#000000] transition-colors hover:underline"
              >
                Forgot password?
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setIsLogin(true);
                setError("");
                setSuccessMessage("");
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-[0.75rem] text-[#8A8A8A] hover:text-[#000000] transition-colors"
            >
              Already have an account? <span className="text-[#000000] font-medium">Sign In</span>
            </button>
          )}
        </div>

        <div className="mt-4 text-center">
          <p className="text-[0.5rem] text-[#8A8A8A] font-light">
            Authorized access only. All access is logged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[#000000] border-t-transparent rounded-full animate-spin" />
          <span className="label text-[#8A8A8A]">Loading...</span>
        </div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  );
}