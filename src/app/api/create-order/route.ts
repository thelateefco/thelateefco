// app/api/create-order/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Check if environment variables are set
if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error('❌ Missing Razorpay environment variables!');
}

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR' } = await req.json();

    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum donation is ₹1.' },
        { status: 400 }
      );
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency,
      receipt: `donation_${Date.now()}`,
      payment_capture: 1,
      notes: {
        purpose: 'Donation for a cause',
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error: any) {
    console.error('❌ Error creating order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order. Please try again.' },
      { status: 500 }
    );
  }
}