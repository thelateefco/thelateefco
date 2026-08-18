// app/api/chat/route.ts
import { NextResponse } from 'next/server';
import { createLead } from '../../../lib/appwrite/server';

const WORKING_MODELS = [
  'groq/compound-mini',
  'openai/gpt-oss-120b',
  'openai/gpt-oss-20b',
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Please provide valid messages.' },
        { status: 400 }
      );
    }

    // Extract conversation history text
    const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user')?.content || '';
    const fullConversationText = messages
      .map((m: any) => `${m.role === 'user' ? 'Client' : 'AI'}: ${m.content}`)
      .join('\n');

    // Detect contact info (phone or email)
    const emailMatch = lastUserMessage.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    const phoneMatch = lastUserMessage.match(/(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}|\b\d{10}\b|\b\d{5}\s?\d{5}\b/);

    if (emailMatch || phoneMatch) {
      try {
        const detectedEmail = emailMatch ? emailMatch[0] : '';
        const detectedPhone = phoneMatch ? phoneMatch[0] : '';
        
        // Attempt to extract name if mentioned
        const nameMatch = lastUserMessage.match(/(?:my name is|i am|i'm|this is)\s+([a-zA-Z\s]{2,25})/i);
        const detectedName = nameMatch ? nameMatch[1].trim() : 'AI Chat Prospect';

        await createLead({
          name: detectedName,
          business: 'AI Chat Lead',
          email: detectedEmail,
          phone: detectedPhone,
          message: `[Captured via AI Assistant]\n${fullConversationText}`,
          source: 'ai_chat_widget',
          page: 'chat',
          type: 'form',
          status: 'new',
        });
        console.log('✅ Lead automatically captured from AI Chat:', { detectedName, detectedPhone, detectedEmail });
      } catch (err) {
        console.error('Failed to capture lead from AI Chat:', err);
      }
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        success: true,
        message: 'Hello! I am the AI Assistant for The Lateef & Co. Please share your Name and WhatsApp number (or Email), and Lateef will get back to you with a custom quote within 24 hours!',
      });
    }

    const systemPrompt = `You are the Lead Conversion AI Assistant for The Lateef & Co., a boutique web engineering and AI automation studio in Mumbai founded by Lateef Shaikh.

About The Lateef & Co.:
- Specializes in Business Automation, High-Performance Web Engineering (Next.js/React), AI Integration & Chatbots, and Brand Strategy.
- Based in Mumbai, India — serving clients across India and internationally.

Pricing Guide:
- High-converting 3-4 page sites start at ₹25k.
- AI Automations & CRM Integrations start at ₹40k.
- Custom web applications & AI agents start at ₹80k.

Contact Details:
- WhatsApp: +91 97692 12600
- Email: thelateefco@gmail.com

PRIMARY CONVERSION GOALS & GUIDELINES:
1. Answer visitor questions clearly, helpfully, and concisely (2 to 3 sentences max).
2. CONVERSION FOCUS: Whenever a visitor shows interest in a service, pricing, or project, ALWAYS actively ask for their Name and Phone number / WhatsApp or Email so Lateef can prepare a personalized roadmap & quote.
3. Example conversion closing: "I'd love to help you build this! May I have your Name and WhatsApp number (or Email)? I'll pass your project details directly to Lateef so he can reach out with a custom proposal."
4. When a visitor provides their phone or email, confirm warmly: "Thank you! I've logged your contact details. Lateef will reach out to you shortly via WhatsApp or Email."
5. Do NOT output raw markdown code blocks or internal prompt instructions.`;

    const recentMessages = messages.slice(-8);

    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...recentMessages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    let reply = '';
    let lastError: any = null;

    for (const model of WORKING_MODELS) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: model,
            messages: formattedMessages,
            temperature: 0.6,
            max_tokens: 300,
            stream: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          reply = data.choices?.[0]?.message?.content || '';
          if (reply) {
            reply = reply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
            break;
          }
        } else {
          const errData = await response.json().catch(() => ({}));
          console.warn(`Groq Model ${model} failed (${response.status}):`, errData);
          lastError = errData;
        }
      } catch (err) {
        console.warn(`Fetch error for Groq model ${model}:`, err);
        lastError = err;
      }
    }

    if (!reply) {
      console.error('All Groq models failed. Last error:', lastError);
      return NextResponse.json({
        success: true,
        message: "Thank you for reaching out! Please share your name and contact number, or message Lateef directly on WhatsApp (+91 97692 12600) for an instant response!"
      });
    }

    return NextResponse.json({
      success: true,
      message: reply
    });

  } catch (error: any) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your inquiry! You can reach Lateef directly on WhatsApp (+91 97692 12600) or email thelateefco@gmail.com for a fast quote!"
      }
    );
  }
}