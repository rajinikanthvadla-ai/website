"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Users, TrendingUp } from "lucide-react";
import type { CareerRoadmap } from "@/lib/roadmaps";
import { LINKS } from "@/lib/constants";

type Props = { roadmaps: CareerRoadmap[] };

const ROADMAP_ICONS: Record<string, React.ReactNode> = {
  "ai-engineer": <TrendingUp className="w-6 h-6" />,
  "fde-engineer": <Zap className="w-6 h-6" />,
  "ai-ml-engineer": <TrendingUp className="w-6 h-6" />,
  "mlops-engineer": <TrendingUp className="w-6 h-6" />,
  "llmops-engineer": <TrendingUp className="w-6 h-6" />,
  "nlp-engineer": <TrendingUp className="w-6 h-6" />,
  "ai-platform-engineer": <TrendingUp className="w-6 h-6" />,
  "ai-infrastructure-engineer": <TrendingUp className="w-6 h-6" />,
};

export default function RoadmapHubClient({ roadmaps }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative max-w-5xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/50 rounded-full px-4 py-2 mb-6"
          >
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-purple-300">Free Career Guides • Updated Aug 2026</span>
          </motion.div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            AI Career Roadmaps for 2026
          </h1>
          <p className="text-xl text-purple-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Step-by-step learning paths for the most in-demand AI roles in India and globally. Skills, salary ranges, projects, and tools.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              href="/universe/"
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-purple-500/50"
            >
              Explore AI Universe <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/path/"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3 rounded-xl transition"
            >
              Find My Path <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Roadmaps Grid */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((roadmap, i) => (
              <motion.div
                key={roadmap.slug}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link href={`/roadmap/${roadmap.slug}/`}>
                  <div className="relative h-full bg-gradient-to-br from-slate-900 to-slate-800 border-2 border-purple-500/30 hover:border-purple-500 rounded-2xl p-6 transition-all cursor-pointer overflow-hidden">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative z-10 space-y-4">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        className="w-12 h-12 bg-purple-500/30 rounded-xl flex items-center justify-center text-purple-400"
                      >
                        {ROADMAP_ICONS[roadmap.slug] || <Zap className="w-6 h-6" />}
                      </motion.div>

                      {/* Title */}
                      <div>
                        <h2 className="font-display text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                          {roadmap.shortTitle}
                        </h2>
                        <p className="text-sm text-slate-400 line-clamp-2">{roadmap.intro}</p>
                      </div>

                      {/* Salary & CTA */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <span className="text-sm font-bold text-purple-300">{roadmap.salaryIndia}</span>
                        <span className="text-xs font-semibold text-slate-400 group-hover:text-purple-400 transition-colors flex items-center gap-1">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-6 py-16 grid sm:grid-cols-3 gap-6"
      >
        {[
          { icon: <Users className="w-6 h-6" />, label: "Career Paths", value: roadmaps.length },
          { icon: <TrendingUp className="w-6 h-6" />, label: "Avg Salary Growth", value: "60%*" },
          { icon: <Zap className="w-6 h-6" />, label: "Skills Mapped", value: "200+" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-900 to-slate-800 border border-purple-500/20 rounded-xl p-6 text-center"
          >
            <div className="flex justify-center mb-3 text-purple-400">{stat.icon}</div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-purple-500/20 bg-gradient-to-r from-purple-600/20 to-blue-600/20 py-20 mt-12"
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h3 className="font-display text-3xl font-bold text-white mb-4">Follow with live mentorship</h3>
          <p className="text-purple-300 mb-8 text-lg">
            150+ hours of hands-on labs, capstone projects, and 1-on-1 guidance
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/mlops-aiops-masterclass/"
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-purple-500/50"
            >
              MLOps Masterclass <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-blue-500/50"
            >
              Message on WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
