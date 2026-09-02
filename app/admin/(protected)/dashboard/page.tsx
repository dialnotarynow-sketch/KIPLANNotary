import { DashboardStats } from '@/components/admin/DashboardStats'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/inquiries" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              View New Inquiries →
            </Link>
            <Link href="/admin/messages" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              View Chatbot Handoffs →
            </Link>
            <Link href="/admin/settings" className="block p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              Update Business Settings →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Operational Notes</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>• New enquiries appear automatically from chatbot, contact form, and translation form.</p>
            <p>• Chatbot handoffs preserve full conversation context.</p>
            <p>• Documents are stored securely in private Supabase Storage.</p>
            <p>• Status changes are recorded in the audit trail.</p>
            <p>• Admin notes are private and never visible to applicants.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
