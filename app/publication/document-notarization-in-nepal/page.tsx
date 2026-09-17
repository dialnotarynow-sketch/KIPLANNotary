import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import { ArrowRight } from "lucide-react"
import ArticleFAQ from "@/components/ArticleFAQ"

export const metadata: Metadata = {
  title: "Document Notarization in Nepal: A Complete Guide | KIPLAN Notary",
  description:
    "A practical guide to document notarization in Nepal, including document certification, copy verification, sworn documents, official translation, requirements, and the notarization process.",
}

export default function DocumentNotarizationNepalArticle() {
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
                A Complete Guide to Document Notarization in Nepal
              </h1>

              <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-3xl">
                A practical guide to document notarization, certification,
                copy verification, sworn documents, translation, and related
                document services in Nepal.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/20">
                  <Image
                    src="/images/Adv kamal.jpg"
                    alt="Advocate / Notary Public Kamal Khadka"
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>

                <div className="text-sm text-white/60">
                  <div className="font-medium text-white/80">
                    Advocate / Notary Public Kamal Khadka
                  </div>
                  <div className="mt-0.5">
                    October 2025
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
              <div className="max-w-none text-justify">

                {/* Introduction */}
                <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                  <p>
                    Documents are often required to be certified, verified,
                    notarized, translated, or formally declared before they
                    can be submitted to a government authority, educational
                    institution, employer, embassy, immigration authority,
                    business organization, or another receiving institution.
                  </p>

                  <p>
                    In Nepal, a Notary Public performs authorized notarial
                    acts relating to documents, copies, declarations,
                    signatures, and other matters permitted under the
                    applicable legal framework. The exact procedure depends on
                    the type of document and the purpose for which it will be
                    used.
                  </p>

                  <p>
                    This guide explains{" "}
                    <strong>document notarization in Nepal</strong> from a
                    practical client perspective. It covers what notarization
                    means, common notarial services, the usual process,
                    documents that may be required, and important considerations
                    when documents are intended for use outside Nepal.
                  </p>
                </div>

                {/* Featured Image */}
                <figure className="mt-10 mb-12">
                  <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <Image
                      src="/images/document-notarization-process-nepal.jpg"
                      alt="Document notarization process in Nepal"
                      width={1024}
                      height={747}
                      priority
                      className="h-auto w-full object-cover"
                    />
                  </div>

                  <figcaption className="mt-3 text-center text-sm text-gray-500">
                    A practical overview of the document notarization process
                    in Nepal.
                  </figcaption>
                </figure>

                {/* What Is Document Notarization */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    What Is Document Notarization in Nepal?
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      Document notarization is a formal notarial process
                      carried out by an authorized Notary Public in relation to
                      a document, copy, declaration, signature, or other
                      permitted notarial matter.
                    </p>

                    <p>
                      Depending on the circumstances, the notary may examine
                      the original document, verify a copy, witness or deal with
                      a declaration, certify a document, or perform another
                      appropriate notarial act.
                    </p>

                    <p>
                      Notarization is therefore not simply the placement of a
                      stamp or seal on a document. The notarial act should
                      correspond to the nature of the document and its intended
                      use.
                    </p>

                    <p>
                      The legal framework governing notarial services in Nepal
                      includes the{" "}
                      <strong>Notary Public Act, 2063 (2007)</strong> and
                      related rules and professional requirements. Because
                      requirements can vary by document and purpose, applicants
                      should confirm the procedure applicable to their
                      particular situation.
                    </p>
                  </div>
                </section>

                {/* Why Documents Need Notarization */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Why Do Documents Need to Be Notarized?
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      Notarial services are commonly required when an
                      organization or authority needs a document to be
                      formally certified, verified, or accompanied by a
                      declaration.
                    </p>

                    <p>
                      Requirements can arise in connection with education,
                      employment, immigration, business, family matters,
                      property-related transactions, legal proceedings, and
                      documents intended for use outside Nepal.
                    </p>

                    <p>
                      The important point is that not every document requires
                      the same procedure. The requirement should be determined
                      by the document, its purpose, and the authority or
                      organization that will receive it.
                    </p>

                    <p>
                      If you are unsure whether your document requires
                      notarization, certification, copy verification, or
                      translation, you can review the{" "}
                      <Link
                        href="/services/"
                        className="font-medium text-deep-blue underline underline-offset-4 hover:text-crimson"
                      >
                        KIPLAN Notary services
                      </Link>{" "}
                      or contact the office for guidance based on your
                      document and its intended purpose.
                    </p>
                  </div>
                </section>

                {/* Common Services */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-7">
                    Common Document Notarization and Notarial Services
                  </h2>

                  <div className="space-y-9">

                    {/* 1 */}
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        1. Document Certification
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-gray-700">
                        <p>
                          Document certification may be required when an
                          institution or authority asks for a formally
                          certified document. The notary examines the document
                          and performs the appropriate certification act.
                        </p>

                        <p>
                          The exact requirements depend on the document and its
                          intended use. Applicants should therefore confirm
                          what the receiving organization requires before
                          completing the process.
                        </p>
                      </div>
                    </div>

                    {/* 2 */}
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        2. Copy Verification
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-gray-700">
                        <p>
                          In some situations, an applicant may be required to
                          submit a certified or verified copy instead of an
                          original document. Copy verification involves
                          examining the copy against the document presented
                          for verification.
                        </p>

                        <p>
                          This may be relevant to academic certificates,
                          identification documents, professional records,
                          certificates, and other official documents.
                        </p>
                      </div>
                    </div>

                    {/* 3 */}
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        3. Sworn Documents and Declarations
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-gray-700">
                        <p>
                          Some matters require a person to make a formal
                          declaration or sworn statement. Where permitted, a
                          Notary Public may perform the appropriate notarial act
                          relating to such a document.
                        </p>

                        <p>
                          The wording and supporting documents can vary
                          depending on the purpose. Applicants should identify
                          the requirements of the receiving authority before
                          preparing the declaration.
                        </p>
                      </div>
                    </div>

                    {/* 4 */}
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        4. Official Document Translation
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-gray-700">
                        <p>
                          Documents prepared in Nepali or another language may
                          need to be translated before they can be submitted to
                          an institution or authority using a different
                          language.
                        </p>

                        <p>
                          Translation requirements vary according to the
                          receiving institution and the purpose of the
                          document. Translation and certification requirements
                          should therefore be considered together.
                        </p>

                        <p>
                          For more information about submitting documents for
                          translation, visit the{" "}
                          <Link
                            href="/translation/"
                            className="font-medium text-deep-blue underline underline-offset-4 hover:text-crimson"
                          >
                            KIPLAN Notary translation service
                          </Link>
                          .
                        </p>
                      </div>
                    </div>

                    {/* 5 */}
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        5. Marriage-Related Documents
                      </h3>

                      <div className="space-y-4 text-[17px] leading-[1.30] text-gray-700">
                        <p>
                          Marriage certificates and related documents are
                          frequently required for immigration, visa
                          applications, employment, education, and other
                          official purposes.
                        </p>

                        <p>
                          Depending on the destination and receiving authority,
                          marriage documents may require translation,
                          certification, or additional supporting procedures.
                        </p>
                      </div>
                    </div>

                    {/* 6 */}
                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        6. Other Notarial Services
                      </h3>

                      <p className="text-[17px] leading-[1.30] text-gray-700">
                        Notarial requirements can arise in many situations
                        involving personal, academic, professional, commercial,
                        and legal documents. The appropriate procedure depends
                        on the nature of the document and its intended use.
                      </p>
                    </div>

                  </div>
                </section>

                {/* Process */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-7">
                    What Is the Document Notarization Process?
                  </h2>

                  <div className="space-y-8">

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        Step 1: Identify the Required Service
                      </h3>

                      <p className="text-[17px] leading-[1.30] text-gray-700">
                        First, determine what the receiving authority actually
                        requires. The requirement may be certification, copy
                        verification, a sworn document, translation, or
                        another notarial service.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        Step 2: Prepare the Relevant Documents
                      </h3>

                      <p className="text-[17px] leading-[1.30] text-gray-700">
                        Bring the relevant original document and identification
                        where applicable. Additional supporting documents may
                        be required depending on the service and circumstances.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        Step 3: Document Examination
                      </h3>

                      <p className="text-[17px] leading-[1.30] text-gray-700">
                        The document is examined to determine the appropriate
                        notarial procedure and whether the information and
                        supporting materials are sufficient for the requested
                        service.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        Step 4: Notarial Act
                      </h3>

                      <p className="text-[17px] leading-[1.30] text-gray-700">
                        The Notary Public performs the appropriate authorized
                        notarial act in accordance with the applicable
                        requirements.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold leading-tight text-deep-blue mb-3">
                        Step 5: Completion and Delivery
                      </h3>

                      <p className="text-[17px] leading-[1.30] text-gray-700">
                        Once the required procedure has been completed, the
                        applicant receives the relevant document or completed
                        notarial service for its intended use.
                      </p>
                    </div>

                  </div>
                </section>

                {/* What Documents */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    What Documents May Require Notarization?
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      The documents that require notarial services vary
                      depending on the purpose and receiving authority. Common
                      examples may include academic certificates,
                      identification documents, marriage certificates,
                      declarations, agreements, professional documents, and
                      documents intended for use outside Nepal.
                    </p>

                    <p>
                      This does not mean that every document in these
                      categories automatically requires notarization. The
                      receiving institution&apos;s requirements should always
                      be checked.
                    </p>
                  </div>
                </section>

                {/* Outside Nepal */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Documents Intended for Use Outside Nepal
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      Documents intended for use outside Nepal may involve
                      several different procedures. Depending on the destination
                      country and receiving authority, an applicant may need
                      document verification, notarial certification, certified
                      translation, government attestation, authentication,
                      legalization, or more than one of these.
                    </p>

                    <p>
                      These processes should not be treated as interchangeable.
                      Notarial certification is a notarial act, certified
                      translation concerns the conversion of a document into
                      another language with the required certification, while
                      attestation or authentication may involve a government
                      authority or another designated institution.
                    </p>

                    <p>
                      For example, a student preparing academic documents for
                      admission or scholarship applications may be asked to
                      provide translated certificates, verified academic records,
                      or documents carrying a particular form of certification.
                      The exact requirement depends on the university, embassy,
                      destination country, programme, and type of document.
                    </p>

                    <p>
                      Applicants should therefore check the current instructions
                      of the receiving university, embassy, immigration authority,
                      government office, employer, or other relevant institution
                      before arranging notarial or related services.
                    </p>
                  </div>
                </section>

                {/* Notarization vs Certification */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Notarization, Certification, and Copy Verification
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      These terms are sometimes used interchangeably in
                      everyday conversation, but they can refer to different
                      procedures depending on the document and its intended
                      use.
                    </p>

                    <p>
                      Certification may involve formally certifying a document,
                      while copy verification generally concerns confirming a
                      copy against the document presented for examination.
                      Notarization is the broader concept of an authorized
                      notarial act performed in relation to a permitted matter.
                    </p>

                    <p>
                      Because the terminology can be confusing, applicants
                      should explain the purpose of the document and identify
                      the requirement of the receiving authority whenever
                      possible.
                    </p>
                  </div>
                </section>

                {/* Kathmandu Local SEO */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Document Notarization Services in Kathmandu
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      If you are looking for{" "}
                      <strong>document notarization in Kathmandu</strong>, the
                      appropriate notarial procedure will depend on the type of
                      document and the purpose for which it is required.
                      Applicants may need document certification, copy
                      verification, sworn documents, official translation, or
                      another notarial service.
                    </p>

                    <p>
                      KIPLAN Notary provides professional notarial and document
                      services in Kathmandu, Nepal, with a focus on accuracy,
                      confidentiality, clear communication, and practical
                      client support.
                    </p>

                    <p>
                      If you are unsure what service your document requires,
                      you can{" "}
                      <Link
                        href="/contact/"
                        className="font-medium text-deep-blue underline underline-offset-4 hover:text-crimson"
                      >
                        contact KIPLAN Notary
                      </Link>{" "}
                      with the document details and its intended purpose.
                    </p>
                  </div>
                </section>

                {/* Legal Framework */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Legal Framework for Notarial Services in Nepal
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      Notarial services in Nepal operate within the legal
                      framework governing the notarial profession, including
                      the{" "}
                      <strong>Notary Public Act, 2063 (2007)</strong> and
                      applicable rules and professional requirements.
                    </p>

                    <p>
                      The precise legal requirements can depend on the type of
                      notarial act and the circumstances of the document.
                      Applicants should therefore avoid assuming that one
                      procedure applies to every document.
                    </p>

                    <p>
                      For general information about the role of a Notary
                      Public in Nepal, you can also read our article{" "}
                      <Link
                        href="/publication/what-does-a-notary-public-do-in-nepal/"
                        className="font-medium text-deep-blue underline underline-offset-4 hover:text-crimson"
                      >
                        What Does a Notary Public Do in Nepal?
                      </Link>
                    </p>
                  </div>
                </section>

                {/* What to Bring */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    What Should You Bring to a Notary?
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      The documents required depend on the service. In many
                      situations, applicants should bring the original
                      document, relevant copies, and identification where
                      applicable.
                    </p>

                    <p>
                      If the document is intended for submission outside Nepal,
                      information about the destination country and receiving
                      authority can also be important.
                    </p>

                    <p>
                      If you are unsure what is required, providing the
                      document details and intended purpose before visiting
                      the office can help identify the appropriate procedure.
                    </p>
                  </div>
                </section>

                {/* Things to Remember */}
                <section className="mt-12 rounded-2xl bg-blue-50 px-6 py-7 sm:px-8">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Things to Remember
                  </h2>

                  <ul className="space-y-3 text-[17px] leading-[1.30] text-gray-700 list-disc pl-5">
                    <li>Not every document requires notarization. The requirement depends on the document, its purpose, and the receiving authority.</li>
                    <li>Bring the original document and relevant copies when required.</li>
                    <li>For documents intended for use outside Nepal, check whether translation, certification, attestation, authentication, or legalization is also required.</li>
                    <li>Requirements of universities, embassies, government offices, employers, and other institutions may differ.</li>
                    <li>Confirm the current requirements of the receiving authority before completing the notarial process.</li>
                  </ul>
                </section>

                {/* Choosing a Notary */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    Choosing a Notary Public in Nepal
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      When choosing a Notary Public, applicants should consider
                      whether the notary is properly authorized, whether the
                      service requested matches the document requirement, and
                      whether the process is explained clearly.
                    </p>

                    <p>
                      For documents intended for international use, it is also
                      important to understand whether additional translation,
                      certification, authentication, or other procedures may be
                      required.
                    </p>

                    <p>
                      If you need help identifying the appropriate service,
                      start with the{" "}
                      <Link
                        href="/services/"
                        className="font-medium text-deep-blue underline underline-offset-4 hover:text-crimson"
                      >
                        KIPLAN Notary services
                      </Link>{" "}
                      available in Kathmandu.
                    </p>
                  </div>
                </section>

                {/* KIPLAN */}
                <section className="mt-12">
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-5">
                    KIPLAN Notary
                  </h2>

                  <div className="space-y-5 text-[17px] leading-[1.30] text-gray-700">
                    <p>
                      KIPLAN Notary provides professional notarial and document
                      services in Kathmandu, Nepal, with an emphasis on
                      accuracy, confidentiality, transparency, and practical
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
                      document, you can provide the document details and its
                      intended purpose so that the appropriate process can be
                      identified.
                    </p>

                    <p>
                      To learn more about our available services, visit{" "}
                      <Link
                        href="/services/"
                        className="font-medium text-deep-blue underline underline-offset-4 hover:text-crimson"
                      >
                        KIPLAN Notary Services
                      </Link>
                      . For direct assistance, visit our{" "}
                      <Link
                        href="/contact/"
                        className="font-medium text-deep-blue underline underline-offset-4 hover:text-crimson"
                      >
                        Contact page
                      </Link>
                      .
                    </p>
                  </div>
                </section>

                {/* Related Article */}
                <section className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl sm:text-2xl font-bold text-deep-blue">
                    Related KIPLAN Notary Article
                  </h2>

                  <p className="mt-3 text-[13px] leading-[1.30] text-gray-600">
                    If you want to understand the wider role of a Notary Public
                    in Nepal, read our related guide:
                  </p>

                  <Link
                    href="/publication/what-does-a-notary-public-do-in-nepal/"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-deep-blue hover:text-crimson"
                  >
                    What Does a Notary Public Do in Nepal?
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </section>

                {/* Beyond Notarial Services */}
<section className="mt-12 rounded-2xl bg-blue-50 px-6 py-7 sm:px-8">
  <h2 className="text-2xl sm:text-3xl font-bold leading-tight text-deep-blue mb-4">
    Beyond Notarial Services
  </h2>
  <p className="text-[17px] leading-[1.30] text-gray-700">
    Mr. Kamal Khadka has also designed <a href="https://kiplanscholar.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-deep-blue hover:underline">KIPLANScholar</a>, an education and professional development platform created to support students, professional women, entrepreneurs, researchers, and others seeking educational, career, and professional opportunities.
  </p>
</section>

                <ArticleFAQ
                  items={[
                    {
                      question: "What is document notarization in Nepal?",
                      answer: "Document notarization is a formal notarial process carried out by an authorized Notary Public. Depending on the service, it may involve examining documents, certifying copies, witnessing declarations or signatures, or performing another authorized notarial act.",
                    },
                    {
                      question: "What documents can a Notary Public certify or notarize?",
                      answer: "The appropriate service depends on the document and its purpose. Documents may include academic certificates, identification documents, declarations, agreements, professional documents, and documents intended for submission to another institution or country. Not every document requires notarization.",
                    },
                    {
                      question: "What is the difference between notarization and copy verification?",
                      answer: "Copy verification generally concerns confirming that a copy corresponds to an original document presented to the Notary Public. Notarization is a broader term that may include different authorized notarial acts. The correct service depends on what the receiving authority requires.",
                    },
                    {
                      question: "Is notarization the same as document attestation?",
                      answer: "No. Notarial certification and government or institutional attestation are different procedures. A document may require one, both, or neither, depending on the destination, receiving authority, and purpose of the document.",
                    },
                    {
                      question: "Do I need a certified translation as well as notarization?",
                      answer: "Sometimes. If a receiving institution requires a document in another language, a certified translation may be required in addition to notarization or other document procedures. The exact requirement should be confirmed with the receiving university, embassy, government authority, employer, or other institution.",
                    },
                    {
                      question: "What should I check before notarizing documents for use abroad?",
                      answer: "Check the current requirements of the receiving authority and destination country. Depending on the circumstances, you may need translation, copy certification, verification, attestation, authentication, legalization, or another procedure in addition to notarization.",
                    },
                    {
                      question: "How can I verify that a Notary Public is authorized to provide notarial services?",
                      answer: "You can ask to see the Notary Public's certificate and relevant registration details. A Notary Public operates within the authority and jurisdiction specified by the applicable law and certificate. If you have concerns about a notarial service, you may seek clarification from the relevant official authority.",
                    },
                  ]}
                />

{/* CTA */}
                <div className="mt-12 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-deep-blue">
                    Need help with document notarization?
                  </h3>

                  <p className="mt-3 text-[17px] leading-[1.30] text-gray-600 text-justify">
                    If you are unsure which notarial or document service you
                    need, contact KIPLAN Notary and provide the document
                    details and its intended purpose.
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

                {/* Important Note */}
                <section className="mt-12">
                  <h2 className="text-lg sm:text-xl font-bold leading-tight text-deep-blue mb-4">
                    Important Note
                  </h2>

                  <p className="text-[15px] leading-[1.30] text-gray-700">
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