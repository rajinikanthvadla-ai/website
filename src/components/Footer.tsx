import Link from "next/link";
import { LINKS, SITE } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "./Icons";

export default function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="notion-footer py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. MLOps, AIOps, AI Automation training.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="notion-footer pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <span className="w-10 h-10 rounded-sm bg-white text-[#0f172a] flex items-center justify-center text-xs font-extrabold border-2 border-white">
                RV
              </span>
              <span className="font-display font-bold text-lg text-white">
                {SITE.name}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 mb-6">
              Live programs in MLOps, AIOps, GenAI, and AI-Powered Automation, plus 1:1 mentorship for career and role transformation worldwide.
            </p>
            <div className="flex gap-2">
              <SocialLink href={LINKS.linkedin} label="LinkedIn"><LinkedInIcon /></SocialLink>
              <SocialLink href={LINKS.instagram} label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href={LINKS.youtube} label="YouTube"><YouTubeIcon /></SocialLink>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.12em]">Training</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/courses/ai-automation" className="hover:text-orange-400 transition-colors">AI Automation <span className="bg-orange-500 text-white text-[8px] font-bold py-0 px-1.5 rounded-sm uppercase ml-1">NEW</span></Link></li>
              <li><Link href="/mlops-aiops-masterclass" className="hover:text-[#dbeafe] transition-colors">MLOps Masterclass</Link></li>
              <li><Link href="/mentorship" className="hover:text-white transition-colors">Mentorship</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.12em]">Site</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/courses" className="hover:text-white transition-colors">All courses</Link></li>
              <li><Link href="/mentorship" className="hover:text-white transition-colors">Mentorship</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.12em]">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp</a></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#dbeafe] transition-colors">LinkedIn</a></li>
              <li><a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">YouTube</a></li>
              <li><a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Topmate</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="text-xs text-slate-600">MLOps · AIOps · GenAI · AI Automation · Enterprise Training</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-sm border-2 border-slate-600 flex items-center justify-center text-slate-400 hover:text-white hover:border-white transition-colors"
    >
      {children}
    </a>
  );
}
