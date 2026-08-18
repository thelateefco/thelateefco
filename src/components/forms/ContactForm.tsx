"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormData } from "../../lib/utils/validations";
import { createLead } from "../../lib/appwrite/server";
import { trackConversion } from "../../lib/utils/tracking";
import { CheckCircle2, Sparkles, Send, Zap, Code, Bot, MessageCircle } from "lucide-react";
import { WHATSAPP_URL } from "../../lib/constants";

interface ContactFormProps {
  source?: string;
  page?: string;
  onSuccess?: () => void;
}

const serviceOptions = [
  { id: "automation", label: "Business Automation", icon: Zap },
  { id: "web-dev", label: "Web Dev & Engineering", icon: Code },
  { id: "ai", label: "AI Integration", icon: Bot },
  { id: "strategy", label: "Brand Strategy", icon: Sparkles },
  { id: "other", label: "General Inquiry", icon: MessageCircle },
];

export default function ContactForm({
  source = "website",
  page = "contact",
  onSuccess,
}: ContactFormProps) {
  const [selectedService, setSelectedService] = useState<string>("Business Automation");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      source,
      page,
      message: "",
    },
  });

  const handleServiceSelect = (serviceLabel: string) => {
    setSelectedService(serviceLabel);
    setValue("message", `Hi Lateef, I'm interested in ${serviceLabel} for my business. Here are a few details...`);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const fullMessage = selectedService 
        ? `[Service Interest: ${selectedService}]\n${data.message}`
        : data.message;

      const result = await createLead({
        ...data,
        message: fullMessage,
        type: "form",
        status: "new",
      });

      if (result.success) {
        trackConversion("form_submission", {
          name: data.name,
          business: data.business,
          page: data.page || page,
        });

        setIsSuccess(true);
        toast.success("Message sent successfully!", {
          description: "I'll review your project details and get back to you within 24 hours.",
        });
        reset();
        onSuccess?.();
      } else {
        console.error("❌ Form submission failed:", result.error);
        toast.error("Something went wrong", {
          description: "Please try again or connect via WhatsApp directly.",
        });
      }
    } catch (error) {
      console.error("❌ Form submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again or email directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#FFFFFF] border border-[#E0E0E4] rounded-[20px] p-8 md:p-10 text-center space-y-5 shadow-sm"
      >
        <div className="w-16 h-16 rounded-full bg-[#140f0a] text-white flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>

        <h3 className="font-sans text-[1.5rem] font-bold text-[#140f0a]">
          Thank you! Message Received.
        </h3>

        <p className="text-[0.9375rem] text-[#4A4A4A] font-light leading-[1.65] max-w-[36ch] mx-auto">
          I’ve received your inquiry. I will review your details and respond within one business day with ideas and pricing options.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setIsSuccess(false)}
            className="px-5 py-2.5 rounded-xl border border-[#140f0a]/20 text-[#140f0a] text-[0.8125rem] font-semibold hover:bg-[#F5F5F7] transition-colors cursor-pointer"
          >
            Send Another Message
          </button>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#140f0a] text-white text-[0.8125rem] font-semibold flex items-center gap-2 hover:bg-[#1A1A1A] transition-colors no-underline cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp Now</span>
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] border border-[#E0E0E4] rounded-[24px] p-6 sm:p-8 md:p-9 shadow-[0_4px_24px_rgba(0,0,0,0.03)]">
      {/* Intent Selector Chips */}
      <div className="mb-8">
        <label className="text-[0.75rem] font-sans font-semibold tracking-wider uppercase text-[#8A8A8A] block mb-3">
          1. Select What You Need
        </label>

        <div className="flex flex-wrap gap-2">
          {serviceOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = selectedService === opt.label;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleServiceSelect(opt.label)}
                className={`px-3.5 py-2 rounded-xl text-[0.8125rem] font-medium flex items-center gap-2 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#140f0a] text-white shadow-sm scale-[1.02]"
                    : "bg-[#F5F5F7] text-[#4A4A4A] border border-[#1A1A1A]/5 hover:bg-[#EAEAEF] hover:text-[#140f0a]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-white" : "text-[#140f0a]"}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="text-[0.75rem] font-sans font-semibold tracking-wider uppercase text-[#8A8A8A] mb-1">
          2. Your Information & Project Brief
        </div>

        {/* Name & Business grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-name" className="text-[0.8125rem] font-semibold text-[#140f0a]">
              Your Name <span className="text-[#B91C1C]">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              {...register("name")}
              placeholder="e.g. Lateef Shaikh"
              className="w-full bg-[#F9F9FB] border border-[#E0E0E4] rounded-xl px-4 py-3 text-[0.9375rem] text-[#140f0a] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#140f0a] focus:bg-white transition-all duration-200"
              aria-invalid={errors.name ? "true" : "false"}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-[0.75rem] text-[#B91C1C]">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-business" className="text-[0.8125rem] font-semibold text-[#140f0a]">
              Company / Business Name <span className="text-[#B91C1C]">*</span>
            </label>
            <input
              id="contact-business"
              type="text"
              {...register("business")}
              placeholder="e.g. Apex Studio"
              className="w-full bg-[#F9F9FB] border border-[#E0E0E4] rounded-xl px-4 py-3 text-[0.9375rem] text-[#140f0a] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#140f0a] focus:bg-white transition-all duration-200"
              aria-invalid={errors.business ? "true" : "false"}
              disabled={isSubmitting}
            />
            {errors.business && (
              <p className="text-[0.75rem] text-[#B91C1C]">{errors.business.message}</p>
            )}
          </div>
        </div>

        {/* Email & Phone grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-email" className="text-[0.8125rem] font-semibold text-[#140f0a]">
              Email Address <span className="text-[#8A8A8A] font-normal">(optional)</span>
            </label>
            <input
              id="contact-email"
              type="email"
              {...register("email")}
              placeholder="name@company.com"
              className="w-full bg-[#F9F9FB] border border-[#E0E0E4] rounded-xl px-4 py-3 text-[0.9375rem] text-[#140f0a] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#140f0a] focus:bg-white transition-all duration-200"
              aria-invalid={errors.email ? "true" : "false"}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-[0.75rem] text-[#B91C1C]">{errors.email.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact-phone" className="text-[0.8125rem] font-semibold text-[#140f0a]">
              WhatsApp Phone Number <span className="text-[#8A8A8A] font-normal">(optional)</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              {...register("phone")}
              placeholder="+91 97692 12600"
              className="w-full bg-[#F9F9FB] border border-[#E0E0E4] rounded-xl px-4 py-3 text-[0.9375rem] text-[#140f0a] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#140f0a] focus:bg-white transition-all duration-200"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="text-[0.8125rem] font-semibold text-[#140f0a]">
            Tell us about your project <span className="text-[#B91C1C]">*</span>
          </label>
          <textarea
            id="contact-message"
            {...register("message")}
            rows={4}
            placeholder="Tell us about your project, target timeline, or what you are trying to automate..."
            className="w-full bg-[#F9F9FB] border border-[#E0E0E4] rounded-xl p-4 text-[0.9375rem] text-[#140f0a] placeholder:text-[#A0A0A0] focus:outline-none focus:border-[#140f0a] focus:bg-white transition-all duration-200 resize-none"
            aria-invalid={errors.message ? "true" : "false"}
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="text-[0.75rem] text-[#B91C1C]">{errors.message.message}</p>
          )}
        </div>

        {/* Submit & Guarantee */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#140f0a] text-white font-sans text-[0.875rem] font-semibold flex items-center justify-center gap-2 hover:bg-[#1A1A1A] transition-all duration-300 disabled:opacity-60 cursor-pointer shadow-sm"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <span>Send Project Inquiry</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </motion.button>

          <p className="text-[0.75rem] text-[#8A8A8A] font-light text-center sm:text-right">
            Guaranteed reply within 24 hours
          </p>
        </div>
      </form>
    </div>
  );
}