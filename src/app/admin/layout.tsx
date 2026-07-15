import type { Metadata } from "next";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard — The Lateef & Co.",
  description: "Admin dashboard for managing leads and projects.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {children}
    </div>
  );
}