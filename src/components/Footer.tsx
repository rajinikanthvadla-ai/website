import Link from "next/link";
import { LINKS, SITE } from "@/lib/constants";
import { LinkedInIcon, InstagramIcon, YouTubeIcon } from "./Icons";

export default function Footer({ minimal = false }: { minimal?: boolean }) {
  if (minimal) {
    return (
      <footer className="bg-gray-950 text-gray-500 py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE.name} &mdash; AIOps, MLOps, DevOps Expert & Trainer</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-black text-gray-400 pt-20 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(99,102,241,0.05),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-3 font-extrabold text-lg text-white mb-5">
              <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-500 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-blue-500/20">
                RV
              </span>
              {SITE.name}
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-500">
              Best AIOps, MLOps, DevOps training with hands-on enterprise projects. Master AWS, Azure, GCP, Kubernetes, AI Agents.
            </p>
            <div className="flex gap-2">
              <SocialLink href={LINKS.linkedin} label="LinkedIn"><LinkedInIcon /></SocialLink>
              <SocialLink href={LINKS.instagram} label="Instagram"><InstagramIcon /></SocialLink>
              <SocialLink href={LINKS.youtube} label="YouTube"><YouTubeIcon /></SocialLink>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Training</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/courses" className="hover:text-primary-400 transition-colors">Multi-Cloud DevOps</Link></li>
              <li><Link href="/courses" className="hover:text-primary-400 transition-colors">Kubernetes Training</Link></li>
              <li><Link href="/mlops-aiops-masterclass" className="hover:text-primary-400 transition-colors">MLOps & AIOps</Link></li>
              <li><Link href="/genai-training" className="hover:text-primary-400 transition-colors">AI Agents & GenAI</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-primary-400 transition-colors">About</Link></li>
              <li><Link href="/courses" className="hover:text-primary-400 transition-colors">All Courses</Link></li>
              <li><Link href="/mentorship" className="hover:text-primary-400 transition-colors">1:1 Mentorship</Link></li>
              <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Connect</h4>
            <ul className="space-y-3 text-sm">
              <li><a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">WhatsApp</a></li>
              <li><a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">LinkedIn</a></li>
              <li><a href={LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">YouTube</a></li>
              <li><a href={LINKS.topmate} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors">Topmate</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} {SITE.name} &mdash; Best AIOps MLOps DevOps Training</p>
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
      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-primary-600 hover:border-primary-600 hover:text-white hover:-translate-y-0.5 transition-all"
    >
      {children}
    </a>
  );
}
