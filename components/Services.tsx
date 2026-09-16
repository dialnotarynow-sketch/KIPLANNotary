"use client"

import ServiceCard from "./ServiceCard"
import SectionReveal from "./SectionReveal"
import { Globe, Copy, ScrollText, FileCheck, Briefcase } from "lucide-react"

const services = [
  {
    title: "Official Document Translation",
    description: "Certified English–Nepali translation for legal, academic, personal, and international documents.",
    icon: Globe,
    online: true,
    href: "/translation/",
  },
  {
  title: "Marriage Law Translation & Certification",
  description:
    "Translation and certification of marriage certificates and related documents for official, immigration, visa, and international use.",
  icon: Globe,
  online: true,
  href: "/translation/",
},
  {
    title: "Copy Verification",
    description: "Certified true copies of citizenship, certificates, and other original documents.",
    icon: Copy,
    online: false,
    href: "/services/",
  },
  {
    title: "Sworn Document",
description: "Drafting and notarization of sworn documents and declarations.",
icon: ScrollText,
online: false,
href: "/services/#sworn-document",
  },
  {
    title: "Document Certification",
    description: "Certification of documents for embassy, visa, and international requirements.",
    icon: FileCheck,
    online: false,
    href: "/services/",
  },
  {
    title: "Court Marriage Registration",
    description: "Notarial assistance for share and stock transfer documentation.",
    icon: Briefcase,
    online: false,
    href: "/services/",
  },
]

export default function Services() {
  return (
    <section className="py-20 lg:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="text-sm font-medium text-crimson uppercase tracking-wider">
            Our Services
          </span>

          <h2 className="font-display text-3xl lg:text-4xl text-deep-blue mt-3 mb-4">
            Notarial & Translation Services
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Professional document services, with online translation requests
            and notarial services available by office visit.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              {...service}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Legend */}
        <SectionReveal
          delay={0.4}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Online Request Available</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-crimson" />
            <span>Office Visit Required</span>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}