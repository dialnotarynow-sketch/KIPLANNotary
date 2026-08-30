import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/admin/auth'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const inquiryId = searchParams.get('inquiry_id')
    const orderId = searchParams.get('order_id')

    if (!inquiryId && !orderId) {
      return NextResponse.json({ error: 'inquiry_id or order_id required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    let query = supabase
      .from('status_history')
      .select('*, admins(full_name, email)')
      .order('created_at', { ascending: true })

    if (inquiryId) query = query.eq('inquiry_id', inquiryId)
    if (orderId) query = query.eq('order_id', orderId)

    const { data, error } = await query
    if (error) throw error
    return NextResponse.json({ data })
  } catch (error) {
    console.error('Status history error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
