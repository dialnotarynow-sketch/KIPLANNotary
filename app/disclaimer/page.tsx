import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function DisclaimerPage() {
  return (
    <>
      <Navbar />

      <main className="pt-20">
        {/* Header */}
        <section className="bg-deep-blue text-white py-14 lg:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-sm uppercase tracking-widest text-white/60 mb-3">
              KIPLAN Notary
            </p>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold">
              Disclaimer
            </h1>

            <p className="mt-3 text-sm text-white/60">
              Effective Date: September 2026
            </p>
          </div>
        </section>

        {/* Body */}
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-[16px] leading-7 text-slate-700">

              <p className="mb-8">
                The information and services provided through the KIPLAN Notary
                website are intended to provide general information and facilitate
                access to notarial and related services. While we make reasonable
                efforts to keep information accurate and up to date, the information
                on this website should not be treated as a substitute for
                professional advice, official verification, or a formal determination
                by the competent authority.
              </p>

              <DisclaimerSection title="1. General Information">
                <p>
                  The content published on this website is provided for general
                  informational purposes. Laws, regulations, administrative
                  requirements, fees, procedures, and service availability may change
                  from time to time.
                </p>

                <p>
                  KIPLAN Notary does not guarantee that every item of information
                  displayed on the website will remain current, complete, or applicable
                  to every individual situation.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="2. Notarial Services">
                <p>
                  Submission of an online request or application does not constitute
                  acceptance, approval, certification, or completion of a notarial
                  service.
                </p>

                <p>
                  Each request may require review of the applicant, documents,
                  identification, supporting evidence, and applicable legal or
                  administrative requirements before a service can be accepted or
                  completed.
                </p>

                <p>
                  Where required, the applicant may be asked to appear at the office,
                  present original documents, provide additional information, or
                  complete other verification procedures.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="3. Document Verification">
                <p>
                  Uploading a document through this website does not mean that the
                  document has been verified, authenticated, certified, accepted, or
                  approved.
                </p>

                <p>
                  KIPLAN Notary may request additional documents or information and
                  may decline to provide a service where the submitted documents,
                  identity, purpose, or circumstances do not satisfy applicable
                  requirements.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="4. Translation Services">
                <p>
                  Translation requests submitted through the website are subject to
                  review and acceptance. A request for translation does not by itself
                  constitute a completed or certified translation.
                </p>

                <p>
                  Where a certified translation is requested, the final document is
                  made available only after the applicable review, processing, and
                  payment requirements have been completed.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="5. Fees and Payments">
                <p>
                  Any fee information displayed on the website is provided for
                  guidance unless expressly confirmed by KIPLAN Notary.
                </p>

                <p>
                  The final cost of a service may depend on the documents submitted,
                  number of pages or copies, type of service, verification
                  requirements, urgency, and other applicable circumstances.
                </p>

                <p>
                  Submission of a payment claim or proof of payment does not by itself
                  mean that payment has been confirmed. Processing may begin only
                  after the applicable payment has been verified.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="6. No Guarantee of Service Outcome">
                <p>
                  KIPLAN Notary does not guarantee that every request will be accepted
                  or that a particular outcome will be obtained.
                </p>

                <p>
                  Service decisions may depend on applicable laws, regulations,
                  document validity, identity verification, administrative
                  requirements, and information provided by the applicant.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="7. Third-Party Authorities">
                <p>
                  Certain documents or services may require action, verification,
                  approval, or acceptance by government offices, educational
                  institutions, embassies, consulates, foreign authorities, or other
                  third parties.
                </p>

                <p>
                  KIPLAN Notary cannot guarantee the decision, processing time, or
                  requirements of an external authority.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="8. Website Availability">
                <p>
                  We make reasonable efforts to keep the website available and
                  functional. However, uninterrupted availability cannot be guaranteed.
                </p>

                <p>
                  Temporary interruptions may occur because of maintenance, technical
                  problems, network failures, hosting issues, security incidents, or
                  circumstances beyond our reasonable control.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="9. External Links">
                <p>
                  This website may contain links to third-party websites or services.
                  Such links are provided for convenience and informational purposes.
                </p>

                <p>
                  KIPLAN Notary is not responsible for the content, availability,
                  privacy practices, security, or policies of third-party websites.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="10. User Responsibility">
                <p>
                  Applicants are responsible for providing accurate, complete, and
                  truthful information and for submitting documents that they are
                  legally entitled to provide.
                </p>

                <p>
                  Applicants should carefully review information before submitting an
                  application and should promptly notify KIPLAN Notary if they identify
                  an error or omission.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="11. No Legal Advice">
                <p>
                  Information provided through this website is not intended to create
                  an attorney-client relationship or to constitute legal advice for a
                  particular matter.
                </p>

                <p>
                  Where a matter requires legal advice or professional legal
                  representation, the applicant should consult an appropriately
                  qualified legal professional.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="12. Limitation of Responsibility">
                <p>
                  To the extent permitted by applicable law, KIPLAN Notary shall not
                  be responsible for losses or consequences arising from reliance on
                  general website information, inaccurate information supplied by an
                  applicant, actions of third parties, or circumstances outside the
                  reasonable control of KIPLAN Notary.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="13. Changes to This Disclaimer">
                <p>
                  KIPLAN Notary may update this Disclaimer from time to time to reflect
                  changes in services, legal requirements, technology, or business
                  practices.
                </p>

                <p>
                  The updated version will be published on this website with the
                  revised effective date.
                </p>
              </DisclaimerSection>

              <DisclaimerSection title="14. Contact Us">
                <p>
                  If you have questions about this Disclaimer or about information
                  provided through the KIPLAN Notary website, please contact us
                  through the contact information provided on our website.
                </p>

                <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-6">
                  <p className="font-semibold text-slate-900">
                    KIPLAN Notary
                  </p>
                  <p className="mt-2">
                    For service inquiries, document-related questions, or clarification
                    regarding information published on this website, please contact
                    KIPLAN Notary directly.
                  </p>
                </div>
              </DisclaimerSection>

              <div className="border-t border-slate-200 pt-8 mt-12">
                <p className="text-sm text-slate-500">
                  This Disclaimer should be read together with the KIPLAN Notary
                  Privacy Policy and Terms of Use.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function DisclaimerSection({
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