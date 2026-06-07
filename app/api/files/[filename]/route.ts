/**
 * Serves uploaded files from /tmp/azes-uploads on Vercel.
 * Locally, files are in public/documents/ and served statically.
 */
import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join, extname } from 'path'

const MIME: Record<string, string> = {
  '.pdf':  'application/pdf',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc':  'application/msword',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.xls':  'application/vnd.ms-excel',
  '.zip':  'application/zip',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { filename: string } }
) {
  const filename = params.filename
  if (!filename || filename.includes('..')) {
    return NextResponse.json({ error: 'Fichier invalide' }, { status: 400 })
  }

  const filePath = join('/tmp/azes-uploads', filename)
  if (!existsSync(filePath)) {
    return NextResponse.json({ error: 'Fichier non trouvé' }, { status: 404 })
  }

  const ext = extname(filename).toLowerCase()
  const contentType = MIME[ext] ?? 'application/octet-stream'
  const data = readFileSync(filePath)

  return new NextResponse(data, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
