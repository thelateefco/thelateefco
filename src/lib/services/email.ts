// lib/services/email.ts
import emailjs from '@emailjs/browser';

// Your EmailJS credentials - UPDATED
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_bme08a7';
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_mer23ah';
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'HrbzK74Yex5Bscnqo';

interface EmailData {
  name: string;
  business: string;
  email: string;
  message: string;
  source?: string;
  page?: string;
}

export async function sendEmail(data: EmailData): Promise<{ success: boolean; error?: string }> {
  try {
    // Initialize with correct Public Key
    emailjs.init(PUBLIC_KEY);

    const templateParams = {
      from_name: data.name,
      from_email: data.email || 'No email provided',
      to_email: 'thelateefco@gmail.com',
      business: data.business,
      message: data.message,
      source: data.source || 'website',
      page: data.page || 'contact',
    };

    console.log('📧 Sending email with params:', templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('📧 EmailJS response:', response);

    if (response.status === 200) {
      console.log('✅ Email sent successfully!');
      return { success: true };
    } else {
      console.error('❌ Email send failed:', response);
      return { success: false, error: 'Failed to send email' };
    }
  } catch (error: any) {
    console.error('❌ EmailJS error:', error?.text || error?.message || error);
    return { 
      success: false, 
      error: error?.text || error?.message || 'Failed to send email' 
    };
  }
}