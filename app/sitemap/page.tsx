import Link from "next/link"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function SitemapPage() {
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
              Sitemap
            </h1>

            <p className="mt-3 text-sm text-white/60">
              Find your way around the KIPLAN Notary website.
            </p>
          </div>
        </section>

        {/* Sitemap */}
        <section className="bg-white py-14 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

              {/* Main Pages */}
              <SitemapSection title="Main Pages">
                <SitemapLink href="/" label="Home" />
                <SitemapLink href="/about" label="About KIPLAN Notary" />
                <SitemapLink href="/services" label="Services" />
                <SitemapLink href="/contact" label="Contact Us" />
              </SitemapSection>

              {/* Services */}
              <SitemapSection title="Services">
                <SitemapLink
                  href="/translation"
                  label="Translation Request"
                />
                <SitemapLink
                  href="/services"
                  label="Notarial Services"
                />
              </SitemapSection>

              {/* Client Services */}
              <SitemapSection title="Client Services">
                <SitemapLink
                  href="/track"
                  label="Track Your Application"
                />
              </SitemapSection>

              {/* Legal & Information */}
              <SitemapSection title="Legal & Information">
                <SitemapLink
                  href="/privacy-policy"
                  label="Privacy Policy"
                />
                <SitemapLink
                  href="/terms-of-use"
                  label="Terms of Use"
                />
                <SitemapLink
                  href="/disclaimer"
                  label="Disclaimer"
                />
              </SitemapSection>

            </div>

            {/* Note */}
            <div className="mt-14 border-t border-slate-200 pt-8">
              <p className="text-[16px] leading-7 text-slate-600">
                This sitemap provides a convenient overview of the publicly
                accessible sections of the KIPLAN Notary website. Some
                administrative and internal pages are restricted to authorized
                users and are not listed here.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

function SitemapSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section>
      <h2 className="font-display text-xl sm:text-2xl font-semibold text-slate-900 mb-5">
        {title}
      </h2>

      <div className="space-y-3">
        {children}
      </div>
    </section>
  )
}

function SitemapLink({
  href,
  label,
}: {
  href: string
  label: string
}) {
  return (
    <Link
      href={href}
      className="block text-[16px] text-slate-600 hover:text-deep-blue transition-colors"
    >
      {label}
    </Link>
  )
}