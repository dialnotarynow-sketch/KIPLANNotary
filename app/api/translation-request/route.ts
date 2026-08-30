import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { generateReferenceNumber } from '@/lib/reference'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, fromLanguage, toLanguage, documentType, pages, urgency, notes } = body

    // Validation
    if (!name || !phone || !fromLanguage || !toLanguage) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Create/update customer
    let customerId: string | null = null
    const { data: existing } = await supabase
      .from('customers')
      .select('id')
      .or(`phone.eq.${phone},email.eq.${email || 'no-email'}`)
      .maybeSingle()

    if (existing) {
      customerId = existing.id
    } else {
      const { data: newCustomer } = await supabase.from('customers').insert({
        full_name: name,
        phone,
        email: email || null,
      }).select('id').single()
      if (newCustomer) customerId = newCustomer.id
    }

    const referenceNumber = await generateReferenceNumber()

    const { data: inquiry, error } = await supabase.from('inquiries').insert({
      reference_number: referenceNumber,
      customer_id: customerId,
      service_type: 'Translation',
      source: 'translation_form',
      status: 'new',
      priority: urgency === 'urgent' ? 'urgent' : 'normal',
      summary: `Translation request: ${fromLanguage} to ${toLanguage}, ${pages || 'unknown'} pages, ${documentType || 'general document'}`,
      customer_name: name,
      customer_phone: phone,
      customer_email: email,
    }).select('id, reference_number').single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      referenceNumber: inquiry?.reference_number,
      inquiryId: inquiry?.id,
      message: 'Your translation request has been received. KIPLAN will contact you shortly.',
    })
  } catch (error) {
    console.error('Translation request error:', error)
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }
}
