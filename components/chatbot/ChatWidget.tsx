'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! Welcome to KIPLAN Notary. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const [showHandoff, setShowHandoff] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')
  const [error, setError] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    setError('')

    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setLoading(true)

    try {
      const res = await fetch('/api/chatbot/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Failed to get response')
      }

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      setSessionId(data.sessionId)

      if (data.shouldHandoff || data.handoffData) {
        setShowHandoff(true)
        if (data.handoffData?.referenceNumber) {
          setReferenceNumber(data.handoffData.referenceNumber)
        }
      }
    } catch (e: any) {
      setError(e.message || 'Connection error')
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I am having trouble connecting. Please contact KIPLAN directly via WhatsApp or phone.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const triggerHandoff = async () => {
    if (!sessionId) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/chatbot/handoff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}))
        throw new Error(errData.error || 'Handoff failed')
      }

      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      if (data.handoffData?.referenceNumber) {
        setReferenceNumber(data.handoffData.referenceNumber)
      }
      setShowHandoff(true)
    } catch (e: any) {
      setError(e.message || 'Handoff failed')
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Failed to connect. Please WhatsApp or call KIPLAN directly.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const getWhatsAppLink = () => {
    const text = referenceNumber 
      ? `Hello KIPLAN, my reference is ${referenceNumber}` 
      : 'Hello KIPLAN, I need assistance.'
    return `https://wa.me/?text=${encodeURIComponent(text)}`
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all"
          aria-label="Open chat"
        >
          💬 Ask KIPLAN
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] flex flex-col border border-gray-200">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Ask KIPLAN</h3>
              <p className="text-xs text-blue-100">Initial Customer Assistant</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200" aria-label="Close chat">✕</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                  msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-500">Typing...</div>
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-50 text-red-600 p-2 rounded text-xs">{error}</div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-200 space-y-2">
            {showHandoff && (
              <div className="flex gap-2">
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white text-center py-2 rounded-md text-sm hover:bg-green-700"
                >
                  📱 WhatsApp KIPLAN
                </a>
                <button
                  onClick={triggerHandoff}
                  disabled={loading}
                  className="flex-1 bg-gray-800 text-white py-2 rounded-md text-sm hover:bg-gray-900 disabled:opacity-50"
                >
                  📋 Send to Team
                </button>
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 disabled:opacity-50"
              >
                Send
              </button>
            </div>
            {referenceNumber && (
              <p className="text-xs text-center text-gray-500">Ref: {referenceNumber}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
