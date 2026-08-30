export interface KnowledgeEntry {
  category: string
  patterns: RegExp[]
  answerEn: string
  answerNp: string
  requiresHumanReview: boolean
  isEscalationTrigger: boolean
}

// Nepali/English mixed pattern helpers
const nepaliNumbers = '०१२३४५६७८९'
const toNepaliNum = (n: number) => n.toString().split('').map(d => nepaliNumbers[parseInt(d)]).join('')

export const knowledgeBase: KnowledgeEntry[] = [
  {
    category: 'greeting',
    patterns: [
      /\b(hello|hi|hey|greetings|good morning|good afternoon|good evening)\b/i,
      /^(namaste|namaskar|नमस्ते|नमस्कार)/i,
    ],
    answerEn: 'Hello! Welcome to KIPLAN Notary. How can I help you today?',
    answerNp: 'नमस्ते! KIPLAN Notary मा स्वागत छ। म तपाईंलाई कसरी सहयोग गर्न सक्छु?',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'notarisation',
    patterns: [
      /\b(notar(y|ise|ize|ization|isation)|notarized|notarial|\bnotary\b|notarisation)\b/i,
      /(notary garnu|नोटरी गर्नु|notary chahiyo|नोटरी चाहियो)/i,
    ],
    answerEn: 'Yes, KIPLAN provides notarial services. What type of document do you need notarised?',
    answerNp: 'हो, KIPLAN ले नोटरी सेवा प्रदान गर्छ। तपाईंलाई कस्तो कागजात नोटरी गर्नुपर्ने हो?',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'translation',
    patterns: [
      /\b(translat(e|ion|ed|or)|translator)\b/i,
      /(anubad|अनुवाद|translate garnu|tarjuma)/i,
    ],
    answerEn: 'KIPLAN translates and certifies authenticated Nepali and English documents. For other languages, we can assist in finding appropriate resources. What language do you need?',
    answerNp: 'KIPLAN ले नेपाली र अंग्रेजी कागजातको अनुवाद र प्रमाणीकरण गर्छ। अन्य भाषाको लागि हामी उपयुक्त स्रोत खोज्न सहयोग गर्न सक्छौं। तपाईंलाई कुन भाषा चाहिन्छ?',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'certification',
    patterns: [
      /\b(certif(y|ication|ied)|certify document)\b/i,
      /(pramanikaran|प्रमाणीकरण|certify garnu)/i,
    ],
    answerEn: 'KIPLAN provides document certification services. Please let us know what document you need certified.',
    answerNp: 'KIPLAN ले कागजात प्रमाणीकरण सेवा प्रदान गर्छ। कृपया तपाईंलाई कुन कागजात प्रमाणित गर्नुपर्ने हो भन्नुहोस्।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'attestation',
    patterns: [
      /\b(attest(ation|ed|)|attest document)\b/i,
      /(pramanan|प्रमाणन)/i,
    ],
    answerEn: 'Notarial attestation normally requires personal appearance with original documents. For your specific situation, KIPLAN can review and advise.',
    answerNp: 'नोटरी प्रमाणन सामान्यतया मौलिक कागजातसहित व्यक्तिगत उपस्थिति आवश्यक पर्छ। तपाईंको विशेष अवस्थाको लागि KIPLAN ले समीक्षा र सल्लाह दिन सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'pricing',
    patterns: [
      /\b(price|cost|rate|fee|charge|how much|pricing)\b/i,
      /(kati paisa|कति पैसा|kati lagchha|कति लाग्छ|mol|मोल|dam|दाम)/i,
    ],
    answerEn: 'The cost depends on the nature and number of pages of the document, whether it is standard or official/technical. KIPLAN can review the document and advise you of the applicable charge. This is an estimate, not a guaranteed final price.',
    answerNp: 'खर्च कागजातको प्रकृति र पृष्ठ संख्या, मानक वा आधिकारिक/प्राविधिक भएकोमा निर्भर गर्छ। KIPLAN ले कागजातको समीक्षा गरी लागू शुल्क सल्लाह दिन सक्छ। यो अनुमान मात्र हो, अन्तिम मूल्यको ग्यारेन्टी होइन।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'urgency',
    patterns: [
      /\b(urgent|urgently|fast|quick|soon|emergency|asap|rush)\b/i,
      /(chado|छिटो|chito|छिटो|tatakal|तत्काल|jaldi|जल्दी)/i,
    ],
    answerEn: 'Timing depends on the number of pages, nature of the document, and complexity. For urgent requests, KIPLAN can discuss options directly with you.',
    answerNp: 'समय कागजातको पृष्ठ संख्या, प्रकृति र जटिलतामा निर्भर गर्छ। तत्काल अनुरोधको लागि KIPLAN ले तपाईंसँग सीधै विकल्पहरू छलफल गर्न सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'office_hours',
    patterns: [
      /\b(office hours|open time|opening|close time|when open|business hours|working hours)\b/i,
      /(kati baje|कति बजे|khula|खुला|kati baje samma|कति बजेसम्म)/i,
    ],
    answerEn: 'Our normal office hours are 10:00 AM to 4:30 PM. After-hours service may incur an additional charge.',
    answerNp: 'हाम्रो सामान्य कार्यालय समय बिहान १०:०० देखि बेलुका ४:३० सम्म हो। कार्यालय समयपछिको सेवामा थप शुल्क लाग्न सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'saturday',
    patterns: [
      /\b(saturday|saturday open|saturday work|saturday service|weekend)\b/i,
      /(sanibar|शनिबार|saturday chalchha|शनिबार चल्छ)/i,
    ],
    answerEn: 'Normally KIPLAN does not work on Saturday. However, exceptional assistance may be considered for regular customers with urgent notarisation needs. Please contact KIPLAN directly to discuss.',
    answerNp: 'सामान्यतया KIPLAN शनिबार काम गर्दैन। तर नियमित ग्राहकहरूको तत्काल नोटरी आवश्यकताको लागि विशेष सहायता विचार गर्न सकिन्छ। कृपया KIPLAN लाई सीधै सम्पर्क गरी छलफल गर्नुहोस्।',
    requiresHumanReview: false,
    isEscalationTrigger: true, // Soft handoff
  },
  {
    category: 'location',
    patterns: [
      /\b(location|address|where|office|find you|direction|reach)\b/i,
      /(kaha chha|कहाँ छ|kata chha|कता छ|thau|ठाउँ|address kaha|ठेगाना)/i,
    ],
    answerEn: 'KIPLAN is located at Civil Trade Centre (CTC) Mall, 4th Floor, Sundhara, Kathmandu, Nepal. You can reach us by public transport, Pathao, Yangbo, or InDrive.',
    answerNp: 'KIPLAN Civil Trade Centre (CTC) Mall, ४औं तला, सुन्धारा, काठमाडौं, नेपाल मा अवस्थित छ। तपाईं सार्वजनिक यातायात, Pathao, Yangbo, वा InDrive मार्फत आउन सक्नुहुन्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'verification',
    patterns: [
      /\b(verify|real notary|authorized|authentic|genuine|notary public council|registration)\b/i,
      /(asli|असली|real ho|vastavik|वास्तविक|darta|दर्ता)/i,
    ],
    answerEn: 'You can verify KIPLAN Notary Public authorization through the official Notary Public Council website: https://notarypublic.org.np/english-renewed-translators/',
    answerNp: 'तपाईं आधिकारिक Notary Public Council वेबसाइट मार्फत KIPLAN Notary Public को अधिकार प्रमाणित गर्न सक्नुहुन्छ: https://notarypublic.org.np/english-renewed-translators/',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'representation',
    patterns: [
      /\b(represent|someone else|family member|friend|appear personally|personal appearance|proxy|on behalf)\b/i,
      /(arko manche|अर्को मान्छे|pratinidhi|प्रतिनिधि|afai aunu parcha|आफैं आउनु पर्छ)/i,
    ],
    answerEn: 'A person normally has to present at the Notary office with original documents. In some circumstances, after professional advice from the Notary Public, a family member or friend may represent the person, subject to applicable requirements. For your specific case, please speak with KIPLAN directly.',
    answerNp: 'व्यक्तिले सामान्यतया मौलिक कागजातसहित नोटरी कार्यालयमा उपस्थित हुनुपर्छ। केही अवस्थामा Notary Public को पेशेवर सल्लाहपछि परिवारको सदस्य वा साथीले प्रतिनिधित्व गर्न सक्छन्। तपाईंको विशेष अवस्थाको लागि कृपया KIPLAN सँग सीधै कुरा गर्नुहोस्।',
    requiresHumanReview: false,
    isEscalationTrigger: true, // Soft handoff
  },
  {
    category: 'affidavit',
    patterns: [
      /\b(affidavit|sworn|sponsorship|sponsor|sworn document|declaration)\b/i,
      /(sapathpatra|शपथपत्र|prayanajan|प्रायोजन|ghosana|घोषणा)/i,
    ],
    answerEn: 'An affidavit is a sworn written statement made before a Notary Public. Sponsorship declarations are similar sworn documents. The person making the statement normally needs to appear before the Notary Public. For specific circumstances, KIPLAN can advise you directly.',
    answerNp: 'शपथपत्र Notary Public को अगाडि गरिएको लिखित वक्तव्य हो। प्रायोजन घोषणाहरू पनि त्यस्तै शपथ कागजात हुन्। वक्तव्य दिने व्यक्तिले सामान्यतया Notary Public को अगाडि उपस्थित हुनुपर्छ। विशेष अवस्थाको लागि KIPLAN ले तपाईंलाई सीधै सल्लाह दिन सक्छ।',
    requiresHumanReview: true,
    isEscalationTrigger: true,
  },
  {
    category: 'online_service',
    patterns: [
      /\b(online notary|online attestation|remote notary|online service|internet notary|virtual notary)\b/i,
      /(online garna milchha|अनलाइन गर्न मिल्छ|remote bata|रिमोटबाट|ghar bata|घरबाट)/i,
    ],
    answerEn: 'Notarial attestation normally requires appropriate personal appearance, identification and original documents. Translation-related remote assistance may be possible in appropriate circumstances. KIPLAN can review your specific situation.',
    answerNp: 'नोटरी प्रमाणन सामान्यतया उचित व्यक्तिगत उपस्थिति, पहिचान र मौलिक कागजात आवश्यक पर्छ। अनुवादसम्बन्धी दूरस्थ सहायता उपयुक्त अवस्थामा सम्भव हुन सक्छ। KIPLAN ले तपाईंको विशेष अवस्थाको समीक्षा गर्न सक्छ।',
    requiresHumanReview: true,
    isEscalationTrigger: true,
  },
  {
    category: 'remote_customer',
    patterns: [
      /\b(outside kathmandu|outside nepal|remote|another city|another district|abroad|foreign)\b/i,
      /(kathmandu baira|काठमाडौं बाहिर|nepal baira|नेपाल बाहिर|arko jilla|अर्को जिल्ला)/i,
    ],
    answerEn: 'Whether the service can be completed remotely depends on the nature of the document and the service required. For authenticated Nepali/English document translation, remote submission may be possible. KIPLAN can review your situation.',
    answerNp: 'सेवा दूरस्थ रूपमा पूरा गर्न सकिन्छ वा नभन्ने कागजातको प्रकृति र आवश्यक सेवामा निर्भर गर्छ। प्रमाणित नेपाली/अंग्रेजी कागजात अनुवादको लागि दूरस्थ पेश गर्न सम्भव हुन सक्छ। KIPLAN ले तपाईंको अवस्थाको समीक्षा गर्न सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: true, // Soft handoff
  },
  {
    category: 'foreign_language_translation',
    patterns: [
      /\b(japanese|chinese|german|korean|french|russian|spanish|italian|arabic|hindi|other language)\b/i,
      /(japani|जापानी|chini|चिनियाँ|jarman|जर्मन|korean|कोरियन|french|फ्रान्सेली|russian|रुसी)/i,
    ],
    answerEn: 'KIPLAN translates and certifies authenticated Nepali and English documents. For languages such as Japanese, Chinese, German, Korean, French, or Russian, KIPLAN can assist you in obtaining translation through appropriate resources, including Tribhuvan University – Campus of International Languages where appropriate.',
    answerNp: 'KIPLAN ले प्रमाणित नेपाली र अंग्रेजी कागजातको अनुवाद र प्रमाणीकरण गर्छ। जापानी, चिनियाँ, जर्मन, कोरियन, फ्रान्सेली वा रूसी जस्ता भाषाको लागि KIPLAN ले उपयुक्त स्रोतहरू मार्फत अनुवाद प्राप्त गर्न सहयोग गर्न सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'document_requirements',
    patterns: [
      /\b(what document|need document|required document|document needed|documents required)\b/i,
      /(kagaj chahiyo|कागज चाहियो|k k chahincha|के के चाहिन्छ|document ke chahincha|डकुमेन्ट के चाहिन्छ)/i,
    ],
    answerEn: 'Document requirements depend on the specific service. Generally, original documents and valid identification are required. KIPLAN can advise you precisely once you share what service you need.',
    answerNp: 'कागजात आवश्यकताहरू विशेष सेवामा निर्भर गर्छन्। सामान्यतया मौलिक कागजात र वैध पहिचान आवश्यक पर्छ। तपाईंले कुन सेवा चाहिन्छ भनेर साझा गरेपछि KIPLAN ले ठ्याक्कै सल्लाह दिन सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'document_rejection',
    patterns: [
      /\b(reject|refuse|deny|why rejected|not accepted|why not|kina bhayo)\b/i,
      /(aswikar|अस्वीकार|kina manena|किन मानेन|bhayena|भएन)/i,
    ],
    answerEn: 'A Notary Public may refuse to notarize or certify a document where there are concerns regarding authenticity, compliance, identity, documentation, or other applicable requirements. KIPLAN can review your specific document.',
    answerNp: 'प्रमाणिकता, अनुपालन, पहिचान, कागजात वा अन्य लागू आवश्यकताहरूमा चासो भएमा Notary Public ले कागजात नोटरी वा प्रमाणित गर्न अस्वीकार गर्न सक्छ। KIPLAN ले तपाईंको विशेष कागजातको समीक्षा गर्न सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'document_confidentiality',
    patterns: [
      /\b(confidential|privacy|keep copy|why copy|store document|record keeping)\b/i,
      /(gopaniya|गोपनीय|copy kina|कपी किन|rakheko|राखेको)/i,
    ],
    answerEn: 'Notarial practice involves appropriate record keeping. Your documents are handled with professional confidentiality. For specific questions about your document, KIPLAN can discuss directly with you.',
    answerNp: 'नोटरी अभ्यासमा उचित रेकर्ड राख्ने काम समावेश हुन्छ। तपाईंका कागजातहरू पेशेवर गोपनीयताका साथ ह्यान्डल गरिन्छन्। तपाईंको कागजातसम्बन्धी विशेष प्रश्नको लागि KIPLAN ले तपाईंसँग सीधै छलफल गर्न सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
  {
    category: 'human_request',
    patterns: [
      /\b(human|talk to person|speak to someone|call|phone|representative|agent|real person|staff)\b/i,
      /(manchhe sanga|मान्छेसँग|kura garnu|कुरा गर्नु|phone garnu|फोन गर्नु|bolnu|बोल्नु)/i,
    ],
    answerEn: 'I can connect you with KIPLAN directly. Please click below to talk to a human.',
    answerNp: 'म तपाईंलाई सीधै KIPLAN सँग जडान गर्न सक्छु। कृपया मानिससँग कुरा गर्न तल क्लिक गर्नुहोस्।',
    requiresHumanReview: false,
    isEscalationTrigger: true,
  },
  {
    category: 'complaint',
    patterns: [
      /\b(complaint|unhappy|bad service|problem|issue|dissatisfied|angry|terrible|worst)\b/i,
      /(gUNaso|गुनासो|samasya|समस्या|ramro bhayena|राम्रो भएन|narAmro|नराम्रो)/i,
    ],
    answerEn: 'I am sorry to hear that. KIPLAN takes all concerns seriously. I will connect you with a team member who can address this directly.',
    answerNp: 'मलाई यो सुन्न दुःख लाग्यो। KIPLAN ले सबै चासोहरू गम्भीरतापूर्वक लिन्छ। म तपाईंलाई टोली सदस्यसँग जडान गर्छु जसले यो सीधै सम्बोधन गर्न सक्छ।',
    requiresHumanReview: false,
    isEscalationTrigger: true,
  },
  {
    category: 'fraud_or_irregularity',
    patterns: [
      /\b(fraud|fake|illegal|wrong|cheat|scam|irregular|forgery|forged|not genuine)\b/i,
      /(chalaki|चलाकी|jhyAU|झ्याउ|asli hoina|असली होइन|galat|गलत)/i,
    ],
    answerEn: 'Notarial procedures must comply with applicable requirements. If you have a specific concern about a document or procedure, KIPLAN can discuss the matter with you directly.',
    answerNp: 'नोटरी प्रक्रियाहरू लागू आवश्यकताहरूको पालना गर्नुपर्छ। यदि तपाईंसँग कागजात वा प्रक्रियासम्बन्धी विशेष चासो छ भने, KIPLAN ले तपाईंसँग सीधै यो विषयमा छलफल गर्न सक्छ।',
    requiresHumanReview: true,
    isEscalationTrigger: true,
  },
  {
    category: 'legal_advice',
    patterns: [
      /\b(legal advice|lawyer|court|case|sue|legal|advocate|law|act|section|article)\b/i,
      /(kanuni|कानुनी|vakil|वकील|adalat|अदालत|muddha|मुद्दा|kanun|कानुन)/i,
    ],
    answerEn: 'I cannot provide definitive legal advice. For legal matters, KIPLAN can connect you with the appropriate professional assistance.',
    answerNp: 'म निश्चित कानुनी सल्लाह दिन सक्दिन। कानुनी मामिलाको लागि KIPLAN ले तपाईंलाई उचित पेशेवर सहायतासँग जडान गर्न सक्छ।',
    requiresHumanReview: true,
    isEscalationTrigger: true,
  },
  {
    category: 'general',
    patterns: [
      /\b(what is notary|what do you do|services|help|about kiplan|who are you)\b/i,
      /(kiplan ke ho|KIPLAN के हो|ke garnu hunchha|के गर्नुहुन्छ|sahayog|सहयोग)/i,
    ],
    answerEn: 'KIPLAN Notary provides notarisation, translation, certification, and attestation services. We also assist with affidavits and sponsorship documents. How can we help you today?',
    answerNp: 'KIPLAN Notary ले नोटरीकरण, अनुवाद, प्रमाणीकरण र प्रमाणन सेवाहरू प्रदान गर्छ। हामी शपथपत्र र प्रायोजन कागजातहरूमा पनि सहयोग गर्छौं। आज हामी तपाईंलाई कसरी सहयोग गर्न सक्छौं?',
    requiresHumanReview: false,
    isEscalationTrigger: false,
  },
]

export function detectIntent(message: string): { category: string; confidence: number; entry?: KnowledgeEntry } {
  const lowerMsg = message.toLowerCase().trim()

  for (const entry of knowledgeBase) {
    for (const pattern of entry.patterns) {
      if (pattern.test(lowerMsg)) {
        return { category: entry.category, confidence: 0.95, entry }
      }
    }
  }

  // Fuzzy fallback: check for keyword overlap
  const words = lowerMsg.split(/\s+/)
  for (const entry of knowledgeBase) {
    const allPatterns = entry.patterns.map(p => p.source.toLowerCase())
    for (const word of words) {
      if (word.length < 3) continue
      for (const pat of allPatterns) {
        if (pat.includes(word)) {
          return { category: entry.category, confidence: 0.65, entry }
        }
      }
    }
  }

  return { category: 'unknown', confidence: 0.3 }
}

export function isNepali(text: string): boolean {
  // Check for Devanagari script range
  return /[\u0900-\u097F]/.test(text)
}

export function getResponse(entry: KnowledgeEntry, message: string): string {
  return isNepali(message) && entry.answerNp ? entry.answerNp : entry.answerEn
}
