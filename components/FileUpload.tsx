'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DocumentArrowUpIcon, XMarkIcon, CheckCircleIcon, DocumentTextIcon, ArchiveBoxIcon, TableCellsIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface UploadedFile {
  file: File
  id: string
  preview?: string
}

interface Props {
  label?: string
  accept?: string
  multiple?: boolean
  maxSizeMB?: number
  hint?: string
  required?: boolean
  onChange?: (files: File[]) => void
}

const typeIcon = (name: string) => {
  const ext = name.split('.').pop()?.toLowerCase()
  if (['pdf'].includes(ext ?? '')) return DocumentTextIcon
  if (['zip', 'rar', '7z'].includes(ext ?? '')) return ArchiveBoxIcon
  if (['xls', 'xlsx', 'csv'].includes(ext ?? '')) return TableCellsIcon
  return DocumentTextIcon
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`
}

export default function FileUpload({
  label = 'Pièces jointes',
  accept = '.pdf,.doc,.docx,.xls,.xlsx,.zip,.jpg,.jpeg,.png',
  multiple = true,
  maxSizeMB = 10,
  hint,
  required = false,
  onChange,
}: Props) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      setError(null)
      const valid: UploadedFile[] = []
      const maxBytes = maxSizeMB * 1024 * 1024

      Array.from(incoming).forEach((file) => {
        if (file.size > maxBytes) {
          setError(`"${file.name}" dépasse la taille maximale de ${maxSizeMB} Mo.`)
          return
        }
        if (!multiple && files.length + valid.length >= 1) return
        valid.push({ file, id: `${file.name}-${Date.now()}-${Math.random()}` })
      })

      const updated = multiple ? [...files, ...valid] : valid
      setFiles(updated)
      onChange?.(updated.map((f) => f.file))
    },
    [files, maxSizeMB, multiple, onChange]
  )

  const removeFile = (id: string) => {
    const updated = files.filter((f) => f.id !== id)
    setFiles(updated)
    onChange?.(updated.map((f) => f.file))
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={clsx(
          'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200',
          dragging
            ? 'border-azes-blue bg-blue-50 scale-[1.01]'
            : 'border-gray-200 bg-gray-50 hover:border-azes-blue hover:bg-blue-50/50'
        )}
        role="button"
        tabIndex={0}
        aria-label="Zone de dépôt de fichiers"
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />

        <motion.div
          animate={{ y: dragging ? -4 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center gap-3"
        >
          <div className={clsx(
            'w-14 h-14 rounded-2xl flex items-center justify-center transition-colors',
            dragging ? 'bg-azes-blue text-white' : 'bg-white border border-gray-200 text-azes-blue'
          )}>
            <DocumentArrowUpIcon className="w-7 h-7" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-700">
              {dragging ? 'Déposez vos fichiers ici' : 'Glissez vos fichiers ici'}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              ou <span className="text-azes-blue font-semibold">parcourir</span> depuis votre appareil
            </p>
          </div>
          <p className="text-xs text-gray-400">
            {hint ?? `Formats acceptés : PDF, DOC, XLS, ZIP, images — Max ${maxSizeMB} Mo par fichier`}
          </p>
        </motion.div>
      </div>

      {/* Error */}
      {error && (
        <p className="mt-2 text-xs text-red-600 flex items-center gap-1">
          <XMarkIcon className="w-3.5 h-3.5" /> {error}
        </p>
      )}

      {/* File list */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2"
          >
            {files.map((uf) => {
              const Icon = typeIcon(uf.file.name)
              return (
                <motion.li
                  key={uf.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 group"
                >
                  <div className="w-8 h-8 bg-azes-blue/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-azes-blue" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{uf.file.name}</p>
                    <p className="text-xs text-gray-400">{formatSize(uf.file.size)}</p>
                  </div>
                  <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeFile(uf.id) }}
                    aria-label={`Supprimer ${uf.file.name}`}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
