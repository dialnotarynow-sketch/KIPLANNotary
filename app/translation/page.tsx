import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import TranslationForm from "@/components/TranslationForm"

export default function TranslationPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-deep-blue py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <span className="text-sm font-medium text-crimson uppercase tracking-wider">Online Service</span>
              <h1 className="font-display text-3xl lg:text-4xl text-white mt-2 mb-3">Request Translation</h1>
              <p className="text-white/70 max-w-2xl">
                Submit your translation request online. Upload documents, track progress, and receive certified output. 
                A reference number will be generated for tracking.
              </p>
            </SectionReveal>
          </div>
        </section>

        <section className="py-12 lg:py-16 bg-warm-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <TranslationForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
