import { LINKS } from "@/lib/constants";
import { WhatsAppIcon } from "./Icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-green-500/30 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/50 transition-all animate-float"
      title="Chat on WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
