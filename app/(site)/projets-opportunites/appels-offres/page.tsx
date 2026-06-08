export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const AppelsOffresClient = dynamicImport(() => import('./AppelsOffresClient'), { ssr: false })

export default function Page() {
  return <AppelsOffresClient />
}
