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
  $createdAt: string;
  $updatedAt: string;
}
export interface Project {
  $id: string;
  title: string;
  category: string;
  location: string;
  result: string;
  tags: string[];
  slug: string;
  images?: string;           // Single text field (not array)
  challenge?: string;
  approach?: string;
  published: string | boolean;
  featured: boolean;
  featuredImage?: string;
  order: number;
  $createdAt: string;
  $updatedAt: string;
}
export { DATABASE_ID, LEADS_COLLECTION, PROJECTS_COLLECTION };