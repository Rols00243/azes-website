import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getFormations, writeFormations } from '@/lib/server-data'
import type { Formation } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(getFormations())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const body = await req.json()
  if (!body.titre) return NextResponse.json({ error: 'Titre requis' }, { status: 400 })
  const item: Formation = {
    id: 'f-' + Date.now(),
    titre: body.titre,
    duree: body.duree || '',
    zone: body.zone || '',
    places: body.places || 0,
    color: body.color || '#1B4F8C',
  }
  writeFormations([...getFormations(), item])
  return NextResponse.json({ ok: true, item })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const body: Formation = await req.json()
  writeFormations(getFormations().map(f => f.id === body.id ? body : f))
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  writeFormations(getFormations().filter(f => f.id !== id))
  return NextResponse.json({ ok: true })
}
