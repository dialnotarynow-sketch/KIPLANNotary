import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Hero from "@/components/Hero"
import QuickActions from "@/components/QuickActions"
import Services from "@/components/Services"
import HowItWorks from "@/components/HowItWorks"
import WhyKiplan from "@/components/WhyKiplan"
import NotaryInfo from "@/components/NotaryInfo"
import Ecosystem from "@/components/Ecosystem"
import AskKiplan from "@/components/AskKiplan"
import ContactSection from "@/components/ContactSection"

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <QuickActions />
        <Hero />
        <Services />
        <HowItWorks />
        <WhyKiplan />
        <NotaryInfo />
        <Ecosystem />
        <AskKiplan />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}