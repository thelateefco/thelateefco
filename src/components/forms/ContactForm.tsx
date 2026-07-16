"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormData } from "../../lib/utils/validations";
import { createLead } from "../../lib/appwrite/server";
import { trackConversion } from "../../lib/utils/tracking";

interface ContactFormProps {
  source?: string;
  page?: string;
  onSuccess?: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function ContactForm({
  source = "website",
  page = "homepage",
  onSuccess,
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      source,
      page,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const result = await createLead({
        ...data,
        type: "form",
        status: "new",
      });

      if (result.success) {
        trackConversion("form_submission", {
          name: data.name,
          business: data.business,
          page: data.page || page,
        });

        toast.success("Message sent!", {
          description: "We'll be in touch within one business day.",
        });
        reset();
        onSuccess?.();
      } else {
        console.error("❌ Form submission failed:", result.error);
        toast.error("Something went wrong", {
          description: "Please try again or email us directly.",
        });
      }
    } catch (error) {
      console.error("❌ Form submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again or email us directly.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6"
      noValidate
    >
      <motion.div variants={fieldVariants} className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="label text-[#4A4A4A]">
          Your name <span className="text-[#8A8A8A]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          {...register("name")}
          placeholder="Lateef shaikh"
          className="w-full bg-transparent border-b border-[#D0C9C1] py-3 text-[0.9375rem] font-light text-[#1A1A1A] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200"
          aria-invalid={errors.name ? "true" : "false"}
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-[0.75rem] text-[#B91C1C] mt-1">{errors.name.message}</p>
        )}
      </motion.div>

      <motion.div variants={fieldVariants} className="flex flex-col gap-2">
        <label htmlFor="contact-business" className="label text-[#4A4A4A]">
          Business name <span className="text-[#8A8A8A]">*</span>
        </label>
        <input
          id="contact-business"
          type="text"
          {...register("business")}
          placeholder="The Lateef & Co."
          className="w-full bg-transparent border-b border-[#D0C9C1] py-3 text-[0.9375rem] font-light text-[#1A1A1A] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200"
          aria-invalid={errors.business ? "true" : "false"}
          disabled={isSubmitting}
        />
        {errors.business && (
          <p className="text-[0.75rem] text-[#B91C1C] mt-1">{errors.business.message}</p>
        )}
      </motion.div>

      <motion.div variants={fieldVariants} className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="label text-[#4A4A4A]">
          Email address <span className="text-[#8A8A8A]">(optional)</span>
        </label>
        <input
          id="contact-email"
          type="email"
          {...register("email")}
          placeholder="thelateefco@gmail.com.com"
          className="w-full bg-transparent border-b border-[#D0C9C1] py-3 text-[0.9375rem] font-light text-[#1A1A1A] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200"
          aria-invalid={errors.email ? "true" : "false"}
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-[0.75rem] text-[#B91C1C] mt-1">{errors.email.message}</p>
        )}
      </motion.div>

      <motion.div variants={fieldVariants} className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="label text-[#4A4A4A]">
          What can we help with? <span className="text-[#8A8A8A]">*</span>
        </label>
        <textarea
          id="contact-message"
          {...register("message")}
          rows={4}
          placeholder="Tell us about your project, what you're trying to achieve, and any timelines..."
          className="w-full bg-transparent border-b border-[#D0C9C1] py-3 text-[0.9375rem] font-light text-[#1A1A1A] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 resize-none"
          aria-invalid={errors.message ? "true" : "false"}
          disabled={isSubmitting}
        />
        {errors.message && (
          <p className="text-[0.75rem] text-[#B91C1C] mt-1">{errors.message.message}</p>
        )}
      </motion.div>

      <motion.button
        variants={fieldVariants}
        type="submit"
        disabled={isSubmitting}
        className="btn-primary rounded-[7px] self-start mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <span className="inline-block w-4 h-4 border-2 border-[#ECE6DF] border-t-transparent rounded-full animate-spin" />
            Sending…
          </span>
        ) : (
          "Send message"
        )}
      </motion.button>
    </motion.form>
  );
}