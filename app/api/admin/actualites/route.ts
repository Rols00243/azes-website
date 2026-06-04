import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getActualites, writeJSON } from '@/lib/server-data'
import type { Actualite } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(getActualites())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const item: Omit<Actualite, 'id'> = await req.json()
  const all = getActualites()
  const newItem: Actualite = { ...item, id: Date.now().toString() }
  writeJSON('actualites.json', [newItem, ...all])
  return NextResponse.json({ ok: true, item: newItem })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const updated: Actualite = await req.json()
  const all = getActualites().map((a) => (a.id === updated.id ? updated : a))
  writeJSON('actualites.json', all)
  return NextResponse.json({ ok: true, item: updated })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = getActualites().filter((a) => a.id !== id)
  writeJSON('actualites.json', all)
  return NextResponse.json({ ok: true })
}
