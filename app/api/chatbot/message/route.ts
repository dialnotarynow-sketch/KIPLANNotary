import { NextRequest, NextResponse } from 'next/server'
import { processMessage, createInitialState, loadSession, saveSession } from '@/lib/chatbot/engine'
import { createHandoff } from '@/lib/chatbot/handoff'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { message, sessionId } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    const sid = sessionId || crypto.randomUUID()
    let state = await loadSession(sid) || createInitialState(sid)

    // Add user message
    state.messages.push({ role: 'user', content: message })

    // Process
    const result = await processMessage(message, state)
    state = result.newState

    // Add assistant response
    state.messages.push({
      role: 'assistant',
      content: result.response,
      intent: state.handoffReason || 'response',
    })

    // Persist session to database
    await saveSession(state)

    // If handoff, create inquiry record
    let handoffData = null
    if (state.handoffTriggered && !state.handoffReason?.startsWith('saved_')) {
      try {
        handoffData = await createHandoff(state)
        state.handoffReason = 'saved_' + (state.handoffReason || 'unknown')
        await saveSession(state)
      } catch (e) {
        console.error('Handoff creation failed:', e)
      }
    }

    return NextResponse.json({
      response: result.response,
      sessionId: sid,
      shouldHandoff: result.shouldHandoff || state.handoffTriggered,
      handoffData,
      customerInfo: state.customerInfo,
    })
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or contact KIPLAN directly.' },
      { status: 500 }
    )
  }
}
