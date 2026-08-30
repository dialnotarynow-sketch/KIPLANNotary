'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AdminHeaderProps {
  admin: {
    full_name?: string
    email: string
    role: string
  }
}

export function AdminHeader({ admin }: AdminHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">Welcome back</p>
        <p className="font-semibold text-gray-900">{admin.full_name || admin.email}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full uppercase">
          {admin.role}
        </span>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
