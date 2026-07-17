// lib/appwrite/collections.ts
import { DATABASE_ID, LEADS_COLLECTION, PROJECTS_COLLECTION, DONATIONS_COLLECTION } from "./client";

export const COLLECTIONS = {
  LEADS: LEADS_COLLECTION,
  PROJECTS: PROJECTS_COLLECTION,
  DONATIONS: DONATIONS_COLLECTION,
} as const;

// Lead Types
export type LeadStatus = "new" | "contacted" | "converted" | "archived";
export type LeadType = "form" | "whatsapp" | "email";

export interface Lead {
  $id: string;
  name: string;
  business: string;
  email?: string;
  phone?: string;
  message: string;
  source?: string;
  page?: string;
  type: LeadType;
  status: LeadStatus;
  convertedAt?: string;
  metadata?: Record<string, unknown>;
  $createdAt: string;
  $updatedAt: string;
}

// Project Types
export interface Project {
  $id: string;
  title: string;
  category: string;
  location: string;
  result: string;
  tags: string[];
  slug: string;
  images?: string;
  challenge?: string;
  approach?: string;
  published: string | boolean;
  featured: boolean;
  featuredImage?: string;
  order: number;
  $createdAt: string;
  $updatedAt: string;
}

// Donation Types
export type DonationStatus = "pending" | "success" | "failed";

export interface Donation {
  $id: string;
  name: string;
  email: string;
  amount: number;
  currency: string;
  orderId: string;
  paymentId?: string;
  status: DonationStatus;
  message?: string;
  anonymous: boolean;
  $createdAt: string;
  $updatedAt: string;
}

// Re-export everything
export { 
  DATABASE_ID, 
  LEADS_COLLECTION, 
  PROJECTS_COLLECTION, 
  DONATIONS_COLLECTION 
};