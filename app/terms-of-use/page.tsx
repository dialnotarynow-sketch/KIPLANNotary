import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function TermsOfUsePage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Page Header */}
        <section className="bg-deep-blue text-white py-14 lg:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-widest text-white/60 mb-3">
              KIPLAN Notary
            </p>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold">
              Terms of Use
            </h1>

            <p className="mt-3 text-sm text-white/60">
              Effective Date: September 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-[16px] leading-7 text-slate-700">

              <div className="space-y-5 mb-12">
                <p>
                  Welcome to KIPLAN Notary. By accessing or using this website,
                  submitting a service request, uploading documents, or using
                  any online service provided through this website, you agree
                  to these Terms of Use.
                </p>

                <p>
                  If you do not agree with these Terms, please do not use the
                  website or submit a service request through our online
                  systems.
                </p>

                <p>
                  KIPLAN Notary is a property of KIPLAN Pvt. Ltd. and provides
                  notarial and translation-related services in accordance with
                  applicable laws and professional requirements in Nepal.
                </p>
              </div>

              <PolicySection title="1. Use of the Website">
                <p>
                  The KIPLAN Notary website is provided to give information
                  about our services and to allow users to communicate with us
                  and submit certain service requests online.
                </p>

                <p>
                  You agree to use this website only for lawful purposes and in
                  a manner that does not interfere with its operation, security,
                  or availability.
                </p>
              </PolicySection>

              <PolicySection title="2. Service Requests">
                <p>
                  Information submitted through an online form constitutes a
                  request for service and does not by itself constitute
                  acceptance of the service by KIPLAN Notary.
                </p>

                <p>
                  KIPLAN Notary may review the information and documents
                  provided before determining whether the requested service can
                  be accepted and processed.
                </p>

                <p>
                  Additional information, documents, identification, physical
                  attendance, verification, or other requirements may be
                  requested depending on the nature of the service.
                </p>
              </PolicySection>

              <PolicySection title="3. Accuracy of Information">
                <p>
                  You are responsible for ensuring that all information
                  submitted to KIPLAN Notary is accurate, complete, and
                  truthful.
                </p>

                <p>
                  You must not knowingly provide false, misleading, fraudulent,
                  or unauthorized information or documents.
                </p>

                <p>
                  Where you submit information or documents belonging to
                  another person or organization, you must have the appropriate
                  authority or permission to do so.
                </p>
              </PolicySection>

              <PolicySection title="4. Documents and Verification">
                <p>
                  Documents uploaded through the website may be reviewed by
                  authorized KIPLAN Notary personnel for the purpose of
                  determining whether the requested service can proceed.
                </p>

                <p>
                  Uploading a document does not mean that the document has been
                  accepted, verified, certified, or approved.
                </p>

                <p>
                  KIPLAN Notary may request original documents, additional
                  copies, identification, clarification, physical attendance,
                  or other supporting information where required.
                </p>
              </PolicySection>

              <PolicySection title="5. Notarial and Translation Services">
                <p>
                  The availability and completion of a notarial or translation
                  service may depend on the nature of the documents, applicable
                  legal requirements, verification results, professional
                  requirements, and other relevant circumstances.
                </p>

                <p>
                  KIPLAN Notary does not guarantee that every document submitted
                  through the website will qualify for notarization,
                  certification, verification, or translation.
                </p>

                <p>
                  Where a service cannot proceed, KIPLAN Notary may explain the
                  reason and, where appropriate, request additional information
                  or documentation.
                </p>
              </PolicySection>

              <PolicySection title="6. Fees and Payments">
                <p>
                  Applicable fees may depend on the type and scope of service,
                  the documents involved, the number of documents or pages, and
                  other relevant requirements.
                </p>

                <p>
                  Where payment is required, KIPLAN Notary may provide payment
                  instructions or payment details after reviewing the service
                  request.
                </p>

                <p>
                  Submission of a payment claim or statement by a customer does
                  not by itself constitute confirmation of payment. Processing
                  may begin only after the applicable payment requirements have
                  been confirmed by KIPLAN Notary.
                </p>
              </PolicySection>

              <PolicySection title="7. Certified Translation and Downloads">
                <p>
                  Where a certified translation is provided through the online
                  system, access to the completed translation may be made
                  available only after the applicable service and payment
                  requirements have been completed.
                </p>

                <p>
                  Download links or access provided through the website may be
                  temporary, restricted, or subject to security controls.
                </p>
              </PolicySection>

              <PolicySection title="8. User Accounts and Security">
                <p>
                  You are responsible for keeping any login credentials,
                  tracking information, or other access information provided to
                  you confidential.
                </p>

                <p>
                  You must notify KIPLAN Notary if you believe that your access
                  information has been misused or accessed without
                  authorization.
                </p>
              </PolicySection>

              <PolicySection title="9. Prohibited Activities">
                <p>You must not use this website to:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Submit false or fraudulent information or documents</li>
                  <li>Impersonate another person or organization</li>
                  <li>Attempt to gain unauthorized access to the website or systems</li>
                  <li>Interfere with website security or operation</li>
                  <li>Upload malicious software or harmful content</li>
                  <li>Use the website for unlawful or abusive purposes</li>
                  <li>Attempt to obtain another person's confidential information</li>
                </ul>
              </PolicySection>

              <PolicySection title="10. Intellectual Property">
                <p>
                  Unless otherwise stated, the website, its design, branding,
                  text, graphics, logos, and other original content are owned
                  by or used by KIPLAN Notary or its relevant licensors.
                </p>

                <p>
                  You may not reproduce, modify, distribute, publish, or
                  commercially exploit website content without appropriate
                  permission, except where permitted by applicable law.
                </p>
              </PolicySection>

              <PolicySection title="11. Third-Party Services and Links">
                <p>
                  The website may use or link to third-party services,
                  platforms, websites, payment systems, communication services,
                  or technology providers.
                </p>

                <p>
                  KIPLAN Notary is not responsible for the content, availability,
                  security, or practices of third-party websites or services
                  outside our control.
                </p>
              </PolicySection>

              <PolicySection title="12. Website Availability">
                <p>
                  We aim to keep the website available and functioning properly,
                  but we do not guarantee that the website or every online
                  feature will always be available, uninterrupted, or free from
                  technical errors.
                </p>

                <p>
                  Website functionality may occasionally be unavailable due to
                  maintenance, technical issues, security measures, network
                  problems, or circumstances beyond our reasonable control.
                </p>
              </PolicySection>

              <PolicySection title="13. Disclaimer">
                <p>
                  Information published on this website is provided for general
                  informational and service-related purposes. Website content
                  should not be interpreted as a guarantee that a particular
                  document, transaction, authority, institution, embassy,
                  government body, or other third party will accept a document
                  or service outcome.
                </p>

                <p>
                  Requirements may vary depending on the relevant authority,
                  destination country, transaction, document type, and
                  applicable law.
                </p>
              </PolicySection>

              <PolicySection title="14. Limitation of Responsibility">
                <p>
                  To the extent permitted by applicable law, KIPLAN Notary is
                  not responsible for losses resulting from inaccurate
                  information supplied by a user, unauthorized use of an
                  account or access information, failure to provide required
                  documents, or circumstances outside our reasonable control.
                </p>
              </PolicySection>

              <PolicySection title="15. Privacy">
                <p>
                  Your use of this website is also subject to our{" "}
                  <a
                    href="/privacy-policy/"
                    className="text-deep-blue hover:underline"
                  >
                    Privacy Policy
                  </a>
                  , which explains how personal information and submitted
                  documents are handled.
                </p>
              </PolicySection>

              <PolicySection title="16. Changes to These Terms">
                <p>
                  KIPLAN Notary may update these Terms of Use from time to time
                  to reflect changes to our services, website, technology,
                  business practices, or applicable requirements.
                </p>

                <p>
                  The updated version will be published on this page with a
                  revised effective date where appropriate.
                </p>
              </PolicySection>

              <PolicySection title="17. Governing Law">
                <p>
                  These Terms of Use are intended to be interpreted in
                  accordance with the applicable laws of Nepal, subject to any
                  mandatory legal requirements that may apply to a particular
                  matter or service.
                </p>
              </PolicySection>

              <PolicySection title="18. Contact Us">
                <p>
                  If you have questions regarding these Terms of Use, please
                  contact KIPLAN Notary:
                </p>

                <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6">
                  <p className="font-semibold text-slate-900">
                    KIPLAN Notary Public Office
                  </p>

                  <p className="mt-3 text-slate-700">
                    CTC Mall, 4th Floor, Suite 525
                    <br />
                    Sundhara, Kathmandu, Nepal
                  </p>

                  <p className="mt-3 text-slate-700">
                    Phone: +977-9849530970
                    <br />
                    Email:{" "}
                    <a
                      href="mailto:dialnotarynow@gmail.com"
                      className="text-deep-blue hover:underline"
                    >
                      dialnotarynow@gmail.com
                    </a>
                  </p>
                </div>
              </PolicySection>

              <p className="mt-12 pt-8 border-t border-slate-200 text-sm leading-6 text-slate-500">
                These Terms of Use describe the general terms applicable to use
                of the KIPLAN Notary website and online services. Specific
                services may also be subject to additional requirements,
                instructions, agreements, or legal obligations.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function PolicySection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-10">
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 mb-4">
        {title}
      </h2>

      <div className="space-y-5">
        {children}
      </div>
    </section>
  )
}