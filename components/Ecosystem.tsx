"use client"

import Link from "next/link"
import SectionReveal from "./SectionReveal"
import { GraduationCap, User, Scale, ArrowUpRight } from "lucide-react"

const bridges = [
  {
    title: "KIPLANScholar",
    description: "Need information about studying abroad? Explore country guides, university resources, and scholarship opportunities.",
    icon: GraduationCap,
    href: "https://kiplanscholar.com",
    color: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Kamal Khadka",
    description: "Learn more about Advocate Kamal Khadka — professional background, credentials, and notarial philosophy.",
    icon: User,
    href: "#",
    color: "bg-blue-50 text-blue-700",
  },
  {
    title: "KIPLAN Law Firm",
    description: "Full-service legal support beyond notarisation — IP law, corporate law, litigation, and more.",
    icon: Scale,
    href: "https://kiplan.com.np",
    color: "bg-amber-50 text-amber-700",
  },
]

export default function Ecosystem() {
  return (
    <section className="py-20 lg:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-12">
          <span className="text-sm font-medium text-crimson uppercase tracking-wider">KIPLAN Ecosystem</span>
          <h2 className="font-display text-3xl lg:text-4xl text-deep-blue mt-3 mb-4">
            Connected Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            KIPLANNotary is part of a broader professional ecosystem. Find the right resource for your needs.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bridges.map((bridge, index) => (
            <SectionReveal key={bridge.title} delay={index * 0.1}>
              <Link
                href={bridge.href}
                target={bridge.href.startsWith("http") ? "_blank" : undefined}
                rel={bridge.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-deep-blue transition-all duration-300 h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${bridge.color}`}>
                    <bridge.icon className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-deep-blue transition-colors" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{bridge.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{bridge.description}</p>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
