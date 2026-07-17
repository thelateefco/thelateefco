// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { success: false, message: 'Service temporarily unavailable. Please contact us directly.' },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid messages.' },
        { status: 400 }
      );
    }

    const systemPrompt = `You are an AI assistant for The Lateef & Co., a premium web design studio in Mumbai.

About the company:
- Specializes in Web Design, Development, and AI Automation
- Based in Mumbai, India
- Works with clients locally and internationally
- Builds websites that bring in customers

Services:
1. Web Design: User-centered design, responsive layouts, brand identity
2. Development: Next.js, React, TypeScript, performance
3. AI Automation: Lead capture, chatbots, workflow automation

Contact:
- WhatsApp: +91 97692 12600
- Email: thelateefco@gmail.com

Be helpful, professional, and warm. Keep responses short (2-3 sentences).`;

    // Only keep last 10 messages to prevent token overflow
    const recentMessages = messages.slice(-10);
    
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...recentMessages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      }))
    ];

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 300,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Groq API error:', response.status, errorData);
      
      if (response.status === 401) {
        return NextResponse.json(
          { success: false, message: 'Service temporarily unavailable. Please contact us directly.' },
          { status: 401 }
        );
      }
      
      if (response.status === 429) {
        return NextResponse.json(
          { success: false, message: 'High traffic. Please wait a moment and try again.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { success: false, message: 'Having trouble responding. Please try again later.' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'I\'m sorry, I couldn\'t generate a response.';

    return NextResponse.json({
      success: true,
      message: reply
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Having trouble responding. Please try again later.'
      },
      { status: 500 }
    );
  }
}