'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { Inquiry, AdminNote, StatusHistoryEntry, Document } from '@/types'

export default function InquiryDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [inquiry, setInquiry] = useState<Inquiry | null>(null)
  const [notes, setNotes] = useState<AdminNote[]>([])
  const [statusHistory, setStatusHistory] = useState<StatusHistoryEntry[]>([])
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [newNote, setNewNote] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [statusReason, setStatusReason] = useState('')
  const [updatingStatus, setUpdatingStatus] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!id) return
    loadInquiry()
  }, [id])

  async function loadInquiry() {
    setLoading(true)
    setError('')
    try {
      const [inquiryRes, notesRes, historyRes, docsRes] = await Promise.all([
        fetch(`/api/admin/inquiries/detail?id=${id}`),
        fetch(`/api/admin/notes?inquiry_id=${id}`),
        fetch(`/api/admin/status-history?inquiry_id=${id}`),
        fetch(`/api/admin/documents?inquiry_id=${id}`),
      ])

      if (!inquiryRes.ok) throw new Error('Failed to load inquiry')

      const inquiryData = await inquiryRes.json()
      setInquiry(inquiryData.data)
      setNewStatus(inquiryData.data?.status || '')

      if (notesRes.ok) {
        const notesData = await notesRes.json()
        setNotes(notesData.data || [])
      }

      if (historyRes.ok) {
        const historyData = await historyRes.json()
        setStatusHistory(historyData.data || [])
      }

      if (docsRes.ok) {
        const docsData = await docsRes.json()
        setDocuments(docsData.data || [])
      }
    } catch (e: any) {
      setError(e.message || 'Failed to load inquiry')
    } finally {
      setLoading(false)
    }
  }

  async function saveNote() {
    if (!newNote.trim() || !id) return
    setSavingNote(true)
    try {
      const res = await fetch('/api/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inquiry_id: id, note: newNote.trim() }),
      })
      if (!res.ok) throw new Error('Failed to save note')
      const data = await res.json()
      setNotes(prev => [data.data, ...prev])
      setNewNote('')
    } catch (e: any) {
      alert(e.message || 'Failed to save note')
    } finally {
      setSavingNote(false)
    }
  }

  async function updateStatus() {
    if (!newStatus || !id || newStatus === inquiry?.status) return
    setUpdatingStatus(true)
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          id, 
          status: newStatus, 
          reason: statusReason || 'Status updated from detail page' 
        }),
      })
      if (!res.ok) throw new Error('Failed to update status')

      setInquiry(prev => prev ? { ...prev, status: newStatus as Inquiry['status'] } : null)

      // Refresh status history
      const historyRes = await fetch(`/api/admin/status-history?inquiry_id=${id}`)
      if (historyRes.ok) {
        const historyData = await historyRes.json()
        setStatusHistory(historyData.data || [])
      }
      setStatusReason('')
    } catch (e: any) {
      alert(e.message || 'Failed to update status')
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function createOrder() {
  if (!id || !inquiry) return
  setUpdatingStatus(true)

  try {
    const res = await fetch('/api/admin/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inquiry_id: id,
        reference_number: inquiry.reference_number,
        service_type: inquiry.service_type,
        status: 'pending',
        payment_status: 'pending',
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Failed to create order')
    }

    if (data.existing) {
      alert('An order already exists for this inquiry.')
    } else {
      alert('Order created successfully.')
    }
  } catch (e: any) {
    alert(e.message || 'Failed to create order')
  } finally {
    setUpdatingStatus(false)
  }
    if (!id || !inquiry) return
    setUpdatingStatus(true)

    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status: 'in_progress',
          reason: 'Order created from inquiry detail page',
        }),
      })

      if (!res.ok) {
        throw new Error('Failed to create order')
      }

      setInquiry(prev =>
        prev ? { ...prev, status: 'in_progress' as Inquiry['status'] } : null
      )
      setNewStatus('in_progress')

      const historyRes = await fetch(
        `/api/admin/status-history?inquiry_id=${id}`
      )

      if (historyRes.ok) {
        const historyData = await historyRes.json()
        setStatusHistory(historyData.data || [])
      }

      alert('Order created successfully.')
    } catch (e: any) {
      alert(e.message || 'Failed to create order')
    } finally {
      setUpdatingStatus(false)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0]
  if (!file || !id) return

  setUploading(true)
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('inquiry_id', id)
    formData.append('document_role', 'client_document')

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) throw new Error('Upload failed')

    const data = await res.json()
    setDocuments(prev => [data.document, ...prev])
  } catch (e: any) {
    alert(e.message || 'Upload failed')
  } finally {
    setUploading(false)
    e.target.value = ''
  }
}

async function handleCertifiedTranslationUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0]
  if (!file || !id) return

  setUploading(true)
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('inquiry_id', id)
    formData.append('document_role', 'certified_translation')

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const data = await res.json().catch(() => null)
      throw new Error(data?.error || 'Upload failed')
    }

    const data = await res.json()
    setDocuments(prev => [data.document, ...prev])
  } catch (e: any) {
    alert(e.message || 'Upload failed')
  } finally {
    setUploading(false)
    e.target.value = ''
  }
}

  async function downloadDocument(docId: string) {
    try {
      const res = await fetch(`/api/admin/documents/signed-url?id=${docId}`)
      if (!res.ok) throw new Error('Failed to get download link')
      const data = await res.json()
      if (data.url) window.open(data.url, '_blank')
    } catch (e: any) {
      alert(e.message || 'Failed to download')
    }
  }

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-800',
    under_review: 'bg-yellow-100 text-yellow-800',
    awaiting_customer: 'bg-orange-100 text-orange-800',
    document_requested: 'bg-purple-100 text-purple-800',
    documents_received: 'bg-indigo-100 text-indigo-800',
    in_progress: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    on_hold: 'bg-pink-100 text-pink-800',
    cancelled: 'bg-red-100 text-red-800',
    closed: 'bg-gray-100 text-gray-800',
  }

  if (loading) return <div className="text-gray-500 p-6">Loading inquiry...</div>
  if (error) return <div className="text-red-500 p-6">{error}</div>
  if (!inquiry) return <div className="text-red-500 p-6">Inquiry not found</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{inquiry.reference_number}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {inquiry.service_type || 'General Enquiry'} • Created {new Date(inquiry.created_at).toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={createOrder}
            disabled={updatingStatus || inquiry.status === 'in_progress'}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 disabled:opacity-50"
          >
            {updatingStatus ? 'Creating...' : 'Create Order'}
          </button>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="new">New</option>
            <option value="under_review">Under Review</option>
            <option value="awaiting_customer">Awaiting Customer</option>
            <option value="document_requested">Document Requested</option>
            <option value="documents_received">Documents Received</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
            <option value="closed">Closed</option>
          </select>
          <input
            type="text"
            placeholder="Reason for change..."
            value={statusReason}
            onChange={(e) => setStatusReason(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm w-48"
          />
          <button
            onClick={updateStatus}
            disabled={updatingStatus || newStatus === inquiry.status}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
          >
            {updatingStatus ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overview */}
        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Overview</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Customer:</span> <span className="font-medium">{inquiry.customer_name || 'N/A'}</span></div>
            <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{inquiry.customer_phone || 'N/A'}</span></div>
            <div><span className="text-gray-500">Email:</span> <span className="font-medium">{inquiry.customer_email || 'N/A'}</span></div>
            <div><span className="text-gray-500">Service:</span> <span className="font-medium">{inquiry.service_type}</span></div>
            <div><span className="text-gray-500">Source:</span> <span className="font-medium capitalize">{inquiry.source.replace('_', ' ')}</span></div>
            <div><span className="text-gray-500">Priority:</span> 
              <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${inquiry.priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                {inquiry.priority}
              </span>
            </div>
            <div><span className="text-gray-500">Status:</span>
              <span className={`ml-1 px-2 py-0.5 text-xs rounded-full ${statusColors[inquiry.status] || 'bg-gray-100'}`}>
                {inquiry.status.replace('_', ' ')}
              </span>
            </div>
            <div><span className="text-gray-500">Updated:</span> <span className="font-medium">{new Date(inquiry.updated_at).toLocaleString()}</span></div>
          </div>

          {inquiry.summary && (
            <div className="pt-4 border-t">
              <span className="text-gray-500 text-sm">Summary:</span>
              <p className="mt-1 text-sm text-gray-800">{inquiry.summary}</p>
            </div>
          )}

          {inquiry.escalation_reason && (
            <div className="pt-4 border-t">
              <span className="text-gray-500 text-sm">Escalation Reason:</span>
              <p className="mt-1 text-sm text-red-600 font-medium">{inquiry.escalation_reason}</p>
            </div>
          )}
        </div>

        {/* Conversation */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Conversation</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {inquiry.conversation_transcript && inquiry.conversation_transcript.length > 0 ? (
              inquiry.conversation_transcript.map((msg, idx) => (
                <div key={idx} className={`p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-50 ml-4' : 'bg-gray-50 mr-4'}`}>
                  <span className="text-xs font-medium text-gray-500 uppercase">{msg.role}</span>
                  <p className="mt-1 text-gray-800">{msg.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No transcript available</p>
            )}
          </div>
        </div>
      </div>

      {/* Status History */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Status History</h2>
        {statusHistory.length === 0 ? (
          <p className="text-gray-500 text-sm">No status changes recorded yet.</p>
        ) : (
          <div className="space-y-3">
            {statusHistory.map((entry) => (
              <div key={entry.id} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
                <div>
                  <span className="text-gray-500">{new Date(entry.created_at).toLocaleString()}</span>
                  <p className="text-gray-800">
                    Changed from <span className="font-medium">{entry.from_status?.replace('_', ' ') || '—'}</span>
                    {' '}to <span className="font-medium">{entry.to_status.replace('_', ' ')}</span>
                    {entry.reason && <span className="text-gray-500"> — {entry.reason}</span>}
                  </p>
                  {entry.admins && (
                    <p className="text-xs text-gray-500">by {entry.admins.full_name || entry.admins.email}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

           {/* Documents */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="border-b pb-3 mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
          <p className="text-sm text-gray-500 mt-1">
            Applicant-submitted documents and KIPLAN Admin documents are shown separately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Applicant Uploads */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  Applicant Uploads
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Documents received from the applicant
                </p>
              </div>

              <label className="cursor-pointer px-3 py-2 bg-gray-800 text-white rounded-md text-xs hover:bg-gray-900">
                {uploading ? 'Uploading...' : 'Upload Document'}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={uploading}
                />
              </label>
            </div>

            <div className="p-4">
              {documents.filter(
                doc => doc.document_role === 'client_document'
              ).length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">
                  No applicant documents uploaded yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {documents
                    .filter(doc => doc.document_role === 'client_document')
                    .map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm truncate">
                            {doc.original_name}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                            {' • '}
                            {doc.file_type}
                          </p>
                        </div>

                        <button
                          onClick={() => downloadDocument(doc.id)}
                          className="shrink-0 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* KIPLAN Admin Uploads */}
          <div className="border border-green-200 rounded-lg overflow-hidden">
            <div className="bg-green-50 px-4 py-3 border-b border-green-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  KIPLAN Admin Uploads
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Documents prepared by KIPLAN Notary
                </p>
              </div>

              <label className="cursor-pointer px-3 py-2 bg-green-600 text-white rounded-md text-xs hover:bg-green-700">
                {uploading ? 'Uploading...' : 'Upload Certified Translation'}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleCertifiedTranslationUpload}
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={uploading}
                />
              </label>
            </div>

            <div className="p-4">
              {documents.filter(
                doc => doc.document_role === 'certified_translation'
              ).length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-6">
                  No KIPLAN Admin documents uploaded yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {documents
                    .filter(
                      doc => doc.document_role === 'certified_translation'
                    )
                    .map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between gap-3 p-3 bg-green-50 rounded-lg border border-green-100"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-gray-800 text-sm truncate">
                            {doc.original_name}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                            {' • '}
                            {doc.file_type}
                          </p>
                        </div>

                        <button
                          onClick={() => downloadDocument(doc.id)}
                          className="shrink-0 px-3 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Admin Notes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Admin Notes (Private)</h2>

        <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm">No notes yet.</p>
          ) : (
            notes.map((note) => (
              <div key={note.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-sm text-gray-800">{note.note}</p>
                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>{note.admins?.full_name || note.admins?.email || 'Unknown'}</span>
                  <span>•</span>
                  <span>{new Date(note.created_at).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-2">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a private note..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm h-20 resize-none"
          />
          <button
            onClick={saveNote}
            disabled={savingNote || !newNote.trim()}
            className="px-4 py-2 bg-gray-800 text-white rounded-md text-sm hover:bg-gray-900 disabled:opacity-50 self-end"
          >
            {savingNote ? 'Saving...' : 'Save Note'}
          </button>
        </div>
      </div>
    </div>
  )
}