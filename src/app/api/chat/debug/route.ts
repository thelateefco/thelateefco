// app/api/chat/debug/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const hasKey = !!process.env.GROQ_API_KEY;
  const keyLength = process.env.GROQ_API_KEY?.length || 0;
  
  return NextResponse.json({
    hasApiKey: hasKey,
    keyLength: keyLength,
    environment: process.env.NODE_ENV,
    message: hasKey ? '✅ API key found!' : '❌ API key missing!'
  });
}