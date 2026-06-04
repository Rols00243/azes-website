'use client'

import { useState } from 'react'
import type { Message } from '@/lib/server-data'
import {
  TrashIcon, EnvelopeOpenIcon, EnvelopeIcon,
  PhoneIcon, CalendarIcon, TagIcon, ChevronDownIcon, ChevronUpIcon,
} from '@heroicons/react/24/outline'

export default function MessagesInbox({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [msg, setMsg] = useState('')

  function flash(m: string) { setMsg(m); setTimeout(() => setMsg(''), 3000) }

  const unread = messages.filter(m => !m.lu).length

  async function toggleLu(id: string, lu: boolean) {
    await fetch('/api/admin/messages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, lu }),
    })
    setMessages(prev => prev.map(m => m.id === id ? { ...m, lu } : m))
  }

  async function remove(id: string) {
    if (!confirm('Supprimer ce message définitivement ?')) return
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setMessages(prev => prev.filter(m => m.id !== id))
    flash('✓ Message supprimé')
  }

  async function markAllRead() {
    await Promise.all(
      messages.filter(m => !m.lu).map(m =>
        fetch('/api/admin/messages', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: m.id, lu: true }),
        })
      )
    )
    setMessages(prev => prev.map(m => ({ ...m, lu: true })))
    flash('✓ Tous marqués comme lus')
  }

  function toggle(id: string) {
    setExpanded(prev => prev === id ? null : id)
    // marquer comme lu à l'ouverture
    const m = messages.find(x => x.id === id)
    if (m && !m.lu) toggleLu(id, true)
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
        <EnvelopeOpenIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
        <p className="text-gray-400 font-medium">Aucun message reçu pour l'instant.</p>
        <p className="text-gray-300 text-sm mt-1">Les messages du formulaire de contact apparaîtront ici.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {msg && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl px-4 py-3 text-sm font-medium">
          {msg}
        </div>
      )}

      {/* Header bar */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">{messages.length} message{messages.length > 1 ? 's' : ''}</span>
          {unread > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
              {unread} non lu{unread > 1 ? 's' : ''}
            </span>
          )}
        </div>
        {unread > 0 && (
          <button onClick={markAllRead} className="text-xs text-gray-400 hover:text-gray-700 underline transition-colors">
            Tout marquer comme lu
          </button>
        )}
      </div>

      {messages.map(message => (
        <div
          key={message.id}
          className={`bg-white rounded-2xl border shadow-sm overflow-hidden transition-all ${
            !message.lu ? 'border-blue-200 shadow-blue-50' : 'border-gray-100'
          }`}
        >
          {/* Header row — always visible */}
          <div
            className="flex items-start gap-4 p-5 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggle(message.id)}
          >
            {/* Unread dot */}
            <div className="flex-shrink-0 mt-1">
              {!message.lu
                ? <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                : <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
              }
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className={`font-semibold text-gray-900 ${!message.lu ? 'font-bold' : ''}`}>
                  {message.nom}
                </span>
                <span className="text-gray-400 text-sm">{message.email}</span>
                {message.sujet && (
                  <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full font-medium">
                    {message.sujet}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 line-clamp-1">{message.message}</p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {new Date(message.date).toLocaleDateString('fr-FR', {
                    day: '2-digit', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit',
                  })}
                </span>
                {message.telephone && (
                  <span className="flex items-center gap-1">
                    <PhoneIcon className="w-3.5 h-3.5" /> {message.telephone}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 flex-shrink-0">
              {expanded === message.id
                ? <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                : <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              }
            </div>
          </div>

          {/* Expanded body */}
          {expanded === message.id && (
            <div className="px-5 pb-5 border-t border-gray-50">
              <div className="bg-gray-50 rounded-xl p-4 mt-3 mb-4">
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">{message.message}</p>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex gap-2">
                  <a
                    href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(message.sujet || 'Votre message')}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#0A2342] text-white text-xs font-semibold rounded-lg hover:bg-[#1B4F8C] transition-colors"
                  >
                    <EnvelopeIcon className="w-3.5 h-3.5" /> Répondre par email
                  </a>
                  {message.telephone && (
                    <a
                      href={`tel:${message.telephone}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:border-gray-300 transition-colors"
                    >
                      <PhoneIcon className="w-3.5 h-3.5" /> Appeler
                    </a>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleLu(message.id, !message.lu)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-500 text-xs rounded-lg hover:border-gray-300 transition-colors"
                  >
                    {message.lu
                      ? <><EnvelopeIcon className="w-3.5 h-3.5" /> Marquer non lu</>
                      : <><EnvelopeOpenIcon className="w-3.5 h-3.5" /> Marquer lu</>
                    }
                  </button>
                  <button
                    onClick={() => remove(message.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 border border-red-200 text-red-500 text-xs rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <TrashIcon className="w-3.5 h-3.5" /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
