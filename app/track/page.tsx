"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import SectionReveal from "@/components/SectionReveal"
import {
  Clock,
  CheckCircle,
  CreditCard,
  PenTool,
  Archive,
  AlertCircle,
  FileCheck,
  Download,
} from "lucide-react"
import { useTrackInquiry } from "@/lib/hooks/useTrackInquiry"

const statusMeta: Record<
  string,
  { label: string; icon: typeof Clock; desc: string }
> = {
  new: {
    label: "Application Submitted",
    icon: Clock,
    desc: "Your application has been received by KIPLAN Notary.",
  },
  under_review: {
    label: "Under Review",
    icon: AlertCircle,
    desc: "Your documents and application are being reviewed.",
  },
  awaiting_customer: {
    label: "Awaiting Your Response",
    icon: AlertCircle,
    desc: "KIPLAN Notary is waiting for information from you.",
  },
  document_requested: {
    label: "Document Requested",
    icon: AlertCircle,
    desc: "Additional documents are required before your application can proceed.",
  },
  documents_received: {
    label: "Documents Received",
    icon: CheckCircle,
    desc: "The requested documents have been received.",
  },
  payment_required: {
    label: "Payment Required",
    icon: CreditCard,
    desc: "Document review is complete. Payment is required before processing can begin.",
  },
  payment_confirmed: {
    label: "Payment Confirmed",
    icon: CheckCircle,
    desc: "Your payment has been confirmed. Your request can now proceed to processing.",
  },
  in_progress: {
    label: "Processing",
    icon: PenTool,
    desc: "Your certified translation is being prepared.",
  },
  completed: {
    label: "Completed",
    icon: FileCheck,
    desc: "Your certified translation has been completed.",
  },
  ready: {
    label: "Certified Translation Ready",
    icon: FileCheck,
    desc: "Your certified translation is ready for download.",
  },
  closed: {
    label: "File Closed",
    icon: Archive,
    desc: "This file has been closed.",
  },
  cancelled: {
    label: "Cancelled",
    icon: AlertCircle,
    desc: "This request has been cancelled.",
  },
  on_hold: {
    label: "On Hold",
    icon: AlertCircle,
    desc: "This request is currently on hold.",
  },
}

const customerStages = [
  {
    key: "new",
    label: "Application Submitted",
    desc: "Application received",
  },
  {
    key: "under_review",
    label: "Under Review",
    desc: "Documents being reviewed",
  },
  {
    key: "payment_required",
    label: "Payment Required",
    desc: "Payment due after document review",
  },
  {
    key: "payment_confirmed",
    label: "Payment Confirmed",
    desc: "Payment received and confirmed",
  },
  {
    key: "in_progress",
    label: "Processing",
    desc: "Certified translation in progress",
  },
  {
    key: "completed",
    label: "Completed",
    desc: "Translation completed",
  },
  {
    key: "ready",
    label: "Certified Translation Ready",
    desc: "Document ready for download",
  },
  {
    key: "closed",
    label: "File Closed",
    desc: "Application completed and closed",
  },
]

const statusOrder = [
  "new",
  "under_review",
  "payment_required",
  "payment_confirmed",
  "in_progress",
  "completed",
  "ready",
  "closed",
]

function getStatusIndex(status: string) {
  const index = statusOrder.indexOf(status)

  if (index >= 0) return index

  if (status === "documents_received") return 1
  if (status === "document_requested") return 1
  if (status === "awaiting_customer") return 1

  return 0
}

type DownloadFile = {
  url: string
  filename: string
  fileType: string
}

function TrackContent() {
  const searchParams = useSearchParams()

  const [refInput, setRefInput] = useState(
    searchParams.get("ref") || ""
  )

  const [downloads, setDownloads] = useState<DownloadFile[]>([])
  const [loadingDownloads, setLoadingDownloads] = useState(false)
  const [downloadingIndex, setDownloadingIndex] = useState<number | null>(
    null
  )

  const { track, loading, result, error } = useTrackInquiry()

  const handleTrack = () => {
    if (refInput.trim()) {
      setDownloads([])
      track(refInput.trim())
    }
  }

  const loadDownloads = async () => {
    if (!result?.referenceNumber) return

    setLoadingDownloads(true)

    try {
      const res = await fetch(
        `/api/track/download?ref=${encodeURIComponent(
          result.referenceNumber
        )}`
      )

      const data = await res.json()

      if (!res.ok) {
        throw new Error(
          data.error || "Download is not available"
        )
      }

      if (!data.downloads || !Array.isArray(data.downloads)) {
        throw new Error(
          "No certified translation files were found"
        )
      }

      setDownloads(data.downloads)
    } catch (error: any) {
      alert(
        error.message ||
          "Unable to locate certified translation files"
      )
    } finally {
      setLoadingDownloads(false)
    }
  }

  const handleDownload = (index: number) => {
    const file = downloads[index]

    if (!file?.url) return

    setDownloadingIndex(index)

    try {
      window.open(file.url, "_blank")
    } finally {
      setTimeout(() => {
        setDownloadingIndex(null)
      }, 1000)
    }
  }

  const meta = result
    ? statusMeta[result.status]
    : null

  const currentIndex = result
    ? getStatusIndex(result.status)
    : -1

  const showDownload =
    result?.status === "ready" ||
    result?.status === "completed"

  return (
    <>
      <Navbar />

      <main className="pt-20 min-h-screen bg-warm-white">
        <section className="bg-deep-blue py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionReveal>
              <h1 className="font-display text-3xl lg:text-4xl text-white">
                Track Your Application
              </h1>

              <p className="mt-2 text-blue-100 text-sm">
                Check the progress of your KIPLAN Notary application.
              </p>
            </SectionReveal>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 py-16">
          {/* Tracking Search */}
          <SectionReveal>
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Number
              </label>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={refInput}
                  onChange={(e) =>
                    setRefInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleTrack()
                    }
                  }}
                  placeholder="KN-2026-00020"
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue disabled:opacity-60"
                />

                <button
                  onClick={handleTrack}
                  disabled={
                    loading || !refInput.trim()
                  }
                  className="px-6 py-2.5 bg-deep-blue text-white text-sm font-medium rounded-lg hover:bg-deep-blue-light transition-colors disabled:opacity-60"
                >
                  {loading ? "Tracking..." : "Track"}
                </button>
              </div>
            </div>
          </SectionReveal>

          {/* Error */}
          {error && (
            <SectionReveal delay={0.1}>
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">
                  {error}
                </p>
              </div>
            </SectionReveal>
          )}

          {/* Result */}
          {result && meta && (
            <SectionReveal delay={0.2}>
              {/* Tracking Number */}
              <div className="mb-8">
                <p className="text-sm text-gray-500 mb-1">
                  Tracking Number
                </p>

                <p className="font-mono text-xl font-bold text-deep-blue">
                  {result.referenceNumber}
                </p>

                {result.serviceType && (
                  <p className="mt-2 text-sm text-gray-600">
                    Service:{" "}
                    <span className="font-medium">
                      {result.serviceType}
                    </span>
                  </p>
                )}
              </div>

              {/* Current Status */}
              <div className="mb-8 p-5 rounded-lg border border-deep-blue/20 bg-blue-50">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-deep-blue text-white">
                    <meta.icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold text-deep-blue">
                      {meta.label}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {meta.desc}
                    </p>
                  </div>

                  <span className="px-3 py-1 bg-deep-blue text-white text-xs font-medium rounded-full">
                    Current
                  </span>
                </div>
              </div>

              {/* Application Timeline */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-7">
                  Application Progress
                </h2>

                <div className="space-y-0">
                  {customerStages.map(
                    (stage, index) => {
                      const completed =
                        currentIndex > index

                      const current =
                        currentIndex === index

                      return (
                        <div
                          key={stage.key}
                          className="relative flex gap-4"
                        >
                          {/* Vertical line */}
                          {index <
                            customerStages.length - 1 && (
                            <div
                              className={[
                                "absolute left-4 top-9 w-0.5 h-[calc(100%-1rem)]",
                                completed
                                  ? "bg-green-500"
                                  : "bg-gray-200",
                              ].join(" ")}
                            />
                          )}

                          {/* Circle */}
                          <div
                            className={[
                              "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                              completed
                                ? "bg-green-500 border-green-500 text-white"
                                : current
                                ? "bg-deep-blue border-deep-blue text-white"
                                : "bg-white border-gray-300 text-gray-400",
                            ].join(" ")}
                          >
                            {completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : current ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-white" />
                            ) : (
                              <span className="w-2 h-2 rounded-full bg-gray-300" />
                            )}
                          </div>

                          {/* Text */}
                          <div className="pb-8">
                            <p
                              className={[
                                "text-sm font-semibold",
                                completed || current
                                  ? "text-gray-900"
                                  : "text-gray-400",
                              ].join(" ")}
                            >
                              {stage.label}
                            </p>

                            <p
                              className={[
                                "mt-1 text-xs",
                                completed || current
                                  ? "text-gray-500"
                                  : "text-gray-400",
                              ].join(" ")}
                            >
                              {stage.desc}
                            </p>

                            {current && (
                              <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-blue-50 text-deep-blue text-xs font-medium">
                                Current status
                              </span>
                            )}
                          </div>
                        </div>
                      )
                    }
                  )}
                </div>
              </div>

              {/* Payment message */}
              {result.status ===
                "payment_required" && (
                <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex gap-3">
                    <CreditCard className="w-5 h-5 text-amber-600 shrink-0" />

                    <div>
                      <p className="font-semibold text-amber-900">
                        Payment Required
                      </p>

                      <p className="mt-1 text-sm leading-6 text-amber-800">
                        Your documents have been reviewed.
                        Please complete the required
                        payment before your translation can
                        proceed.
                      </p>

                      <p className="mt-2 text-sm text-amber-800">
                        KIPLAN Notary will provide the
                        applicable payment instructions.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment confirmed */}
              {result.status ===
                "payment_confirmed" && (
                <div className="mt-6 p-5 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />

                    <div>
                      <p className="font-semibold text-green-900">
                        Payment Confirmed
                      </p>

                      <p className="mt-1 text-sm leading-6 text-green-800">
                        Your payment has been confirmed.
                        Your application can now proceed to
                        processing.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Download */}
              {showDownload ? (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                      <Download className="w-5 h-5" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-green-900">
                        Certified Translation Ready
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-green-800">
                        Your certified translation files
                        are ready and available for secure
                        download.
                      </p>

                      {/* Load files */}
                      {downloads.length === 0 ? (
                        <button
                          type="button"
                          onClick={loadDownloads}
                          disabled={loadingDownloads}
                          className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-deep-blue text-white text-sm font-medium hover:bg-deep-blue-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          <Download className="w-4 h-4" />

                          {loadingDownloads
                            ? "Preparing Downloads..."
                            : "View Certified Translation Files"}
                        </button>
                      ) : (
                        <div className="mt-5 space-y-3">
                          <p className="text-sm font-medium text-green-900">
                            Available files:
                          </p>

                          {downloads.map(
                            (file, index) => (
                              <div
                                key={`${file.filename}-${index}`}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-white border border-green-200 rounded-lg"
                              >
                                <div className="min-w-0">
                                  <p className="text-sm font-medium text-gray-900 break-all">
                                    {file.filename}
                                  </p>

                                  {file.fileType && (
                                    <p className="mt-1 text-xs text-gray-500">
                                      {file.fileType}
                                    </p>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDownload(index)
                                  }
                                  disabled={
                                    downloadingIndex !== null
                                  }
                                  className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-deep-blue text-white text-sm font-medium hover:bg-deep-blue-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                  <Download className="w-4 h-4" />

                                  {downloadingIndex ===
                                  index
                                    ? "Opening..."
                                    : "Download"}
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}

                      <p className="mt-3 text-xs text-green-700">
                        Each download is provided through
                        a secure temporary link.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {/* Important notice */}
              {(result.status === "ready" ||
                result.status === "completed" ||
                result.status === "closed") && (
                <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm leading-6 text-amber-800">
                    <strong>Important:</strong> Please
                    review your certified translation
                    carefully after receiving it. If you
                    find any error, please inform KIPLAN Notary
                    within <strong>24 hours</strong> of
                    receiving the completed document. After
                    24 hours, the file will be considered
                    closed.
                  </p>
                </div>
              )}

              {/* General note */}
              {result.status !== "closed" &&
                result.status !== "cancelled" && (
                  <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> Status updates
                      reflect office action. If you have
                      questions about your request, please
                      contact KIPLAN Notary via WhatsApp at
                      +977-9849530970.
                    </p>
                  </div>
                )}
            </SectionReveal>
          )}

          {/* Empty state */}
          {!result && !error && (
            <SectionReveal
              delay={0.2}
              className="text-center py-12"
            >
              <p className="text-gray-500">
                Enter your tracking number above to track
                your application.
              </p>
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