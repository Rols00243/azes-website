import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getCompteEmails, writeJSON } from '@/lib/server-data'
import type { CompteEmail } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(getCompteEmails())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const body = await req.json()
  const item: Omit<CompteEmail, 'id' | 'adresse' | 'dateCreation'> & { motDePasse?: string } = body

  // Générer l'adresse email
  const prenomSlug = item.prenom.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '.')
  const nomSlug = item.nom.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '.')
  const adresse = `${prenomSlug}.${nomSlug}@azes.cd`

  // Utiliser le mot de passe fourni, ou en générer un automatiquement
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#!'
  const motDePasse = (item.motDePasse && item.motDePasse.trim())
    ? item.motDePasse.trim()
    : Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')

  const all = getCompteEmails()
  const newItem: CompteEmail = {
    ...item,
    id: Date.now().toString(),
    adresse,
    motDePasse,
    actif: true,
    dateCreation: new Date().toISOString().split('T')[0],
  }
  writeJSON('emails.json', [newItem, ...all])
  return NextResponse.json({ ok: true, item: newItem })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const updated: CompteEmail = await req.json()
  const all = getCompteEmails().map((e) => (e.id === updated.id ? updated : e))
  writeJSON('emails.json', all)
  return NextResponse.json({ ok: true, item: updated })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = getCompteEmails().filter((e) => e.id !== id)
  writeJSON('emails.json', all)
  return NextResponse.json({ ok: true })
}
