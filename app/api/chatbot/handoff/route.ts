import { NextRequest, NextResponse } from 'next/server'
import { createHandoff } from '@/lib/chatbot/handoff'
import { loadSession, saveSession } from '@/lib/chatbot/engine'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { sessionId } = body

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    const state = await loadSession(sessionId)
    if (!state) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    state.handoffTriggered = true
    state.handoffReason = state.handoffReason || 'explicit_user_request'

    const handoffData = await createHandoff(state)
    state.handoffReason = 'saved_' + state.handoffReason
    await saveSession(state)

    return NextResponse.json({
      success: true,
      handoffData,
      message: 'You have been connected with KIPLAN. A team member will assist you shortly.',
    })
  } catch (error) {
    console.error('Handoff error:', error)
    return NextResponse.json(
      { error: 'Failed to create handoff. Please contact KIPLAN directly via WhatsApp or phone.' },
      { status: 500 }
    )
  }
}
