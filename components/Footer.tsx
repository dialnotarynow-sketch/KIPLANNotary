import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-deep-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">
                <span className="font-display font-bold text-lg">K</span>
              </div>
              <div>
                <span className="font-display font-semibold text-lg">KIPLAN</span>
                <span className="block text-[10px] text-white/60 tracking-widest uppercase">Notary Public Office</span>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Notarial and Translation Services with Professional Care. A division of Kathmandu IP Law & Associates Nepal.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Home", "About Us", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}/`}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              {["Translation", "Copy Verification", "Affidavit", "Document Certification", "Share Transfer"].map((item) => (
                <li key={item}>
                  <Link href="/services/" className="text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>CTC Mall, 4th Floor, Suite 525<br />Sundhara, Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+977-9849530970</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 shrink-0" />
                <span>ipkiplan@gmail.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Sun–Fri: 9:30 AM – 5:30 PM<br />Saturday: Closed</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} KIPLAN Notary Public Office. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span>Registered with Nepal Bar Council</span>
            <span className="hidden sm:inline">·</span>
            <span>Authorized by Nepal Notary Public Council</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
