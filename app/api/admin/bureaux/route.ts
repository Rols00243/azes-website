import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getBureaux, writeJSON } from '@/lib/server-data'
import type { BureauContact } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(await getBureaux())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const item: Omit<BureauContact, 'id'> = await req.json()
  const all = await getBureaux()
  const newItem: BureauContact = { ...item, id: 'bureau-' + Date.now() }
  await writeJSON('bureaux.json', [...all, newItem])
  return NextResponse.json({ ok: true, item: newItem })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const updated: BureauContact = await req.json()
  const all = await getBureaux()
  await writeJSON('bureaux.json', all.map(b => b.id === updated.id ? updated : b))
  return NextResponse.json({ ok: true, item: updated })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = await getBureaux()
  await writeJSON('bureaux.json', all.filter(b => b.id !== id))
  return NextResponse.json({ ok: true })
}
