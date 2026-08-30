"use client"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import ServiceCard from "@/components/ServiceCard"
import { Globe, Copy, ScrollText, FileCheck, Briefcase } from "lucide-react"

const services = [
  {
    title: "Translation",
    description: "Certified translation of legal, academic, and personal documents between English and Nepali for international use. Online request available.",
    icon: Globe,
    online: true,
    href: "/translation/",
  },
  {
    title: "Copy Verification",
    description: "Certified true copies of original documents including citizenship certificates, academic records, and legal papers. Office visit required.",
    icon: Copy,
    online: false,
    href: "#",
  },
  {
    title: "Affidavit",
    description: "Drafting and notarization of affidavits and sworn declarations for legal, administrative, and immigration purposes. Office visit required.",
    icon: ScrollText,
    online: false,
    href: "#",
  },
  {
    title: "Document Certification",
    description: "Official certification of documents for embassy submissions, visa applications, and international legal requirements. Office visit required.",
    icon: FileCheck,
    online: false,
    href: "#",
  },
  {
    title: "Share / Stock Transfer",
    description: "Certification and notarization of share transfer documents, corporate resolutions, and business legal instruments. Office visit required.",
    icon: Briefcase,
    online: false,
    href: "#",
  },
]

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-deep-blue py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <span className="text-sm font-medium text-crimson uppercase tracking-wider">Our Services</span>
              <h1 className="font-display text-3xl lg:text-5xl text-white mt-3 mb-4">
                Notarial & Translation Services
              </h1>
              <p className="text-lg text-white/70 max-w-2xl">
                Professional notarial services with clear distinction between online and office-visit requirements.
              </p>
            </SectionReveal>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal className="text-center mb-12">
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Each service is clearly marked as either available online or requiring an office visit. 
                The Notary must examine original documents and verify identity in person for certain services.
              </p>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.title} {...service} delay={index * 0.1} />
              ))}
            </div>

            <SectionReveal delay={0.4} className="mt-12 bg-cream rounded-lg p-6 border border-gray-200">
              <h3 className="font-display text-lg text-deep-blue mb-3">Important Notice</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Services marked "Office Visit Required" cannot be completed entirely online. The Notary Public Act 2063 
                requires physical examination of original documents and personal identity verification for certification, 
                copy verification, and affidavit services. Translation requests may be initiated online, but final 
                certified output may require an office visit depending on document type and destination country requirements.
              </p>
            </SectionReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
