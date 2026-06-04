import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getZonesDetail, writeJSON } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(getZonesDetail())
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const data = await req.json()
  writeJSON('zones-detail.json', data)
  return NextResponse.json({ ok: true })
}

/** PATCH: update a single block for a single zone
 *  Body: { slug, block: 'foncier'|'activite'|'infrastructures'|'impact', data: {...} }
 */
export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { slug, block, data } = await req.json()
  if (!slug || !block || !data) return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })
  const all = getZonesDetail()
  if (!all[slug]) return NextResponse.json({ error: 'Zone introuvable' }, { status: 404 })
  all[slug] = { ...all[slug], [block]: { ...all[slug][block as keyof typeof all[typeof slug]], ...data } }
  writeJSON('zones-detail.json', all)
  return NextResponse.json({ ok: true })
}
