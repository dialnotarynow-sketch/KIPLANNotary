"use client"

import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import ServiceCard from "@/components/ServiceCard"
import {
  Globe,
  HeartHandshake,
  Copy,
  ScrollText,
  FileCheck,
} from "lucide-react"

const services = [
  {
    title: "Official Document Translation",
    description:
      "Certified English–Nepali translation for legal, academic, personal, and international documents. Online request available.",
    icon: Globe,
    online: true,
    href: "/translation/",
  },
  {
    title: "Marriage Law Translation & Certification",
    description:
      "Translation and certification of marriage certificates and related documents for official, immigration, visa, and international use.",
    icon: HeartHandshake,
    online: true,
    href: "#marriage-translation-certification",
  },
  {
    title: "Copy Verification",
    description:
      "Certified true copies of citizenship, certificates, academic records, and other original documents. Office visit required.",
    icon: Copy,
    online: false,
    href: "#copy-verification",
  },
  {
    title: "Sworn Document",
    description:
      "Drafting and notarization of sworn documents and declarations for legal, administrative, and immigration purposes.",
    icon: ScrollText,
    online: false,
    href: "#sworn-document",
  },
  {
    title: "Document Certification",
    description:
      "Certification of documents for embassy, visa, immigration, and international legal requirements.",
    icon: FileCheck,
    online: false,
    href: "#document-certification",
  },
  {
    title: "Court Marriage Registration",
    description:
      "Legal and procedural assistance for couples seeking court marriage in Nepal, including document preparation and guidance.",
    icon: HeartHandshake,
    online: false,
    href: "#court-marriage",
  },
]

const detailedServices = [
  {
    id: "translation",
    number: "01",
    title: "Official Document Translation",
    label: "Online Request",
    image: "/images/Notarising.jpg",
    imageAlt: "Official document translation and notarial service",
    paragraphs: [
      "We provide professional English–Nepali translation of official, legal, academic, personal, and other documents requiring formal use.",
      "Translation requests can be submitted online by uploading your documents. The office reviews the submitted materials and advises on the appropriate process.",
    ],
    action: "Request Translation Online →",
    actionHref: "/translation/",
  },
  {
    id: "marriage-translation-certification",
    number: "02",
    title: "Marriage Law Translation & Certification",
    label: "Online Request",
    image: "/images/Marriage-Scotland.png",
    imageAlt: "Marriage document for translation and certification",
    paragraphs: [
      "We assist with translation and certification of marriage certificates and related marriage documents for official and international use.",
      "These services may be required for immigration, visa applications, foreign authorities, and other official purposes.",
    ],
    action: "Start Translation Request Online →",
    actionHref: "/translation/",
  },
  {
    id: "copy-verification",
    number: "03",
    title: "Copy Verification",
    label: "Office Visit",
    image: "/images/NP Aplication.jpg",
    imageAlt: "Notary public document application",
    paragraphs: [
      "We verify copies of original documents where certified copies are required for official, legal, academic, administrative, or other purposes.",
      "Please bring the original document together with the copy requiring verification. The original must be available for examination.",
    ],
  },
  {
    id: "sworn-document",
    number: "04",
    title: "Sworn Document",
    label: "Office Visit",
    image: "/images/Sworn document.jpg",
    imageAlt: "Sworn document",
    paragraphs: [
      "We assist with drafting and notarization of sworn documents and declarations for appropriate legal, administrative, immigration, and other official purposes.",
      "The required format and supporting documents may vary depending on the purpose and authority requesting the document.",
    ],
  },
  {
    id: "document-certification",
    number: "05",
    title: "Document Certification",
    label: "Office Visit",
    image: "/images/Certification.png",
    imageAlt: "Official document certification",
    paragraphs: [
      "We provide document certification services for documents intended for official, embassy, visa, immigration, academic, and international use.",
      "The appropriate certification process depends on the type of document and the requirements of the receiving authority.",
    ],
  },
  {
    id: "court-marriage",
    number: "06",
    title: "Court Marriage Registration",
    label: "Office Visit",
    image: "/images/CourtMarriage.jpg",
    imageAlt: "Court marriage service",
    paragraphs: [
      "We provide legal and procedural assistance for couples seeking court marriage in Nepal.",
      "Our assistance may include guidance on required documents, preparation of paperwork, and navigating the applicable legal and administrative process.",
    ],
  },
]

function ServiceFeature({
  service,
  reverse = false,
}: {
  service: (typeof detailedServices)[number]
  reverse?: boolean
}) {
  return (
    <SectionReveal>
      <div id={service.id} className="scroll-mt-28">
        <div
          className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md lg:flex ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          }`}
        >
          {/* FULL-HEIGHT IMAGE PANEL */}
          <div className="relative w-full shrink-0 bg-warm-white sm:h-64 lg:h-auto lg:w-72 xl:w-80">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 320px"
              className="object-cover"
            />
          </div>

          {/* TEXT AREA */}
          <div className="flex flex-1 flex-col justify-center p-7 sm:p-8 lg:min-h-[260px] lg:px-10 lg:py-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold tracking-[0.2em] text-deep-blue">
                {service.number}
              </span>

              <span className="rounded-full bg-light-blue px-3 py-1 text-xs font-semibold text-deep-blue">
                {service.label}
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
              {service.title}
            </h3>

            <div className="mt-4 max-w-3xl space-y-3">
              {service.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-gray-600 text-justify"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {service.action && service.actionHref && (
              <div className="mt-6">
                <a
                  href={service.actionHref}
                  className="inline-flex items-center rounded-full bg-deep-blue px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {service.action}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* HERO */}
        <section className="bg-deep-blue py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="max-w-3xl">
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-white/70">
                  KIPLAN Notary
                </span>

                <h1 className="mt-3 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                  Our Services
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
                  Professional notarial, document, translation, certification,
                  and legal support services for individuals, families, and
                  organizations.
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* SERVICE CARDS */}
        <section className="bg-warm-white py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="mb-10 max-w-2xl">
                <span className="text-sm font-semibold uppercase tracking-wider text-deep-blue">
                  What We Offer
                </span>

                <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                  Practical Services for Your Documents
                </h2>

                <p className="mt-4 text-base leading-relaxed text-gray-600 text-justify">
                  Choose the service you need. Online services can be started
                  remotely, while services requiring original documents are
                  handled at our office.
                </p>
              </div>
            </SectionReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard
                  key={service.title}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  online={service.online}
                  href={service.href}
                />
              ))}
            </div>
          </div>
        </section>

        {/* DETAILED SERVICES */}
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="mx-auto mb-14 max-w-3xl text-center">
                <span className="text-sm font-semibold uppercase tracking-wider text-deep-blue">
                  Service Details
                </span>

                <h2 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
                  What We Provide
                </h2>

                <p className="mt-5 text-base leading-relaxed text-gray-600 text-justify sm:text-lg">
                  Clear, professional assistance with document translation,
                  verification, certification, sworn documents, and court
                  marriage procedures.
                </p>
              </div>
            </SectionReveal>

            <div className="space-y-7">
              {detailedServices.map((service, index) => (
                <ServiceFeature
                  key={service.id}
                  service={service}
                  reverse={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-light-blue py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <SectionReveal>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Need Help With a Document?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
                Send us your document details and we can guide you on the
                appropriate notarial or translation service.
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/translation/"
                  className="inline-flex items-center justify-center rounded-full bg-deep-blue px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Request Translation Online →
                </a>

                <a
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-full border border-deep-blue px-6 py-3 text-sm font-semibold text-deep-blue transition-all duration-300 hover:bg-white"
                >
                  Contact KIPLAN Notary →
                </a>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}