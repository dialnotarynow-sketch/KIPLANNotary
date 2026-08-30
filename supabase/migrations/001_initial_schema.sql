-- KIPLANNotary Initial Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ADMINS
-- ============================================
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'staff' CHECK (role IN ('admin','staff','notary')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- CUSTOMERS
-- ============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT,
  phone TEXT,
  email TEXT,
  district TEXT,
  municipality TEXT,
  ward TEXT,
  preferred_language TEXT DEFAULT 'en',
  customer_type TEXT DEFAULT 'individual' CHECK (customer_type IN ('individual','regular','organization')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- SERVICE TYPES
-- ============================================
CREATE TABLE IF NOT EXISTS service_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_np TEXT,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO service_types (name, name_np, description) VALUES
  ('Notarisation', 'नोटरीकरण', 'Document notarisation services'),
  ('Translation', 'अनुवाद', 'Document translation services'),
  ('Certification', 'प्रमाणीकरण', 'Document certification'),
  ('Attestation', 'प्रमाणन', 'Document attestation'),
  ('Affidavit', 'शपथपत्र', 'Affidavit and sworn documents'),
  ('Sponsorship', 'प्रायोजन', 'Sponsorship declaration documents'),
  ('General Enquiry', 'सामान्य जानकारी', 'General enquiry')
ON CONFLICT DO NOTHING;

-- ============================================
-- INQUIRIES
-- ============================================
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reference_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  service_type TEXT,
  source TEXT NOT NULL DEFAULT 'chatbot' CHECK (source IN ('chatbot','translation_form','contact_form','whatsapp','walk_in','other')),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','under_review','awaiting_customer','document_requested','documents_received','in_progress','completed','on_hold','cancelled','closed')),
  priority TEXT NOT NULL DEFAULT 'normal' CHECK (priority IN ('low','normal','high','urgent')),
  assigned_to UUID REFERENCES admins(id) ON DELETE SET NULL,
  summary TEXT,
  escalation_reason TEXT,
  conversation_transcript JSONB,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- CONVERSATIONS
-- ============================================
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  session_id TEXT NOT NULL,
  handoff_triggered BOOLEAN NOT NULL DEFAULT false,
  handoff_reason TEXT,
  summary TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  customer_email TEXT,
  service_requested TEXT,
  document_type TEXT,
  language TEXT,
  urgency TEXT,
  location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- CONVERSATION MESSAGES
-- ============================================
CREATE TABLE IF NOT EXISTS conversation_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user','assistant','system')),
  content TEXT NOT NULL,
  intent_detected TEXT,
  confidence NUMERIC(4,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ORDERS
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE SET NULL,
  reference_number TEXT UNIQUE NOT NULL,
  service_type TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed','cancelled')),
  total_amount NUMERIC(12,2),
  advance_paid NUMERIC(12,2) DEFAULT 0,
  balance_due NUMERIC(12,2),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending','partial','paid')),
  invoice_number TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- DOCUMENTS
-- ============================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  storage_path TEXT NOT NULL,
  uploaded_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- ADMIN NOTES
-- ============================================
CREATE TABLE IF NOT EXISTS admin_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  admin_id UUID REFERENCES admins(id) ON DELETE SET NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- STATUS HISTORY
-- ============================================
CREATE TABLE IF NOT EXISTS status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  inquiry_id UUID REFERENCES inquiries(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  from_status TEXT,
  to_status TEXT NOT NULL,
  changed_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================
-- SETTINGS
-- ============================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value TEXT,
  value_json JSONB,
  description TEXT,
  updated_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO settings (key, value, value_json, description) VALUES
  ('office_hours', '10:00 AM – 4:30 PM', NULL, 'Regular office hours'),
  ('saturday_policy', 'Normally closed. Exceptional assistance may be considered for regular customers with urgent needs.', NULL, 'Saturday policy'),
  ('after_hours_charge', '25% additional charge applies after office hours.', NULL, 'After-hours surcharge policy'),
  ('office_address', 'Civil Trade Centre (CTC) Mall, 4th Floor, Sundhara, Kathmandu, Nepal', NULL, 'Office address'),
  ('phone', '', NULL, 'Primary phone number'),
  ('whatsapp', '', NULL, 'WhatsApp number'),
  ('emergency_notice', '', NULL, 'Emergency notice displayed to customers'),
  ('holiday_notice', '', NULL, 'Holiday notice displayed to customers'),
  ('pricing_guidance', 'Cost depends on nature and number of pages, standard vs official/technical document. KIPLAN reviews and advises.', NULL, 'Approved pricing guidance'),
  ('turnaround_guidance', 'Timing depends on pages, nature, and complexity of document.', NULL, 'Approved turnaround guidance'),
  ('chatbot_max_questions', '7', NULL, 'Maximum intake questions before handoff'),
  ('chatbot_confidence_threshold', '0.6', NULL, 'Confidence threshold for human handoff')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- KNOWLEDGE BASE
-- ============================================
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category TEXT NOT NULL,
  question_pattern TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_np TEXT,
  requires_human_review BOOLEAN NOT NULL DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO knowledge_base (category, question_pattern, answer_en, answer_np, requires_human_review) VALUES
  ('greeting', 'hello|hi|namaste|namaskar', 'Hello! Welcome to KIPLAN Notary. How can I help you today?', 'नमस्ते! KIPLAN Notary मा स्वागत छ। म तपाईंलाई कसरी सहयोग गर्न सक्छु?', false),
  ('notarisation', 'notary|notarisation|notarize|notarized|notarial', 'Yes, KIPLAN provides notarial services. What type of document do you need notarised?', 'हो, KIPLAN ले नोटरी सेवा प्रदान गर्छ। तपाईंलाई कस्तो कागजात नोटरी गर्नुपर्ने हो?', false),
  ('translation', 'translation|translate|translated|translator', 'KIPLAN translates and certifies authenticated Nepali and English documents. For other languages, we can assist in finding appropriate resources. What language do you need?', 'KIPLAN ले नेपाली र अंग्रेजी कागजातको अनुवाद र प्रमाणीकरण गर्छ। अन्य भाषाको लागि हामी उपयुक्त स्रोत खोज्न सहयोग गर्न सक्छौं। तपाईंलाई कुन भाषा चाहिन्छ?', false),
  ('certification', 'certification|certify|certified', 'KIPLAN provides document certification services. Please let us know what document you need certified.', 'KIPLAN ले कागजात प्रमाणीकरण सेवा प्रदान गर्छ। कृपया तपाईंलाई कुन कागजात प्रमाणित गर्नुपर्ने हो भन्नुहोस्।', false),
  ('attestation', 'attestation|attest|attested', 'Notarial attestation normally requires personal appearance with original documents. For your specific situation, KIPLAN can review and advise.', 'नोटरी प्रमाणन सामान्यतया मौलिक कागजातसहित व्यक्तिगत उपस्थिति आवश्यक पर्छ। तपाईंको विशेष अवस्थाको लागि KIPLAN ले समीक्षा र सल्लाह दिन सक्छ।', false),
  ('pricing', 'price|cost|rate|fee|charge|how much|kati paisa|kati lagchha', 'The cost depends on the nature and number of pages of the document, whether it is standard or official/technical. KIPLAN can review the document and advise you of the applicable charge. This is an estimate, not a guaranteed final price.', 'खर्च कागजातको प्रकृति र पृष्ठ संख्या, मानक वा आधिकारिक/प्राविधिक भएकोमा निर्भर गर्छ। KIPLAN ले कागजातको समीक्षा गरी लागू शुल्क सल्लाह दिन सक्छ। यो अनुमान मात्र हो, अन्तिम मूल्यको ग्यारेन्टी होइन।', false),
  ('urgency', 'urgent|urgently|fast|quick|soon|emergency|chado|chito', 'Timing depends on the number of pages, nature of the document, and complexity. For urgent requests, KIPLAN can discuss options directly with you.', 'समय कागजातको पृष्ठ संख्या, प्रकृति र जटिलतामा निर्भर गर्छ। तत्काल अनुरोधको लागि KIPLAN ले तपाईंसँग सीधै विकल्पहरू छलफल गर्न सक्छ।', false),
  ('office_hours', 'office hours|open time|opening|close time|when open|kati baje', 'Our normal office hours are 10:00 AM to 4:30 PM. After-hours service may incur an additional charge.', 'हाम्रो सामान्य कार्यालय समय बिहान १०:०० देखि बेलुका ४:३० सम्म हो। कार्यालय समयपछिको सेवामा थप शुल्क लाग्न सक्छ।', false),
  ('saturday', 'saturday|saturday open|saturday work|saturday service', 'Normally KIPLAN does not work on Saturday. However, exceptional assistance may be considered for regular customers with urgent notarisation needs. Please contact KIPLAN directly to discuss.', 'सामान्यतया KIPLAN शनिबार काम गर्दैन। तर नियमित ग्राहकहरूको तत्काल नोटरी आवश्यकताको लागि विशेष सहायता विचार गर्न सकिन्छ। कृपया KIPLAN लाई सीधै सम्पर्क गरी छलफल गर्नुहोस्।', false),
  ('location', 'location|address|where|office|find you|kaha chha|kata chha', 'KIPLAN is located at Civil Trade Centre (CTC) Mall, 4th Floor, Sundhara, Kathmandu, Nepal. You can reach us by public transport, Pathao, Yangbo, or InDrive.', 'KIPLAN Civil Trade Centre (CTC) Mall, ४औं तला, सुन्धारा, काठमाडौं, नेपाल मा अवस्थित छ। तपाईं सार्वजनिक यातायात, Pathao, Yangbo, वा InDrive मार्फत आउन सक्नुहुन्छ।', false),
  ('verification', 'verify|real notary|authorized|authentic|notary public council', 'You can verify KIPLAN Notary Public authorization through the official Notary Public Council website: https://notarypublic.org.np/english-renewed-translators/', 'तपाईं आधिकारिक Notary Public Council वेबसाइट मार्फत KIPLAN Notary Public को अधिकार प्रमाणित गर्न सक्नुहुन्छ: https://notarypublic.org.np/english-renewed-translators/', false),
  ('representation', 'represent|someone else|family member|friend|appear personally|personal appearance', 'A person normally has to present at the Notary office with original documents. In some circumstances, after professional advice from the Notary Public, a family member or friend may represent the person, subject to applicable requirements. For your specific case, please speak with KIPLAN directly.', 'व्यक्तिले सामान्यतया मौलिक कागजातसहित नोटरी कार्यालयमा उपस्थित हुनुपर्छ। केही अवस्थामा Notary Public को पेशेवर सल्लाहपछि परिवारको सदस्य वा साथीले प्रतिनिधित्व गर्न सक्छन्। तपाईंको विशेष अवस्थाको लागि कृपया KIPLAN सँग सीधै कुरा गर्नुहोस्।', false),
  ('affidavit', 'affidavit|sworn|sponsorship|sponsor|sworn document', 'An affidavit is a sworn written statement made before a Notary Public. Sponsorship declarations are similar sworn documents. The person making the statement normally needs to appear before the Notary Public. For specific circumstances, KIPLAN can advise you directly.', 'शपथपत्र Notary Public को अगाडि गरिएको लिखित वक्तव्य हो। प्रायोजन घोषणाहरू पनि त्यस्तै शपथ कागजात हुन्। वक्तव्य दिने व्यक्तिले सामान्यतया Notary Public को अगाडि उपस्थित हुनुपर्छ। विशेष अवस्थाको लागि KIPLAN ले तपाईंलाई सीधै सल्लाह दिन सक्छ।', true),
  ('online_service', 'online notary|online attestation|remote notary|online service|internet notary', 'Notarial attestation normally requires appropriate personal appearance, identification and original documents. Translation-related remote assistance may be possible in appropriate circumstances. KIPLAN can review your specific situation.', 'नोटरी प्रमाणन सामान्यतया उचित व्यक्तिगत उपस्थिति, पहिचान र मौलिक कागजात आवश्यक पर्छ। अनुवादसम्बन्धी दूरस्थ सहायता उपयुक्त अवस्थामा सम्भव हुन सक्छ। KIPLAN ले तपाईंको विशेष अवस्थाको समीक्षा गर्न सक्छ।', true),
  ('remote_customer', 'outside kathmandu|outside nepal|remote|another city|another district', 'Whether the service can be completed remotely depends on the nature of the document and the service required. For authenticated Nepali/English document translation, remote submission may be possible. KIPLAN can review your situation.', 'सेवा दूरस्थ रूपमा पूरा गर्न सकिन्छ वा नभन्ने कागजातको प्रकृति र आवश्यक सेवामा निर्भर गर्छ। प्रमाणित नेपाली/अंग्रेजी कागजात अनुवादको लागि दूरस्थ पेश गर्न सम्भव हुन सक्छ। KIPLAN ले तपाईंको अवस्थाको समीक्षा गर्न सक्छ।', false),
  ('foreign_language_translation', 'japanese|chinese|german|korean|french|russian|other language', 'KIPLAN translates and certifies authenticated Nepali and English documents. For languages such as Japanese, Chinese, German, Korean, French, or Russian, KIPLAN can assist you in obtaining translation through appropriate resources, including Tribhuvan University – Campus of International Languages where appropriate.', 'KIPLAN ले प्रमाणित नेपाली र अंग्रेजी कागजातको अनुवाद र प्रमाणीकरण गर्छ। जापानी, चिनियाँ, जर्मन, कोरियन, फ्रान्सेली वा रूसी जस्ता भाषाको लागि KIPLAN ले उपयुक्त स्रोतहरू मार्फत अनुवाद प्राप्त गर्न सहयोग गर्न सक्छ।', false),
  ('document_requirements', 'what document|need document|required document|document needed|kagaj chahiyo', 'Document requirements depend on the specific service. Generally, original documents and valid identification are required. KIPLAN can advise you precisely once you share what service you need.', 'कागजात आवश्यकताहरू विशेष सेवामा निर्भर गर्छन्। सामान्यतया मौलिक कागजात र वैध पहिचान आवश्यक पर्छ। तपाईंले कुन सेवा चाहिन्छ भनेर साझा गरेपछि KIPLAN ले ठ्याक्कै सल्लाह दिन सक्छ।', false),
  ('document_rejection', 'reject|refuse|deny|why rejected|not accepted', 'A Notary Public may refuse to notarize or certify a document where there are concerns regarding authenticity, compliance, identity, documentation, or other applicable requirements. KIPLAN can review your specific document.', 'प्रमाणिकता, अनुपालन, पहिचान, कागजात वा अन्य लागू आवश्यकताहरूमा चासो भएमा Notary Public ले कागजात नोटरी वा प्रमाणित गर्न अस्वीकार गर्न सक्छ। KIPLAN ले तपाईंको विशेष कागजातको समीक्षा गर्न सक्छ।', false),
  ('document_confidentiality', 'confidential|privacy|keep copy|why copy|store document', 'Notarial practice involves appropriate record keeping. Your documents are handled with professional confidentiality. For specific questions about your document, KIPLAN can discuss directly with you.', 'नोटरी अभ्यासमा उचित रेकर्ड राख्ने काम समावेश हुन्छ। तपाईंका कागजातहरू पेशेवर गोपनीयताका साथ ह्यान्डल गरिन्छन्। तपाईंको कागजातसम्बन्धी विशेष प्रश्नको लागि KIPLAN ले तपाईंसँग सीधै छलफल गर्न सक्छ।', false),
  ('human_request', 'human|talk to person|speak to someone|call|phone|representative|agent', 'I can connect you with KIPLAN directly. Please click below to talk to a human.', 'म तपाईंलाई सीधै KIPLAN सँग जडान गर्न सक्छु। कृपया मानिससँग कुरा गर्न तल क्लिक गर्नुहोस्।', false),
  ('complaint', 'complaint|unhappy|bad service|problem|issue|dissatisfied', 'I am sorry to hear that. KIPLAN takes all concerns seriously. I will connect you with a team member who can address this directly.', 'मलाई यो सुन्न दुःख लाग्यो। KIPLAN ले सबै चासोहरू गम्भीरतापूर्वक लिन्छ। म तपाईंलाई टोली सदस्यसँग जडान गर्छु जसले यो सीधै सम्बोधन गर्न सक्छ।', false),
  ('fraud_or_irregularity', 'fraud|fake|illegal|wrong|cheat|scam|irregular', 'Notarial procedures must comply with applicable requirements. If you have a specific concern about a document or procedure, KIPLAN can discuss the matter with you directly.', 'नोटरी प्रक्रियाहरू लागू आवश्यकताहरूको पालना गर्नुपर्छ। यदि तपाईंसँग कागजात वा प्रक्रियासम्बन्धी विशेष चासो छ भने, KIPLAN ले तपाईंसँग सीधै यो विषयमा छलफल गर्न सक्छ।', true),
  ('legal_advice', 'legal advice|lawyer|court|case|sue|legal|advocate', 'I cannot provide definitive legal advice. For legal matters, KIPLAN can connect you with the appropriate professional assistance.', 'म निश्चित कानुनी सल्लाह दिन सक्दिन। कानुनी मामिलाको लागि KIPLAN ले तपाईंलाई उचित पेशेवर सहायतासँग जडान गर्न सक्छ।', true),
  ('general', 'what is notary|what do you do|services|help', 'KIPLAN Notary provides notarisation, translation, certification, and attestation services. We also assist with affidavits and sponsorship documents. How can we help you today?', 'KIPLAN Notary ले नोटरीकरण, अनुवाद, प्रमाणीकरण र प्रमाणन सेवाहरू प्रदान गर्छ। हामी शपथपत्र र प्रायोजन कागजातहरूमा पनि सहयोग गर्छौं। आज हामी तपाईंलाई कसरी सहयोग गर्न सक्छौं?', false)
ON CONFLICT DO NOTHING;

-- ============================================
-- REFERENCE NUMBER SEQUENCE
-- ============================================
CREATE TABLE IF NOT EXISTS reference_sequences (
  year INTEGER PRIMARY KEY,
  last_number INTEGER NOT NULL DEFAULT 0
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_inquiries_reference ON inquiries(reference_number);
CREATE INDEX IF NOT EXISTS idx_inquiries_customer ON inquiries(customer_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_session ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_conversations_handoff ON conversations(handoff_triggered);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON conversation_messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_documents_inquiry ON documents(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_status_history_inquiry ON status_history(inquiry_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_category ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_active ON knowledge_base(is_active);

-- ============================================
-- RLS ENABLE
-- ============================================
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES
-- ============================================

-- Admins: only admins can read admins table
CREATE POLICY "admins_read_admin" ON admins FOR SELECT USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Customers: admin full access
CREATE POLICY "customers_admin_all" ON customers FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Inquiries: admin full access
CREATE POLICY "inquiries_admin_all" ON inquiries FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Conversations: admin full access
CREATE POLICY "conversations_admin_all" ON conversations FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Messages: admin full access
CREATE POLICY "messages_admin_all" ON conversation_messages FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Orders: admin full access
CREATE POLICY "orders_admin_all" ON orders FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Documents: admin full access
CREATE POLICY "documents_admin_all" ON documents FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Admin notes: admin full access
CREATE POLICY "notes_admin_all" ON admin_notes FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Status history: admin full access
CREATE POLICY "status_history_admin_all" ON status_history FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Settings: admin full access
CREATE POLICY "settings_admin_all" ON settings FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Knowledge base: admin full access
CREATE POLICY "knowledge_admin_all" ON knowledge_base FOR ALL USING (
  EXISTS (SELECT 1 FROM admins a WHERE a.email = auth.jwt() ->> 'email' AND a.is_active = true)
);

-- Public read for settings (for chatbot)
CREATE POLICY "settings_public_read" ON settings FOR SELECT USING (true);

-- Public read for active knowledge base (for chatbot)
CREATE POLICY "knowledge_public_read" ON knowledge_base FOR SELECT USING (is_active = true);

-- ============================================
-- FUNCTIONS
-- ============================================
CREATE OR REPLACE FUNCTION generate_reference_number()
RETURNS TEXT AS $$
DECLARE
  v_year INTEGER;
  v_num INTEGER;
BEGIN
  v_year := EXTRACT(YEAR FROM CURRENT_DATE);

  INSERT INTO reference_sequences (year, last_number)
  VALUES (v_year, 1)
  ON CONFLICT (year)
  DO UPDATE SET last_number = reference_sequences.last_number + 1
  RETURNING reference_sequences.last_number INTO v_num;

  RETURN 'KN-' || v_year || '-' || LPAD(v_num::TEXT, 5, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER update_admins_updated_at BEFORE UPDATE ON admins
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_inquiries_updated_at BEFORE UPDATE ON inquiries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- STORAGE BUCKET
-- ============================================
-- Run this in Supabase Dashboard > Storage > New Bucket
-- Name: documents
-- Public: false
-- Then create policy: authenticated admins can read/write
