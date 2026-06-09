import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getProjetsItems, writeJSON } from '@/lib/server-data'
import type { ProjetItem } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(await getProjetsItems())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const item: Omit<ProjetItem, 'id'> = await req.json()
  const all = await getProjetsItems()
  const newItem: ProjetItem = { ...item, id: 'proj-' + Date.now() }
  await writeJSON('projets-items.json', [newItem, ...all])
  return NextResponse.json({ ok: true, item: newItem })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const updated: ProjetItem = await req.json()
  const all = await getProjetsItems()
  await writeJSON('projets-items.json', all.map(p => p.id === updated.id ? updated : p))
  return NextResponse.json({ ok: true, item: updated })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = await getProjetsItems()
  await writeJSON('projets-items.json', all.filter(p => p.id !== id))
  return NextResponse.json({ ok: true })
}
