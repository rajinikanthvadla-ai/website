import type { Metadata } from "next";
import Link from "next/link";
import CareerPathSimulator from "@/components/universe/CareerPathSimulator";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Find My AI Career Path — Interactive Path Simulator",
  description:
    "Where are you today and where do you want to go? Simulate your path from DevOps, software, or ML into MLOps, LLMOps, GenAI, AI Infrastructure, or FDE roles.",
  alternates: { canonical: `${SITE.url}/path/` },
};

export default function PathPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 py-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Link href="/universe/" className="text-sm font-semibold text-blue-700 hover:underline mb-4 inline-block">
            ← AI Universe
          </Link>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Find My AI Path
          </h1>
          <p className="text-slate-600">
            Select your starting point and target role. See the shortest recommended route and what you can skip.
          </p>
        </div>
      </section>
      <CareerPathSimulator />
    </>
  );
}
