"use client"

import Image from "next/image"
import SectionReveal from "./SectionReveal"
import { Award, Shield, Users, BookOpen } from "lucide-react"

const credentials = [
  { icon: Shield, label: "Notary Public", value: "Authorized by Nepal Notary Public Council" },
  { icon: Award, label: "Advocate", value: "Registered with Nepal Bar Council" },
  { icon: BookOpen, label: "Translator", value: "Certified Legal Translator" },
  { icon: Users, label: "Experience", value: "Serving clients since 2016" },
]

export default function WhyKiplan() {
  return (
    <section className="py-20 lg:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <SectionReveal>
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
                <Image
                  src="/images/kamal-profile.png"
                  alt="Advocate Kamal Khadka — Notary Public"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-lg shadow-lg p-4 border border-gray-100 max-w-[200px]">
                <p className="font-display text-lg font-semibold text-deep-blue">Kamal Khadka</p>
                <p className="text-xs text-gray-500 mt-1">Advocate · Notary Public · Translator</p>
              </div>
            </div>
          </SectionReveal>

          {/* Content */}
          <div>
            <SectionReveal>
              <span className="text-sm font-medium text-crimson uppercase tracking-wider">Why KIPLAN</span>
              <h2 className="font-display text-3xl lg:text-4xl text-deep-blue mt-3 mb-6">
                Professional Credibility You Can Trust
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Founded in 2016, KIPLAN Notary Public Office is the notarial division of Kathmandu IP Law & Associates Nepal. 
                Led by Advocate Kamal Khadka, we combine deep legal expertise with a commitment to accessible, professional service.
              </p>
            </SectionReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {credentials.map((cred, index) => (
                <SectionReveal key={cred.label} delay={0.1 + index * 0.1}>
                  <div className="flex items-start gap-3 p-4 bg-cream rounded-lg">
                    <div className="w-10 h-10 bg-deep-blue/5 rounded-lg flex items-center justify-center shrink-0">
                      <cred.icon className="w-5 h-5 text-deep-blue" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{cred.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{cred.value}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>

            <SectionReveal delay={0.5} className="mt-8">
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1.5 bg-deep-blue/5 text-deep-blue text-xs font-medium rounded-full">Nepal Bar Council</span>
                <span className="px-3 py-1.5 bg-deep-blue/5 text-deep-blue text-xs font-medium rounded-full">Nepal Notary Public Association</span>
                <span className="px-3 py-1.5 bg-deep-blue/5 text-deep-blue text-xs font-medium rounded-full">Patan High Court Bar</span>
                <span className="px-3 py-1.5 bg-deep-blue/5 text-deep-blue text-xs font-medium rounded-full">Endeavour Award 2008</span>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
