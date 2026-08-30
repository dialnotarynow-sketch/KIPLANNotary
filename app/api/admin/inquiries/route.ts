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
    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const service = searchParams.get('service')
    const search = searchParams.get('search')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    const supabase = createAdminClient()
    let query = supabase
      .from('inquiries')
      .select('*, customers(*)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) query = query.eq('status', status)
    if (priority) query = query.eq('priority', priority)
    if (service) query = query.eq('service_type', service)
    if (search) {
      query = query.or(`reference_number.ilike.%${search}%,customer_name.ilike.%${search}%,customer_phone.ilike.%${search}%,customer_email.ilike.%${search}%`)
    }

    const { data, error, count } = await query
    if (error) throw error

    return NextResponse.json({ data, count })
  } catch (error) {
    console.error('Admin inquiries error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await getAdminUser()
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, status, priority, assigned_to, summary } = body

    if (!id) {
      return NextResponse.json({ error: 'Inquiry ID required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Get current status for history
    const { data: current } = await supabase.from('inquiries').select('status').eq('id', id).single()

    const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() }
    if (status) updateData.status = status
    if (priority) updateData.priority = priority
    if (assigned_to !== undefined) updateData.assigned_to = assigned_to
    if (summary !== undefined) updateData.summary = summary

    const { data, error } = await supabase.from('inquiries').update(updateData).eq('id', id).select()
    if (error) throw error

    // Record status history
    if (status && current && current.status !== status) {
      await supabase.from('status_history').insert({
        inquiry_id: id,
        from_status: current.status,
        to_status: status,
        changed_by: admin.id,
        reason: body.reason || 'Status updated via admin',
      })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Admin inquiry update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
