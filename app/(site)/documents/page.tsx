export const dynamic = 'force-dynamic'

import dynamicImport from 'next/dynamic'

const DocumentsClient = dynamicImport(() => import('./DocumentsClient'), { ssr: false })

export default function DocumentsPage() {
  return <DocumentsClient />
}
