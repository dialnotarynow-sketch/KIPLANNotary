import { createAdminClient } from '@/lib/supabase/admin'
import { generateReferenceNumber } from '@/lib/reference'
import { ChatState } from './engine'

export async function createHandoff(state: ChatState) {
  const supabase = createAdminClient()

  // Create or update customer
  let customerId: string | null = null
  if (state.customerInfo.phone || state.customerInfo.email) {
    const { data: existing } = await supabase
      .from('customers')
      .select('id')
      .or(`phone.eq.${state.customerInfo.phone},email.eq.${state.customerInfo.email}`)
      .maybeSingle()

    if (existing) {
      customerId = existing.id
      await supabase.from('customers').update({
        full_name: state.customerInfo.name || undefined,
        phone: state.customerInfo.phone || undefined,
        email: state.customerInfo.email || undefined,
        preferred_language: state.language === 'np' ? 'np' : 'en',
        updated_at: new Date().toISOString(),
      }).eq('id', customerId)
    } else {
      const { data: newCustomer } = await supabase.from('customers').insert({
        full_name: state.customerInfo.name,
        phone: state.customerInfo.phone,
        email: state.customerInfo.email,
        preferred_language: state.language === 'np' ? 'np' : 'en',
      }).select('id').single()
      if (newCustomer) customerId = newCustomer.id
    }
  }

  // Generate reference
  const referenceNumber = await generateReferenceNumber()

  // Build transcript
  const transcript = state.messages.map(m => ({
    role: m.role,
    content: m.content,
    timestamp: new Date().toISOString(),
  }))

  // Create inquiry
  const { data: inquiry, error: inquiryError } = await supabase.from('inquiries').insert({
    reference_number: referenceNumber,
    customer_id: customerId,
    service_type: state.customerInfo.service || 'General Enquiry',
    source: 'chatbot',
    status: 'new',
    priority: state.customerInfo.urgency === 'urgent' ? 'urgent' : 'normal',
    summary: state.customerInfo.service 
      ? `Customer needs ${state.customerInfo.service}${state.customerInfo.documentType ? ` for ${state.customerInfo.documentType}` : ''}.`
      : 'General chatbot enquiry',
    escalation_reason: state.handoffReason,
    conversation_transcript: transcript,
    customer_name: state.customerInfo.name,
    customer_phone: state.customerInfo.phone,
    customer_email: state.customerInfo.email,
  }).select('id').single()

  if (inquiryError) throw inquiryError

  // Create conversation record
  const { data: conversation } = await supabase.from('conversations').insert({
    customer_id: customerId,
    inquiry_id: inquiry?.id,
    session_id: state.sessionId,
    handoff_triggered: true,
    handoff_reason: state.handoffReason,
    summary: state.customerInfo.service 
      ? `Customer needs ${state.customerInfo.service}${state.customerInfo.documentType ? ` for ${state.customerInfo.documentType}` : ''}.`
      : 'General enquiry',
    customer_name: state.customerInfo.name,
    customer_phone: state.customerInfo.phone,
    customer_email: state.customerInfo.email,
    service_requested: state.customerInfo.service,
    document_type: state.customerInfo.documentType,
    language: state.language,
    urgency: state.customerInfo.urgency,
    location: state.customerInfo.location,
  }).select('id').single()

  // Store messages
  if (conversation && state.messages.length > 0) {
    await supabase.from('conversation_messages').insert(
      state.messages.map(m => ({
        conversation_id: conversation.id,
        role: m.role,
        content: m.content,
        intent_detected: m.intent,
        confidence: m.confidence,
      }))
    )
  }

  return { referenceNumber, inquiryId: inquiry?.id, conversationId: conversation?.id }
}
