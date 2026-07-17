// lib/appwrite/server-admin.ts
import { Client, Databases } from 'node-appwrite';

// Create client
const client = new Client();

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

if (endpoint && projectId) {
  client.setEndpoint(endpoint).setProject(projectId);
}

if (apiKey) {
  client.setKey(apiKey);
  console.log('✅ Server admin client initialized with node-appwrite');
}

export const adminDatabases = new Databases(client);
export default client;