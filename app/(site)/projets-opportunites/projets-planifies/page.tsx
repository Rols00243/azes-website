export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const ProjetsPlanifiesClient = dynamicImport(() => import('./ProjetsPlanifiesClient'), { ssr: false })

export default function Page() {
  return <ProjetsPlanifiesClient />
}
