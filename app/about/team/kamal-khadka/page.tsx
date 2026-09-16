import Link from "next/link";
import Image from "next/image";

export default function KamalKhadkaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-light-blue py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-[280px_1fr]">
            {/* Profile Image */}
            <div className="relative mx-auto h-64 w-64 overflow-hidden rounded-full bg-white shadow-sm">
              <Image
                src="/images/Adv Kamal.jpg"
                alt="Kamal Khadka"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Introduction */}
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-600">
                Advocate · Notary Public
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
                Kamal Khadka
              </h1>

              <p className="mt-4 text-lg font-medium text-gray-700">
                MA (HRM), Australia · LL.M. (TU)
              </p>

              <p className="mt-2 text-lg text-gray-600">
                Advocate · Notary Public
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6">

          {/* Professional Profile */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Professional Profile
            </h2>

            <p className="leading-8 text-gray-700">
              Kamal Khadka is an Advocate and Notary Public with a
              multidisciplinary professional background in{" "}
              <strong>
                Human Resource Management, legal practice, and notarial
                services
              </strong>
              .
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              He began his professional career in{" "}
              <strong>Human Resources</strong> before transitioning into legal
              practice. His professional interests include{" "}
              <strong>
                family law, intellectual property, cyber law, and the emerging
                application of artificial intelligence in legal practice and
                court procedures
              </strong>
              .
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Kamal obtained his{" "}
              <strong>Notary Public Certificate in 2007</strong> and initially
              worked as a freelance Notary Public. In{" "}
              <strong>2016</strong>, he established{" "}
              <strong>KIPLAN Notary</strong>, developing it as a professional
              notarial and document service.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              At KIPLAN Notary, he is involved in{" "}
              <strong>
                notarial services, document certification, copy verification,
                official document translation, and related professional
                matters
              </strong>
              . He is also exploring practical applications of AI that may
              support legal professionals and improve efficiency in legal and
              court-related procedures.
            </p>
          </div>

          {/* AI Learning and Practical Applications */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              AI Learning and Practical Applications
            </h2>

            <p className="leading-8 text-gray-700">
              Mr. Khadka has attended a series of{" "}
              <strong>online training programs in artificial intelligence</strong>{" "}
              and continues to learn and practice how AI can be applied
              responsibly and practically in legal work. His interest is
              particularly focused on exploring ways in which technology can
              improve access to information, increase efficiency, and provide
              greater practical benefit to clients and members of the general
              public.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              His broader professional objective is to use his experience,
              legal practice, and emerging technology skills to provide{" "}
              <strong>
                maximum practical benefit to people who may need professional
                information, guidance, and access to useful resources
              </strong>
              .
            </p>
          </div>

          {/* KIPLAN Scholar */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              KIPLAN Scholar — Expanding Access to Scholarship Information
            </h2>

            {/* KIPLAN Scholar Image */}
            <div className="my-8 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
              <Image
                src="/images/kiplan-scholar-platform.png"
                alt="KIPLAN Scholar platform displayed across desktop, laptop, and mobile devices"
                width={1200}
                height={675}
                className="h-auto w-full"
              />
            </div>

            <p className="leading-8 text-gray-700">
              One example of this approach is{" "}
              <strong>KIPLAN Scholar</strong>, a scholarship information
              platform developed by Mr. Khadka and his team.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              The platform is intended to help{" "}
              <strong>
                Nepali students, researchers, professional women, civil
                servants, and other interested individuals
              </strong>{" "}
              find information about{" "}
              <strong>
                fully funded scholarship opportunities around the world
              </strong>
              .
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              Access to timely and accurate scholarship information can open
              opportunities for education, research, professional development,
              and personal growth. For this reason, KIPLAN Scholar aims to make
              such information more accessible to people who may benefit from
              it.
            </p>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <p className="leading-7 text-gray-700">
                You can visit <strong>KIPLAN Scholar</strong> to explore
                current scholarship information and opportunities.
              </p>

              <a
                href="https://kiplanscholar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center font-semibold text-gray-900 hover:underline"
              >
                Visit KIPLAN Scholar →
              </a>
            </div>

            <p className="mt-6 leading-8 text-gray-700">
              A scholarship opportunity may benefit you directly, or it may be
              useful to a{" "}
              <strong>
                family member, friend, colleague, student, researcher, or
                professional
              </strong>{" "}
              in your network. Access to information about fully funded
              education opportunities can sometimes become an important turning
              point in a person's educational or professional journey.
            </p>
          </div>

          {/* AI Training and Entrepreneurship */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              AI Training and Entrepreneurship
            </h2>

            <p className="leading-8 text-gray-700">
              Another area of Mr. Khadka&apos;s interest is the practical use
              of AI to support{" "}
              <strong>entrepreneurs and small businesses</strong>.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              He has been exploring and conducting AI-based training focused
              on helping entrepreneurs understand how they can{" "}
              <strong>
                establish an enterprise, develop a professional presence,
                promote their products or services, and reach potential markets
              </strong>{" "}
              using accessible digital tools.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              The objective is to demonstrate that entrepreneurs can make
              meaningful use of technology without necessarily requiring a
              large financial investment. With consistent effort and even{" "}
              <strong>an hour or less of focused work each day</strong>, simple
              digital skills can be developed and applied to everyday business
              activities.
            </p>
          </div>

          {/* Entrepreneur Profile Platform */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              Entrepreneur Profile Platform
            </h2>

            <p className="leading-8 text-gray-700">
              One practical example is{" "}
              <strong>Kamal Khadka&apos;s entrepreneur profile platform</strong>,
              which demonstrates how individuals can create an online
              professional profile and use it to present themselves, promote
              their products or services, and develop their digital presence.
            </p>

            <p className="mt-5 leading-8 text-gray-700">
              The platform is intended as a simple example of how entrepreneurs
              can use accessible technology and practical digital skills to
              promote their work.
            </p>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <p className="leading-7 text-gray-700">
                Explore the entrepreneur profile platform:
              </p>

              <a
                href="https://kamalkhadka.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center font-semibold text-gray-900 hover:underline"
              >
                Visit Entrepreneur Profile Platform →
              </a>
            </div>
          </div>

          {/* Closing */}
          <div className="mb-12 border-t border-gray-200 pt-10">
            <p className="leading-8 text-gray-700">
              Through these initiatives, Mr. Khadka continues to explore how{" "}
              <strong>
                law, professional services, artificial intelligence, and
                accessible digital technology
              </strong>{" "}
              can be brought together to create practical resources and
              opportunities for the wider community.
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