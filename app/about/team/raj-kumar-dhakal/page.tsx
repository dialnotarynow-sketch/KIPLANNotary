import Link from "next/link";
import Image from "next/image";

export default function RajKumarDhakalPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-light-blue py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
            {/* Profile Image */}
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full bg-white shadow-sm">
              <Image
                src="/images/Adv Raj-Kumar-Dhakal.png"
                alt="Raj Kumar Dhakal"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Introduction */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                Senior Advocate
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Raj Kumar Dhakal
              </h1>

              <p className="mt-4 text-lg font-medium text-gray-700">
                B.L. (Tribhuvan University)
              </p>

              <p className="mt-2 text-lg text-gray-600">
                Senior Advocate
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
              B.L. (Tribhuvan University)
            </p>
          </div>

          {/* Professional Designation */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Professional Designation
            </h2>

            <p className="leading-8 text-gray-700">
              Senior Advocate
            </p>
          </div>

          {/* Areas of Professional Practice */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Areas of Professional Practice
            </h2>

            <p className="leading-8 text-gray-700">
              Raj Kumar Dhakal is a generalist legal practitioner with
              particular professional experience in property law, family law,
              coparcener rights and property matters, and contract management,
              including matters with national and international dimensions.
            </p>
          </div>

          {/* Experience & Background */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Experience &amp; Professional Background
            </h2>

            <p className="leading-8 text-gray-700">
              Raj Kumar Dhakal brings extensive experience in legal practice,
              court proceedings, and professional legal document preparation,
              with practice extending from the District Court to the Supreme
              Court.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              His areas of particular professional interest include property
              law and family law, including property-related disputes and
              matters concerning coparcener rights. He also has experience in
              contract-related matters and legal work involving individuals,
              businesses, and institutions.
            </p>
          </div>

          {/* Role at KIPLAN Notary */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Role at KIPLAN Notary
            </h2>

            <p className="leading-8 text-gray-700">
              As a Senior Associate at KIPLAN Notary, Raj Kumar Dhakal provides
              senior-level legal guidance and leads the firm's work in
              court-related and litigation matters. His extensive experience
              in court procedures and legal practice contributes to the
              professional handling of complex legal and document-related
              matters.
            </p>
          </div>

          {/* Short Professional Profile */}
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Short Professional Profile
            </h2>

            <p className="leading-8 text-gray-700">
              Raj Kumar Dhakal is a Senior Advocate with extensive experience
              in court practice, litigation, legal procedures, and professional
              document preparation, with experience spanning the District
              Court through the Supreme Court.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              His professional practice has involved representing and advising
              individuals, businesses, and institutions, with particular
              experience in property and family law matters. At KIPLAN Notary,
              he serves as a Senior Associate and provides leadership in
              court-related and litigation matters.
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