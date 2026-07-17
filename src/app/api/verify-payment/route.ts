// app/api/verify-payment/route.ts
import { NextResponse } from 'next/server';
import { adminDatabases } from '../../../lib/appwrite/server-admin';
import { ID } from 'appwrite';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils';

export async function POST(req: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      name,
      email,
      amount,
      message,
      anonymous 
    } = await req.json();

    console.log('📩 Verifying payment...');

    const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
    const DONATIONS_COLLECTION = process.env.NEXT_PUBLIC_APPWRITE_DONATIONS_COLLECTION || 'donations';

    if (!DATABASE_ID) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Verify Razorpay signature using SDK
    const isValid = validatePaymentVerification({
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id
    }, razorpay_signature, process.env.RAZORPAY_KEY_SECRET!);

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 }
      );
    }

    // Create donation in Appwrite
    const donation = await adminDatabases.createDocument(
      DATABASE_ID,
      DONATIONS_COLLECTION,
      ID.unique(),
      {
        name: anonymous ? 'Anonymous' : name,
        email: anonymous ? 'anonymous@donation' : email,
        amount: amount / 100,
        currency: 'INR',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        status: 'success',
        message: message || '',
        anonymous: anonymous || false,
      }
    );

    console.log('✅ Donation stored:', donation.$id);

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully!',
      donationId: donation.$id,
    });

  } catch (error: any) {
    console.error('❌ Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to verify payment' },
      { status: 500 }
    );
  }
}