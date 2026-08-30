'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import type { Customer, Inquiry } from '@/types'

export default function CustomerDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [customer, setCustomer] = useState<Customer | null>(null)
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return

    Promise.all([
      fetch(`/api/admin/customers`).then(r => r.json()),
      fetch(`/api/admin/inquiries?limit=200`).then(r => r.json()),
    ])
      .then(([customersData, inquiriesData]) => {
        const found = (customersData.data || []).find((c: Customer) => c.id === id)
        setCustomer(found || null)
        setInquiries((inquiriesData.data || []).filter((i: Inquiry) => i.customer_id === id))
        setLoading(false)
      })
      .catch(e => {
        setError(e.message)
        setLoading(false)
      })
  }, [id])

  if (loading) return <div className="text-gray-500 p-6">Loading customer...</div>
  if (error) return <div className="text-red-500 p-6">{error}</div>
  if (!customer) return <div className="text-red-500 p-6">Customer not found</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{customer.full_name || 'Unnamed Customer'}</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Customer Information</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{customer.phone || 'N/A'}</span></div>
          <div><span className="text-gray-500">Email:</span> <span className="font-medium">{customer.email || 'N/A'}</span></div>
          <div><span className="text-gray-500">District:</span> <span className="font-medium">{customer.district || 'N/A'}</span></div>
          <div><span className="text-gray-500">Municipality:</span> <span className="font-medium">{customer.municipality || 'N/A'}</span></div>
          <div><span className="text-gray-500">Ward:</span> <span className="font-medium">{customer.ward || 'N/A'}</span></div>
          <div><span className="text-gray-500">Language:</span> <span className="font-medium uppercase">{customer.preferred_language || 'en'}</span></div>
          <div><span className="text-gray-500">Type:</span> <span className="font-medium capitalize">{customer.customer_type}</span></div>
          <div><span className="text-gray-500">Since:</span> <span className="font-medium">{new Date(customer.created_at).toLocaleDateString()}</span></div>
        </div>
        {customer.notes && (
          <div className="mt-4 pt-4 border-t">
            <span className="text-gray-500 text-sm">Notes:</span>
            <p className="mt-1 text-sm">{customer.notes}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold border-b pb-2 mb-4">Inquiry History ({inquiries.length})</h2>
        {inquiries.length === 0 ? (
          <p className="text-gray-500 text-sm">No inquiries from this customer.</p>
        ) : (
          <div className="space-y-2">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <span className="font-medium text-blue-600 text-sm">{inquiry.reference_number}</span>
                  <span className="text-gray-500 text-sm ml-2">{inquiry.service_type}</span>
                  <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${inquiry.status === 'new' ? 'bg-blue-100 text-blue-800' : inquiry.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {inquiry.status.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{new Date(inquiry.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
