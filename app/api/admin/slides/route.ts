import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { getSlides, writeJSON } from '@/lib/server-data'
import type { Slide } from '@/lib/server-data'

export async function GET() {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  return NextResponse.json(await getSlides())
}

// PUT = remplace toute la liste (ordre + modifications)
export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const data: Slide[] = await req.json()
  await writeJSON('slides.json', data)
  return NextResponse.json({ ok: true })
}

// POST = ajoute un slide
export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const item: Omit<Slide, 'id'> = await req.json()
  const all = await getSlides()
  const newItem: Slide = { ...item, id: 'slide-' + Date.now() }
  await writeJSON('slides.json', [...all, newItem])
  return NextResponse.json({ ok: true, item: newItem })
}

// DELETE = supprime un slide par id
export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  const { id } = await req.json()
  const all = await getSlides()
  await writeJSON('slides.json', all.filter((s) => s.id !== id))
  return NextResponse.json({ ok: true })
}
