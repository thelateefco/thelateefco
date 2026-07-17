// lib/appwrite/server-fetch.ts

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const apiKey = process.env.APPWRITE_API_KEY || '';

export async function serverFetch(
  method: string,
  path: string,
  data?: any
) {
  const url = `${endpoint}${path}`;
  
  const headers: Record<string, string> = {
    'X-Appwrite-Key': apiKey,
    'X-Appwrite-Project': projectId,
    'Content-Type': 'application/json',
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  
  if (!response.ok) {
    const errorText = await response.text();
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch {
      errorData = { message: errorText };
    }
    throw new Error(errorData.message || `HTTP Error ${response.status}`);
  }

  return response.json();
}

export async function createDocument(
  databaseId: string,
  collectionId: string,
  documentId: string,
  data: any
) {
  return serverFetch(
    'POST',
    `/databases/${databaseId}/collections/${collectionId}/documents`,
    { documentId, data }
  );
}

export async function listDocuments(
  databaseId: string,
  collectionId: string,
  queries: string[] = []
) {
  const queryString = queries.length > 0 
    ? `?queries=${queries.map(q => encodeURIComponent(q)).join('&queries=')}` 
    : '';
  return serverFetch(
    'GET',
    `/databases/${databaseId}/collections/${collectionId}/documents${queryString}`
  );
}