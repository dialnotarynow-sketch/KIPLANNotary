import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import Link from "next/link"
import { BookOpen, ArrowRight } from "lucide-react"

const publications = [
  {
    title: "What Does a Notary Public Do in Nepal?",
    description:
      "An introduction to notarial services, document certification, copy verification, sworn documents, and official translation in Nepal.",
    href: "/publication/what-does-a-notary-public-do-in-nepal/",
    available: true,
  },
  {
    title: "A Complete Guide to Document Notarization in Nepal",
    description:
      "A practical guide to document notarization, certification, copy verification, sworn documents, translation, and related services in Nepal.",
    href: "/publication/document-notarization-in-nepal/",
    available: true,
  },
  {
    title: "Trusted Notary Public in Kathmandu: 7 Essential Tips",
    description:
      "Practical tips for verifying professional notary services, understanding the process, and choosing a reliable service provider in Nepal.",
    href: "/publication/trusted-notary-public-in-kathmandu/",
    available: true,
  },
  {
    title: "How to Certify Documents in Nepal",
    description:
      "General guidance on copy verification and document certification requirements.",
    href: "#",
    available: false,
  },
  {
    title: "Official Document Translation: What You Need to Know",
    description:
      "Information about certified English–Nepali document translation.",
    href: "#",
    available: false,
  },
  {
    title: "Court Marriage Registration in Nepal",
    description:
      "General information regarding court marriage registration and supporting documents.",
    href: "#",
    available: false,
  },
  {
    title: "Marriage Certificate Translation & Certification",
    description:
      "Translation and certification of marriage-related documents for official use.",
    href: "#",
    available: false,
  },
]

export default function PublicationPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="bg-deep-blue py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <span className="text-sm font-medium text-crimson uppercase tracking-wider">
                Publication
              </span>

              <h1 className="font-display text-3xl lg:text-5xl text-white mt-3 mb-4">
                Articles & Resources
              </h1>

              <p className="text-lg text-white/70 max-w-3xl leading-relaxed">
                Practical information, guides, and articles related to
                notarial, translation, certification, and legal document
                services.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* Articles */}
        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publications.map((item, index) => (
                <SectionReveal key={item.title} delay={index * 0.1}>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-full flex flex-col">
                    <div className="w-12 h-12 rounded-lg bg-light-blue flex items-center justify-center mb-5">
                      <BookOpen className="w-6 h-6 text-deep-blue" />
                    </div>

                    <h2 className="text-xl font-semibold text-deep-blue mb-3">
                      {item.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    <div className="mt-auto">
                      {item.available ? (
                        <Link
                          href={item.href}
                          className="inline-flex items-center gap-2 text-deep-blue font-medium hover:text-crimson transition-colors"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-gray-400 font-medium">
                          Coming Soon
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}