import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const ref = searchParams.get('ref')

    if (!ref) {
      return NextResponse.json({ error: 'Reference number required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('inquiries')
      .select('reference_number, status, service_type, priority, created_at, updated_at, customer_name')
      .eq('reference_number', ref)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Inquiry not found' }, { status: 404 })
    }

    // Return only customer-facing fields
    return NextResponse.json({
      referenceNumber: data.reference_number,
      status: data.status,
      serviceType: data.service_type,
      priority: data.priority,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
