import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function getAdminUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const adminSupabase = createAdminClient()
  const { data: admin } = await adminSupabase
    .from('admins')
    .select('*')
    .eq('email', user.email)
    .eq('is_active', true)
    .single()

  return admin ? { ...user, admin } : null
}

export async function requireAdmin() {
  const adminUser = await getAdminUser()
  if (!adminUser) {
    redirect('/admin/login')
  }
  return adminUser
}

export async function requireAdminRole(roles: string[]) {
  const adminUser = await requireAdmin()
  if (!roles.includes(adminUser.admin.role)) {
    redirect('/admin/dashboard')
  }
  return adminUser
}
