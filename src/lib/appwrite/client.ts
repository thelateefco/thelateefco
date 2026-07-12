import { Client, Databases, Storage } from "appwrite";

// Get environment variables
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const leadsCollection = process.env.NEXT_PUBLIC_APPWRITE_LEADS_COLLECTION;
const projectsCollection = process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION;

// Log what's available (for debugging)
console.log("🔧 Appwrite Config:", {
  endpoint: endpoint ? "✅ Set" : "❌ Missing",
  projectId: projectId ? "✅ Set" : "❌ Missing",
  databaseId: databaseId ? "✅ Set" : "❌ Missing",
  leadsCollection: leadsCollection ? "✅ Set" : "❌ Missing",
  projectsCollection: projectsCollection ? "✅ Set" : "❌ Missing",
});

// Initialize Client
const client = new Client();

if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId);
} else {
  console.error("❌ Appwrite: Missing endpoint or project ID");
}

export const databases = new Databases(client);
export const storage = new Storage(client);

// Export collection IDs with fallbacks
export const DATABASE_ID = databaseId || "";
export const LEADS_COLLECTION = leadsCollection || "leads";
export const PROJECTS_COLLECTION = projectsCollection || "projects";

export default client;