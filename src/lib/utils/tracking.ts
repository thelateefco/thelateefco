// lib/utils/tracking.ts
"use client";

import { trackWhatsAppClick as trackWhatsAppClickServer, trackEmailClick as trackEmailClickServer } from "../appwrite/server";

type ConversionType = 
  | "whatsapp_click"
  | "email_click"
  | "form_submission"
  | "cta_click"
  | "phone_click";

interface ConversionData {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  message?: string;
  page?: string;
  source?: string;
  [key: string]: unknown;
}

export function trackConversion(type: ConversionType, data?: ConversionData): void {
  console.log(`[Conversion] ${type}:`, {
    timestamp: new Date().toISOString(),
    ...data,
  });

  // Google Analytics
  if (typeof window !== "undefined" && (window as any).gtag) {
    try {
      (window as any).gtag("event", type, {
        ...data,
        event_category: "conversion",
      });
    } catch {
      // Silently fail
    }
  }
}

export async function trackWhatsAppClick(page?: string, data?: { name?: string; business?: string; email?: string; phone?: string; message?: string }): Promise<void> {
  trackConversion("whatsapp_click", { page, ...data });
  
  try {
    await trackWhatsAppClickServer({
      name: data?.name || "WhatsApp Click",
      business: data?.business || "Click Tracking",
      email: data?.email || "",
      phone: data?.phone || "",
      message: data?.message || `WhatsApp click on ${page || "unknown page"}`,
      source: "website",
      page: page || "unknown",
    });
    console.log("✅ WhatsApp click tracked in Appwrite");
  } catch (error) {
    console.error("Failed to track WhatsApp click in Appwrite:", error);
  }
}

export async function trackEmailClick(page?: string, data?: { name?: string; business?: string; email?: string; phone?: string; message?: string }): Promise<void> {
  trackConversion("email_click", { page, ...data });
  
  try {
    await trackEmailClickServer({
      name: data?.name || "Email Click",
      business: data?.business || "Click Tracking",
      email: data?.email || "",
      phone: data?.phone || "",
      message: data?.message || `Email click on ${page || "unknown page"}`,
      source: "website",
      page: page || "unknown",
    });
    console.log("✅ Email click tracked in Appwrite");
  } catch (error) {
    console.error("Failed to track Email click in Appwrite:", error);
  }
}

export function trackCTAClick(cta: string, page?: string): void {
  trackConversion("cta_click", { cta, page });
}