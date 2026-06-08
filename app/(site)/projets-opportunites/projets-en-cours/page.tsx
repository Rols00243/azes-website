export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const ProjetsEnCoursClient = dynamicImport(() => import('./ProjetsEnCoursClient'), { ssr: false })

export default function Page() {
  return <ProjetsEnCoursClient />
}
