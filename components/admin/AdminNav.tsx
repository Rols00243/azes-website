'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  HomeIcon, ChartBarIcon, MapIcon, BriefcaseIcon,
  NewspaperIcon, UserGroupIcon, PhotoIcon,
  DocumentTextIcon, MegaphoneIcon, InboxIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

const nav = [
  { href: '/admin/dashboard',     label: 'Tableau de bord', icon: HomeIcon },
  { href: '/admin/slides',        label: 'Slides',          icon: PhotoIcon },
  { href: '/admin/statistiques',  label: 'Statistiques',    icon: ChartBarIcon },
  { href: '/admin/zones',         label: 'Zones',           icon: MapIcon },
  { href: '/admin/projets',       label: 'Projets',         icon: BriefcaseIcon },
  { href: '/admin/appels-offres', label: "Appels d'offres", icon: MegaphoneIcon },
  { href: '/admin/actualites',    label: 'Actualités',      icon: NewspaperIcon },
  { href: '/admin/documents',     label: 'Documents',       icon: DocumentTextIcon },
  { href: '/admin/emplois',       label: 'Emplois',         icon: UserGroupIcon },
  { href: '/admin/messages',      label: 'Messages',        icon: InboxIcon, badge: true },
]

export default function AdminNav() {
  const pathname = usePathname()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    fetch('/api/admin/messages?count=true')
      .then(r => r.ok ? r.json() : { unread: 0 })
      .then(d => setUnread(d.unread || 0))
      .catch(() => {})
  }, [pathname]) // rafraîchir à chaque navigation

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    window.location.href = '/admin/login'
  }

  return (
    <header className="bg-[#0A2342] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <div className="font-bold text-base tracking-tight flex-shrink-0">
              AZES <span className="text-white/40 font-normal text-xs ml-1">Admin</span>
            </div>
            {/* Desktop nav */}
            <nav className="hidden xl:flex gap-0.5">
              {nav.map((item) => {
                const isActive = pathname.startsWith(item.href)
                const count = item.badge ? unread : 0
                return (
                  <Link key={item.href} href={item.href}
                    className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                      isActive ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'
                    }`}>
                    <item.icon className="w-3.5 h-3.5 flex-shrink-0" />
                    {item.label}
                    {count > 0 && (
                      <span className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
                        {count > 9 ? '9+' : count}
                      </span>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
          <button onClick={logout}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/60 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0">
            <ArrowRightOnRectangleIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Mobile / tablet scrollable nav */}
      <div className="xl:hidden overflow-x-auto border-t border-white/10">
        <div className="flex gap-0.5 px-4 py-2 min-w-max">
          {nav.map((item) => {
            const isActive = pathname.startsWith(item.href)
            const count = item.badge ? unread : 0
            return (
              <Link key={item.href} href={item.href}
                className={`relative flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
                }`}>
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
                {count > 0 && (
                  <span className="ml-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </header>
  )
}
