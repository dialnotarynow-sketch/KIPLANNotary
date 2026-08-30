import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ContactSection from "@/components/ContactSection"
import SectionReveal from "@/components/SectionReveal"

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-deep-blue py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <span className="text-sm font-medium text-crimson uppercase tracking-wider">Get in Touch</span>
              <h1 className="font-display text-3xl lg:text-5xl text-white mt-3 mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-white/70 max-w-2xl">
                For complex matters, urgent requests, or professional consultation, reach out directly. 
                We are here to help.
              </p>
            </SectionReveal>
          </div>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
