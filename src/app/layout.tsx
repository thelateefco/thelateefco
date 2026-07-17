import type { Metadata } from "next";
import { Toaster } from "sonner";
import PageTransition from "../components/animations/PageTransition";
import PageLoader from "../components/animations/PageLoader";
import "./globals.css";
import AIChatWidget from "../components/ai/AIChatWidget";

export const metadata: Metadata = {
  title: "The Lateef & Co. — Web Design & Development Studio, Mumbai",

   icons: {
    icon: "/images/projects/icon.png",
    shortcut: "/images/projects/icon.png",
    apple: "/images/projects/icon.png",
  },
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
    url: "https://thelateefco.com",
    siteName: "The Lateef & Co.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Lateef & Co. — Web Design & Development Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Lateef & Co. — Web Design & Development Studio",
    description:
      "We build websites that bring in customers — not just ones that sit there looking pretty.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "",
  },
  alternates: {
    canonical: "https://thelateefco.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
       
      </head>
      <body className="cursor-auto">
        <PageLoader />
        <PageTransition>{children}</PageTransition>
        <AIChatWidget />

        <Toaster
          position="bottom-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            style: {
              background: "#1A1A1A",
              color: "#ECE6DF",
              border: "1px solid #2E2E2E",
              borderRadius: "0px",
              fontFamily: "'Inter', system-ui, sans-serif",
            },
            className: "font-light",
            duration: 5000,
          }}
          theme="dark"
        />
      </body>
    </html>
  );
}