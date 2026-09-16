import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
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

                <p className="mt-6 text-sm text-white/60">
                  KIPLAN Notary · September 2026
                </p>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Article */}
        <article className="py-14 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="text-[17px] leading-[1.2] text-justify text-gray-700">
                {/* Introduction */}
                <section>
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    Why Choosing a Trusted Notary Public Matters
                  </h2>

                  <p className="mt-6">
                    When a document needs to be notarized, certified, verified, or
                    prepared for official use, choosing an appropriate professional
                    service provider is important. Many people search online for a{" "}
                    <strong>Notary Public in Kathmandu</strong> when preparing
                    documents for immigration, education, employment, business,
                    court proceedings, marriage-related matters, or use outside
                    Nepal.
                  </p>

                  <p className="mt-5">
                    The large number of online listings can sometimes make it
                    difficult to know which service is appropriate for a particular
                    document. Websites may use terms such as "instant notarization,"
                    "online notarization," or "fast document certification," but the
                    service offered may not always match the legal or administrative
                    requirements of the document's intended use.
                  </p>

                  <p className="mt-5">
                    This guide explains seven practical things you can check before
                    choosing a notary service in Kathmandu or elsewhere in Nepal.
                    The goal is not simply to find the fastest service, but to
                    understand who is handling your documents, what service is
                    actually required, and what steps may be necessary for your
                    particular purpose.
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
    A professional office environment can help clients verify where notarial and document services are being provided.
  </figcaption>
</figure>
                {/* Tip 1 */}
                <section>
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    1. Check the Professional Credentials
                  </h2>

                  <p className="mt-6">
                    One of the first things to check when choosing a{" "}
                    <strong>Notary Public in Kathmandu</strong> is the professional
                    information provided by the service provider. A reliable office
                    should be transparent about the professional responsible for
                    the service and the nature of the notarial work being offered.
                  </p>

                  <p className="mt-5">
                    Nepal has a specific legal framework governing notarial
                    services. The{" "}
                    <strong>Notary Public Act, 2063 (2007)</strong> provides the
                    statutory framework for notarial practice in Nepal. Before
                    proceeding with an important document, clients should therefore
                    take reasonable steps to understand who is providing the
                    service and what authority or professional responsibility
                    applies to the transaction.
                  </p>

                  <p className="mt-5">
                    A professional website should make it possible to identify the
                    office, its services, and relevant professional information
                    without relying solely on advertising claims.
                  </p>
                </section>

                {/* Tip 2 */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    2. Look for a Real Physical Office
                  </h2>

                  <p className="mt-6">
                    A clear physical office address is another useful indicator when
                    comparing <strong>notary services in Nepal</strong>. Clients
                    should be able to identify where the service is being provided
                    and how to contact the office if questions arise after the
                    document has been completed.
                  </p>

                  <p className="mt-5">
                    When reviewing a website, look for a complete office address,
                    telephone number, email address, office hours, and other useful
                    contact information. Office photographs and information about
                    the professional team can also help a client understand the
                    nature of the service provider.
                  </p>

                  <p className="mt-5">
                    This does not mean that a website must have a large office or an
                    elaborate online presence. The important point is transparency:
                    the client should be able to understand who is providing the
                    service and where the office operates.
                  </p>
                </section>

                {/* Tip 3 */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    3. Make Sure the Service Matches Your Document
                  </h2>

                  <p className="mt-6">
                    Not every document requires the same type of service. Depending
                    on the document and its purpose, you may need document
                    certification, copy verification, a sworn document, official
                    translation, marriage-related document services, or another
                    form of professional assistance.
                  </p>

                  <p className="mt-5">
                    This is particularly important when documents are being prepared
                    for use outside Nepal. A translation, for example, may involve
                    different requirements from the certification of a copy of an
                    existing document.
                  </p>

                  <p className="mt-5">
                    Before paying for a service, explain what the document will be
                    used for and where it will be submitted. This allows the service
                    provider to explain what can be done and whether additional
                    authentication or documentation may be required.
                  </p>

                  <div className="mt-7 rounded-2xl border border-gray-200 bg-warm-white p-6">
                    <div className="flex items-start gap-4">
                      <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-deep-blue" />

                      <div>
                        <h3 className="text-lg font-bold text-deep-blue">
                          A simple question to ask
                        </h3>

                        <p className="mt-2 text-gray-700">
                          Explain the purpose and destination of your document and
                          ask the office what type of service is appropriate.
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
                    A professional notarial service should not be a mystery to the
                    client. Before proceeding, ask what documents you need to bring,
                    what identification is required, whether original documents
                    must be presented, and what steps will be followed.
                  </p>

                  <p className="mt-5">
                    Depending on the service, the process may involve reviewing the
                    document, verifying identity, completing the relevant records,
                    signing or witnessing where applicable, and applying the
                    appropriate notarial certification.
                  </p>

                  <p className="mt-5">
                    The exact procedure can vary depending on the nature of the
                    document and the service required. That is why it is better to
                    discuss the actual document with the notary rather than relying
                    on a generic online checklist.
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
                    Online search results can include services that promise very
                    fast document processing or "instant" notarization. Speed can
                    be useful, but it should not replace proper document review,
                    identity verification, and professional responsibility.
                  </p>

                  <p className="mt-5">
                    Be especially careful if a website does not clearly identify the
                    professional providing the service, does not provide a physical
                    office address, does not explain its process, or asks you to
                    send sensitive documents without giving clear information about
                    how those documents will be handled.
                  </p>

                  <div className="mt-7 rounded-2xl border border-red-100 bg-red-50 p-6">
                    <h3 className="text-lg font-bold text-deep-blue">
                      Warning signs worth checking
                    </h3>

                    <ul className="mt-4 space-y-3">
                      <li className="flex gap-3">
                        <span className="font-bold text-deep-blue">•</span>
                        <span>
                          No clear information about the professional providing the
                          service.
                        </span>
                      </li>

                      <li className="flex gap-3">
                        <span className="font-bold text-deep-blue">•</span>
                        <span>
                          No identifiable physical office or reliable contact
                          information.
                        </span>
                      </li>

                      <li className="flex gap-3">
                        <span className="font-bold text-deep-blue">•</span>
                        <span>
                          Unusually broad promises without explaining the actual
                          procedure.
                        </span>
                      </li>

                      <li className="flex gap-3">
                        <span className="font-bold text-deep-blue">•</span>
                        <span>
                          Requests for sensitive documents without clear information
                          about their handling.
                        </span>
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
                    Pricing is another practical factor when choosing{" "}
                    <strong>professional notarial services in Kathmandu</strong>.
                    The total cost can depend on the document, the service required,
                    the number of documents or copies, and whether related services
                    such as translation or drafting are involved.
                  </p>

                  <p className="mt-5">
                    A reliable service provider should be able to explain the
                    applicable charges before the work proceeds. Ask whether the
                    quoted amount covers the complete service or whether separate
                    charges may apply.
                  </p>

                  <p className="mt-5">
                    Clear communication about fees helps prevent misunderstandings
                    and allows clients to compare services based on both price and
                    professional quality.
                  </p>
                </section>

                {/* Tip 7 */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    7. Consider the Document’s Final Purpose
                  </h2>

                  <p className="mt-6">
                    One of the most important questions is not simply "Does this
                    document need notarization?" but rather{" "}
                    <strong>“Where will this document be used?”</strong>
                  </p>

                  <p className="mt-5">
                    A document intended for a government office in Nepal may have
                    different requirements from a document being submitted to a
                    foreign university, embassy, immigration authority, employer,
                    court, or financial institution.
                  </p>

                  <p className="mt-5">
                    If the document is intended for use outside Nepal, ask the
                    receiving institution or relevant authority what form of
                    certification, authentication, translation, or legalization is
                    required. Notarization alone does not automatically guarantee
                    acceptance by every foreign authority.
                  </p>
                </section>

                {/* Common documents */}
                <section className="mt-12">
                  <h2 className="text-2xl font-bold leading-tight text-deep-blue sm:text-3xl">
                    Documents Commonly Associated With Notarial Services
                  </h2>

                  <p className="mt-6">
                    The documents and services handled by a notary can vary
                    depending on the purpose of the transaction. Examples may
                    include:
                  </p>

                  <ul className="mt-6 space-y-3 pl-5">
                    <li className="list-disc">
                      Copies of official or personal documents requiring
                      verification.
                    </li>

                    <li className="list-disc">
                      Sworn documents, declarations, and related statements.
                    </li>

                    <li className="list-disc">
                      Documents requiring certification for official use.
                    </li>

                    <li className="list-disc">
                      Documents requiring official translation or translation-related
                      certification.
                    </li>

                    <li className="list-disc">
                      Marriage-related documents and supporting documentation.
                    </li>

                    <li className="list-disc">
                      Documents intended for submission to authorities or
                      institutions outside Nepal.
                    </li>
                  </ul>

                  <p className="mt-5">
                    The appropriate service depends on the actual document and its
                    intended purpose. If you are unsure, it is better to ask before
                    preparing or submitting the document.
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
                        If you are searching for a{" "}
                        <strong>Notary Public in Kathmandu</strong>, consider
                        choosing an office that clearly explains its professional
                        services, provides identifiable contact information, and
                        takes time to understand the purpose of your documents.
                      </p>

                      <p className="mt-5">
                        KIPLAN Notary provides professional notarial and document
                        services in Kathmandu, Nepal, with services covering
                        document certification, copy verification, sworn documents,
                        official document translation, marriage-related
                        documentation, and other document services.
                      </p>

                      <p className="mt-5">
                        If you are unsure which service your document requires, you
                        can contact the office and explain your document and its
                        intended purpose before proceeding.
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
                    If you would like to understand the subject in more detail,
                    these KIPLAN Notary publications may also be useful:
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
                        Learn about common notarial services and when you may need
                        a Notary Public.
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
                        Understand document notarization, certification, copy
                        verification, and the general process.
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
                    Depending on the client's needs, services include:
                  </p>

                  <ul className="mt-6 space-y-3 pl-5">
                    <li className="list-disc">
                      Official Document Translation
                    </li>

                    <li className="list-disc">
                      Marriage Law Translation &amp; Certification
                    </li>

                    <li className="list-disc">Copy Verification</li>

                    <li className="list-disc">Sworn Document</li>

                    <li className="list-disc">Document Certification</li>

                    <li className="list-disc">
                      Court Marriage Registration
                    </li>
                  </ul>

                  <p className="mt-6">
                    You can explore the full range of services on the{" "}
                    <Link
                      href="/services/"
                      className="font-semibold text-deep-blue underline underline-offset-4"
                    >
                      KIPLAN Notary Services
                    </Link>{" "}
                    page.
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

                  <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
              </div>
            </SectionReveal>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}