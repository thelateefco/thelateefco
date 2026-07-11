import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Lateef & Co. — Web Design & Development Studio, Mumbai",
  description:
    "We build websites that bring in customers — not just ones that sit there looking pretty. Web design, development & AI automation for businesses in Mumbai and beyond.",
  keywords: [
    "web design Mumbai",
    "web development India",
    "AI automation",
    "boutique web studio",
    "The Lateef & Co",
  ],
  openGraph: {
    title: "The Lateef & Co. — Web Design & Development Studio",
    description:
      "We build websites that bring in customers — not just ones that sit there looking pretty.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
