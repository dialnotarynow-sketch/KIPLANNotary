import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/admin/auth'

const VALID_STATUSES = [
  'new',
  'under_review',
  'awaiting_customer',
  'document_requested',
  'documents_received',
  'in_progress',
  'completed',
  'on_hold',
  'cancelled',
  'closed',
] as const

const VALID_PRIORITIES = [
  'low',
  'normal',
  'high',
  'urgent',
] as const

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)

    const status = searchParams.get('status')
    const priority = searchParams.get('priority')
    const service = searchParams.get('service')
    const search = searchParams.get('search')

    const requestedLimit = Number.parseInt(
      searchParams.get('limit') || '50',
      10
    )

    const requestedOffset = Number.parseInt(
      searchParams.get('offset') || '0',
      10
    )

    const limit = Math.min(
      Math.max(Number.isNaN(requestedLimit) ? 50 : requestedLimit, 1),
      100
    )

    const offset = Math.max(
      Number.isNaN(requestedOffset) ? 0 : requestedOffset,
      0
    )

    const supabase = createAdminClient()

    let query = supabase
      .from('inquiries')
      .select('*, customers(*)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    if (priority) {
      query = query.eq('priority', priority)
    }

    if (service) {
      query = query.eq('service_type', service)
    }

    if (search?.trim()) {
      const cleanSearch = search.trim()

      query = query.or(
        `reference_number.ilike.%${cleanSearch}%,customer_name.ilike.%${cleanSearch}%,customer_phone.ilike.%${cleanSearch}%,customer_email.ilike.%${cleanSearch}%`
      )
    }

    const { data, error, count } = await query

    if (error) {
      console.error('[ADMIN-INQUIRIES] GET Supabase error:', error)
      throw error
    }

    return NextResponse.json({
  data,
})
  } catch (error: any) {
    console.error('[ADMIN-INQUIRIES] GET error:', error)

    return NextResponse.json(
      {
        error: error?.message || 'Internal server error',
        details: error?.details || null,
        hint: error?.hint || null,
        code: error?.code || null,
      },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()

    const {
      id,
      status,
      priority,
      assigned_to,
      summary,
      reason,
    } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Inquiry ID required' },
        { status: 400 }
      )
    }

    if (
      status &&
      !VALID_STATUSES.includes(
        status as (typeof VALID_STATUSES)[number]
      )
    ) {
      return NextResponse.json(
        { error: `Invalid inquiry status: ${status}` },
        { status: 400 }
      )
    }

    if (
      priority &&
      !VALID_PRIORITIES.includes(
        priority as (typeof VALID_PRIORITIES)[number]
      )
    ) {
      return NextResponse.json(
        { error: `Invalid inquiry priority: ${priority}` },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Get the current inquiry before making changes.
    const { data: current, error: currentError } = await supabase
      .from('inquiries')
      .select(
        'id, status, reference_number, service_type'
      )
      .eq('id', id)
      .single()

    if (currentError) {
      console.error(
        '[ADMIN-INQUIRIES] Current inquiry error:',
        currentError
      )

      if (currentError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Inquiry not found' },
          { status: 404 }
        )
      }

      throw currentError
    }

    const updateData: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    }

    if (status !== undefined) {
      updateData.status = status
    }

    if (priority !== undefined) {
      updateData.priority = priority
    }

    if (assigned_to !== undefined) {
      updateData.assigned_to = assigned_to
    }

    if (summary !== undefined) {
      updateData.summary = summary
    }

    const { data, error } = await supabase
      .from('inquiries')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error(
        '[ADMIN-INQUIRIES] Inquiry update error:',
        error
      )
      throw error
    }

    // Record status history only when the status actually changes.
    if (status && current.status !== status) {
      const { error: historyError } = await supabase
        .from('status_history')
        .insert({
          inquiry_id: id,
          from_status: current.status,
          to_status: status,
          changed_by: admin.admin.id,
          reason: reason || 'Status updated via admin',
        })

      if (historyError) {
        console.error(
          '[ADMIN-INQUIRIES] Status history error:',
          historyError
        )
        throw historyError
      }
    }

        return NextResponse.json({
  data,
})
  } catch (error: any) {
    console.error('[ADMIN-INQUIRIES] PATCH error:', error)

    return NextResponse.json(
      {
        error: error?.message || 'Internal server error',
        details: error?.details || null,
        hint: error?.hint || null,
        code: error?.code || null,
      },
      { status: 500 }
    )
  }
}