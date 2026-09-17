import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import ArticleFAQ from "@/components/ArticleFAQ"
import { ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "What Does a Notary Public Do in Nepal? | KIPLAN Notary",
  description:
    "Learn what a Notary Public does in Nepal, including document certification, copy verification, sworn documents, translation, and other common notarial services.",
}

export default function NotaryPublicNepalArticle() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Article Header */}
        <section className="bg-deep-blue py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="text-sm font-medium text-crimson uppercase tracking-wider">
                Publication
              </div>

              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-3">
                What Does a Notary Public Do in Nepal?
              </h1>

              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl">
                A practical introduction to notarial services, document
                verification, certification, sworn documents, and official
                translation in Nepal.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/20">
                  <Image
                    src="/images/Adv Babita Karki.png"
                    alt="Advocate / Notary Public Babita Karki"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                <div className="text-sm text-white/60">
                  <div className="font-medium text-white/80">
                    Advocate / Notary Public Babita Karki
                  </div>
                  <div className="mt-0.5">
                    August 2024
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Article Body */}
        <article className="bg-warm-white py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <div className="max-w-none">

                {/* Opening */}
                <div className="space-y-5 text-[17px] leading-[1.30] text-justify text-gray-700">
                  <p>
                    Many people in Nepal encounter the term “Notary Public”
                    when preparing documents for education, employment,
                    immigration, business, family matters, or use outside
                    Nepal. A Notary Public in Nepal provides authorized
                    notarial services such as document certification, copy
                    verification, sworn documents, and other permitted
                    notarial acts.
                  </p>

                  <p>
                    In simple terms, a Notary Public performs authorized
                    notarial acts relating to documents, signatures,
                    declarations, copies, and translations. The exact service
                    required depends on the document, its purpose, and the
                    authority or institution that will receive it.
                  </p>

                  <p>
                    Notarial work is therefore not simply about putting a stamp
                    on a document. The notary must examine the document and
                    perform the appropriate notarial act in accordance with
                    the applicable legal and professional requirements.
                  </p>
                </div>

                {/* Kathmandu Local SEO Section */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Looking for Professional Notarial Services in Kathmandu?
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-justify text-gray-700">
                    <p>
                      If you are looking for a professional Notary Public in
                      Kathmandu, you do not need to navigate the process alone.
                      Whether your documents relate to travel, international
                      education, immigration, business, trade and commerce,
                      contracts, family matters, or other official purposes,
                      obtaining the appropriate notarial service can make the
                      process clearer and more manageable.
                    </p>

                    <p>
                      KIPLAN Notary provides professional notarial and document
                      services in Kathmandu, with a focus on accuracy,
                      confidentiality, transparency, and practical client
                      support. The appropriate service depends on the nature of
                      your document and the requirements of the organization or
                      authority that will receive it.
                    </p>

                    <p>
                      If you are unsure which service you need, you can{" "}
                      <Link
                        href="/contact/"
                        className="font-medium text-deep-blue underline decoration-deep-blue/30 underline-offset-4 hover:text-crimson hover:decoration-crimson"
                      >
                        contact KIPLAN Notary
                      </Link>{" "}
                      and explain the purpose and destination of your document.
                    </p>
                  </div>
                </section>

                {/* Sworn Document Image */}
                <figure className="mt-10">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <Image
                      src="/images/Sworn document.jpg"
                      alt="Sworn document prepared for notarial service in Kathmandu, Nepal"
                      width={1600}
                      height={900}
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  <figcaption className="mt-3 text-center text-sm text-gray-500">
                    Sworn document and declaration services are among the
                    matters that may require professional notarial attention.
                  </figcaption>
                </figure>

                {/* What Is a Notary Public */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    What Is a Notary Public?
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-justify text-gray-700">
                    <p>
                      A Notary Public is a person authorized to perform
                      specified notarial functions under the applicable law
                      governing the notarial profession. Notarial services
                      help authenticate, verify, certify, or formalize certain
                      documents and declarations for their intended use.
                    </p>

                    <p>
                      The role of a notary is different from that of a court
                      or other government authority. A notary does not decide
                      every legal question concerning a document. Instead, the
                      notary performs the particular notarial act that is
                      legally appropriate for the document and its intended
                      purpose.
                    </p>
                  </div>
                </section>

                {/* Things to Remember */}
                <section className="mt-10 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-deep-blue mb-4">
                    Things to Remember
                  </h2>
                  <p className="text-[16px] sm:text-[17px] leading-relaxed text-gray-700">
                    Notarial work involves legal records and professional responsibilities. Under Sections 22, 23 and 24 of the Notary Public Act, 2063, a Notary Public must maintain an identifiable office, prescribed register books, and separate office files relating to certified or translated documents. The law also requires the document-certification register to be safely preserved for five years from the date its last page is completed.
                  </p>
                  <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-gray-700">
                    These requirements help explain why a proper notarial process may involve recording the applicant's identity, document details, purpose, destination, and other relevant information. Completing an application is therefore not simply an extra formality; it can be part of maintaining the records and information required for professional notarial work.
                  </p>
                </section>

                {/* Your Right to Verify */}
                <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-deep-blue mb-4">
                    Your Right to Verify
                  </h2>
                  <p className="text-[16px] sm:text-[17px] leading-relaxed text-gray-700">
                    Before using notarial services, clients can check whether
                    the person is authorized to work as a Notary Public. The
                    Notary Public Act requires the notary's office to display
                    the notary's name and certificate number on its signboard,
                    and the certificate must also be displayed inside the
                    office.
                  </p>
                  <p className="mt-4 text-[16px] sm:text-[17px] leading-relaxed text-gray-700">
                    The certificate also specifies the district in which the
                    Notary Public is authorized to work. These requirements
                    provide a practical way for clients to identify and verify
                    the notary before proceeding with a notarial service.
                  </p>
                </section>

                {/* Common Services */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-7">
                    Common Services Provided by a Notary Public
                  </h2>

                  <div className="space-y-9">

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        1. Document Certification
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-justify text-gray-700">
                        <p>
                          Documents may need certification when they are being
                          submitted to an institution, authority,
                          organization, or other recipient that requires a
                          certified document.
                        </p>

                        <p>
                          The required procedure depends on the type of
                          document and the purpose for which it will be used.
                          The notary examines the document and carries out the
                          appropriate certification process.
                        </p>

                        <p>
                          For more information about the services available
                          through KIPLAN Notary, see our{" "}
                          <Link
                            href="/services/"
                            className="font-medium text-deep-blue underline decoration-deep-blue/30 underline-offset-4 hover:text-crimson hover:decoration-crimson"
                          >
                            notarial and document services
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        2. Copy Verification
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-justify text-gray-700">
                        <p>
                          A person may sometimes need a certified copy instead
                          of submitting an original document. Copy verification
                          confirms that the copy has been examined against the
                          document presented for verification.
                        </p>

                        <p>
                          This can be relevant for academic certificates,
                          identification documents, professional records, and
                          other documents where a certified copy is requested.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        3. Sworn Documents and Declarations
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-justify text-gray-700">
                        <p>
                          Some matters require a person to make a formal
                          declaration or sworn statement. A notary may perform
                          the appropriate notarial act relating to such a
                          document where permitted by law.
                        </p>

                        <p>
                          The wording and supporting documents can vary
                          depending on the purpose of the declaration. It is
                          therefore important to understand what the receiving
                          authority actually requires before preparing the
                          document.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        4. Official Document Translation
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-justify text-gray-700">
                        <p>
                          Documents prepared in one language may need to be
                          translated before they can be submitted to an
                          institution or authority using another language.
                        </p>

                        <p>
                          Official translation requirements vary according to
                          the receiving institution and the purpose of the
                          document. Translation, certification, and any
                          additional authentication requirements should
                          therefore be considered together.
                        </p>

                        <p>
                          KIPLAN Notary provides{" "}
                          <Link
                            href="/translation/"
                            className="font-medium text-deep-blue underline decoration-deep-blue/30 underline-offset-4 hover:text-crimson hover:decoration-crimson"
                          >
                            official document translation services
                          </Link>{" "}
                          for documents requiring English–Nepali translation
                          and related document services.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        5. Marriage-Related Documents
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-justify text-gray-700">
                        <p>
                          Marriage certificates and related documents are
                          frequently required for immigration, visa
                          applications, employment, education, and other
                          official purposes.
                        </p>

                        <p>
                          Depending on the destination and receiving authority,
                          a marriage document may require translation,
                          certification, or other supporting procedures before
                          it can be submitted.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        6. Other Notarial and Document Services
                      </h3>

                      <p className="text-[17px] leading-[1.30] text-justify text-gray-700">
                        Notarial requirements can arise in many situations
                        involving personal, academic, professional, commercial,
                        and legal documents. The appropriate procedure depends
                        on the nature of the document and its intended use.
                      </p>
                    </div>

                  </div>
                </section>

                {/* When Might You Need a Notary */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    When Might You Need a Notary?
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-justify text-gray-700">
                    <p>
                      You may need notarial services when an authority,
                      institution, organization, employer, educational
                      institution, embassy, immigration process, or other
                      recipient specifically requires a document to be
                      notarized, certified, verified, or accompanied by a
                      formal declaration.
                    </p>

                    <p>
                      A common mistake is to assume that every document
                      requires the same procedure. In practice, requirements
                      can differ significantly depending on where the document
                      will be used.
                    </p>
                  </div>
                </section>

                {/* Outside Nepal */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Documents for Use Outside Nepal
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-justify text-gray-700">
                    <p>
                      Documents intended for use outside Nepal may involve
                      additional requirements beyond ordinary document
                      certification. Translation, certification,
                      authentication, legalization, or other procedures may be
                      required depending on the destination country and
                      receiving authority.
                    </p>

                    <p>
                      Before submitting a document internationally, applicants
                      should confirm the requirements of the organization or
                      authority that will receive it. This can help avoid
                      delays, unnecessary expenses, or having to repeat the
                      process.
                    </p>

                    <p>
                      If you are preparing documents for international use,
                      you may also find our{" "}
                      <Link
                        href="/publication/document-notarization-in-nepal/"
                        className="font-medium text-deep-blue underline decoration-deep-blue/30 underline-offset-4 hover:text-crimson hover:decoration-crimson"
                      >
                        complete guide to document notarization in Nepal
                      </Link>{" "}
                      useful.
                    </p>
                  </div>
                </section>

                {/* What Should You Bring */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    What Should You Bring?
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-justify text-gray-700">
                    <p>
                      The documents required will depend on the service
                      requested. Applicants should normally bring the relevant
                      original document and identification where applicable.
                      Additional supporting documents may be necessary
                      depending on the circumstances.
                    </p>

                    <p>
                      If you are unsure what is required, it is better to
                      provide the document details and intended purpose first
                      so that the appropriate procedure can be identified.
                    </p>
                  </div>
                </section>

                {/* Purpose */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Why the Purpose of the Document Matters
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-justify text-gray-700">
                    <p>
                      The same document can require different treatment
                      depending on where it will be submitted. A document
                      intended for a university may have different
                      requirements from one intended for immigration,
                      employment, a foreign authority, or a private
                      organization.
                    </p>

                    <p>
                      For this reason, applicants should clearly explain the
                      purpose and destination of the document when requesting
                      notarial or translation services.
                    </p>
                  </div>
                </section>

                {/* KIPLAN Notary */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    KIPLAN Notary
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-justify text-gray-700">
                    <p>
                      KIPLAN Notary provides professional notarial and
                      document services in Kathmandu, Nepal, with an emphasis
                      on accuracy, confidentiality, transparency, and practical
                      client support.
                    </p>

                    <p>
                      Our services include official document translation,
                      marriage law translation and certification, copy
                      verification, sworn documents, document certification,
                      and court marriage registration.
                    </p>

                    <p>
                      If you are unsure which service is appropriate for your
                      document, you can{" "}
                      <Link
                        href="/contact/"
                        className="font-medium text-deep-blue underline decoration-deep-blue/30 underline-offset-4 hover:text-crimson hover:decoration-crimson"
                      >
                        contact KIPLAN Notary
                      </Link>{" "}
                      and provide the document details and its intended
                      purpose.
                    </p>
                  </div>
                </section>

                {/* CTA */}
                <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-deep-blue">
                    Need help with a document?
                  </h3>

                  <p className="mt-3 text-[17px] leading-[1.30] text-justify text-gray-600">
                    If you are unsure which notarial or document service you
                    need, you can contact KIPLAN Notary and provide the
                    document details and its intended purpose.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href="/contact/"
                      className="inline-flex items-center gap-2 rounded-lg bg-deep-blue px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-deep-blue/90"
                    >
                      Contact KIPLAN Notary
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      href="/services/"
                      className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-medium text-deep-blue transition-colors hover:bg-gray-50"
                    >
                      View Services
                    </Link>
                  </div>
                </div>

                {/* Frequently Asked Questions */}
                <ArticleFAQ
                  items={[
                    {
                      question: "What does a Notary Public do in Nepal?",
                      answer: (
                        <>
                          A Notary Public performs specified notarial functions
                          such as document certification, copy verification,
                          sworn documents and declarations, and other
                          authorized document-related services. The appropriate
                          notarial act depends on the document and its intended
                          purpose.
                        </>
                      ),
                    },
                    {
                      question: "What services can a Notary Public provide?",
                      answer: (
                        <>
                          Common services include document certification, copy
                          verification, sworn documents and declarations,
                          official document translation, marriage-related
                          document services, and other notarial and document
                          services where applicable.
                        </>
                      ),
                    },
                    {
                      question: "When might I need a Notary Public?",
                      answer: (
                        <>
                          You may need notarial services when a document,
                          declaration, copy, translation, or other record must
                          be certified, verified, formalized, or prepared for
                          submission to an institution, authority,
                          organization, or other recipient.
                        </>
                      ),
                    },
                    {
                      question: "What documents should I bring to a Notary Public?",
                      answer: (
                        <>
                          You should bring the document requiring the notarial
                          service and any identification or supporting
                          documents that may be relevant. The exact
                          requirements depend on the type of document and the
                          purpose for which it will be used.
                        </>
                      ),
                    },
                    {
                      question: "Why does the purpose of a document matter?",
                      answer: (
                        <>
                          The appropriate notarial or document service can
                          depend on how and where the document will be used.
                          Explaining the purpose and destination helps the
                          notary understand what type of service may be
                          appropriate.
                        </>
                      ),
                    },
                    {
                      question: "Do documents for use outside Nepal require additional procedures?",
                      answer: (
                        <>
                          They may. Documents intended for use outside Nepal
                          can involve additional requirements depending on the
                          receiving institution, destination country, and type
                          of document. The required procedure should therefore
                          be confirmed for the particular document and its
                          intended use.
                        </>
                      ),
                    },
                    {
                      question: "What is the difference between document certification and copy verification?",
                      answer: (
                        <>
                          They are different notarial services. Document
                          certification concerns certification of a document
                          according to the applicable procedure, while copy
                          verification concerns verification of a copy against
                          the relevant original or document. The appropriate
                          service depends on what the receiving authority
                          requires.
                        </>
                      ),
                    },
                  ]}
                />

                {/* Important Note */}
                <section className="mt-12">
                  <h2 className="text-lg sm:text-xl font-bold leading-tight text-deep-blue mb-4">
                    Important Note
                  </h2>

                  <p className="text-[15px] leading-[1.30] text-justify text-gray-700">
                    This article is provided for general informational
                    purposes. Notarial requirements can vary according to the
                    document, transaction, receiving institution, destination
                    country, and applicable law. Information on this page
                    should not be treated as a substitute for legal advice or
                    a determination that a particular document will be
                    accepted by a specific authority.
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