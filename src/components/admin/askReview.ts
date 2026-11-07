import { getFeedbackAccessToken } from "@/lib/student-testimonials";

/** The private link students use to leave a review. Empty if the token is not set for this build. */
export function reviewLink() {
  const token = getFeedbackAccessToken();
  return token ? `https://rajinikanthvadla.com/student-feedback/?k=${encodeURIComponent(token)}` : "";
}

export function reviewMessage(name = "") {
  const first = name.trim().split(/\s+/)[0];
  return [
    `Hi${first ? ` ${first}` : ""}, thank you for learning with me.`,
    "Could you share 2 minutes of honest feedback? It helps other engineers decide, and I read every word.",
    reviewLink(),
  ].join("\n\n");
}

/** wa.me link. 10-digit Indian mobile numbers get +91 added. Empty number opens WhatsApp's contact picker. */
export function whatsappLink(phone: string, text: string) {
  let digits = phone.replace(/[^\d]/g, "");
  if (digits.length === 10 && /^[6-9]/.test(digits)) digits = `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) digits = `91${digits.slice(1)}`;
  const q = `?text=${encodeURIComponent(text)}`;
  return digits.length >= 8 ? `https://wa.me/${digits}${q}` : `https://wa.me/${q}`;
}
