import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getEntreprisesEmploi, writeEntreprisesEmploi } from '@/lib/server-data'
import type { EntrepriseEmploi } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(await getEntreprisesEmploi())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const body = await req.json()
  if (!body.nom) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })
  const item: EntrepriseEmploi = {
    id: 'e-' + Date.now(),
    nom: body.nom,
    zone: body.zone || '',
    emplois: body.emplois || 0,
    color: body.color || '#1B4F8C',
  }
  const all = await getEntreprisesEmploi()
  await writeEntreprisesEmploi([...all, item])
  return NextResponse.json({ ok: true, item })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const body: EntrepriseEmploi = await req.json()
  const all = await getEntreprisesEmploi()
  await writeEntreprisesEmploi(all.map(e => e.id === body.id ? body : e))
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = await getEntreprisesEmploi()
  await writeEntreprisesEmploi(all.filter(e => e.id !== id))
  return NextResponse.json({ ok: true })
}
