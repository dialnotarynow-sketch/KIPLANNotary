import Link from "next/link";
import Image from "next/image";

export default function BabitaKarkiPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-light-blue py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
            {/* Profile Image */}
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full bg-white shadow-sm">
              <Image
                src="/images/Adv Babita Karki.png"
                alt="Babita Karki"
                fill
                sizes="256px"
                className="object-cover"
                priority
              />
            </div>

            {/* Introduction */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                Advocate
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Babita Karki
              </h1>

              <p className="mt-4 text-lg font-medium text-gray-700">
                LL.M. (Tribhuvan University)
              </p>

              <p className="mt-2 text-lg text-gray-600">
                Advocate · Founder, Trishakti Law Firm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Academic Qualification */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Academic Qualification
            </h2>

            <p className="leading-8 text-gray-700">
              LL.M. (Tribhuvan University)
            </p>
          </div>

          {/* Professional Designation */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Professional Designation
            </h2>

            <p className="leading-8 text-gray-700">
              Advocate · Founder, Trishakti Law Firm
            </p>
          </div>

          {/* Areas of Professional Practice */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Areas of Professional Practice
            </h2>

            <p className="leading-8 text-gray-700">
              Babita Karki is an experienced legal practitioner with
              professional experience in legal practice, litigation, court
              procedures, negotiation, mediation, and professional legal
              document preparation. Her areas of professional practice and
              interest include{" "}
              <strong>
                family law, women-related legal issues, property law,
                criminal law, cyber law, litigation, company and contract
                matters, and dispute resolution
              </strong>
              .
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              She has particular experience in matters involving{" "}
              <strong>
                family relationships, women&apos;s rights and concerns,
                property rights, personal legal matters, and sensitive
                disputes
              </strong>
              , where careful communication, practical legal understanding,
              negotiation, and effective representation are important.
            </p>
          </div>

          {/* Experience & Background */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Experience &amp; Professional Background
            </h2>

            <p className="leading-8 text-gray-700">
              Babita Karki brings extensive experience in legal practice,
              court procedures, litigation, negotiation, mediation, legal
              research, and professional document preparation, with experience
              extending from the{" "}
              <strong>District Court to the Supreme Court</strong>.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Her professional experience includes family and matrimonial
              disputes, property matters, criminal cases, cyber-related
              matters, and other civil and litigation proceedings. Her
              particular areas of professional interest include{" "}
              <strong>family law and women-related legal issues</strong>,
              including{" "}
              <strong>
                divorce, child custody, domestic violence, court marriage,
                separation rights, juvenile matters, and related family
                disputes
              </strong>
              .
            </p>
          </div>

          {/* Role at Trishakti Law Firm */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Role at Trishakti Law Firm
            </h2>

            <p className="leading-8 text-gray-700">
              As the{" "}
              <strong>Founder of Trishakti Law Firm</strong>, Babita Karki
              leads an independent legal practice based in{" "}
              <strong>Babarmahal, Kathmandu</strong>. She is involved in legal
              consultation, court-related matters, litigation, negotiation,
              mediation, and professional preparation of legal documents.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Her practice has a particular focus on{" "}
              <strong>
                family matters, women-related legal concerns, property
                disputes, and sensitive personal legal issues
              </strong>
              . She also remains associated with litigation and other legal
              matters undertaken in collaboration with other legal
              practitioners, particularly in family and women-related cases.
            </p>
          </div>

          {/* Contribution as an Associate */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Contribution as an Associate
            </h2>

            <p className="leading-8 text-gray-700">
              During her earlier association as an{" "}
              <strong>Associate</strong>, Babita Karki made an appreciable
              contribution to the{" "}
              <strong>
                design and development of an education-focused platform
              </strong>
              .
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Her contribution reflected her ability to combine her legal
              knowledge and practical experience with an understanding of
              educational needs and accessible information resources.
            </p>

            {/* KIPLAN Scholar Image */}
            <div className="mt-8">
              <a
                href="https://kiplanscholar.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit KIPLAN Scholar"
              >
                <Image
                  src="/images/Scholardesign.png"
                  alt="KIPLAN Scholar platform"
                  width={1200}
                  height={700}
                  className="h-auto w-full rounded-lg transition-opacity hover:opacity-90"
                />
              </a>

              <p className="mt-3 text-sm text-gray-500">
                KIPLAN Scholar — education platform developed with the
                contribution of Babita Karki during her association as an
                Associate.
              </p>
            </div>
          </div>

          {/* Professional Approach */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Professional Approach
            </h2>

            <p className="leading-8 text-gray-700">
              Babita Karki adopts a{" "}
              <strong>
                practical, client-focused, and solution-oriented approach
              </strong>{" "}
              to legal practice. She seeks to understand the circumstances and
              concerns of the parties involved and works toward practical and
              legally appropriate solutions.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Where appropriate, she also utilizes{" "}
              <strong>negotiation and mediation</strong> as part of dispute
              resolution, particularly where constructive dialogue may assist
              in addressing sensitive family and personal legal matters.
            </p>
          </div>

          {/* Short Professional Profile */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Short Professional Profile
            </h2>

            <p className="leading-8 text-gray-700">
              Babita Karki is an experienced{" "}
              <strong>
                Advocate and Founder of Trishakti Law Firm, Babarmahal,
                Kathmandu
              </strong>
              . She holds an{" "}
              <strong>LL.M. from Tribhuvan University</strong> and has
              professional experience in court practice, litigation, legal
              procedures, negotiation, mediation, and professional document
              preparation, with experience extending from the District Court
              to the Supreme Court.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Her professional practice includes{" "}
              <strong>
                family law, women-related legal issues, property law, criminal
                law, cyber law, litigation, company and contract matters, and
                dispute resolution
              </strong>
              , with particular experience in family and personal legal
              matters including divorce, child custody, domestic violence,
              court marriage, separation rights, juvenile matters, and
              related disputes.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Alongside her independent practice, she remains associated with
              collaborative litigation and legal work, particularly in{" "}
              <strong>family and women-related matters</strong>. Her earlier
              contribution as an Associate to the design and development of an
              education-focused platform also forms part of her broader
              professional experience.
            </p>
          </div>

          {/* Back Link */}
          <div className="border-t border-gray-200 pt-8">
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-semibold text-gray-900 transition-opacity hover:opacity-70"
            >
              ← Back to Our Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}