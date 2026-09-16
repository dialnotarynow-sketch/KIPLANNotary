import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>

            <p className="mt-3 text-sm text-white/60">
              Effective Date: September 2026
            </p>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-[16px] leading-7 text-slate-700">

              {/* Introduction */}
              <div className="space-y-5 mb-12">
                <p>
                  KIPLAN Notary respects the privacy of its clients, applicants,
                  visitors, and other users of this website. This Privacy Policy
                  explains how we collect, use, protect, and handle information
                  provided through the KIPLAN Notary website and our online
                  service request systems.
                </p>

                <p>
                  KIPLAN Notary is a property of KIPLAN Pvt. Ltd. and provides
                  notarial and translation-related services in accordance with
                  applicable laws and professional requirements in Nepal.
                </p>
              </div>

              {/* Section 1 */}
              <PolicySection title="1. Information We Collect">
                <p>
                  Depending on the service you request, we may collect
                  information such as:
                </p>

                <PolicyList
                  items={[
                    "Full name and Nepali name, where applicable",
                    "Telephone number and email address",
                    "Address and location information provided by you",
                    "Date of birth or age, where required",
                    "Identification document type and identification details",
                    "Information relating to the documents you submit",
                    "Purpose of the requested service and destination country",
                    "Information concerning your communication with KIPLAN Notary",
                    "Files and documents uploaded through our website",
                    "Information necessary to process payments and service requests",
                  ]}
                />
              </PolicySection>

              {/* Section 2 */}
              <PolicySection title="2. Identification and Documents">
                <p>
                  Certain notarial and translation services require us to verify
                  the identity of the applicant and the applicant&apos;s
                  connection with the documents submitted.
                </p>

                <p>
                  You may therefore be required to provide identification
                  information and copies or scans of relevant documents. These
                  documents are submitted for service processing, verification,
                  record-keeping, and other legitimate purposes connected with
                  the requested service.
                </p>

                <p>
                  Submission of a document does not automatically mean that the
                  document has been accepted, verified, certified, or approved.
                  KIPLAN Notary may review submitted documents before determining
                  whether a requested service can proceed.
                </p>
              </PolicySection>

              {/* Section 3 */}
              <PolicySection title="3. How We Use Your Information">
                <p>We may use information provided by you to:</p>

                <PolicyList
                  items={[
                    "Receive and process service requests",
                    "Verify applicant identity and submitted information",
                    "Review and process submitted documents",
                    "Communicate with you about your request",
                    "Provide status updates and service notifications",
                    "Prepare and deliver translation or other service outputs",
                    "Process and confirm applicable payments",
                    "Maintain appropriate business and service records",
                    "Respond to questions, complaints, or support requests",
                    "Comply with applicable legal and professional obligations",
                  ]}
                />
              </PolicySection>

              {/* Section 4 */}
              <PolicySection title="4. Document Confidentiality">
                <p>
                  Documents submitted through KIPLAN Notary&apos;s online
                  systems may contain personal, financial, legal, educational,
                  or other confidential information. Access to such documents
                  is restricted to authorized personnel and systems involved in
                  providing or administering the requested service.
                </p>

                <p>
                  We do not intentionally publish applicant documents or
                  identification documents publicly through the website.
                </p>
              </PolicySection>

              {/* Section 5 */}
              <PolicySection title="5. Information Sharing">
                <p>
                  KIPLAN Notary does not sell personal information or applicant
                  documents.
                </p>

                <p>
                  Information may be disclosed or made available where
                  reasonably necessary to provide the requested service,
                  operate our technology systems, process payments, comply with
                  legal obligations, respond to lawful requests, or protect the
                  rights, safety, and security of KIPLAN Notary and its users.
                </p>
              </PolicySection>

              {/* Section 6 */}
              <PolicySection title="6. Service Providers and Technology">
                <p>
                  We may use trusted technology and service providers to operate
                  website hosting, databases, secure file storage,
                  communications, authentication, payment processing, and
                  related technical services.
                </p>

                <p>
                  Where third-party services are used, information is handled
                  according to the requirements of the relevant service and the
                  purposes for which the information was provided.
                </p>
              </PolicySection>

              {/* Section 7 */}
              <PolicySection title="7. Security">
                <p>
                  We take reasonable technical and organizational measures to
                  protect personal information and uploaded documents against
                  unauthorized access, use, alteration, disclosure, or loss.
                </p>

                <p>
                  However, no website, electronic transmission, or storage
                  system can be guaranteed to be completely secure. Users should
                  avoid submitting information that is not necessary for the
                  requested service.
                </p>
              </PolicySection>

              {/* Section 8 */}
              <PolicySection title="8. Retention of Information">
                <p>
                  We may retain personal information, service records, and
                  submitted documents for as long as reasonably necessary for
                  the purposes for which they were collected, including service
                  completion, record-keeping, legal, regulatory, professional,
                  accounting, or dispute-resolution requirements.
                </p>

                <p>
                  Retention periods may therefore vary depending on the nature
                  of the service and the applicable requirements.
                </p>
              </PolicySection>

              {/* Section 9 */}
              <PolicySection title="9. Your Responsibilities">
                <p>
                  You are responsible for providing accurate and lawful
                  information and for ensuring that you have the authority or
                  permission to submit documents and information belonging to
                  another person or organization.
                </p>
              </PolicySection>

              {/* Section 10 */}
              <PolicySection title="10. Website Communications">
                <p>
                  When you contact KIPLAN Notary through forms, email,
                  telephone, messaging services, or other communication
                  channels, we may retain relevant communication information to
                  respond to your request and maintain appropriate service
                  records.
                </p>
              </PolicySection>

              {/* Section 11 */}
              <PolicySection title="11. Cookies and Technical Information">
                <p>
                  Our website may use cookies or similar technical mechanisms
                  where necessary for website functionality, security,
                  authentication, preferences, or other legitimate technical
                  purposes.
                </p>

                <p>
                  We may also receive limited technical information such as
                  browser type, device information, IP address, and access
                  information when necessary to maintain website security and
                  operation.
                </p>
              </PolicySection>

              {/* Section 12 */}
              <PolicySection title="12. Children&apos;s Privacy">
                <p>
                  Our services are generally intended for adults and
                  organizations. Where a service involves a minor, the required
                  information should be provided by or with the involvement of
                  an appropriate parent, guardian, or authorized representative
                  where applicable.
                </p>
              </PolicySection>

              {/* Section 13 */}
              <PolicySection title="13. Legal and Regulatory Requirements">
                <p>
                  KIPLAN Notary may process, retain, or disclose information
                  when required or permitted by applicable law, a valid legal
                  process, court order, regulatory requirement, or other lawful
                  authority.
                </p>
              </PolicySection>

              {/* Section 14 */}
              <PolicySection title="14. Changes to This Privacy Policy">
                <p>
                  We may update this Privacy Policy from time to time to reflect
                  changes to our services, technology, legal requirements, or
                  business practices. The updated version will be published on
                  this page with a revised effective date where appropriate.
                </p>
              </PolicySection>

              {/* Section 15 */}
              <PolicySection title="15. Contact Us">
                <p>
                  If you have questions, concerns, or requests relating to this
                  Privacy Policy or the handling of your information, please
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

              {/* Closing Note */}
              <p className="mt-12 pt-8 border-t border-slate-200 text-sm leading-6 text-slate-500">
                This Privacy Policy is intended to describe KIPLAN Notary&apos;s
                general privacy practices. It does not replace any specific
                notice, consent, agreement, or legal requirement that may apply
                to a particular service or transaction.
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

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}