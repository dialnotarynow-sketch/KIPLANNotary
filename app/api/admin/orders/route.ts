import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { getAdminUser } from '@/lib/admin/auth'

export async function GET(req: NextRequest) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('[ORDERS-DEBUG] GET Supabase error:', error)

      return NextResponse.json(
        {
          error: error.message,
          details: error.details || null,
          hint: error.hint || null,
          code: error.code || null,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: data || [] })
  } catch (error: any) {
    console.error('[ORDERS-DEBUG] GET error:', error)

    return NextResponse.json(
      {
        error: error?.message || 'Internal server error',
        details: error?.details || null,
        hint: error?.hint || null,
      },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAdminUser()

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const inquiryId = body?.inquiry_id

    if (!inquiryId) {
      return NextResponse.json(
        { error: 'inquiry_id is required' },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()

    // Verify the inquiry exists
    const { data: inquiry, error: inquiryError } = await supabase
      .from('inquiries')
      .select('id, reference_number, service_type')
      .eq('id', inquiryId)
      .single()

    if (inquiryError || !inquiry) {
      console.error(
        '[ORDERS-DEBUG] Inquiry lookup error:',
        inquiryError
      )

      return NextResponse.json(
        {
          error: 'Inquiry not found',
          details: inquiryError?.details || null,
          hint: inquiryError?.hint || null,
          code: inquiryError?.code || null,
        },
        { status: 404 }
      )
    }

    // Prevent duplicate orders for the same inquiry
    const { data: existingOrder, error: existingOrderError } =
      await supabase
        .from('orders')
        .select('*')
        .eq('inquiry_id', inquiryId)
        .maybeSingle()

    if (existingOrderError) {
      console.error(
        '[ORDERS-DEBUG] Existing order lookup error:',
        existingOrderError
      )

      return NextResponse.json(
        {
          error: existingOrderError.message,
          details: existingOrderError.details || null,
          hint: existingOrderError.hint || null,
          code: existingOrderError.code || null,
        },
        { status: 500 }
      )
    }

    if (existingOrder) {
      return NextResponse.json({
        data: existingOrder,
        existing: true,
      })
    }

    // Create the order
    const { data, error } = await supabase
      .from('orders')
      .insert({
        inquiry_id: inquiry.id,
        reference_number: inquiry.reference_number,
        service_type: inquiry.service_type,
        status: 'pending',
        payment_status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('[ORDERS-DEBUG] POST Supabase error:', error)

      return NextResponse.json(
        {
          error: error.message,
          details: error.details || null,
          hint: error.hint || null,
          code: error.code || null,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data,
      existing: false,
    })
  } catch (error: any) {
    console.error('[ORDERS-DEBUG] POST error:', error)

    return NextResponse.json(
      {
        error: error?.message || 'Internal server error',
        details: error?.details || null,
        hint: error?.hint || null,
      },
      { status: 500 }
    )
  }
}