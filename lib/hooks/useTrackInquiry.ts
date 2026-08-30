'use client'

import { useState } from 'react'

interface TrackResult {
  referenceNumber: string
  status: string
  serviceType?: string
  priority: string
  createdAt: string
  updatedAt: string
}

export function useTrackInquiry() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<TrackResult | null>(null)
  const [error, setError] = useState('')

  async function track(referenceNumber: string) {
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`/api/track?ref=${encodeURIComponent(referenceNumber)}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Tracking failed')
      setResult(json)
    } catch (e: any) {
      setError(e.message || 'Inquiry not found')
    } finally {
      setLoading(false)
    }
  }

  return { track, loading, result, error }
}
