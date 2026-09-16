"use client"

import Image from "next/image"
import { useState } from "react"
import SectionReveal from "./SectionReveal"
import { Award, Shield, Users, BookOpen, X } from "lucide-react"

const credentials = [
  {
    icon: Award,
    title: "Licensed Notary Public",
    description:
      "Authorized to provide professional notarial services.",
  },
  {
    icon: Shield,
    title: "Professional & Confidential",
    description:
      "Your documents and personal information are handled with care.",
  },
  {
    icon: Users,
    title: "Client-Focused Service",
    description:
      "Clear guidance and practical support throughout the process.",
  },
  {
    icon: BookOpen,
    title: "Legal & Academic Experience",
    description:
      "Backed by experience in legal, academic, and professional services.",
  },
]

export default function WhyKiplan() {
  const [certificateOpen, setCertificateOpen] = useState(false)

  return (
    <>
      <section className="py-20 lg:py-28 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT SIDE */}
            <SectionReveal>
              <div className="space-y-8">

                {/* Office Photo */}
                <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-sm">
                  <Image
                    src="/images/Kamal-Office.jpg"
                    alt="KIPLAN Notary Office"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Certificate */}
                <div>
                  <button
                    type="button"
                    onClick={() => setCertificateOpen(true)}
                    className="group relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-deep-blue/30"
                    aria-label="View Notary Public Certificate"
                  >
                    <Image
                      src="/images/Notary-Certificate.jpg"
                      alt="Notary Public Certificate"
                      fill
                      className="object-cover"
                    />

                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-medium">
                        Click to view certificate
                      </span>
                    </div>
                  </button>

                  <p className="mt-3 text-center text-sm font-medium text-deep-blue">
                    Notary Public Certificate
                  </p>
                </div>

              </div>
            </SectionReveal>

            {/* RIGHT SIDE */}
            <SectionReveal delay={0.15}>
              <div>

                <span className="inline-block text-sm font-semibold tracking-wider uppercase text-deep-blue mb-3">
                  Why KIPLAN
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  Professional Credibility You Can Trust
                </h2>

                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                  KIPLAN Notary provides professional notarial and document
                  services with an emphasis on accuracy, confidentiality,
                  transparency, and client convenience.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {credentials.map((item) => {
                    const Icon = item.icon

                    return (
                      <div
                        key={item.title}
                        className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <div className="flex items-start gap-4">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-light-blue text-deep-blue">
                            <Icon className="h-5 w-5" />
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {item.title}
                            </h3>

                            <p className="mt-2 text-sm leading-relaxed text-gray-600">
                              {item.description}
                            </p>
                          </div>

                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-light-blue px-4 py-2 text-sm font-medium text-deep-blue">
                    Professional Service
                  </span>

                  <span className="rounded-full bg-light-blue px-4 py-2 text-sm font-medium text-deep-blue">
                    Confidential Handling
                  </span>

                  <span className="rounded-full bg-light-blue px-4 py-2 text-sm font-medium text-deep-blue">
                    Clear Process
                  </span>
                </div>

              </div>
            </SectionReveal>

          </div>
        </div>
      </section>

      {/* CERTIFICATE LIGHTBOX */}
      {certificateOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setCertificateOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl bg-white p-3 shadow-[0_0_60px_rgba(255,255,255,0.25)]"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Close button */}
            <button
              type="button"
              onClick={() => setCertificateOpen(false)}
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-deep-blue text-white shadow-lg transition-transform hover:scale-110"
              aria-label="Close certificate"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Enlarged certificate */}
            <div className="w-full overflow-hidden rounded-xl bg-white">
              <Image
                src="/images/Notary-Certificate.jpg"
                alt="Notary Public Certificate"
                width={1600}
                height={900}
                className="block w-full h-auto"
                priority
              />
            </div>

          </div>
        </div>
      )}
    </>
  )
}