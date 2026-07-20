// app/api/create-order/route.ts
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// ✅ CORRECT: Use the same names as in .env.local
const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

// Debug: Log what's happening
console.log('🔍 Checking environment variables:');
console.log('  KEY_ID exists?', !!keyId);
console.log('  KEY_ID starts with:', keyId?.substring(0, 10));
console.log('  KEY_SECRET exists?', !!keySecret);

if (!keyId || !keySecret) {
  console.error('❌ Missing Razorpay environment variables!');
  console.error('  NEXT_PUBLIC_RAZORPAY_KEY_ID:', keyId ? '✅ Set' : '❌ Missing');
  console.error('  RAZORPAY_KEY_SECRET:', keySecret ? '✅ Set' : '❌ Missing');
}

// Log which mode we're in (for debugging)
const isLiveMode = keyId?.startsWith('rzp_live_');
console.log(`🔑 Razorpay Mode: ${isLiveMode ? '🔴 LIVE' : '🧪 TEST'}`);

// Initialize Razorpay - ONLY if keys exist
if (!keyId || !keySecret) {
  throw new Error('Razorpay API keys are not configured. Please check your environment variables.');
}

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

export async function POST(req: Request) {
  try {
    const { amount, currency = 'INR' } = await req.json();

    console.log(`📝 Creating order: ₹${amount} ${currency}`);

    // Validate amount
    const numericAmount = Number(amount);

    if (!numericAmount || isNaN(numericAmount) || numericAmount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum donation is ₹1.' },
        { status: 400 }
      );
    }

    // Create order
    const options = {
      amount: Math.round(numericAmount * 100), // Convert to paise, guaranteed integer
      currency: currency,
      receipt: `donation_${Date.now()}`,
      payment_capture: 1, // Auto-capture
      notes: {
        purpose: 'Donation for a cause',
        timestamp: new Date().toISOString(),
      },
    };

    const order = await razorpay.orders.create(options);

    // ✅ FIX: Safely convert amount with proper type checking
    const orderAmount = order.amount;
    let orderAmountInRupees = 0;
    
    // Handle both number and string
    if (typeof orderAmount === 'number') {
      orderAmountInRupees = orderAmount / 100;
    } else if (typeof orderAmount === 'string') {
      orderAmountInRupees = parseFloat(orderAmount) / 100;
    } else {
      // Fallback: use the original amount
      orderAmountInRupees = numericAmount;
    }
    
    console.log(`✅ Order created: ${order.id} (₹${orderAmountInRupees.toFixed(2)})`);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error: any) {
    console.error('❌ Error creating order:', error);

    // Log full error details
    if (error.response) {
      console.error('📦 Error response:', JSON.stringify(error.response, null, 2));
    }

    // Return specific error messages
    if (error.code === 'BAD_REQUEST_ERROR') {
      return NextResponse.json(
        { error: 'Invalid request. Please check the amount and try again.' },
        { status: 400 }
      );
    }

    if (error.code === 'AUTHENTICATION_ERROR') {
      return NextResponse.json(
        { error: 'Payment gateway authentication failed. Please check your API keys.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'Failed to create order. Please try again.' },
      { status: 500 }
    );
  }
}