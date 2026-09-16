import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-deep-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white/10 rounded-md flex items-center justify-center">
                <span className="font-display font-bold text-lg">K</span>
              </div>
              <div>
                <span className="font-display font-semibold text-lg">
                  KIPLAN
                </span>
                <span className="block text-[10px] text-white/60 tracking-widest uppercase">
                  Notary Public Office
                </span>
              </div>
            </div>

            <p className="text-sm text-white/70 leading-relaxed">
              Notarial and Translation Services with Professional Care. A
              division of Kathmandu IP Law & Associates Nepal.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>

            <ul className="space-y-2">
              {[
                "Home",
                "About Us",
                "Services",
                "Publication",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}/`
                    }
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
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>

            <ul className="space-y-2">
              {[
                "Official Document Translation",
                "Marriage Law Translation & Certification",
                "Copy Verification",
                "Sworn Document",
                "Document Certification",
                "Court Marriage Registration",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/services/"
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  CTC Mall, 4th Floor, Suite 525
                  <br />
                  Sundhara, Kathmandu, Nepal
                </span>
              </li>

              <li className="flex items-center gap-3 text-sm text-white/70">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+977-9849530970</span>
              </li>

              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-4 h-4 shrink-0" />
                <span>dialnotarynow@gmail.com</span>
              </li>

              <li className="flex items-start gap-3 text-sm text-white/70">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  Sun–Fri: 9:30 AM – 5:30 PM
                  <br />
                  Saturday: Closed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center text-center gap-3 text-white/50">

            {/* Line 1 */}
            <p className="text-sm leading-relaxed">
              © 2026 KIPLAN Notary. All Rights Reserved.
              <span className="mx-2">•</span>
              KIPLAN Notary is a property of{" "}
              <a
                href="https://kiplan.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
              >
                KIPLAN Pvt. Ltd.
              </a>
              <span className="mx-2">•</span>
              Made with ❤️ for clients seeking trusted notarial services in
              Nepal and worldwide.
            </p>

            {/* Line 2 */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px]">
              <Link
                href="/privacy-policy/"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>

              <span>•</span>

              <Link
                href="/terms-of-use/"
                className="hover:text-white transition-colors"
              >
                Terms of Use
              </Link>

              <span>•</span>

              <Link
                href="/disclaimer/"
                className="hover:text-white transition-colors"
              >
                Disclaimer
              </Link>

              <span>•</span>

              <Link
                href="/contact/"
                className="hover:text-white transition-colors"
              >
                Contact Us
              </Link>

              <span>•</span>

              <Link
                href="/sitemap/"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}