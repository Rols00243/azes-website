export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const OpportunitesClient = dynamicImport(() => import('./OpportunitesClient'), { ssr: false })

export default function Page() {
  return <OpportunitesClient />
}
