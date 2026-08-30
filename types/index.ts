// ============================================
// KIPLANNotary Shared Types
// Synchronized with database schema
// ============================================

export interface Admin {
  id: string
  email: string
  full_name?: string
  role: 'admin' | 'staff' | 'notary'
  is_active: boolean
  last_login_at?: string
  created_at: string
  updated_at: string
}

export interface Customer {
  id: string
  full_name?: string
  phone?: string
  email?: string
  district?: string
  municipality?: string
  ward?: string
  preferred_language?: string
  customer_type: 'individual' | 'regular' | 'organization'
  notes?: string
  created_at: string
  updated_at: string
}

export type InquiryStatus = 
  | 'new' 
  | 'under_review' 
  | 'awaiting_customer' 
  | 'document_requested' 
  | 'documents_received' 
  | 'in_progress' 
  | 'completed' 
  | 'on_hold' 
  | 'cancelled' 
  | 'closed'

export type Priority = 'low' | 'normal' | 'high' | 'urgent'
export type InquirySource = 'chatbot' | 'translation_form' | 'contact_form' | 'whatsapp' | 'walk_in' | 'other'

export interface Inquiry {
  id: string
  reference_number: string
  customer_id?: string
  service_type?: string
  source: InquirySource
  status: InquiryStatus
  priority: Priority
  assigned_to?: string
  summary?: string
  escalation_reason?: string
  conversation_transcript?: ChatTranscriptEntry[]
  customer_name?: string
  customer_phone?: string
  customer_email?: string
  created_at: string
  updated_at: string
  customers?: Customer
}

export interface ChatTranscriptEntry {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp?: string
}

export interface Conversation {
  id: string
  customer_id?: string
  inquiry_id?: string
  session_id: string
  handoff_triggered: boolean
  handoff_reason?: string
  summary?: string
  customer_name?: string
  customer_phone?: string
  customer_email?: string
  service_requested?: string
  document_type?: string
  language?: string
  urgency?: string
  location?: string
  created_at: string
  updated_at: string
  inquiries?: { reference_number: string } | null
}

export interface ConversationMessage {
  id: string
  conversation_id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  intent_detected?: string
  confidence?: number
  created_at: string
}

export interface Order {
  id: string
  inquiry_id?: string
  reference_number: string
  service_type?: string
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  total_amount?: number
  advance_paid?: number
  balance_due?: number
  payment_status: 'pending' | 'partial' | 'paid'
  invoice_number?: string
  completed_at?: string
  created_at: string
  updated_at: string
  inquiries?: Inquiry
}

export interface Document {
  id: string
  inquiry_id?: string
  order_id?: string
  customer_id?: string
  filename: string
  original_name: string
  file_type: string
  file_size: number
  storage_path: string
  uploaded_by?: string
  created_at: string
}

export interface AdminNote {
  id: string
  inquiry_id?: string
  order_id?: string
  admin_id?: string
  note: string
  created_at: string
  admins?: { full_name: string; email: string }
}

export interface StatusHistoryEntry {
  id: string
  inquiry_id?: string
  order_id?: string
  from_status?: string
  to_status: string
  changed_by?: string
  reason?: string
  created_at: string
  admins?: { full_name: string; email: string }
}

export interface Setting {
  id: string
  key: string
  value?: string
  value_json?: Record<string, unknown>
  description?: string
  updated_by?: string
  updated_at: string
}

export interface KnowledgeBaseEntry {
  id: string
  category: string
  question_pattern: string
  answer_en: string
  answer_np?: string
  requires_human_review: boolean
  is_active: boolean
  updated_by?: string
  updated_at: string
}

export interface ServiceType {
  id: string
  name: string
  name_np?: string
  description?: string
  is_active: boolean
  created_at: string
}

export interface ChatbotHandoffData {
  referenceNumber: string
  inquiryId?: string
  conversationId?: string
}
