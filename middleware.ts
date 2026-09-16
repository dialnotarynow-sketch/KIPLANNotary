import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect all admin routes (pages and APIs)
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Normalize trailing slashes so "/admin/login/" behaves the same as "/admin/login"
    const normalizedPath = request.nextUrl.pathname.replace(/\/+$/, '') || '/'

    // Public admin routes: these must remain reachable without a session,
    // including mid-recovery (a recovery link establishes its own temporary session).
    const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/reset-password']
    if (PUBLIC_ADMIN_PATHS.includes(normalizedPath)) {
      return supabaseResponse
    }

    // Redirect unauthenticated users to login
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }
  }

  // Protect admin API routes
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}