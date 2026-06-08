import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getZoneProjets, writeJSON } from '@/lib/server-data'
import type { ZoneProjet } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(getZoneProjets())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const item: Omit<ZoneProjet, 'id' | 'dateCreation'> = await req.json()
  const all = getZoneProjets()
  const newItem: ZoneProjet = {
    ...item,
    id: 'zp-' + Date.now(),
    dateCreation: new Date().toISOString().split('T')[0],
  }
  writeJSON('zone-projets.json', [...all, newItem])
  return NextResponse.json({ ok: true, item: newItem })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const updated: ZoneProjet = await req.json()
  writeJSON('zone-projets.json', getZoneProjets().map(p => p.id === updated.id ? updated : p))
  return NextResponse.json({ ok: true, item: updated })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  writeJSON('zone-projets.json', getZoneProjets().filter(p => p.id !== id))
  return NextResponse.json({ ok: true })
}
