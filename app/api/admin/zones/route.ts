import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getZonesStats, getCustomZones, writeCustomZones, writeJSON, getHiddenZones, writeHiddenZones } from '@/lib/server-data'
import type { CustomZone } from '@/lib/server-data'
import { zones as staticZones } from '@/lib/data/zones'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json({ stats: getZonesStats(), custom: getCustomZones(), hidden: getHiddenZones() })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const data = await req.json()
  writeJSON('zones-stats.json', data)
  return NextResponse.json({ ok: true })
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const zone: Omit<CustomZone, 'slug'> & { name: string } = await req.json()
  if (!zone.name) return NextResponse.json({ error: 'Nom requis' }, { status: 400 })

  // Generate slug from name
  const slug = 'zes-' + zone.name
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

  const all = getCustomZones()
  // Avoid duplicate slugs
  if (all.some(z => z.slug === slug)) {
    return NextResponse.json({ error: 'Une zone avec ce nom existe déjà' }, { status: 409 })
  }

  const newZone: CustomZone = {
    slug,
    name: zone.name,
    region: zone.region || '',
    color: zone.color || '#1B4F8C',
    emplois: zone.emplois || 0,
    entreprises: zone.entreprises || 0,
    investissement: zone.investissement || '$0',
  }
  writeCustomZones([...all, newZone])
  return NextResponse.json({ ok: true, zone: newZone })
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { slug, name, region, color } = await req.json()
  const all = getCustomZones().map(z =>
    z.slug === slug ? { ...z, name: name || z.name, region: region ?? z.region, color: color || z.color } : z
  )
  writeCustomZones(all)
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { slug } = await req.json()

  const isStatic = staticZones.some(z => z.slug === slug)

  if (isStatic) {
    // Zone statique : l'ajouter à la liste des zones masquées
    const hidden = getHiddenZones()
    if (!hidden.includes(slug)) {
      writeHiddenZones([...hidden, slug])
    }
  } else {
    // Zone personnalisée : la supprimer de custom-zones.json
    writeCustomZones(getCustomZones().filter(z => z.slug !== slug))
  }

  return NextResponse.json({ ok: true })
}

// Restaurer toutes les zones masquées
export async function OPTIONS() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  writeHiddenZones([])
  return NextResponse.json({ ok: true })
}
