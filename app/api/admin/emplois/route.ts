import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getEmplois, writeJSON } from '@/lib/server-data'
import type { Emploi } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(getEmplois())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const item: Omit<Emploi, 'id'> = await req.json()
  const all = getEmplois()
  const newItem: Emploi = { ...item, id: Date.now().toString() }
  writeJSON('emplois.json', [newItem, ...all])
  return NextResponse.json({ ok: true, item: newItem })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const updated: Emploi = await req.json()
  const all = getEmplois().map((e) => (e.id === updated.id ? updated : e))
  writeJSON('emplois.json', all)
  return NextResponse.json({ ok: true, item: updated })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = getEmplois().filter((e) => e.id !== id)
  writeJSON('emplois.json', all)
  return NextResponse.json({ ok: true })
}
