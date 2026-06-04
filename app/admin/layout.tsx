import { isAuthenticated } from '@/lib/admin-auth'
import AdminNav from '@/components/admin/AdminNav'

export const dynamic = 'force-dynamic'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const authed = await isAuthenticated()
  return (
    <div className="min-h-screen bg-gray-50">
      {authed && <AdminNav />}
      <main>{children}</main>
    </div>
  )
}
