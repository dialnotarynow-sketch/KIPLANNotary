"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  online: boolean
  href: string
  delay?: number
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  online,
  href,
  delay = 0,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      className="group relative bg-white border border-gray-200 rounded-lg p-6 hover:border-deep-blue transition-all duration-300"
    >
      <div className="absolute top-4 right-4">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
            online
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-crimson/5 text-crimson border border-crimson/20"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              online ? "bg-emerald-500" : "bg-crimson"
            }`}
          />
          {online ? "Online Request" : "Office Visit"}
        </span>
      </div>

      <div className="mb-4">
        <div className="w-12 h-12 bg-deep-blue/5 rounded-lg flex items-center justify-center group-hover:bg-deep-blue group-hover:text-white transition-all duration-300">
          <Icon className="w-6 h-6 text-deep-blue group-hover:text-white transition-colors" />
        </div>
      </div>

      <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>

      <p className="text-sm text-gray-600 leading-relaxed mb-4">
        {description}
      </p>

      <Link
        href={href}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-deep-blue hover:text-crimson transition-colors"
      >
        {online ? "Request Online" : "Learn More"}

        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </Link>
    </motion.div>
  )
}