import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/admin-auth'
import { writeFileSync, mkdirSync, existsSync } from 'fs'
import { join } from 'path'

const IS_VERCEL = !!process.env.VERCEL
// On Vercel, write to /tmp (ephemeral but works within a session)
// Locally, write to public/documents for static serving
const UPLOAD_DIR = IS_VERCEL ? '/tmp/azes-uploads' : join(process.cwd(), 'public', 'documents')

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'Aucun fichier' }, { status: 400 })

    // Sanitize filename
    const originalName = file.name.replace(/[^a-zA-Z0-9._\-]/g, '_')
    const timestamp = Date.now()
    const filename = `${timestamp}_${originalName}`

    // Ensure upload directory exists
    if (!existsSync(UPLOAD_DIR)) mkdirSync(UPLOAD_DIR, { recursive: true })

    // Write file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    writeFileSync(join(UPLOAD_DIR, filename), buffer)

    // Return the URL for accessing the file
    const url = IS_VERCEL
      ? `/api/files/${filename}`
      : `/documents/${filename}`

    return NextResponse.json({ ok: true, url, filename, size: file.size, name: file.name })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Erreur lors du téléversement' }, { status: 500 })
  }
}
