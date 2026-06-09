import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getMessages, getUnreadCount, writeJSON } from '@/lib/server-data'
import type { Message } from '@/lib/server-data'

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  if (searchParams.get('count') === 'true') {
    return NextResponse.json({ unread: await getUnreadCount() })
  }
  return NextResponse.json(await getMessages())
}

// PUT — marquer comme lu / non lu
export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id, lu }: { id: string; lu: boolean } = await req.json()
  const all = (await getMessages()).map((m): Message => m.id === id ? { ...m, lu } : m)
  await writeJSON('messages.json', all)
  return NextResponse.json({ ok: true })
}

// DELETE — supprimer un message
export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = await getMessages()
  await writeJSON('messages.json', all.filter((m) => m.id !== id))
  return NextResponse.json({ ok: true })
}
