import { detectIntent, getResponse, isNepali, KnowledgeEntry } from './knowledge'
import { createAdminClient } from '@/lib/supabase/admin'

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  intent?: string
  confidence?: number
}

export interface ChatState {
  sessionId: string
  messages: ChatMessage[]
  questionCount: number
  customerInfo: {
    name?: string
    phone?: string
    email?: string
    service?: string
    documentType?: string
    language?: string
    urgency?: string
    location?: string
    hasOriginal?: boolean
    contactMethod?: string
  }
  handoffTriggered: boolean
  handoffReason?: string
  language: 'en' | 'np' | 'mixed'
}

const INTAKE_QUESTIONS: Record<string, string[]> = {
  en: [
    "What service do you need? (notarisation, translation, certification, etc.)",
    "What type of document is involved?",
    "How many pages or documents are involved?",
    "Is this urgent?",
    "Where are you currently located?",
    "Do you have the original document and required identification?",
    "What is the best way for KIPLAN to contact you? (phone, WhatsApp, email)",
  ],
  np: [
    "तपाईंलाई कुन सेवा चाहिन्छ? (नोटरीकरण, अनुवाद, प्रमाणीकरण, आदि)",
    "कस्तो प्रकारको कागजात सम्बन्धित छ?",
    "कति पृष्ठ वा कागजातहरू सम्बन्धित छन्?",
    "यो तत्काल आवश्यक छ?",
    "तपाईं अहिले कहाँ हुनुहुन्छ?",
    "के तपाईंसँग मौलिक कागजात र आवश्यक पहिचान छ?",
    "KIPLAN ले तपाईंलाई सम्पर्क गर्न सबैभन्दा राम्रो तरिका के हो? (फोन, व्हाट्सएप, इमेल)",
  ],
}

const HANDOFF_TRIGGERS = [
  'human_request', 'complaint', 'fraud_or_irregularity', 'legal_advice',
  'affidavit', 'online_service',
]

const SOFT_HANDOFF_TRIGGERS = [
  'saturday', 'representation', 'remote_customer', 'urgency',
]

function getLanguage(state: ChatState): 'en' | 'np' {
  if (state.language === 'np') return 'np'
  if (state.language === 'mixed') {
    const lastUser = [...state.messages].reverse().find(m => m.role === 'user')
    if (lastUser && isNepali(lastUser.content)) return 'np'
    return 'en'
  }
  return 'en'
}

function extractInfo(message: string, state: ChatState): Partial<ChatState['customerInfo']> {
  const info: Partial<ChatState['customerInfo']> = {}
  const lower = message.toLowerCase()

  if (/notar(y|ise|ize)/.test(lower) || /नोटरी/.test(message)) info.service = 'notarisation'
  else if (/translat/.test(lower) || /अनुवाद/.test(message)) info.service = 'translation'
  else if (/certif/.test(lower) || /प्रमाणीकरण/.test(message)) info.service = 'certification'
  else if (/attest/.test(lower) || /प्रमाणन/.test(message)) info.service = 'attestation'
  else if (/affidavit/.test(lower) || /शपथपत्र/.test(message)) info.service = 'affidavit'
  else if (/sponsor/.test(lower) || /प्रायोजन/.test(message)) info.service = 'sponsorship'

  if (/urgent|tatakal|तत्काल|chado|छिटो|chito|छिटो/.test(lower)) info.urgency = 'urgent'
  else if (/normal|sadharan|साधारण/.test(lower)) info.urgency = 'normal'

  if (/kathmandu|काठमाडौं/.test(lower)) info.location = 'Kathmandu'
  else if (/lalitpur|ललितपुर/.test(lower)) info.location = 'Lalitpur'
  else if (/bhaktapur|भक्तपुर/.test(lower)) info.location = 'Bhaktapur'
  else if (/pokhara|पोखरा/.test(lower)) info.location = 'Pokhara'
  else if (/outside|baira|बाहिर|abroad|विदेश/.test(lower)) info.location = 'Outside Nepal'

  if (/citizenship|नागरिकता/.test(lower)) info.documentType = 'citizenship certificate'
  else if (/passport|पासपोर्ट/.test(lower)) info.documentType = 'passport'
  else if (/birth|जन्म/.test(lower)) info.documentType = 'birth certificate'
  else if (/marriage|विवाह/.test(lower)) info.documentType = 'marriage certificate'
  else if (/academic|education|school|college|transcript|marksheet/.test(lower)) info.documentType = 'academic document'
  else if (/land|property|lalpurja|लालपुर्जा|jagga|जग्गा/.test(lower)) info.documentType = 'land/property document'
  else if (/company|firm|business|registration|moiti|मोइटी/.test(lower)) info.documentType = 'company document'

  const phoneMatch = message.match(/(\+?977[-\s]?)?(98\d{8}|97\d{8})/)
  if (phoneMatch) info.phone = phoneMatch[0]

  const emailMatch = message.match(/[\w.-]+@[\w.-]+\.\w{2,}/)
  if (emailMatch) info.email = emailMatch[0]

  const nameMatch = message.match(/(?:my name is|i am|mero naam|मेरो नाम)\s+([A-Za-z\s]{2,30})/i)
  if (nameMatch) info.name = nameMatch[1].trim()

  return info
}

function determineNextQuestion(state: ChatState): string | null {
  const lang = getLanguage(state)
  const q = INTAKE_QUESTIONS[lang]
  const info = state.customerInfo

  if (state.questionCount >= 7) return null

  if (!info.service && state.questionCount === 0) return q[0]
  if (!info.documentType && state.questionCount <= 1) return q[1]
  if (state.questionCount <= 2) return q[2]
  if (!info.urgency && state.questionCount <= 3) return q[3]
  if (!info.location && state.questionCount <= 4) return q[4]
  if (state.questionCount <= 5) return q[5]
  if (!info.phone && !info.email && state.questionCount <= 6) return q[6]

  return null
}

function buildHandoffMessage(state: ChatState, _reason: string): string {
  const lang = getLanguage(state)
  const en = "This situation may need individual review. I can connect you with KIPLAN so you can discuss it directly."
  const np = "यो अवस्थाको व्यक्तिगत समीक्षा आवश्यक हुन सक्छ। म तपाईंलाई KIPLAN सँग जडान गर्न सक्छु ताकि तपाईं सीधै छलफल गर्न सक्नुहुन्छ।"
  return lang === 'np' ? np : en
}

export async function processMessage(
  message: string,
  state: ChatState
): Promise<{ response: string; newState: ChatState; shouldHandoff: boolean }> {
  const lowerMsg = message.toLowerCase().trim()

  if (isNepali(message)) {
    if (state.language === 'en') state.language = 'mixed'
  }

  const intentResult = detectIntent(message)
  const intent = intentResult.category
  const confidence = intentResult.confidence

  const extracted = extractInfo(message, state)
  state.customerInfo = { ...state.customerInfo, ...extracted }

  if (HANDOFF_TRIGGERS.includes(intent)) {
    state.handoffTriggered = true
    state.handoffReason = intent
    return {
      response: buildHandoffMessage(state, intent),
      newState: state,
      shouldHandoff: true,
    }
  }

  if (confidence < 0.6) {
    state.handoffTriggered = true
    state.handoffReason = 'low_confidence'
    return {
      response: buildHandoffMessage(state, 'low_confidence'),
      newState: state,
      shouldHandoff: true,
    }
  }

  if (SOFT_HANDOFF_TRIGGERS.includes(intent) && state.questionCount >= 3) {
    state.handoffTriggered = true
    state.handoffReason = intent
    return {
      response: buildHandoffMessage(state, intent),
      newState: state,
      shouldHandoff: true,
    }
  }

  let response = ''
  if (intentResult.entry) {
    response = getResponse(intentResult.entry, message)

    if (intentResult.entry.requiresHumanReview) {
      const lang = getLanguage(state)
      response += lang === 'np' 
        ? ' यदि तपाईंलाई थप जानकारी चाहिन्छ भने KIPLAN को टोलीसँग कुरा गर्न सक्नुहुन्छ।'
        : ' If you need further information, you can speak with the KIPLAN team.'
    }
  } else {
    const lang = getLanguage(state)
    response = lang === 'np'
      ? 'माफ गर्नुहोस्, मैले पूर्ण रूपमा बुझिनँ। KIPLAN को टोलीसँग कुरा गर्न चाहनुहुन्छ?'
      : "I'm sorry, I didn't fully understand that. Would you like to speak with the KIPLAN team?"
  }

  state.questionCount++
  const nextQuestion = determineNextQuestion(state)
  if (nextQuestion && !state.handoffTriggered && state.questionCount < 7) {
    response += ' ' + nextQuestion
  }

  if (state.questionCount >= 6 && state.customerInfo.service && !state.handoffTriggered) {
    const lang = getLanguage(state)
    response += lang === 'np'
      ? ' तपाईंको अनुरोध KIPLAN को टोलीलाई पठाउन चाहनुहुन्छ?'
      : ' Would you like me to send your request to the KIPLAN team?'
  }

  return { response, newState: state, shouldHandoff: false }
}

export function createInitialState(sessionId: string): ChatState {
  return {
    sessionId,
    messages: [],
    questionCount: 0,
    customerInfo: {},
    handoffTriggered: false,
    language: 'en',
  }
}

// ============================================
// DATABASE PERSISTENCE — Serverless-safe
// ============================================

export async function loadSession(sessionId: string): Promise<ChatState | null> {
  const supabase = createAdminClient()

  const { data: conversation } = await supabase
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .maybeSingle()

  if (!conversation) return null

  const { data: messages } = await supabase
    .from('conversation_messages')
    .select('*')
    .eq('conversation_id', conversation.id)
    .order('created_at', { ascending: true })

  return {
    sessionId: conversation.session_id,
    messages: (messages || []).map(m => ({
      role: m.role as 'user' | 'assistant' | 'system',
      content: m.content,
      intent: m.intent_detected || undefined,
      confidence: m.confidence || undefined,
    })),
    questionCount: (messages || []).filter(m => m.role === 'assistant').length,
    customerInfo: {
      name: conversation.customer_name || undefined,
      phone: conversation.customer_phone || undefined,
      email: conversation.customer_email || undefined,
      service: conversation.service_requested || undefined,
      documentType: conversation.document_type || undefined,
      language: conversation.language || undefined,
      urgency: conversation.urgency || undefined,
      location: conversation.location || undefined,
    },
    handoffTriggered: conversation.handoff_triggered,
    handoffReason: conversation.handoff_reason || undefined,
    language: (conversation.language as 'en' | 'np' | 'mixed') || 'en',
  }
}

export async function saveSession(state: ChatState): Promise<string> {
  const supabase = createAdminClient()

  // Upsert conversation
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('session_id', state.sessionId)
    .maybeSingle()

  const conversationData = {
    session_id: state.sessionId,
    handoff_triggered: state.handoffTriggered,
    handoff_reason: state.handoffReason,
    customer_name: state.customerInfo.name,
    customer_phone: state.customerInfo.phone,
    customer_email: state.customerInfo.email,
    service_requested: state.customerInfo.service,
    document_type: state.customerInfo.documentType,
    language: state.language,
    urgency: state.customerInfo.urgency,
    location: state.customerInfo.location,
    updated_at: new Date().toISOString(),
  }

  let conversationId: string

  if (existing) {
    conversationId = existing.id
    await supabase.from('conversations').update(conversationData).eq('id', existing.id)
  } else {
    const { data: created } = await supabase.from('conversations').insert(conversationData).select('id').single()
    conversationId = created!.id
  }

  // Save latest message
  const lastMessage = state.messages[state.messages.length - 1]
  if (lastMessage) {
    await supabase.from('conversation_messages').insert({
      conversation_id: conversationId,
      role: lastMessage.role,
      content: lastMessage.content,
      intent_detected: lastMessage.intent,
      confidence: lastMessage.confidence,
    })
  }

  return conversationId
}
