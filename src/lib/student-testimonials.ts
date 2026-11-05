import { getSupabaseBrowserClient, isSupabaseConfigured } from "@/lib/supabase-client";

export type StudentTestimonialInput = {
  name: string;
  roleTitle: string;
  city: string;
  course: string;
  rating: number;
  quote: string;
  linkedinUrl: string;
  consentToPublish: boolean;
};

export type ApprovedTestimonial = {
  id: string;
  name: string;
  roleTitle: string;
  city: string;
  course: string;
  rating: number;
  quote: string;
};

export function getFeedbackAccessToken(): string {
  return (process.env.NEXT_PUBLIC_FEEDBACK_ACCESS_TOKEN || "").trim();
}

export function isValidFeedbackAccess(token: string | null | undefined): boolean {
  const expected = getFeedbackAccessToken();
  if (!expected) return false;
  return Boolean(token && token === expected);
}

export async function submitStudentTestimonial(
  input: StudentTestimonialInput,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) {
    return {
      ok: false,
      error:
        "Feedback storage is not configured yet. Please WhatsApp Rajinikanth your testimonial for now.",
    };
  }

  const quote = input.quote.trim();
  const name = input.name.trim();
  if (name.length < 2) return { ok: false, error: "Please enter your name." };
  if (quote.length < 40) {
    return { ok: false, error: "Please write at least a few sentences (40+ characters)." };
  }
  if (quote.length > 1200) {
    return { ok: false, error: "Please keep feedback under 1200 characters." };
  }

  const { error } = await supabase.from("student_testimonials").insert({
    name,
    role_title: input.roleTitle.trim().slice(0, 120),
    city: input.city.trim().slice(0, 80),
    course: input.course.trim().slice(0, 120),
    rating: Math.min(5, Math.max(1, Math.round(input.rating) || 5)),
    quote,
    linkedin_url: input.linkedinUrl.trim().slice(0, 300),
    consent_to_publish: input.consentToPublish,
    approved: false,
  });

  if (error) {
    return { ok: false, error: error.message || "Could not submit. Try again or WhatsApp Rajinikanth." };
  }
  return { ok: true };
}

export async function fetchApprovedTestimonials(): Promise<ApprovedTestimonial[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return [];

  // Only rows you approved AND the student agreed to publish.
  const { data, error } = await supabase
    .from("student_testimonials")
    .select("id, name, role_title, city, course, rating, quote, created_at")
    .eq("approved", true)
    .eq("consent_to_publish", true)
    .order("created_at", { ascending: false })
    .limit(48);

  if (error || !data) {
    if (process.env.NODE_ENV === "development" && error) {
      console.warn("[testimonials]", error.message);
    }
    return [];
  }

  return data.map((row) => ({
    id: row.id as string,
    name: row.name as string,
    roleTitle: (row.role_title as string) || "",
    city: (row.city as string) || "",
    course: (row.course as string) || "",
    rating: Number(row.rating) || 5,
    quote: row.quote as string,
  }));
}
