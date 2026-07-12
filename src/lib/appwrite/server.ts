"use server";

import { ID, Query, Models } from "appwrite";
import { databases } from "./client";
import { DATABASE_ID, LEADS_COLLECTION, PROJECTS_COLLECTION } from "./collections";
import type { Lead, Project } from "./collections";

// ── Type Definitions ──────────────────────────────

interface CreateLeadData {
  name: string;
  business: string;
  email?: string;
  phone?: string;
  message: string;
  source?: string;
  page?: string;
  type: "form" | "whatsapp" | "email";
  status: "new" | "contacted" | "converted" | "archived";
}

// ── Helper to check if Appwrite is configured ──

function isAppwriteConfigured(): boolean {
  if (!DATABASE_ID || !LEADS_COLLECTION || !PROJECTS_COLLECTION) {
    console.warn("⚠️ Appwrite not fully configured:", {
      DATABASE_ID: DATABASE_ID || "❌ Missing",
      LEADS_COLLECTION: LEADS_COLLECTION || "❌ Missing",
      PROJECTS_COLLECTION: PROJECTS_COLLECTION || "❌ Missing",
    });
    return false;
  }
  return true;
}

// ── Leads Functions ────────────────────────────────

export async function createLead(data: CreateLeadData) {
  if (!isAppwriteConfigured()) {
    console.error("❌ Cannot create lead: Appwrite not configured");
    return { 
      success: false, 
      error: "Appwrite is not configured properly. Please check your environment variables." 
    };
  }

  try {
    const result = await databases.createDocument(
      DATABASE_ID,
      LEADS_COLLECTION,
      ID.unique(),
      {
        ...data,
        createdAt: new Date().toISOString(),
      }
    );
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Error creating lead:", error);
    return { success: false, error: "Failed to save lead" };
  }
}

export async function getLeads(limit = 100) {
  if (!isAppwriteConfigured()) {
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      LEADS_COLLECTION,
      [
        Query.orderDesc("createdAt"),
        Query.limit(limit),
      ]
    );
    return { 
      success: true, 
      data: result.documents as unknown as Lead[] 
    };
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    return { success: false, error: "Failed to fetch leads" };
  }
}

// ── Projects Functions ──────────────────────────────

export async function getProjects(publishedOnly = true) {
  if (!isAppwriteConfigured()) {
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const queries: string[] = [
      Query.orderAsc("order"),
      Query.limit(100),
    ];
    
    if (publishedOnly) {
      queries.push(Query.equal("published", true));
    }

    const result = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION,
      queries
    );
    return { 
      success: true, 
      data: result.documents as unknown as Project[] 
    };
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}

export async function getProjectBySlug(slug: string) {
  if (!isAppwriteConfigured()) {
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION,
      [
        Query.equal("slug", slug),
        Query.equal("published", true),
        Query.limit(1),
      ]
    );
    
    if (result.documents.length === 0) {
      return { success: false, error: "Project not found" };
    }
    
    return { 
      success: true, 
      data: result.documents[0] as unknown as Project 
    };
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    return { success: false, error: "Failed to fetch project" };
  }
}