"use client"

import SectionReveal from "./SectionReveal"
import { Upload, Search, PenTool, Package } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Submit Online",
    description: "Fill in your details, upload documents, and specify requirements through our secure translation request form.",
    icon: Upload,
  },
  {
    number: "02",
    title: "We Verify",
    description: "Our office reviews your application, verifies identity and documents, and confirms requirements.",
    icon: Search,
  },
  {
    number: "03",
    title: "Processing",
    description: "Professional translation and certification by Advocate Kamal Khadka, Notary Public.",
    icon: PenTool,
  },
  {
    number: "04",
    title: "Receive",
    description: "Collect your completed documents from the office or receive digital copies where appropriate.",
    icon: Package,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-16">
          <span className="text-sm font-medium text-crimson uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-3xl lg:text-4xl text-deep-blue mt-3 mb-4">
            Simple. Professional. Transparent.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Four clear steps from submission to delivery. Track your request every step of the way.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <SectionReveal key={step.number} delay={index * 0.15}>
              <div className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-300" />
                )}

                <div className="mb-4">
                  <span className="font-display text-5xl font-bold text-deep-blue/10">{step.number}</span>
                </div>
                <div className="w-12 h-12 bg-deep-blue rounded-lg flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
