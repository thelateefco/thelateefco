import { DATABASE_ID, LEADS_COLLECTION, PROJECTS_COLLECTION } from "./client";

export const COLLECTIONS = {
  LEADS: LEADS_COLLECTION,
  PROJECTS: PROJECTS_COLLECTION,
} as const;

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
  createdAt: string;
}

export interface Project {
  $id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  result: string;
  tags: string[];
  challenge?: string;
  approach?: string;
  images?: string[];
  featuredImage?: string;
  published: boolean;
  order: number;
  createdAt: string;
}

// Export for easy access
export { DATABASE_ID, LEADS_COLLECTION, PROJECTS_COLLECTION };