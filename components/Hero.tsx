"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { FileText, Phone, Shield, Award, Clock } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-office.png"
          alt="KIPLAN Notary Public Office"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/95 via-deep-blue/85 to-deep-blue/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium text-white/90 mb-6">
              <Shield className="w-3.5 h-3.5" />
              Authorized by Nepal Notary Public Council
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] mb-6"
          >
            KIPLAN Notary<br />
            Public Office
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 max-w-xl"
          >
            Notarial and Translation Services with Professional Care. A real professional office serving Nepal with integrity since 2016.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Link
              href="/translation/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-crimson text-white font-medium rounded-md hover:bg-crimson-dark transition-all duration-200 hover:-translate-y-0.5"
            >
              <FileText className="w-5 h-5" />
              Request Translation
            </Link>
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-medium rounded-md hover:bg-white/20 transition-all duration-200"
            >
              <Phone className="w-5 h-5" />
              Contact Us
            </Link>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-6 text-white/60 text-sm"
          >
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>Nepal Bar Council</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Notary Public Council</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Since 2016</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
