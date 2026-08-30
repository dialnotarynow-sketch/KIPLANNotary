"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import { Clock, CheckCircle, CreditCard, PenTool, Package, Archive, AlertCircle } from "lucide-react"
import { useTrackInquiry } from "@/lib/hooks/useTrackInquiry"

const statusMeta: Record<string, { label: string; icon: typeof Clock; desc: string }> = {
  new: { label: "Submitted", icon: Clock, desc: "Request received. Awaiting office review." },
  under_review: { label: "Under Review", icon: AlertCircle, desc: "Identity and documents under review." },
  awaiting_customer: { label: "Awaiting Your Response", icon: AlertCircle, desc: "KIPLAN is waiting for information from you." },
  document_requested: { label: "Document Requested", icon: CreditCard, desc: "Additional documents have been requested." },
  documents_received: { label: "Documents Received", icon: CheckCircle, desc: "Your documents have been received." },
  in_progress: { label: "Processing", icon: PenTool, desc: "Your request is being processed." },
  completed: { label: "Completed", icon: Archive, desc: "This request has been completed." },
  on_hold: { label: "On Hold", icon: AlertCircle, desc: "This request is currently on hold." },
  cancelled: { label: "Cancelled", icon: AlertCircle, desc: "This request has been cancelled." },
  closed: { label: "Closed", icon: Package, desc: "This file has been closed." },
}

function TrackContent() {
  const searchParams = useSearchParams()
  const [refInput, setRefInput] = useState(searchParams.get("ref") || "")
  const { track, loading, result, error } = useTrackInquiry()

  const handleTrack = () => {
    if (refInput.trim()) track(refInput.trim())
  }

  const meta = result ? statusMeta[result.status] : null

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-warm-white">
        <section className="bg-deep-blue py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <h1 className="font-display text-3xl lg:text-4xl text-white">Track Your Request</h1>
            </SectionReveal>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16">
          <SectionReveal>
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reference Number</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={refInput}
                  onChange={(e) => setRefInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder="KN-2026-00124"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue disabled:opacity-60"
                />
                <button
                  onClick={handleTrack}
                  disabled={loading}
                  className="px-6 py-2.5 bg-deep-blue text-white text-sm font-medium rounded-lg hover:bg-deep-blue-light transition-colors disabled:opacity-60"
                >
                  {loading ? "Tracking..." : "Track"}
                </button>
              </div>
            </div>
          </SectionReveal>

          {error && (
            <SectionReveal delay={0.1}>
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </SectionReveal>
          )}

          {result && meta && (
            <SectionReveal delay={0.2}>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Tracking</p>
                <p className="font-mono text-lg font-bold text-deep-blue">{result.referenceNumber}</p>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border bg-emerald-50 border-emerald-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-500 text-white">
                  <meta.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-emerald-900">{meta.label}</p>
                  <p className="text-xs text-emerald-700 mt-0.5">{meta.desc}</p>
                  {result.serviceType && (
                    <p className="text-xs text-emerald-700 mt-0.5">Service: {result.serviceType}</p>
                  )}
                </div>
                <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                  Current
                </span>
              </div>

              <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Note:</strong> Status updates reflect office action. If you have questions about your request,
                  please contact us via WhatsApp at +977-9849530970.
                </p>
              </div>
            </SectionReveal>
          )}

          {!result && !error && (
            <SectionReveal delay={0.2} className="text-center py-12">
              <p className="text-gray-500">Enter your reference number above to track your request.</p>
            </SectionReveal>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackContent />
    </Suspense>
  )
}
