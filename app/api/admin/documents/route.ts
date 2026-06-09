import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getDocumentsAdmin, writeJSON } from '@/lib/server-data'
import type { DocumentAdmin } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(await getDocumentsAdmin())
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const item: Omit<DocumentAdmin, 'id'> = await req.json()
  const all = await getDocumentsAdmin()
  const newItem: DocumentAdmin = { ...item, id: 'doc-' + Date.now() }
  await writeJSON('documents-data.json', [newItem, ...all])
  return NextResponse.json({ ok: true, item: newItem })
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const updated: DocumentAdmin = await req.json()
  const all = await getDocumentsAdmin()
  await writeJSON('documents-data.json', all.map((d) => (d.id === updated.id ? updated : d)))
  return NextResponse.json({ ok: true, item: updated })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = await getDocumentsAdmin()
  await writeJSON('documents-data.json', all.filter((d) => d.id !== id))
  return NextResponse.json({ ok: true })
}
