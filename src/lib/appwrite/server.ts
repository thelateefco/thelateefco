"use server";

import { ID, Query } from "node-appwrite";
import { adminDatabases as databases } from "./server-admin";
import { DATABASE_ID, LEADS_COLLECTION, PROJECTS_COLLECTION } from "./collections";
import type { Lead, Project } from "./collections";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";

// ── Leads Functions ──────────────────────────────

interface CreateLeadData {
  name: string;
  business: string;
  email?: string;
  phone?: string;
  message: string;
  source?: string;
  page?: string;
  type: "form" | "whatsapp" | "email" | "whatsapp_click" | "email_click";
  status: "new" | "contacted" | "converted" | "archived";
}

export async function createLead(data: CreateLeadData) {
  if (!DATABASE_ID || !LEADS_COLLECTION) {
    console.error("❌ Appwrite not configured");
    return {
      success: false,
      error: "Appwrite is not configured properly.",
    };
  }

  try {
    const result = await databases.createDocument(
      DATABASE_ID,
      LEADS_COLLECTION,
      ID.unique(),
      {
        name: data.name,
        business: data.business,
        email: data.email || "",
        phone: data.phone || "",
        message: data.message,
        source: data.source || "website",
        page: data.page || "unknown",
        type: data.type || "form",
        status: data.status || "new",
      }
    );
    console.log("✅ Lead created in Appwrite:", result.$id);
    revalidatePath("/admin/dashboard");
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Error creating lead:", error);
    return { success: false, error: "Failed to save lead" };
  }
}

// ── Track WhatsApp Click ──────────────────────────

export async function trackWhatsAppClick(data: {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  page?: string;
}) {
  return await createLead({
    name: data.name || "WhatsApp Click",
    business: data.business || "Click Tracking",
    email: data.email || "",
    phone: data.phone || "",
    message: data.message || "User clicked on WhatsApp button",
    source: data.source || "website",
    page: data.page || "unknown",
    type: "whatsapp_click",
    status: "new",
  });
}

// ── Track Email Click ─────────────────────────────

export async function trackEmailClick(data: {
  name?: string;
  business?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
  page?: string;
}) {
  return await createLead({
    name: data.name || "Email Click",
    business: data.business || "Click Tracking",
    email: data.email || "",
    phone: data.phone || "",
    message: data.message || "User clicked on Email button",
    source: data.source || "website",
    page: data.page || "unknown",
    type: "email_click",
    status: "new",
  });
}

// ── Track WhatsApp Message ────────────────────────

export async function trackWhatsAppMessage(data: {
  name: string;
  business: string;
  email?: string;
  phone?: string;
  message: string;
  source?: string;
  page?: string;
}) {
  return await createLead({
    name: data.name,
    business: data.business,
    email: data.email || "",
    phone: data.phone || "",
    message: data.message,
    source: data.source || "whatsapp",
    page: data.page || "contact",
    type: "whatsapp",
    status: "new",
  });
}

export async function getLeads(limit = 100) {
  noStore();
  if (!DATABASE_ID || !LEADS_COLLECTION) {
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      LEADS_COLLECTION,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(limit),
      ]
    );
    return {
      success: true,
      data: result.documents as unknown as Lead[],
    };
  } catch (error) {
    console.error("❌ Error fetching leads:", error);
    return { success: false, error: "Failed to fetch leads" };
  }
}

// ── Update Lead Status ──────────────────────────────

export async function updateLeadStatus(leadId: string, status: string) {
  if (!DATABASE_ID || !LEADS_COLLECTION) {
    console.error("❌ Appwrite not configured");
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const result = await databases.updateDocument(
      DATABASE_ID,
      LEADS_COLLECTION,
      leadId,
      {
        status: status,
      }
    );
    console.log("✅ Lead status updated:", result.$id);
    revalidatePath("/admin/dashboard");
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Error updating lead status:", error);
    return { success: false, error: "Failed to update lead status" };
  }
}

// ── Delete Lead ──────────────────────────────────────

export async function deleteLead(leadId: string) {
  if (!DATABASE_ID || !LEADS_COLLECTION) {
    console.error("❌ Appwrite not configured");
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    await databases.deleteDocument(
      DATABASE_ID,
      LEADS_COLLECTION,
      leadId
    );
    console.log("✅ Lead deleted:", leadId);
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting lead:", error);
    return { success: false, error: "Failed to delete lead" };
  }
}

// ── Projects Functions ──────────────────────────────

export async function getFeaturedProjects(limit = 3) {
  if (!DATABASE_ID || !PROJECTS_COLLECTION) {
    console.error("❌ Appwrite not configured for projects");
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION,
      [
        Query.equal("published", "true"),
        Query.equal("featured", true),
        Query.orderAsc("order"),
        Query.limit(limit),
      ]
    );

    const projects = result.documents.map((doc) => ({
      ...doc,
      published: doc.published === "true",
      featured: doc.featured === true,
    }));

    return {
      success: true,
      data: projects as unknown as Project[],
    };
  } catch (error) {
    console.error("❌ Error fetching featured projects:", error);
    return { success: false, error: "Failed to fetch featured projects" };
  }
}

export async function getProjects(publishedOnly = true) {
  if (!DATABASE_ID || !PROJECTS_COLLECTION) {
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const queries: string[] = [
      Query.orderAsc("order"),
      Query.limit(100),
    ];

    if (publishedOnly) {
      queries.push(Query.equal("published", "true"));
    }

    const result = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION,
      queries
    );

    const projects = result.documents.map((doc) => ({
      ...doc,
      published: doc.published === "true",
      featured: doc.featured === true,
    }));

    return {
      success: true,
      data: projects as unknown as Project[],
    };
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return { success: false, error: "Failed to fetch projects" };
  }
}

export async function getProjectBySlug(slug: string) {
  if (!DATABASE_ID || !PROJECTS_COLLECTION) {
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const result = await databases.listDocuments(
      DATABASE_ID,
      PROJECTS_COLLECTION,
      [
        Query.equal("slug", slug),
        Query.equal("published", "true"),
        Query.limit(1),
      ]
    );

    if (result.documents.length === 0) {
      return { success: false, error: "Project not found" };
    }

    const project = {
      ...result.documents[0],
      published: result.documents[0].published === "true",
      featured: result.documents[0].featured === true,
    };

    return {
      success: true,
      data: project as unknown as Project,
    };
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    return { success: false, error: "Failed to fetch project" };
  }
}

export async function createProject(data: {
  title: string;
  slug: string;
  category: string;
  location: string;
  result: string;
  tags: string[];
  images?: string[];
  challenge?: string;
  approach?: string;
  published: boolean;
  featured: boolean;
  featuredImage?: string;
  order?: number;
}) {
  if (!DATABASE_ID || !PROJECTS_COLLECTION) {
    return { success: false, error: "Appwrite not configured" };
  }

  try {
    const result = await databases.createDocument(
      DATABASE_ID,
      PROJECTS_COLLECTION,
      ID.unique(),
      {
        title: data.title,
        slug: data.slug,
        category: data.category,
        location: data.location,
        result: data.result,
        tags: data.tags || [],
        images: data.images || [],
        challenge: data.challenge || "",
        approach: data.approach || "",
        published: data.published ? "true" : "false",
        featured: data.featured,
        featuredImage: data.featuredImage || "",
        order: data.order || 0,
      }
    );
    return { success: true, data: result };
  } catch (error) {
    console.error("❌ Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}