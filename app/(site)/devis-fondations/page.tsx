export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Devis Fondations — calculateur de métré',
  description:
    "Calculez les fouilles, le béton, les barres de fer, le fil d'attache, les planches, les clous, les blocs et les tuyaux d'attente de vos fondations, puis éditez le devis chiffré.",
  manifest: '/devis-fondations.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Devis Fondations',
    statusBarStyle: 'default',
  },
  icons: {
    icon: '/icons/devis-192.png',
    apple: '/icons/devis-180.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1B4F8C',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

const DevisFondationsClient = dynamicImport(() => import('./DevisFondationsClient'), { ssr: false })

export default function DevisFondationsPage() {
  return <DevisFondationsClient />
}
