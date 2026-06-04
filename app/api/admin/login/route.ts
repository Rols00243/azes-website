import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { makeToken, checkCredentials } from '@/lib/admin-auth'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  if (!checkCredentials(username, password)) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 })
  }
  const store = await cookies()
  store.set('admin_session', makeToken(), {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
  return NextResponse.json({ ok: true })
}
