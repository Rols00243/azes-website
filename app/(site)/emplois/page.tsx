export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'
import { getEmplois } from '@/lib/server-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Emplois & Compétences — AZES',
  description: 'Trouvez votre emploi dans les Zones Économiques Spéciales de la RDC.',
}

const EmploisClient = dynamicImport(() => import('./EmploisClient'), { ssr: false })

export default function EmploisPage() {
  const offres = getEmplois()
  return <EmploisClient offres={offres} />
}
