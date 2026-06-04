import { createHmac } from 'crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const getSecret = () => process.env.ADMIN_SECRET || 'changez-moi'
const getUsername = () => process.env.ADMIN_USERNAME || 'admin'
const getPassword = () => process.env.ADMIN_PASSWORD || 'admin'

export function makeToken(): string {
  return createHmac('sha256', getSecret())
    .update(getUsername() + ':' + getPassword())
    .digest('hex')
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const token = store.get('admin_session')?.value
  return !!token && token === makeToken()
}

export async function requireAuth(): Promise<void> {
  if (!(await isAuthenticated())) redirect('/admin/login')
}

export function checkCredentials(username: string, password: string): boolean {
  return username === getUsername() && password === getPassword()
}
