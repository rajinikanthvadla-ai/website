import { LINKS } from "@/lib/constants";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-stone-900/20 hover:bg-emerald-700 transition-colors"
      title="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
