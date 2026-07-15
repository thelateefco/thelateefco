"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Clock, MessageCircle, X, Send } from "lucide-react";
import { toast } from "sonner";
import Reveal from "../animations/Reveal";
import { WHATSAPP_URL, EMAIL } from "../../lib/constants";
import { trackWhatsAppClick, trackEmailClick } from "../../lib/utils/tracking";
import { sendEmail } from "../../lib/services/email";
import { createLead } from "../../lib/appwrite/server";
import Button from "../../components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};



const popupVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function Contact() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    email: "",
  });

  const handleWhatsAppClick = async () => {
  // Track WhatsApp click with user info if available
  await trackWhatsAppClick("contact", {
    name: formData.name || "WhatsApp Click",
    business: formData.business || "Click Tracking",
    email: formData.email || "",
    message: "User clicked on WhatsApp button from contact popup",
  });
  setIsPopupOpen(false);
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

const handleSendEmail = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate form
  if (!formData.name || !formData.business || !emailMessage) {
    toast.error("Please fill in all required fields");
    return;
  }

  setIsSending(true);

  try {
    // 1. Save to Appwrite
    const leadResult = await createLead({
      name: formData.name,
      business: formData.business,
      email: formData.email || "",
      message: emailMessage,
      source: "popup_form",
      page: "contact",
      type: "email",
      status: "new",
    });

    console.log('📝 Lead saved to Appwrite:', leadResult);

    // 2. Send email via EmailJS
    const emailResult = await sendEmail({
      name: formData.name,
      business: formData.business,
      email: formData.email || "",
      message: emailMessage,
      source: "popup_form",
      page: "contact",
    });

    console.log('📧 Email result:', emailResult);

    if (emailResult.success) {
      toast.success("Message sent!", {
        description: "We'll get back to you within one business day.",
      });
      
      setFormData({ name: "", business: "", email: "" });
      setEmailSubject("");
      setEmailMessage("");
      setIsPopupOpen(false);
      await trackEmailClick("contact");
    } else {
      // If email fails but Appwrite worked
      if (leadResult.success) {
        toast.success("Message received!", {
          description: "We'll get back to you within one business day.",
        });
        setIsPopupOpen(false);
        setFormData({ name: "", business: "", email: "" });
        setEmailSubject("");
        setEmailMessage("");
      } else {
        toast.error("Something went wrong", {
          description: emailResult.error || "Please try again or email us directly.",
        });
      }
    }
  } catch (error) {
    console.error('❌ Error:', error);
    toast.error("Something went wrong", {
      description: "Please try again or email us directly.",
    });
  } finally {
    setIsSending(false);
  }
};

  return (
    <section
      id="contact"
      className="bg-[#F5F5F7] py-28 md:py-40 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        <Reveal>
          <div className="hairline pt-6 mb-16 md:mb-24">
            <span className="label">Get in touch</span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <h2 className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-medium text-[#000000] leading-[1.05] tracking-tight mb-8">
                Google your business.{" "}
                <em className="italic-em text-[#000000]">Then decide.</em>
              </h2>
            </motion.div>

            <motion.div variants={itemVariants}>
              <p className="body-text text-[0.9375rem] leading-[1.8] max-w-[38ch] mb-12 text-[#000000]">
                If you&apos;re not happy with what you see, let&apos;s talk. No
                sales calls, no proposal decks - just a direct conversation
                about what your business actually needs.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex flex-col gap-4">
                <Button
                  id="contact-whatsapp"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  variant="primary"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  }
                  iconPosition="left"
                  className="self-start"
                  aria-label="Message us on WhatsApp"
                >
                  Message on WhatsApp
                </Button>

                {/* Drop us a note button */}
                <div className="relative">
                  <button
                    id="contact-note"
                    onClick={() => setIsPopupOpen(!isPopupOpen)}
                    className="inline-flex items-center justify-center gap-2 font-sans text-[0.8125rem] font-medium tracking-[0.06em] uppercase px-6 py-3.5 md:px-7 md:py-4 rounded-[4px] transition-colors duration-300 ease-out border border-[#000000] bg-transparent text-[#000000] hover:bg-[#000000] hover:text-[#F5F5F7] active:bg-[#000000] active:text-[#F5F5F7] cursor-pointer no-underline self-start"
                    aria-label="Drop us a note"
                  >
                    <Mail className="w-4 h-4" />
                    Drop us a note
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="mt-16 pt-8 hairline">
                <p className="label text-[#8A8A8A] mb-2">Based in</p>
                <p className="text-[#000000] font-light text-sm">
                  Mumbai, Maharashtra, India
                </p>
                <p className="label text-[#8A8A8A] mt-5 mb-2">
                  Working with clients
                </p>
                <p className="text-[#000000] font-light text-sm">
                  Locally & internationally
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - decorative */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden md:flex flex-col items-center justify-center"
          >
            <div className="max-w-sm text-center">
              <div className="w-16 h-px bg-[#D0C9C1] mx-auto mb-8" />
              <p className="font-serif text-[1.5rem] text-[#000000] font-medium leading-tight mb-4">
                Let's build something
                <br />
                <em className="italic-em text-[#000000]">worth remembering.</em>
              </p>
              <p className="text-[0.875rem] text-[#8A8A8A] font-light leading-[1.7]">
                No sales calls, no proposal decks - just a direct conversation
                about what your business actually needs.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Popup Modal - Centered on Screen */}
      <AnimatePresence>
        {isPopupOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setIsPopupOpen(false)}
            >
              {/* Popup */}
              <motion.div
                variants={popupVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full max-w-md bg-[#FFFFFF] border border-[#E8E8EC] rounded-[8px] shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="label text-[0.55rem] text-[#8A8A8A]">
                      Send us a message
                    </span>
                    <button
                      onClick={() => setIsPopupOpen(false)}
                      className="text-[#8A8A8A] hover:text-[#000000] transition-colors"
                      aria-label="Close menu"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick action button */}
                  <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-[#E8E8EC]">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-[4px] hover:bg-[#F5F5F7] transition-colors text-[0.875rem] text-[#000000] font-light"
                    >
                      <MessageCircle className="w-4 h-4 text-[#8A8A8A]" />
                      <span>Message on WhatsApp</span>
                    </a>
                  </div>

                  {/* Email Form */}
                  <form onSubmit={handleSendEmail} className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="name" className="label text-[0.5rem] text-[#8A8A8A] mb-1 block">
                        Your name <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Aarav Mehta"
                        className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="business" className="label text-[0.5rem] text-[#8A8A8A] mb-1 block">
                        Business name <span className="text-[#B91C1C]">*</span>
                      </label>
                      <input
                        id="business"
                        type="text"
                        value={formData.business}
                        onChange={handleInputChange}
                        placeholder="Mehta & Associates"
                        className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="label text-[0.5rem] text-[#8A8A8A] mb-1 block">
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="a.mehta@example.com"
                        className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="popup-message" className="label text-[0.5rem] text-[#8A8A8A] mb-1 block">
                        Message <span className="text-[#B91C1C]">*</span>
                      </label>
                      <textarea
                        id="popup-message"
                        value={emailMessage}
                        onChange={(e) => setEmailMessage(e.target.value)}
                        rows={4}
                        placeholder="Tell us about your project..."
                        className="w-full bg-transparent border-b border-[#D0C9C1] py-2 text-[0.875rem] font-light text-[#000000] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#000000] transition-colors duration-200 resize-none"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="inline-flex items-center justify-center gap-2 font-sans text-[0.75rem] font-medium tracking-[0.06em] uppercase px-5 py-2.5 rounded-[4px] transition-colors duration-300 ease-out bg-[#000000] text-[#F5F5F7] hover:bg-[#2E2E2E] disabled:opacity-60 disabled:cursor-not-allowed self-end mt-1"
                    >
                      {isSending ? "Sending…" : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          Send
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}