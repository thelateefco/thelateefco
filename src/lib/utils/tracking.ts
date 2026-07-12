"use client";

type ConversionType =
  | "whatsapp_click"
  | "email_click"
  | "form_submission"
  | "cta_click"
  | "phone_click";

interface ConversionData {
  name?: string;
  business?: string;
  page?: string;
  source?: string;
  [key: string]: unknown;
}

export function trackConversion(type: ConversionType, data?: ConversionData): void {
  console.log(`[Conversion] ${type}:`, {
    timestamp: new Date().toISOString(),
    ...data,
  });

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

export function trackWhatsAppClick(page?: string): void {
  trackConversion("whatsapp_click", { page });
}

export function trackEmailClick(page?: string): void {
  trackConversion("email_click", { page });
}

export function trackCTAClick(cta: string, page?: string): void {
  trackConversion("cta_click", { cta, page });
}