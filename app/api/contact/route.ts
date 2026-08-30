import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateReferenceNumber } from '@/lib/reference'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, subject, message } = body

    if (!name || !message) {
      return NextResponse.json({ error: 'Name and message are required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    let customerId: string | null = null
    if (phone || email) {
      const { data: existing } = await supabase
        .from('customers')
        .select('id')
        .or(`phone.eq.${phone || 'no-phone'},email.eq.${email || 'no-email'}`)
        .maybeSingle()

      if (existing) {
        customerId = existing.id
      } else {
        const { data: newCustomer } = await supabase.from('customers').insert({
          full_name: name,
          phone: phone || null,
          email: email || null,
        }).select('id').single()
        if (newCustomer) customerId = newCustomer.id
      }
    }

    const referenceNumber = await generateReferenceNumber()

    const { data: inquiry, error } = await supabase.from('inquiries').insert({
      reference_number: referenceNumber,
      customer_id: customerId,
      service_type: 'General Enquiry',
      source: 'contact_form',
      status: 'new',
      priority: 'normal',
      summary: subject || message.substring(0, 200),
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
    }).select('id, reference_number').single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      referenceNumber: inquiry?.reference_number,
      message: 'Thank you for contacting KIPLAN. We will respond shortly.',
    })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 })
  }
}
