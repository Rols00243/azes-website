import type { Document } from '@/lib/data/documents'
import { categoryConfig } from '@/lib/data/documents'
import { ArrowDownTrayIcon, DocumentTextIcon, TableCellsIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const typeIcons = {
  PDF: DocumentTextIcon,
  DOCX: DocumentTextIcon,
  ZIP: ArchiveBoxIcon,
  XLSX: TableCellsIcon,
}

interface Props {
  doc: Document
  view?: 'grid' | 'list'
}

export default function DocumentCard({ doc, view = 'grid' }: Props) {
  const Icon = typeIcons[doc.type] ?? DocumentTextIcon
  const cfg = categoryConfig[doc.categorie]
  const color = cfg?.color ?? '#1B4F8C'

  if (view === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-azes-blue/30 hover:shadow-sm transition-all group">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-opacity"
          style={{ backgroundColor: color + '15' }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-800 truncate">{doc.titre}</div>
          <div className="flex flex-wrap gap-2 mt-1 items-center">
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
              style={{ backgroundColor: color }}
            >
              {doc.categorie}
            </span>
            {doc.reference && (
              <span className="text-xs text-gray-400 font-mono">{doc.reference}</span>
            )}
            {doc.zone && <span className="text-xs text-gray-400">{doc.zone}</span>}
          </div>
        </div>
        <div className="hidden md:flex flex-col items-end text-xs text-gray-400 flex-shrink-0 gap-0.5">
          <span>{format(new Date(doc.datePublication), 'dd MMM yyyy', { locale: fr })}</span>
          <span>{doc.taille} · {doc.type}</span>
          <span>{doc.telechargements.toLocaleString('fr-FR')} téléch.</span>
        </div>
        <button
          aria-label={`Télécharger ${doc.titre}`}
          className="flex-shrink-0 p-2.5 rounded-lg text-white hover:opacity-90 transition-all active:scale-95"
          style={{ backgroundColor: color }}
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-all group flex flex-col"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color + '15' }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <span className="text-xs font-bold text-gray-300 uppercase">{doc.type}</span>
      </div>

      <h3 className="font-semibold text-sm text-gray-800 leading-snug mb-2 flex-1 line-clamp-3">
        {doc.titre}
      </h3>

      {doc.reference && (
        <div className="text-xs text-gray-400 font-mono mb-2">{doc.reference}</div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium text-white"
          style={{ backgroundColor: color }}
        >
          {doc.categorie}
        </span>
        {doc.zone && (
          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">
            {doc.zone.replace('ZES de ', '').replace('ZESTA de ', '')}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-50 text-xs text-gray-400 mb-3">
        <span>{format(new Date(doc.datePublication), 'dd/MM/yyyy')}</span>
        <span>{doc.taille}</span>
      </div>

      <button
        aria-label={`Télécharger ${doc.titre}`}
        className="w-full py-2.5 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 active:scale-95 hover:opacity-90 transition-all"
        style={{ backgroundColor: color }}
      >
        <ArrowDownTrayIcon className="w-4 h-4" />
        Télécharger
      </button>
    </div>
  )
}
