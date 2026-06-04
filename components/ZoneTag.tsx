import clsx from 'clsx'

const zoneColors: Record<string, string> = {
  'zone-franche-matadi': 'bg-green-100 text-green-800 border-green-200',
  'zone-tech-kinshasa': 'bg-blue-100 text-blue-800 border-blue-200',
  'zone-agro-kasai': 'bg-amber-100 text-amber-800 border-amber-200',
  'zone-miniere-lubumbashi': 'bg-orange-100 text-orange-800 border-orange-200',
}

interface Props {
  zone: string
  zoneSlug?: string
  className?: string
}

export default function ZoneTag({ zone, zoneSlug, className }: Props) {
  const colorClass = zoneSlug ? (zoneColors[zoneSlug] ?? 'bg-gray-100 text-gray-600 border-gray-200') : 'bg-gray-100 text-gray-600 border-gray-200'
  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border', colorClass, className)}>
      {zone}
    </span>
  )
}
