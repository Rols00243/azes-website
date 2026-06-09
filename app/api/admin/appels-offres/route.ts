import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getAppelsOffresAdmin, writeJSON } from '@/lib/server-data'
import type { AppelOffreAdmin } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(await getAppelsOffresAdmin())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const item: Omit<AppelOffreAdmin, 'id'> = await req.json()
  const all = await getAppelsOffresAdmin()
  const newItem: AppelOffreAdmin = { ...item, id: 'ao-' + Date.now() }
  await writeJSON('appels-offres-data.json', [newItem, ...all])
  return NextResponse.json({ ok: true, item: newItem })
}

// PUT = mise à jour d'un appel existant (ex: changer le statut)
export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const updated: AppelOffreAdmin = await req.json()
  const all = (await getAppelsOffresAdmin()).map((a) => (a.id === updated.id ? updated : a))
  await writeJSON('appels-offres-data.json', all)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = await getAppelsOffresAdmin()
  await writeJSON('appels-offres-data.json', all.filter((a) => a.id !== id))
  return NextResponse.json({ ok: true })
}
