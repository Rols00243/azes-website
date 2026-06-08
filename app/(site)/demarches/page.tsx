export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const DemarchesClient = dynamicImport(() => import('./DemarchesClient'), { ssr: false })

export default function Page() {
  return <DemarchesClient />
}
