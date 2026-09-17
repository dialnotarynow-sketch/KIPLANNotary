"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

type FAQ = {
  question: string
  answer: React.ReactNode
}

type ArticleFAQProps = {
  items: FAQ[]
}

export default function ArticleFAQ({ items }: ArticleFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="mt-12">
      <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-6">
        Frequently Asked Questions
      </h2>

      <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white overflow-hidden">
        {items.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-6 px-5 py-5 text-left hover:bg-gray-50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-[17px] font-semibold leading-relaxed text-deep-blue">
                  {item.question}
                </span>

                <Plus
                  className={`h-5 w-5 shrink-0 text-deep-blue transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-[16px] leading-relaxed text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
