// app/api/donation-stats/route.ts
import { NextResponse } from 'next/server';
import { listDocuments } from '../../../lib/appwrite/server-fetch';

export async function GET() {
  try {
    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const DONATIONS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_DONATIONS_COLLECTION || 'donations';

    if (!DATABASE_ID) {
      return NextResponse.json(
        { error: 'Database configuration error' },
        { status: 500 }
      );
    }

    // ✅ Use listDocuments directly
    const result = await listDocuments(
      DATABASE_ID,
      DONATIONS_COLLECTION,
      []
    );

    // Calculate total amount from successful donations
    let totalAmount = 0;
    let donorCount = 0;
    
    if (result && result.documents) {
      result.documents.forEach((doc: any) => {
        if (doc.status === 'success') {
          totalAmount += doc.amount || 0;
          donorCount++;
        }
      });
    }

    return NextResponse.json({
      success: true,
      totalAmount: totalAmount,
      donorCount: donorCount,
      totalDonations: result?.total || 0,
    });

  } catch (error: any) {
    console.error('❌ Error fetching donation stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donation stats' },
      { status: 500 }
    );
  }
}