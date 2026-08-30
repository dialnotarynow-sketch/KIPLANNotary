'use client'

import { useState } from 'react'

export function useTranslationSubmit() {
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; referenceNumber?: string; message?: string; error?: string } | null>(null)

  async function submit(data: {
    name: string
    email?: string
    phone: string
    fromLanguage: string
    toLanguage: string
    documentType?: string
    pages?: string
    urgency?: string
    notes?: string
  }) {
    setSubmitting(true)
    setResult(null)
    try {
      const res = await fetch('/api/translation-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Submission failed')
      setResult({ success: true, referenceNumber: json.referenceNumber, message: json.message })
    } catch (e: any) {
      setResult({ success: false, error: e.message || 'Something went wrong' })
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, result }
}
