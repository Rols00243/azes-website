export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const ZonesClient = dynamicImport(() => import('./ZonesClient'), { ssr: false })

export default function Page() {
  return <ZonesClient />
}
