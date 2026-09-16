"use client"

import SectionReveal from "./SectionReveal"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
} from "lucide-react"

export default function ContactSection() {
  return (
    <section className="py-20 lg:py-28 bg-warm-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionReveal className="text-center mb-16">
          <span className="text-sm font-medium text-crimson uppercase tracking-wider">
            Get in Touch
          </span>

          <h2 className="font-display text-3xl lg:text-4xl text-deep-blue mt-3 mb-4">
            Human Assistance
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            For complex matters, urgent requests, or professional consultation,
            reach out directly. We are here to help.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="space-y-6">

            {/* WhatsApp */}
            <SectionReveal>
              <a
                href="https://wa.me/9779849530970"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 transition-colors group"
              >
                <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>

                <div>
                  <p className="font-semibold text-emerald-900">
                    WhatsApp
                  </p>

                  <p className="text-sm text-emerald-700">
                    +977-9849530970
                  </p>

                  <p className="text-xs text-emerald-600 mt-1">
                    Human assistance for complex matters
                  </p>
                </div>

                <ExternalLink className="w-5 h-5 text-emerald-400 ml-auto" />
              </a>
            </SectionReveal>

            {/* Office Address */}
            <SectionReveal delay={0.1}>
              <div className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-deep-blue/5 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-deep-blue" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    Office Address
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Civil Trade Centre (CTC) Mall, 4th Floor, Suite 525
                    <br />
                    Sundhara, Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Phone */}
            <SectionReveal delay={0.15}>
              <div className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-deep-blue/5 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-deep-blue" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    Phone
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    +977-9849530970 (WhatsApp/Viber)
                    <br />
                    +977-01-5312040 (Office)
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Email */}
            <SectionReveal delay={0.2}>
              <div className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-deep-blue/5 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-deep-blue" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    Email
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    dialnotarynow@gmail.com
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Office Hours */}
            <SectionReveal delay={0.25}>
              <div className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-deep-blue/5 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-deep-blue" />
                </div>

                <div>
                  <p className="font-medium text-gray-900">
                    Office Hours
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    Sunday – Friday: 9:00 AM – 5:30 PM
                    <br />
                    Saturday: Closed
                    <br />
                    <span className="text-crimson">
                      Emergency Support: 24/7
                    </span>
                  </p>
                </div>
              </div>
            </SectionReveal>

          </div>

    {/* Google Map */}
<SectionReveal delay={0.2}>
  <div className="relative h-full min-h-[400px] rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm">

    <iframe
      src="https://www.google.com/maps?q=M8X7%2B34P%2C%20Kathmandu%2C%20Bagmati%20Province%2044600&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0, minHeight: "400px" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="KIPLAN Notary Office Location"
    />

    {/* Office Label */}
    <div className="absolute top-4 left-4 right-4 sm:right-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200 px-5 py-4">
      <p className="font-display text-lg text-deep-blue font-semibold">
        KIPLAN Notary Office
      </p>
      <p className="text-sm text-gray-600 mt-1">
        Civil Trade Centre (CTC) Mall
      </p>
      <p className="text-xs text-gray-500">
        4th Floor, Suite 525 · Sundhara, Kathmandu
      </p>
    </div>

  </div>
</SectionReveal>

        </div>
      </div>
    </section>
  )
}