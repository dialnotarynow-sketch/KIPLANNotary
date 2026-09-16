import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/admin/auth'

export async function GET(req: NextRequest) {
  console.log('[MESSAGES-DEBUG] GET /api/admin/messages received')
  try {
    const admin = await getAdminUser()
    console.log('[MESSAGES-DEBUG] getAdminUser() resolved, hasAdmin:', !!admin)
    if (!admin) {
      console.log('[MESSAGES-DEBUG] returning 401 Unauthorized')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const limit = parseInt(searchParams.get('limit') || '50')
    console.log('[MESSAGES-DEBUG] params:', { status, limit })

    const supabase = createAdminClient()
    let query = supabase
      .from('conversations')
      .select('*, inquiries(*)')
      .eq('handoff_triggered', true)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (status) query = query.eq('status', status)

    console.log('[MESSAGES-DEBUG] about to run query')
    const { data, error } = await query
    console.log('[MESSAGES-DEBUG] query resolved. error:', error, 'row count:', data?.length)

    if (error) throw error
    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('[MESSAGES-DEBUG] Admin messages GET error — full object:', error)
    console.error('[MESSAGES-DEBUG] code:', error?.code)
    console.error('[MESSAGES-DEBUG] message:', error?.message)
    console.error('[MESSAGES-DEBUG] details:', error?.details)
    console.error('[MESSAGES-DEBUG] hint:', error?.hint)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}