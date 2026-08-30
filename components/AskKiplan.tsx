"use client"

import { useState, useEffect } from "react"
import SectionReveal from "./SectionReveal"
import { MessageSquare, Send, AlertTriangle, Bot } from "lucide-react"

const sampleQuestions = [
  "What documents do I need for translation?",
  "How long does notarisation take?",
  "Can I request translation online?",
  "What is the correction policy?",
]

const SESSION_STORAGE_KEY = "kiplan_chat_session_id"

export default function AskKiplan() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Namaste! I am Ask KIPLAN, your front-desk information assistant. I can answer general questions about notarial services, translation procedures, and document preparation. For complex matters or professional decisions, please contact the office directly via WhatsApp.",
    },
  ])
  const [input, setInput] = useState("")
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  // Restore an existing session on load, so a page refresh doesn't lose
  // conversation continuity (the backend keeps the full transcript keyed
  // to this id; we only need to remember the id itself here).
  useEffect(() => {
    const existing = window.localStorage.getItem(SESSION_STORAGE_KEY)
    if (existing) setSessionId(existing)
  }, [])

  const handleSend = async () => {
    if (!input.trim() || sending) return
    const userMessage = input
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setInput("")
    setSending(true)

    try {
      const res = await fetch("/api/chatbot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, sessionId }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data?.error || "Request failed")

      if (data.sessionId && data.sessionId !== sessionId) {
        setSessionId(data.sessionId)
        window.localStorage.setItem(SESSION_STORAGE_KEY, data.sessionId)
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong on my end. Please contact KIPLAN directly via WhatsApp at +977-9849530970 or visit the office.",
        },
      ])
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <SectionReveal>
              <span className="text-sm font-medium text-crimson uppercase tracking-wider">AI Front Desk</span>
              <h2 className="font-display text-3xl lg:text-4xl text-deep-blue mt-3 mb-4">
                Ask KIPLAN
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Get quick answers to general questions about services, procedures, and document preparation. 
                Ask KIPLAN is available 24/7 for information — but remember, professional decisions always remain with the Notary.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <div className="space-y-3 mb-6">
                {sampleQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="block w-full text-left px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-deep-blue hover:text-deep-blue transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </SectionReveal>

            <SectionReveal delay={0.3}>
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Important</p>
                  <p className="text-xs text-amber-700 mt-1">
                    Ask KIPLAN provides general information only. It cannot certify documents, make professional determinations, 
                    or access private client records. For complex matters, please use WhatsApp or visit the office.
                  </p>
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Chat Interface */}
          <SectionReveal delay={0.2}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 bg-deep-blue flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Ask KIPLAN</p>
                  <p className="text-xs text-white/60">Information Assistant</p>
                </div>
              </div>

              {/* Messages */}
              <div className="h-80 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "assistant" ? "bg-deep-blue/10" : "bg-crimson/10"
                    }`}>
                      {msg.role === "assistant" ? (
                        <Bot className="w-4 h-4 text-deep-blue" />
                      ) : (
                        <MessageSquare className="w-4 h-4 text-crimson" />
                      )}
                    </div>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-lg text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-deep-blue text-white"
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type your question..."
                    disabled={sending}
                    className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-deep-blue/20 focus:border-deep-blue disabled:opacity-60"
                  />
                  <button
                    onClick={handleSend}
                    disabled={sending}
                    className="px-4 py-2.5 bg-deep-blue text-white rounded-lg hover:bg-deep-blue-light transition-colors disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
