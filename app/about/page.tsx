'EOF'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Award,
  BookOpen,
  Eye,
  ExternalLink,
  ShieldCheck,
  Users,
} from "lucide-react"

const team = [
  {
  name: "Kamal Khadka",
  qualification: "MA (HRM), Australia · LL.M. (TU)",
  designation: "Advocate · Notary Public",
  image: "/images/Adv Kamal.jpg",
  href: "/about/team/kamal-khadka",
},
  {
  name: "Raj Kumar Dhakal",
  qualification: "B.L. (Tribhuvan University)",
  designation: "Senior Advocate",
  image: "/images/Adv Raj-Kumar-Dhakal.png",
  href: "/about/team/raj-kumar-dhakal",
},
  {
  name: "Babita Karki",
  qualification: "LL.M. (TU)",
  designation: "Advocate · Notary Public",
  image: "/images/Adv Babita Karki.png",
  href: "/about/team/babita-karki",
},
  {
    name: "Purna Prasad Dhakal",
    qualification: "MA, LL.M",
    designation: "Advocate",
    image: "/images/Adv Purna-Dhakal.png",
    href: "/about/team/Purna-Dhakal",
  },
  {
    name: "Ghanashyam Katuwal",
    qualification: "MA",
    designation: "Account Officer",
    image: "/images/GhanaShyam Katuwal.png",
    href: "/about/team/ghanashyam-katuwal",
  },
  {
    name: "Bimala Shahi",
    qualification: "Intermediate in Atrs",
    designation: "Office Assistant",
    image: "/images/Asst-bimala shahi.jpg",
    href: "/about/team/bimala-shahi",
  },
]

const approach = [
  {
    icon: ShieldCheck,
    title: "Accuracy",
    description:
      "Careful handling of documents, names, dates, translations, and notarial details.",
  },
  {
    icon: Eye,
    title: "Confidentiality",
    description:
      "Personal information and documents are handled with appropriate care and discretion.",
  },
  {
    icon: BookOpen,
    title: "Clarity",
    description:
      "Straightforward guidance so clients understand what is required and what happens next.",
  },
  {
    icon: Award,
    title: "Professional Service",
    description:
      "A practical, respectful, and client-focused approach to notarial and document services.",
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* HERO */}
        <section className="bg-deep-blue py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-light-blue mb-3">
                About KIPLAN Notary
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
                Professional Notarial Services Built on Trust and Experience
              </h1>

              <p className="mt-6 text-lg text-white/75 leading-relaxed max-w-3xl">
                KIPLAN Notary is the notarial division of Kathmandu IP Law &
                Associates Nepal, providing professional notarial, document
                certification, and translation services with a focus on
                accuracy, confidentiality, and client convenience.
              </p>
            </SectionReveal>
          </div>
        </section>

        {/* ABOUT KIPLAN NOTARY */}
        <section className="py-20 lg:py-28 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <SectionReveal>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden shadow-sm">
                  <Image
                    src="/images/Kamal-Office.jpg"
                    alt="KIPLAN Notary Office"
                    fill
                    className="object-cover"
                  />
                </div>
              </SectionReveal>

              <SectionReveal delay={0.15}>
                <div>
                  <span className="inline-block text-sm font-semibold tracking-wider uppercase text-deep-blue mb-3">
                    Our Office
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    About KIPLAN Notary
                  </h2>

                  <div className="mt-6 space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      KIPLAN Notary is the dedicated notarial division of
                      Kathmandu IP Law & Associates Nepal (KIPLAN), combining
                      professional legal experience with a modern approach to
                      document and notarial services.
                    </p>

                    <p>
                      Our services are designed for individuals, businesses,
                      students, professionals, and organisations that require
                      reliable document certification, translation,
                      notarisation, and related support.
                    </p>

                    <p>
                      Whether a service begins online or requires an office
                      visit, our aim is simple: to make the process clear,
                      professional, and convenient while maintaining proper
                      attention to documents and client information.
                    </p>
                  </div>

                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-lg bg-deep-blue text-white font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    Explore Our Services
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* OUR TEAM */}
        <section className="py-20 lg:py-28 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-deep-blue mb-3">
                Our Team
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                People Behind KIPLAN Notary
              </h2>

              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Our team brings together legal, notarial, administrative, and
                professional experience to support clients throughout their
                document service needs.
              </p>
            </SectionReveal>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {team.map((member, index) => (
                <SectionReveal key={member.name} delay={index * 0.05}>
                  <Link
                    href={member.href}
                    className="group block h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-light-blue">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 group-hover:text-deep-blue transition-colors">
                          {member.name}
                        </h3>

                        <p className="mt-0.5 text-sm font-medium text-deep-blue">
                          {member.qualification}
                        </p>

                        <p className="mt-1 text-sm text-gray-600 leading-snug">
                          {member.designation}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-sm font-medium text-deep-blue">
                        Learn More
                      </span>

                      <ArrowRight className="h-4 w-4 text-deep-blue transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROFESSIONAL APPROACH */}
        <section className="py-20 lg:py-28 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-deep-blue mb-3">
                Our Approach
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Professional Service, Clear Process
              </h2>

              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                We believe professional document services should be accurate,
                understandable, and handled with appropriate care.
              </p>
            </SectionReveal>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {approach.map((item, index) => {
                const Icon = item.icon

                return (
                  <SectionReveal key={item.title} delay={index * 0.08}>
                    <div className="h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-light-blue text-deep-blue">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="mt-5 font-semibold text-lg text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </SectionReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* KIPLAN RESOURCES */}
        <section className="py-20 lg:py-28 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal className="text-center max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold tracking-wider uppercase text-deep-blue mb-3">
                KIPLAN Resources
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                More from the KIPLAN Professional Network
              </h2>

              <p className="mt-5 text-lg text-gray-600 leading-relaxed">
                Explore KIPLAN's broader legal, academic, and professional
                resources.
              </p>
            </SectionReveal>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <SectionReveal>
                <a
                  href="https://kiplan.com.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Users className="h-6 w-6 text-deep-blue" />

                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    KIPLAN Law Firm
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Legal services, publications, and professional resources
                    from Kathmandu IP Law & Associates Nepal.
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-deep-blue">
                    Visit KIPLAN
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <a
                  href="https://kiplanscholar.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <BookOpen className="h-6 w-6 text-deep-blue" />

                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    KIPLAN Scholar
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Academic resources, research support, and educational
                    content from the wider KIPLAN network.
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-deep-blue">
                    Visit KIPLAN Scholar
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
              </SectionReveal>

              <SectionReveal delay={0.2}>
                <a
                  href="https://kamalkhadka.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <Award className="h-6 w-6 text-deep-blue" />

                  <h3 className="mt-5 text-xl font-semibold text-gray-900">
                    Kamal Khadka
                  </h3>

                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    Professional profile and resources relating to legal,
                    notarial, and professional work.
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-deep-blue">
                    View Profile
                    <ExternalLink className="h-4 w-4" />
                  </span>
                </a>
              </SectionReveal>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-deep-blue py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SectionReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Need Professional Notarial or Document Services?
              </h2>

              <p className="mt-5 text-lg text-white/75 leading-relaxed">
                Explore our services or get in touch with KIPLAN Notary for
                guidance on your document requirements.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-deep-blue transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Explore Our Services
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-5 py-3 font-medium text-white transition-all duration-300 hover:bg-white/15"
                >
                  Contact KIPLAN
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}