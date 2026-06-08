export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const AProposClient = dynamicImport(() => import('./AProposClient'), { ssr: false })

export default function Page() {
  return <AProposClient />
}
