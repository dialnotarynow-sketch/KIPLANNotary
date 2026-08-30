"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, FileText, MessageCircle, Phone } from "lucide-react"

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Contact", href: "/contact/" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-deep-blue rounded-md flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">K</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-semibold text-deep-blue text-lg leading-tight">KIPLAN</span>
              <span className="block text-[10px] text-gray-500 tracking-widest uppercase">Notary Public Office</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-deep-blue"
                    : "text-gray-600 hover:text-deep-blue"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/translation/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-deep-blue text-white text-sm font-medium rounded-md hover:bg-deep-blue-light transition-all duration-200 hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4" />
              Request Translation
            </Link>
            <a
              href="https://wa.me/9779849530970"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:border-crimson hover:text-crimson transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-deep-blue"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-warm-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-sm font-medium ${
                    pathname === item.href ? "text-deep-blue" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-3 space-y-2 border-t border-gray-200">
                <Link
                  href="/translation/"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 bg-deep-blue text-white text-sm font-medium rounded-md"
                >
                  <FileText className="w-4 h-4" />
                  Request Translation
                </Link>
                <a
                  href="https://wa.me/9779849530970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
