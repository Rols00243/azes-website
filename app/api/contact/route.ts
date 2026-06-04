import { NextRequest, NextResponse } from 'next/server'
import { getMessages, writeJSON } from '@/lib/server-data'
import type { Message } from '@/lib/server-data'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nom, email, telephone, sujet, message } = body

    if (!nom || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const newMessage: Message = {
      id: 'msg-' + Date.now(),
      nom: String(nom).trim(),
      email: String(email).trim(),
      telephone: String(telephone || '').trim(),
      sujet: String(sujet || 'Général').trim(),
      message: String(message).trim(),
      date: new Date().toISOString(),
      lu: false,
    }

    const all = getMessages()
    writeJSON('messages.json', [newMessage, ...all])

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
