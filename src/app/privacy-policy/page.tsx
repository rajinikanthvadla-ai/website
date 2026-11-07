import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/constants";

/** Update this date whenever the policy text changes. Keep the text true to what the site actually collects. */
const UPDATED = "7 November 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What rajinikanthvadla.com collects when you enquire, enrol, book mentorship or leave a review, why, who processes it, and how to get it deleted.",
  alternates: { canonical: `${SITE.url}/privacy-policy/` },
};

const SECTIONS: LegalSection[] = [
  {
    title: "Who is responsible",
    points: [
      "This site and its courses are run by Rajinikanth Vadla, an independent trainer and engineer based in Hyderabad, India. I decide how your data is used and I am the person to contact about it.",
      `Contact: WhatsApp ${SITE.phone} or the contact page on this site.`,
    ],
  },
  {
    title: "What I collect, and why",
    points: [
      "Enquiry and free career call forms: your name, email, WhatsApp number, country, the course you are interested in, your current role, experience, goal and best time to call, your message, the page you sent it from and any campaign tags in the link (utm_source and similar). I use this only to reply to you and to see which pages bring enquiries.",
      "Project and training requests (Hire me page): your name, email, company, the service you need, budget, timeline and project details, so I can reply with a plan or quote.",
      "Student reviews: the name, role, city, course, rating, review text and optional LinkedIn link you submit, plus whether you agreed to publication. A review is shown on the site only with your consent and after I approve it.",
      "Payments: handled by Razorpay. I receive your name, email, phone and payment status. I never see your full card, UPI or bank details.",
      "Site statistics: pages viewed, which site or search engine sent you, campaign tags, device type, browser language and time zone, and which buttons you click (for example Enroll or WhatsApp). This uses a random session ID kept in your browser's session storage, which is deleted when you close the tab. No cookies, no IP address and no advertising profile.",
      "Your browser time zone is also used, only inside your browser, to show prices in your currency and class times for your country.",
    ],
  },
  {
    title: "Who else processes your data",
    points: [
      "Supabase stores form submissions, reviews and site statistics.",
      "Resend delivers an email alert to me with the details of each form you send, so I can reply quickly.",
      "Razorpay processes payments under its own privacy policy.",
      "GitHub Pages hosts the website and may keep standard server logs (such as IP addresses) for security.",
      "YouTube (Google) serves the embedded videos. Google may set its own cookies when a page with a video loads or when you play it.",
      "WhatsApp (Meta) and Topmate apply their own policies when you message me there or book a session there.",
      "I do not sell your data and I do not share it with advertisers.",
    ],
  },
  {
    title: "How long I keep it",
    points: [
      "Enquiries and project requests: as long as needed to reply and follow up, and for the length of any course or project that follows.",
      "Payment records: as long as Indian tax and accounting rules require.",
      "Site statistics: kept for trend reports. They are not linked to your name or to any form you submit.",
      "You can ask me to delete your data at any time (see below), except records the law requires me to keep.",
    ],
  },
  {
    title: "Your rights",
    points: [
      "You can ask to see the data I hold about you, correct it, delete it, or stop me using it for follow-ups. Message me on WhatsApp or through the contact page and I will act on it within 30 days.",
      "In India, you have these rights under the Digital Personal Data Protection Act, 2023. In the UK and the EU, you have them under the UK GDPR and the GDPR, and you can complain to your data protection authority (in the UK, the ICO).",
      "This site is for adults. I do not knowingly collect data from children.",
    ],
  },
  {
    title: "Changes",
    points: ["If this policy changes, the date at the top changes too. Material changes are also announced on the site."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      path="/privacy-policy/"
      crumb="Privacy policy"
      updated={UPDATED}
      title="Privacy policy"
      summary="Short version: I collect only what you type into a form or need for payment, use it to reply and run the course, never sell it, and delete it when you ask."
      sections={SECTIONS}
    />
  );
}
