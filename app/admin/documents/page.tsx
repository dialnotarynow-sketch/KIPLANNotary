'use client'

import { useEffect, useState } from 'react'
import type { Document } from '@/types'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/documents')
      .then(async r => {
        if (!r.ok) throw new Error('Failed to load documents')
        return r.json()
      })
      .then(data => {
        setDocuments(data.data || [])
        setLoading(false)
      })
      .catch(e => {
        setError(e.message)
        setLoading(false)
      })
  }, [])

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

  if (loading) return <div className="text-gray-500 p-6">Loading documents...</div>
  if (error) return <div className="text-red-500 p-6">{error}</div>

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
      <p className="text-gray-600 text-sm">All documents are stored securely. Access requires authentication.</p>

      {documents.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          No documents uploaded yet. Upload documents from inquiry detail pages.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Filename</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {doc.original_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{doc.file_type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {(doc.file_size / 1024 / 1024).toFixed(2)} MB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(doc.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => downloadDocument(doc.id)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
