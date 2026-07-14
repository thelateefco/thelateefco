export const WHATSAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919769212600"}?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20The%20Lateef%20%26%20Co.`;
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL || "thelateefco@gmail.com";
export const PHONE = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919769212600";

export const COMPANY = {
  name: "The Lateef & Co.",
  fullName: "The Lateef & Co. — Web Design & Development Studio",
  tagline: "Websites that bring in customers",
  location: "Mumbai, Maharashtra, India",
  established: "2024",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;