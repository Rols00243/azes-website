import clsx from 'clsx'

type Status = 'En cours' | 'Clôturé' | 'Urgent' | 'Planifié' | 'Démarrage' | 'Finalisé' | 'À venir' | 'AO' | 'AMI'

const styles: Record<Status, string> = {
  'En cours': 'bg-blue-100 text-blue-800 border-blue-200',
  'Clôturé': 'bg-gray-100 text-gray-600 border-gray-200',
  'Urgent': 'bg-red-100 text-red-700 border-red-200',
  'Planifié': 'bg-purple-100 text-purple-700 border-purple-200',
  'Démarrage': 'bg-yellow-100 text-yellow-700 border-yellow-200',
  'Finalisé': 'bg-green-100 text-green-700 border-green-200',
  'À venir': 'bg-orange-100 text-orange-700 border-orange-200',
  'AO': 'bg-azes-blue/10 text-azes-blue border-azes-blue/20',
  'AMI': 'bg-azes-brown/10 text-azes-brown-dark border-azes-brown/20',
}

interface Props {
  status: Status
  className?: string
}

export default function StatusBadge({ status, className }: Props) {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        styles[status] ?? 'bg-gray-100 text-gray-600 border-gray-200',
        className
      )}
    >
      {status}
    </span>
  )
}
