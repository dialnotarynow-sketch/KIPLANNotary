import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import ArticleFAQ from "@/components/ArticleFAQ"
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title:
    "How to Choose a Trusted Notary Public in Kathmandu: 7 Essential Tips | KIPLAN Notary",
  description:
    "Learn how to choose a trusted Notary Public in Kathmandu, verify professional credentials, understand notarization procedures, and avoid unreliable notary services in Nepal.",
}

const tips = [
  {
    number: "01",
    title: "Check Professional Credentials",
    text: "Before using a notary service, check the professional credentials of the person handling your documents. A reliable provider should be able to clearly explain the notarial service being offered and identify the authorized professional responsible for the work.",
  },
  {
    number: "02",
    title: "Look for a Real Physical Office",
    text: "A clearly identified office gives clients a practical way to verify where the service is being provided. Check whether the website provides a physical address, telephone number, office information, and a straightforward way to contact the service provider.",
  },
  {
    number: "03",
    title: "Review the Services Carefully",
    text: "Not every document requires the same type of certification or notarial service. A professional office should explain whether your matter involves document certification, copy verification, a sworn document, translation, or another service.",
  },
  {
    number: "04",
    title: "Understand the Process",
    text: "A trustworthy provider should be willing to explain what documents you need, what identification is required, what steps will be followed, and whether the original document must be presented.",
  },
  {
    number: "05",
    title: "Be Careful With Instant Online Claims",
    text: "Be cautious about websites promising instant notarization without clearly explaining identity verification, document review, professional responsibility, or where the service is actually performed. Convenience should not replace proper verification.",
  },
  {
    number: "06",
    title: "Ask About Fees Before Proceeding",
    text: "Professional service providers should be able to explain the applicable service charges before work begins. Ask what is included and whether separate charges may apply for translation, drafting, certification, or other related services.",
  },
  {
    number: "07",
    title: "Consider the Document's Final Purpose",
    text: "The purpose and destination of a document can affect what additional steps are required. Documents intended for immigration, education, employment, business, court, or use outside Nepal may have different requirements.",
  },
]

export default function TrustedNotaryKathmanduPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-deep-blue py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="text-center">
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                  KIPLAN Notary Publication
                </p>

                <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                  How to Choose a Trusted Notary Public in Kathmandu: 7 Essential
                  Tips
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg">
                  Practical guidance for verifying professional notary services,
                  understanding the notarization process, and choosing a reliable
                  service provider in Nepal.
                </p>

                <div className="mt-6 flex items-center justify-start gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src="/images/Adv Kamal.jpg"
                      alt="Advocate / Notary Public Kamal Khadka"
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>

                  <div className="text-left text-sm text-white/60">
                    <div className="font-medium text-white/80">
                      Advocate / Notary Public Kamal Khadka
                    </div>
                    <div className="mt-0.5">
                      November 2025
                    </div>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Article */}
        <article className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="text-[17px] leading-[1.30] text-justify text-gray-700">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    Why Choosing a Trusted Notary Public Matters
                  </h2>

                  <p className="mt-6">
                    When a document needs to be notarized, certified, verified, or
                    prepared for official use, choosing the right professional matters.
                    People searching for a <strong>Notary Public in Kathmandu</strong>
                    may need services for immigration, education, employment, business,
                    court matters, marriage-related documents, or use outside Nepal.
                  </p>

                  <p className="mt-5">
                    Online listings can be confusing. Terms such as "instant
                    notarization" or "fast document certification" do not necessarily
                    explain whether the service matches the document's actual
                    requirements.
                  </p>

                  <p className="mt-5">
                    These seven practical checks can help you understand who is
                    handling your documents, what service is required, and what steps
                    may be necessary.
                  </p>
                </section>

                {/* Featured image */}
                <figure className="mt-10 mb-12">
                  <div className="relative h-[664px] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm sm:h-[696px]">
                    <Image
                      src="/images/NP_Office.jpeg"
                      alt="Notary office providing professional document services in Kathmandu, Nepal"
                      fill
                      priority
                      sizes="(max-width: 640px) 100vw, 896px"
                      className="object-cover object-[50%_40%]"
                    />
                  </div>

                  <figcaption className="mt-3 text-center text-sm text-gray-500">
                    A professional office environment can help clients verify where
                    notarial and document services are being provided.
                  </figcaption>
                </figure>

                {/* Tip 1 */}
                <section>
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    1. Check the Professional Credentials
                  </h2>

                  <p className="mt-6">
                    Check who is responsible for the service and whether the office
                    clearly identifies its professional role. The{" "}
                    <strong>Notary Public Act, 2063 (2007)</strong> provides the legal
                    framework for notarial practice in Nepal.
                  </p>

                  <p className="mt-5">
                    A professional website should clearly identify the office, its
                    services, and relevant professional information rather than relying
                    only on advertising claims.
                  </p>
                </section>

                {/* Tip 2 */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    2. Look for a Real Physical Office
                  </h2>

                  <p className="mt-6">
                    A clearly identified physical office helps clients understand where
                    the service is provided and how to contact the provider. Look for an
                    office address, telephone number, email address, and useful office
                    information.
                  </p>

                  <p className="mt-5">
                    The issue is not the size of the office. What matters is
                    transparency about who provides the service and where the office
                    operates.
                  </p>
                </section>

                {/* Tip 3 */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    3. Make Sure the Service Matches Your Document
                  </h2>

                  <p className="mt-6">
                    Not every document requires the same service. Depending on the
                    document and purpose, you may need document certification, copy
                    verification, a sworn document, official translation,
                    marriage-related services, or another procedure.
                  </p>

                  <p className="mt-5">
                    Before paying, explain where the document will be used and what it
                    is for. This gives the service provider an opportunity to explain
                    whether additional documentation or authentication may be required.
                  </p>

                  <div className="mt-7 rounded-2xl border border-gray-200 bg-warm-white p-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-deep-blue" />
                      <div>
                        <h3 className="text-lg font-bold text-deep-blue">
                          A simple question to ask
                        </h3>
                        <p className="mt-2 text-gray-700">
                          Explain the document's purpose and destination and ask which
                          service is appropriate.
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Tip 4 */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    4. Understand the Notarization Process
                  </h2>

                  <p className="mt-6">
                    Ask what documents and identification you need, whether originals
                    must be presented, and what steps will be followed.
                  </p>

                  <p className="mt-5">
                    Depending on the service, the process may include document review,
                    identity verification, relevant records, signing or witnessing
                    where applicable, and the appropriate notarial certification.
                    Exact requirements depend on the document and service.
                  </p>
                </section>

                {/* Process image */}
                <figure className="mt-10 mb-12">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <Image
                      src="/images/document-notarization-process-nepal.jpg"
                      alt="Document notarization process in Nepal"
                      width={1024}
                      height={747}
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  <figcaption className="mt-3 text-center text-sm text-gray-500">
                    An overview of the document notarization process in Nepal.
                  </figcaption>
                </figure>

                {/* Tip 5 */}
                <section>
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    5. Be Careful With “Instant” Online Notarization Claims
                  </h2>

                  <p className="mt-6">
                    Fast processing can be useful, but it should not replace document
                    review, identity verification, or professional responsibility.
                  </p>

                  <p className="mt-5">
                    Be cautious when a website does not clearly identify the
                    professional, physical office, process, or handling of sensitive
                    documents.
                  </p>

                  <div className="mt-7 rounded-2xl border border-red-100 bg-red-50 p-6">
                    <h3 className="text-lg font-bold text-deep-blue">
                      Warning signs worth checking
                    </h3>

                    <ul className="mt-4 space-y-3">
                      <li className="flex gap-3">
                        <span className="font-bold text-deep-blue">•</span>
                        <span>No clear information about the professional.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-deep-blue">•</span>
                        <span>No identifiable office or reliable contact information.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-deep-blue">•</span>
                        <span>Broad promises without explaining the procedure.</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="font-bold text-deep-blue">•</span>
                        <span>Requests for sensitive documents without clear handling information.</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* Tip 6 */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    6. Ask About Fees Before Proceeding
                  </h2>

                  <p className="mt-6">
                    The cost of <strong>professional notarial services in Kathmandu</strong>
                    can depend on the document, service, number of copies, and related
                    work such as translation or drafting.
                  </p>

                  <p className="mt-5">
                    Ask what is included in the quoted amount and whether separate
                    charges may apply. Clear communication about fees helps prevent
                    misunderstandings.
                  </p>
                </section>

                {/* Tip 7 */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    7. Consider the Document’s Final Purpose
                  </h2>

                  <p className="mt-6">
                    Ask not only whether a document needs notarization, but also{" "}
                    <strong>where it will be used</strong>.
                  </p>

                  <p className="mt-5">
                    Requirements may differ between a Nepal government office and a
                    foreign university, embassy, immigration authority, employer,
                    court, or financial institution.
                  </p>

                  <p className="mt-5">
                    For use outside Nepal, check with the receiving authority about
                    certification, authentication, translation, or legalization.
                    Notarization alone does not guarantee acceptance by every foreign
                    authority.
                  </p>
                </section>

                {/* Common documents */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    Documents Commonly Associated With Notarial Services
                  </h2>

                  <p className="mt-6">
                    Depending on the purpose, notarial services may involve:
                  </p>

                  <ul className="mt-6 space-y-3 pl-5">
                    <li className="list-disc">Copies requiring verification.</li>
                    <li className="list-disc">Sworn documents and declarations.</li>
                    <li className="list-disc">Documents requiring certification.</li>
                    <li className="list-disc">Official translation or related certification.</li>
                    <li className="list-disc">Marriage-related documents.</li>
                    <li className="list-disc">Documents intended for use outside Nepal.</li>
                  </ul>

                  <p className="mt-5">
                    The appropriate service depends on the actual document and its
                    purpose. If unsure, ask before preparing or submitting it.
                  </p>
                </section>

                {/* Kathmandu local SEO */}
                <section className="mt-12 rounded-2xl border border-gray-200 bg-warm-white p-7 sm:p-9">
                  <div className="flex items-start gap-4">
                    <ShieldCheck className="mt-1 h-7 w-7 shrink-0 text-deep-blue" />

                    <div>
                      <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                        Looking for a Trusted Notary Public in Kathmandu?
                      </h2>

                      <p className="mt-6">
                        If you are searching for a <strong>Notary Public in Kathmandu</strong>,
                        look for an identifiable office that clearly explains its
                        services and understands the purpose of your documents.
                      </p>

                      <p className="mt-5">
                        KIPLAN Notary provides professional notarial and document
                        services in Kathmandu, including document certification, copy
                        verification, sworn documents, official translation, and
                        marriage-related documentation.
                      </p>

                      <p className="mt-5">
                        If you are unsure which service you need, contact the office
                        and explain your document and its intended purpose.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Internal links */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    Learn More About Notarial Services in Nepal
                  </h2>

                  <p className="mt-6">
                    These KIPLAN Notary publications provide further information:
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    <Link
                      href="/publication/what-does-a-notary-public-do-in-nepal/"
                      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <h3 className="font-bold text-deep-blue">
                        What Does a Notary Public Do in Nepal?
                      </h3>

                      <p className="mt-3 text-base leading-relaxed text-gray-600">
                        Learn about common notarial services and when you may need a
                        Notary Public.
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 font-semibold text-deep-blue">
                        Read Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>

                    <Link
                      href="/publication/document-notarization-in-nepal/"
                      className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <h3 className="font-bold text-deep-blue">
                        A Complete Guide to Document Notarization in Nepal
                      </h3>

                      <p className="mt-3 text-base leading-relaxed text-gray-600">
                        Understand notarization, certification, copy verification, and
                        the general process.
                      </p>

                      <span className="mt-4 inline-flex items-center gap-2 font-semibold text-deep-blue">
                        Read Article
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </div>
                </section>

                {/* KIPLAN services */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    KIPLAN Notary Services
                  </h2>

                  <p className="mt-6">
                    KIPLAN Notary is the notarial division of KIPLAN and provides
                    professional document and notarial services in Kathmandu.
                  </p>

                  <ul className="mt-6 space-y-3 pl-5">
                    <li className="list-disc">Official Document Translation</li>
                    <li className="list-disc">Marriage Law Translation &amp; Certification</li>
                    <li className="list-disc">Copy Verification</li>
                    <li className="list-disc">Sworn Document</li>
                    <li className="list-disc">Document Certification</li>
                    <li className="list-disc">Court Marriage Registration</li>
                  </ul>

                  <p className="mt-6">
                    Explore the full range of services on the{" "}
                    <Link
                      href="/services/"
                      className="font-semibold text-deep-blue underline underline-offset-4"
                    >
                      KIPLAN Notary Services
                    </Link>{" "}
                    page.
                  </p>
                </section>

                {/* FAQs */}
                <ArticleFAQ
                  items={[
                    {
                      question:
                        "How can I make sure I am dealing with a genuine Notary Public online or in person?",
                      answer: (
                        <p>
                          Whether you contact a Notary Public online or visit an
                          office physically, take reasonable steps to verify who is
                          providing the service. Check the professional's name,
                          credentials, physical office, website, office
                          photographs, professional profile, and contact details.
                          Before submitting important documents or making payment,
                          make sure you have the Notary Public's office address,
                          telephone number, and email address. Where appropriate,
                          identifying details should also be available on the
                          notarized or certified document, such as in the notarial
                          certificate, stamp, seal, or footer. Requirements vary by
                          jurisdiction and receiving institution. For example,
                          GOV.UK guidance for certified copies states that the
                          certifier should add their name, occupation, address, and
                          telephone number to the document.
                          {" "}
                          <a
                            href="https://www.gov.uk/certifying-a-document"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-deep-blue underline underline-offset-4"
                          >
                            GOV.UK guidance
                          </a>
                          .
                        </p>
                      ),
                    },
                    {
                      question:
                        "How can I verify a Notary Public's professional credentials?",
                      answer: (
                        <p>
                          Look for clear information identifying the Notary Public,
                          their professional designation, and the notarial services
                          they provide. Where possible, verify the information
                          independently rather than relying only on advertising or
                          social media profiles.
                        </p>
                      ),
                    },
                    {
                      question:
                        "Why is a physical office important when choosing a Notary Public?",
                      answer: (
                        <p>
                          A clearly identified physical office gives clients a
                          practical way to understand where the service is provided
                          and how to contact the professional if questions arise.
                          An office address, contact information, and professional
                          profile can also help distinguish an identifiable service
                          provider from an online contact point.
                        </p>
                      ),
                    },
                    {
                      question:
                        "What should I check before submitting my documents?",
                      answer: (
                        <p>
                          Confirm the identity of the Notary Public, the service
                          required, the documents and identification you need to
                          provide, the process, applicable fees, and how your
                          documents will be handled. Avoid submitting sensitive
                          documents until you understand who is responsible for the
                          service.
                        </p>
                      ),
                    },
                    {
                      question:
                        "How can I know which notarial service my document requires?",
                      answer: (
                        <p>
                          Explain what the document is, why you need it, and where it
                          will be submitted. Depending on the circumstances, you may
                          need document certification, copy verification, a sworn
                          document, translation, or another procedure. The
                          requirements should be considered in light of the
                          document's actual purpose.
                        </p>
                      ),
                    },
                    {
                      question:
                        "Should I ask about fees before proceeding with a notarial service?",
                      answer: (
                        <p>
                          Yes. Ask the office to explain the applicable charges
                          before the work proceeds and whether additional charges may
                          apply. The cost can depend on the document, service,
                          number of copies, and any related services.
                        </p>
                      ),
                    },
                    {
                      question:
                        "Is notarization enough for documents intended for use outside Nepal?",
                      answer: (
                        <p>
                          Not necessarily. A foreign university, embassy,
                          immigration authority, government office, employer, or
                          other receiving institution may require additional
                          verification, authentication, attestation, translation,
                          or legalization. Always check the current requirements of
                          the authority or institution receiving the document.
                        </p>
                      ),
                    },
                  ]}
                />

                {/* Disclaimer */}
                <section className="mt-12 border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-bold text-deep-blue">
                    Important Note
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-gray-500">
                    This article is provided for general informational and
                    educational purposes only. Notarial requirements can vary
                    depending on the document, transaction, receiving authority,
                    and intended use. Information and procedures may also change
                    over time. Readers should obtain appropriate professional or
                    official guidance for their specific circumstances before
                    relying on any information in this article.
                  </p>
                </section>

                {/* CTA */}
                <section className="mt-14 rounded-2xl bg-deep-blue p-8 text-center sm:p-10">
                  <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
                    Need Help With a Notarial Document?
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                    If you are unsure which notarial or document service you need,
                    contact KIPLAN Notary and explain the purpose of your document.
                  </p>

                  <div className="mt-7 flex flex-col justify-start gap-3 sm:flex-row">
                    <Link
                      href="/contact/"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-deep-blue transition-colors hover:bg-gray-100"
                    >
                      Contact KIPLAN Notary
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/translation/"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Request Translation
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </section>

              </div>
            </SectionReveal>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}