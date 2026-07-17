// lib/appwrite/server-client.ts
import { Client, Databases } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const apiKey = process.env.APPWRITE_API_KEY || '';

console.log('🔑 Server Appwrite Client:');
console.log('  Endpoint:', endpoint ? '✅' : '❌');
console.log('  Project ID:', projectId ? '✅' : '❌');
console.log('  API Key:', apiKey ? '✅ (starts with: ' + apiKey.substring(0, 10) + '...)' : '❌');

// Create a wrapper class that handles headers properly
class AppwriteServerClient {
  private databases: Databases;
  
  constructor() {
    const client = new Client()
      .setEndpoint(endpoint)
      .setProject(projectId);
    
    // Override the fetch method
    // @ts-ignore - Override internal fetch
    client['fetch'] = async (url: string, options: RequestInit = {}) => {
      const headers = new Headers(options.headers || {});
      
      // Add required headers
      headers.set('X-Appwrite-Key', apiKey);
      headers.set('X-Appwrite-Project', projectId);
      headers.set('Content-Type', 'application/json');
      
      // For GET requests, remove Content-Type
      if (options.method === 'GET') {
        headers.delete('Content-Type');
      }
      
      console.log('📤 Request:', url);
      console.log('📤 Headers:', Object.fromEntries(headers));
      
      const response = await fetch(url, {
        ...options,
        headers,
      });
      
      return response;
    };
    
    this.databases = new Databases(client);
  }
  
  // Wrapper methods
  async createDocument(databaseId: string, collectionId: string, documentId: string, data: any) {
    return this.databases.createDocument(databaseId, collectionId, documentId, data);
  }
  
  async listDocuments(databaseId: string, collectionId: string, queries: string[] = []) {
    return this.databases.listDocuments(databaseId, collectionId, queries);
  }
  
  async getDocument(databaseId: string, collectionId: string, documentId: string) {
    return this.databases.getDocument(databaseId, collectionId, documentId);
  }
  
  async updateDocument(databaseId: string, collectionId: string, documentId: string, data: any) {
    return this.databases.updateDocument(databaseId, collectionId, documentId, data);
  }
  
  async deleteDocument(databaseId: string, collectionId: string, documentId: string) {
    return this.databases.deleteDocument(databaseId, collectionId, documentId);
  }
}

export const serverDatabases = new AppwriteServerClient();
export default serverDatabases;