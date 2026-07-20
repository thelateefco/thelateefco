// components/forms/DonationForm.tsx
"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Heart, Shield, Lock } from 'lucide-react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function DonationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: 500,
    message: '',
    anonymous: false,
  });

  const presetAmounts = [10, 100, 500, 1000, 2500, 5000];

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.amount < 1) {
      toast.error('Minimum donation is ₹1');
      return;
    }

    setIsLoading(true);

    try {
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error('Failed to load payment gateway. Please try again.');
        setIsLoading(false);
        return;
      }

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: formData.amount,
          currency: 'INR',
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'The Lateef & Co.',
        description: `Donation - ₹${formData.amount}`,
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone || '',
        },
        notes: {
          message: formData.message,
          anonymous: formData.anonymous ? 'Yes' : 'No',
        },
        theme: {
          color: '#000000',
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
            toast.info('Payment cancelled');
          },
        },
        handler: async function(response: any) {
          try {
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                name: formData.name,
                email: formData.email,
                amount: formData.amount,
                message: formData.message,
                anonymous: formData.anonymous,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              toast.success('Thank you for your generous donation! 🙏');
              setFormData({
                name: '',
                email: '',
                phone: '',
                amount: 500,
                message: '',
                anonymous: false,
              });
            } else {
              toast.error(verifyData.error || 'Payment verification failed');
            }
          } catch (error) {
            console.error('Verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          } finally {
            setIsLoading(false);
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error: any) {
      console.error('Donation error:', error);
      toast.error(error.message || 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  const isLiveMode = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID?.startsWith('rzp_live_');

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Minimal Header */}
      <div className="flex items-center gap-2 pb-1 border-b border-[#E8E8EC]">
        <Heart className="w-4 h-4 text-[#B91C1C]" />
        <span className="font-serif text-base font-medium text-[#1A1A1A]">
Donate for a cause        </span>
        {isLiveMode ? (
          <span className="ml-auto text-[0.5rem] text-green-600 font-light flex items-center gap-1">
            <Lock className="w-2.5 h-2.5" />
            Secure
          </span>
        ) : (
          <span className="ml-auto text-[0.5rem] text-yellow-600 font-light">🔬 Test</span>
        )}
      </div>

      {/* ✅ Name with label */}
      <div>
        <label className="block text-[0.65rem] font-light text-[#4A4A4A] uppercase tracking-wider mb-1.5">
          Full Name <span className="text-[#B91C1C]">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-3 py-2.5 bg-[#F5F5F7] border border-[#E8E8EC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-transparent text-sm placeholder:text-[#8A8A8A]"
          placeholder="Enter your full name"
          required
        />
      </div>

      {/* ✅ Email with label */}
      <div>
        <label className="block text-[0.65rem] font-light text-[#4A4A4A] uppercase tracking-wider mb-1.5">
          Email Address <span className="text-[#B91C1C]">*</span>
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-3 py-2.5 bg-[#F5F5F7] border border-[#E8E8EC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-transparent text-sm placeholder:text-[#8A8A8A]"
          placeholder="Enter your email"
          required
        />
      </div>

      {/* ✅ Phone with label */}
      <div>
        <label className="block text-[0.65rem] font-light text-[#4A4A4A] uppercase tracking-wider mb-1.5">
          Phone Number <span className="text-[#8A8A8A]">(for UPI)</span>
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-3 py-2.5 bg-[#F5F5F7] border border-[#E8E8EC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-transparent text-sm placeholder:text-[#8A8A8A]"
          placeholder="Enter your phone number"
        />
      </div>

      {/* ✅ Amount with label */}
      <div>
        <label className="block text-[0.65rem] font-light text-[#4A4A4A] uppercase tracking-wider mb-1.5">
          Donation Amount <span className="text-[#B91C1C]">*</span>
        </label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {presetAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setFormData({ ...formData, amount })}
              className={`px-3 py-1 text-xs rounded-full border transition-all ${
                formData.amount === amount
                  ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                  : 'bg-[#FFFFFF] text-[#1A1A1A] border-[#E8E8EC] hover:border-[#000000]'
              }`}
            >
              ₹{amount}
            </button>
          ))}
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] text-sm">₹</span>
          <input
            type="number"
            min={isLiveMode ? 100 : 1}
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) || 0 })}
            className="w-full pl-7 pr-3 py-2.5 bg-[#F5F5F7] border border-[#E8E8EC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-transparent text-sm placeholder:text-[#8A8A8A]"
            placeholder="Custom amount"
          />
        </div>
        {isLiveMode && (
          <p className="text-[0.5rem] text-[#8A8A8A] mt-1">Minimum donation: ₹10</p>
        )}
      </div>

      {/* ✅ Message with label */}
      <div>
        <label className="block text-[0.65rem] font-light text-[#4A4A4A] uppercase tracking-wider mb-1.5">
          Message <span className="text-[#8A8A8A]">(optional)</span>
        </label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2.5 bg-[#F5F5F7] border border-[#E8E8EC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#000000] focus:border-transparent text-sm resize-none h-14 placeholder:text-[#8A8A8A]"
          placeholder="Add a message for the cause..."
        />
      </div>

      {/* Anonymous - Minimal */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="anonymous"
          checked={formData.anonymous}
          onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
          className="w-3.5 h-3.5 accent-[#000000]"
        />
        <label htmlFor="anonymous" className="text-xs text-[#4A4A4A]">
          Donate anonymously
        </label>
      </div>

      {/* Submit - Minimal */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-[#000000] text-[#FFFFFF] rounded-lg hover:bg-[#1A1A1A] transition-colors flex items-center justify-center gap-2 text-sm font-light tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Heart className="w-4 h-4" />
            <span>Donate ₹{formData.amount}</span>
          </>
        )}
      </button>

      {/* Footer - Minimal */}
      <div className="flex items-center justify-center gap-2 text-[0.5rem] text-[#8A8A8A]">
        <Shield className="w-3 h-3" />
        <span>Secured by Razorpay</span>
        <span className="text-[#D0D0D5]">·</span>
        <span>UPI · Cards · Netbanking</span>
      </div>
    </form>
  );
}