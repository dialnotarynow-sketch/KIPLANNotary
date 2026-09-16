import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'

export async function getAdminUser() {
  console.log('[HANG-DEBUG]', Date.now(), 'getAdminUser: start')

  const supabase = await createClient()

  console.log(
    '[HANG-DEBUG]',
    Date.now(),
    'getAdminUser: createClient() resolved'
  )

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  console.log(
    '[HANG-DEBUG]',
    Date.now(),
    'getAdminUser: auth.getUser() resolved',
    {
      hasUser: !!user,
      userEmail: user?.email ?? null,
      userError: userError
        ? {
            message: userError.message,
            code: userError.code,
          }
        : null,
    }
  )

  if (!user) {
    console.log(
      '[HANG-DEBUG]',
      Date.now(),
      'getAdminUser: no user, returning null'
    )

    return null
  }

  const adminSupabase = createAdminClient()

  console.log(
    '[HANG-DEBUG]',
    Date.now(),
    'getAdminUser: createAdminClient() resolved'
  )

  const {
    data: admin,
    error: adminError,
  } = await adminSupabase
    .from('admins')
    .select('*')
    .eq('email', user.email)
    .eq('is_active', true)
    .single()

  console.log(
    '[ADMIN-DEBUG]',
    Date.now(),
    'admins query result',
    {
      userEmail: user.email,
      hasAdmin: !!admin,
      adminError: adminError
        ? {
            message: adminError.message,
            code: adminError.code,
            details: adminError.details,
            hint: adminError.hint,
          }
        : null,
    }
  )

  if (adminError) {
    console.error(
      '[ADMIN-DEBUG]',
      'Admin lookup failed:',
      adminError
    )
  }

  return admin ? { ...user, admin } : null
}

export async function requireAdmin() {
  console.log(
    '[HANG-DEBUG]',
    Date.now(),
    'requireAdmin: start'
  )

  const adminUser = await getAdminUser()

  console.log(
    '[HANG-DEBUG]',
    Date.now(),
    'requireAdmin: getAdminUser() resolved',
    {
      hasAdminUser: !!adminUser,
    }
  )

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