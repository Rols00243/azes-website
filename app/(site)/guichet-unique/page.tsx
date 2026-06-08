export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const GuichetUniqueClient = dynamicImport(() => import('./GuichetUniqueClient'), { ssr: false })

export default function Page() {
  return <GuichetUniqueClient />
}
