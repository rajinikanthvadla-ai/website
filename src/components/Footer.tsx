import Link from "next/link";
import { LINKS, SITE } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "./Icons";

export default function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="bg-stone-900 text-stone-500 py-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. MLOps, AIOps, DevOps training.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-stone-950 text-stone-400 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          <div>
            <Link href="/" className="flex items-center gap-3 font-display font-bold text-lg text-stone-100 mb-4">
              <span className="w-10 h-10 border border-stone-600 bg-stone-900 text-stone-100 flex items-center justify-center text-xs font-bold">
                RV
              </span>
              {SITE.name}
            </Link>
            <p className="text-sm leading-relaxed text-stone-500 mb-6">
              Live programs in MLOps, AIOps, and GenAI, plus 1:1 mentorship for career and role transformation. Engineers
              worldwide reach out for honest guidance - built from delivery experience, not recycled outlines.
            </p>
            <div className="flex gap-2">
              <SocialLink href={LINKS.linkedin} label="LinkedIn"><LinkedInIcon /></SocialLink>
              <SocialLink href={LINKS.instagram} label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href={LINKS.youtube} label="YouTube"><YouTubeIcon /></SocialLink>
            </div>
          </div>

          <div>
            <h4 className="text-stone-200 font-semibold mb-4 text-xs uppercase tracking-[0.12em]">Training</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/courses" className="hover:text-stone-100 transition-colors">Multi-cloud &amp; DevOps</Link></li>
              <li><Link href="/courses" className="hover:text-stone-100 transition-colors">Kubernetes</Link></li>
              <li><Link href="/mlops-aiops-masterclass" className="hover:text-stone-100 transition-colors">MLOps &amp; AIOps</Link></li>
              <li><Link href="/genai-training" className="hover:text-stone-100 transition-colors">AI agents &amp; GenAI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-200 font-semibold mb-4 text-xs uppercase tracking-[0.12em]">Site</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-stone-100 transition-colors">About</Link></li>
              <li><Link href="/courses" className="hover:text-stone-100 transition-colors">Courses</Link></li>
              <li><Link href="/mlops-course-india" className="hover:text-stone-100 transition-colors">MLOps Course India</Link></li>
              <li><Link href="/mentorship" className="hover:text-stone-100 transition-colors">Mentorship</Link></li>
              <li><Link href="/contact" className="hover:text-stone-100 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-stone-200 font-semibold mb-4 text-xs uppercase tracking-[0.12em]">Connect</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">WhatsApp</a></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-stone-100 transition-colors">LinkedIn</a></li>
              <li><a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-stone-100 transition-colors">YouTube</a></li>
              <li><a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="hover:text-stone-100 transition-colors">Topmate</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center text-sm text-stone-600">
          <p>&copy; {new Date().getFullYear()} {SITE.name}</p>
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
      className="w-10 h-10 border border-stone-700 bg-stone-900 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:border-stone-500 transition-colors"
    >
      {children}
    </a>
  );
}
