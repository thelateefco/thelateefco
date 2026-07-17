// app/api/test-appwrite/route.ts
import { NextResponse } from 'next/server';
import { adminDatabases } from '../../../lib/appwrite/server-admin';

export async function GET() {
  try {
    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const DONATIONS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_DONATIONS_COLLECTION || 'donations';

    console.log('🔍 Testing Appwrite connection...');

    if (!DATABASE_ID) {
      return NextResponse.json({
        success: false,
        error: 'DATABASE_ID is not set',
        env: {
          hasEndpoint: !!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
          hasProjectId: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
          hasDatabaseId: !!DATABASE_ID,
          hasApiKey: !!process.env.APPWRITE_API_KEY,
        }
      }, { status: 500 });
    }

    // Try to list documents
    const result = await adminDatabases.listDocuments(
      DATABASE_ID,
      DONATIONS_COLLECTION,
      []
    );

    return NextResponse.json({
      success: true,
      message: '✅ Appwrite connection successful!',
      totalDocuments: result.total,
      env: {
        hasEndpoint: !!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
        hasProjectId: !!process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
        hasDatabaseId: !!DATABASE_ID,
        hasApiKey: !!process.env.APPWRITE_API_KEY,
      }
    });
  } catch (error: any) {
    console.error('❌ Appwrite test failed:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      type: error.type,
    }, { status: 500 });
  }
}