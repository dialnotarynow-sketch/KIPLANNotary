'use client'

import { useState } from 'react'

export function useTranslationSubmit() {
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; referenceNumber?: string; inquiryId?: string; message?: string; error?: string } | null>(null)

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
      const successResult = { success: true as const, referenceNumber: json.referenceNumber, inquiryId: json.inquiryId, message: json.message }
      setResult(successResult)
      return successResult
    } catch (e: any) {
      const failureResult = { success: false as const, error: e.message || 'Something went wrong' }
      setResult(failureResult)
      return failureResult
    } finally {
      setSubmitting(false)
    }
  }

  return { submit, submitting, result }
}