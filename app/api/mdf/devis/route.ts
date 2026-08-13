import { NextRequest, NextResponse } from 'next/server'
import { readJSON, writeJSON } from '@/lib/server-data'

const FICHIER = 'mdf-demandes.json'

export interface DemandeDevis {
  id: string
  date: string
  projet: string
  espace: string
  description: string
  dimensions: string
  budget: string
  echeance: string
  finition: string
  nom: string
  telephone: string
  email: string
  commune: string
  lu: boolean
}

const texte = (v: unknown, max = 2000) => String(v ?? '').trim().slice(0, max)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const nom = texte(body.nom, 120)
    const telephone = texte(body.telephone, 40)
    const projet = texte(body.projet, 80)

    if (!nom || !telephone || !projet) {
      return NextResponse.json(
        { error: 'Nom, téléphone et type de projet sont requis.' },
        { status: 400 }
      )
    }

    const demande: DemandeDevis = {
      id: 'devis-' + Date.now(),
      date: new Date().toISOString(),
      projet,
      espace: texte(body.espace, 120),
      description: texte(body.description),
      dimensions: texte(body.dimensions, 120),
      budget: texte(body.budget, 80),
      echeance: texte(body.echeance, 80),
      finition: texte(body.finition, 80),
      nom,
      telephone,
      email: texte(body.email, 160),
      commune: texte(body.commune, 120),
      lu: false,
    }

    const existantes = await readJSON<DemandeDevis[]>(FICHIER, [])
    await writeJSON(FICHIER, [demande, ...existantes].slice(0, 500))

    return NextResponse.json({ ok: true, reference: demande.id })
  } catch {
    return NextResponse.json(
      { error: 'Impossible d’enregistrer la demande. Réessayez ou appelez-nous.' },
      { status: 500 }
    )
  }
}
