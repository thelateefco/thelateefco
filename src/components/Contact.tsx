"use client";

import { useState, useRef } from "react";
import Reveal from "./Reveal";

const WHATSAPP_URL =
  "https://wa.me/919769212600?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20The%20Lateef%20%26%20Co.";

const EMAIL = "hello@thelateefco.com";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formState, setFormState] = useState<FormState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    // Simulate form submission — wire up to your preferred API
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setFormState("success");
    formRef.current?.reset();
  };

  return (
    <section
      id="contact"
      className="bg-[#ECE6DF] py-28 md:py-40 px-6 md:px-10 lg:px-16"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Closing hook */}
        <Reveal>
          <div className="hairline pt-6 mb-16 md:mb-24">
            <span className="label">Get in touch</span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-16 md:gap-24">
          {/* Left column */}
          <div>
            <Reveal>
              <h2
                className="font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-medium text-[#1A1A1A] leading-[1.05] tracking-tight mb-8"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Google your business.{" "}
                <em style={{ fontStyle: "italic" }}>Then decide.</em>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="body-text text-[0.9375rem] leading-[1.8] max-w-[38ch] mb-12">
                If you&apos;re not happy with what you see, let&apos;s talk. No
                sales calls, no proposal decks — just a direct conversation
                about what your business actually needs.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-4">
                <a
                  id="contact-whatsapp"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary self-start"
                  aria-label="Message us on WhatsApp"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message on WhatsApp
                </a>

                <a
                  id="contact-email"
                  href={`mailto:${EMAIL}`}
                  className="btn-outline self-start"
                  aria-label={`Send email to ${EMAIL}`}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="1" />
                    <path d="M2 7l10 7 10-7" />
                  </svg>
                  {EMAIL}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-16 pt-8 hairline">
                <p className="label text-[#8A8A8A] mb-2">Based in</p>
                <p className="text-[#1A1A1A] font-light text-sm">
                  Mumbai, Maharashtra, India
                </p>
                <p className="label text-[#8A8A8A] mt-5 mb-2">Working with clients</p>
                <p className="text-[#1A1A1A] font-light text-sm">
                  Locally & internationally
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right column — Contact Form */}
          <Reveal delay={0.12} direction="left">
            <div>
              <p className="label text-[#8A8A8A] mb-8">Or drop us a note</p>

              {formState === "success" ? (
                <div className="py-16 flex flex-col items-start gap-4">
                  <div className="w-8 h-px bg-[#1A1A1A]" />
                  <p
                    className="font-serif text-[1.5rem] text-[#1A1A1A]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Message received.
                  </p>
                  <p className="body-text text-[0.9375rem]">
                    We&apos;ll be in touch within one business day.
                  </p>
                </div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  noValidate
                >
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-name"
                      className="label text-[#4A4A4A]"
                    >
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Aarav Mehta"
                      className="w-full bg-transparent border-b border-[#D0C9C1] py-3 text-[0.9375rem] font-light text-[#1A1A1A] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-business"
                      className="label text-[#4A4A4A]"
                    >
                      Business name
                    </label>
                    <input
                      id="contact-business"
                      type="text"
                      name="business"
                      required
                      placeholder="Mehta & Associates"
                      className="w-full bg-transparent border-b border-[#D0C9C1] py-3 text-[0.9375rem] font-light text-[#1A1A1A] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="contact-message"
                      className="label text-[#4A4A4A]"
                    >
                      What can we help with?
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell us about your project, what you're trying to achieve, and any timelines..."
                      className="w-full bg-transparent border-b border-[#D0C9C1] py-3 text-[0.9375rem] font-light text-[#1A1A1A] placeholder:text-[#C0B9B1] focus:outline-none focus:border-[#1A1A1A] transition-colors duration-200 resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={formState === "sending"}
                    className="btn-primary self-start mt-2 disabled:opacity-60"
                  >
                    {formState === "sending" ? "Sending…" : "Send message"}
                  </button>

                  {formState === "error" && (
                    <p className="text-[0.8125rem] text-[#4A4A4A]">
                      Something went wrong. Please try emailing us directly.
                    </p>
                  )}
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
