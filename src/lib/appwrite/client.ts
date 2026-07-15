import { Client, Databases, Storage, Account } from "appwrite";

// Get environment variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const leadsCollection = process.env.NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION;
const projectsCollection = process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION;

// Validate environment variables
const isValid = endpoint && projectId;

if (!isValid) {
  console.error("❌ Appwrite: Missing required environment variables");
  console.error("  Endpoint:", endpoint ? "✅ Set" : "❌ Missing");
  console.error("  Project ID:", projectId ? "✅ Set" : "❌ Missing");
}

// Initialize Client
const client = new Client();

if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId);
}

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

// Export collection IDs with fallbacks
export const DATABASE_ID = databaseId || "";
export const LEADS_COLLECTION = leadsCollection || "leads";
export const PROJECTS_COLLECTION = projectsCollection || "projects";

export default client;

// Helper to check if Appwrite is configured
export function isAppwriteConfigured(): boolean {
  return !!(endpoint && projectId);
}