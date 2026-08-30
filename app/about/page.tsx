import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import Image from "next/image"
import { Award, Shield, BookOpen, Users, MapPin, Phone, Mail, Clock } from "lucide-react"

const credentials = [
  { icon: Shield, title: "Notary Public", desc: "Authorized by Nepal Notary Public Council under Act 2063" },
  { icon: Award, title: "Advocate", desc: "Registered with Nepal Bar Council since 2008" },
  { icon: BookOpen, title: "Translator", desc: "Certified Legal Translator — English & Nepali" },
  { icon: Users, title: "Experience", desc: "Serving clients with integrity since 2016" },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="bg-deep-blue py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <span className="text-sm font-medium text-crimson uppercase tracking-wider">About Us</span>
              <h1 className="font-display text-3xl lg:text-5xl text-white mt-3 mb-4">
                KIPLAN Notary Public Office
              </h1>
              <p className="text-lg text-white/70 max-w-2xl">
                A modern digital extension of a real professional Notary Public Office, 
                committed to accessible, trustworthy notarial and translation services.
              </p>
            </SectionReveal>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-warm-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <SectionReveal>
                <div className="relative">
                  <div className="aspect-[4/5] relative rounded-lg overflow-hidden">
                    <Image
                      src="/images/kamal-profile.png"
                      alt="Advocate Kamal Khadka"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </SectionReveal>

              <div>
                <SectionReveal>
                  <h2 className="font-display text-3xl text-deep-blue mb-6">
                    Kamal Khadka
                  </h2>
                  <p className="text-crimson font-medium mb-4">
                    Advocate · Notary Public · Translator
                  </p>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      Kamal Khadka is the founder and principal of KIPLAN Notary Public Office, 
                      the notarial division of Kathmandu IP Law & Associates Nepal. With a Master in Law 
                      from Tribhuvan University, an MBA, and a Master in HRM from the University of Canberra, 
                      he brings a rare combination of legal expertise and international perspective.
                    </p>
                    <p>
                      Authorized as a Notary Public by the Nepal Notary Public Council, Advocate Khadka 
                      has served hundreds of clients with document certification, translation, and 
                      notarisation services since 2016.
                    </p>
                    <p>
                      He is a recipient of the Endeavour Award 2008 (Australia) and an active member of 
                      the International Association for AI and Law, reflecting his commitment to both 
                      traditional legal excellence and modern professional innovation.
                    </p>
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.2} className="mt-8">
                  <div className="grid grid-cols-2 gap-4">
                    {credentials.map((cred) => (
                      <div key={cred.title} className="flex items-start gap-3 p-4 bg-cream rounded-lg">
                        <div className="w-10 h-10 bg-deep-blue/5 rounded-lg flex items-center justify-center shrink-0">
                          <cred.icon className="w-5 h-5 text-deep-blue" />
                        </div>
                        <div>
                          <p className="font-medium text-sm text-gray-900">{cred.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{cred.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionReveal>

                <SectionReveal delay={0.3} className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    {["Nepal Bar Council", "Nepal Notary Public Association", "Patan High Court Bar Association", "International Association for AI and Law", "Endeavour Award 2008"].map((tag) => (
                      <span key={tag} className="px-3 py-1.5 bg-deep-blue/5 text-deep-blue text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24 bg-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal className="text-center mb-12">
              <h2 className="font-display text-3xl text-deep-blue mb-4">Office Information</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Visit us at CTC Mall, Sundhara, Kathmandu. Our office is conveniently located on the 4th Floor, Suite 525.
              </p>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SectionReveal>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <MapPin className="w-6 h-6 text-deep-blue mb-3" />
                  <p className="font-medium text-gray-900 mb-1">Address</p>
                  <p className="text-sm text-gray-600">CTC Mall, 4th Floor, Suite 525<br />Sundhara, Kathmandu, Nepal</p>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.1}>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <Phone className="w-6 h-6 text-deep-blue mb-3" />
                  <p className="font-medium text-gray-900 mb-1">Phone</p>
                  <p className="text-sm text-gray-600">+977-9849530970<br />+977-01-5312040</p>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.15}>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <Mail className="w-6 h-6 text-deep-blue mb-3" />
                  <p className="font-medium text-gray-900 mb-1">Email</p>
                  <p className="text-sm text-gray-600">ipkiplan@gmail.com<br />kbkamal@gmail.com</p>
                </div>
              </SectionReveal>
              <SectionReveal delay={0.2}>
                <div className="bg-white rounded-lg p-6 border border-gray-200">
                  <Clock className="w-6 h-6 text-deep-blue mb-3" />
                  <p className="font-medium text-gray-900 mb-1">Hours</p>
                  <p className="text-sm text-gray-600">Sun–Fri: 9:30 AM – 5:30 PM<br />Saturday: Closed</p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
