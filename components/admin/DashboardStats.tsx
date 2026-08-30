'use client'

import { useEffect, useState } from 'react'

interface Stats {
  newEnquiries: number
  pendingReview: number
  activeCases: number
  urgentRequests: number
  unreadHandoffs: number
  completedToday: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    newEnquiries: 0,
    pendingReview: 0,
    activeCases: 0,
    urgentRequests: 0,
    unreadHandoffs: 0,
    completedToday: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/inquiries?limit=200')
      .then(r => r.json())
      .then(data => {
        const inquiries = data.data || []
        setStats({
          newEnquiries: inquiries.filter((i: any) => i.status === 'new').length,
          pendingReview: inquiries.filter((i: any) => i.status === 'under_review').length,
          activeCases: inquiries.filter((i: any) => ['in_progress','documents_received'].includes(i.status)).length,
          urgentRequests: inquiries.filter((i: any) => i.priority === 'urgent').length,
          unreadHandoffs: 0,
          completedToday: 0,
        })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'New Enquiries', value: stats.newEnquiries, color: 'bg-blue-500' },
    { label: 'Pending Review', value: stats.pendingReview, color: 'bg-yellow-500' },
    { label: 'Active Cases', value: stats.activeCases, color: 'bg-green-500' },
    { label: 'Urgent', value: stats.urgentRequests, color: 'bg-red-500' },
    { label: 'Unread Handoffs', value: stats.unreadHandoffs, color: 'bg-purple-500' },
    { label: 'Completed Today', value: stats.completedToday, color: 'bg-gray-500' },
  ]

  if (loading) return <div className="text-gray-500">Loading stats...</div>

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white rounded-lg shadow p-4">
          <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center text-white text-lg mb-3`}>
            {card.value}
          </div>
          <p className="text-sm text-gray-600">{card.label}</p>
        </div>
      ))}
    </div>
  )
}
