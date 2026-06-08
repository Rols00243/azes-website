export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const ProjetsOpportunitesClient = dynamicImport(() => import('./ProjetsOpportunitesClient'), { ssr: false })

export default function Page() {
  return <ProjetsOpportunitesClient />
}
