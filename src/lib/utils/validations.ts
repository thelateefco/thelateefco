import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  business: z.string().min(2, "Business name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.string().optional(),
  page: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;