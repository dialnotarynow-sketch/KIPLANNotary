"use client"

import { useState } from "react"
import SectionReveal from "./SectionReveal"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "What is Notarisation?",
    answer: "Notarisation is the official certification of documents and signatures by a licensed Notary Public. In Nepal, Notaries are authorized by the Nepal Notary Public Council to certify documents, translate legal texts, and verify identities under the Notary Public Act 2063.",
  },
  {
    question: "What documents do I need to bring?",
    answer: "For office visits, bring the original documents requiring certification, a valid government-issued ID (Citizenship Certificate, Passport, or National ID), and any supporting evidence. For online translation requests, you can upload scanned copies — but original documents may be required for final certification.",
  },
  {
    question: "Online vs Office Visit — what's the difference?",
    answer: "Translation requests can be initiated online through our secure form. However, services requiring physical document examination — such as copy verification, affidavits, and certain certifications — require an in-person office visit. The Notary must examine original documents and verify identity personally.",
  },
  {
    question: "How long does certification take?",
    answer: "Standard translation and certification typically takes 2–3 business days after verification is complete. Complex documents or high volumes may require additional time. You will receive a reference number to track progress.",
  },
  {
    question: "What is the correction policy?",
    answer: "If any errors are found in translated or certified documents, corrections will be made free of charge within 7 days of delivery. After 7 days, a new service fee will apply.",
  },
]

export default function NotaryInfo() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal className="text-center mb-12">
          <span className="text-sm font-medium text-crimson uppercase tracking-wider">Notarisation Information</span>
          <h2 className="font-display text-3xl lg:text-4xl text-deep-blue mt-3 mb-4">
            Understanding the Process
          </h2>
          <p className="text-gray-600">
            Clear answers to common questions about notarial services in Nepal.
          </p>
        </SectionReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <SectionReveal key={index} delay={index * 0.08}>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-deep-blue shrink-0" />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-5 pb-5 pl-13">
                    <p className="text-sm text-gray-600 leading-relaxed ml-8">{faq.answer}</p>
                  </div>
                )}
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
