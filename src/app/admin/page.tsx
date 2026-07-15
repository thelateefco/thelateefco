"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";

// Only these emails can access the admin dashboard
const ALLOWED_EMAILS = [
  "slatif200426@gmail.com",
  "thelateefco@gmail.com", // Add other emails if needed
];

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

    useEffect(() => {
    const isLoggedIn = sessionStorage.getItem("adminLoggedIn");
    if (isLoggedIn === "true") {
      router.push("/admin/dashboard");
    } else {
      router.push("/admin/login");
    }
  }, [router]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple validation - you can replace with actual auth later
    if (email && password) {
      // Check if email is allowed
      if (!ALLOWED_EMAILS.includes(email)) {
        setError("Access denied. Only authorized admins can log in.");
        setIsLoading(false);
        return;
      }

      // Check password (you can use environment variable)
      const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
      
      if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem("adminLoggedIn", "true");
        sessionStorage.setItem("adminEmail", email);
        router.push("/admin/dashboard");
      } else {
        setError("Invalid password. Please try again.");
      }
    } else {
      setError("Please enter both email and password.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] px-4">
      <div className="w-full max-w-md bg-[#FFFFFF] rounded-[8px] border border-[#E8E8EC] p-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#000000] rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-[#F5F5F7]" />
          </div>
          <h1 className="font-serif text-[1.5rem] font-medium text-[#000000]">
            Admin Access
          </h1>
          <p className="text-[0.875rem] text-[#8A8A8A] font-light mt-1">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                placeholder="your@email.com"
                className="w-full pl-7 bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
                autoFocus
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
              placeholder="Enter admin password"
              className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
              required
            />
          </div>

          {error && (
            <p className="text-[0.75rem] text-[#B91C1C]">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-6 py-3 rounded-[4px] transition-colors duration-300 ease-out bg-[#000000] text-[#F5F5F7] hover:bg-[#2E2E2E] active:bg-[#000000] cursor-pointer no-underline w-full mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Access Dashboard"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-[0.625rem] text-[#8A8A8A] font-light">
            Authorized access only. All access is logged.
          </p>
        </div>
      </div>
    </div>
  );
}