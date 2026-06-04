'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      window.location.href = '/admin/dashboard'
      return
    } else {
      const d = await res.json()
      setError(d.error || 'Erreur de connexion')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A2342] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0A2342] rounded-2xl mb-4">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0A2342]">AZES</h1>
          <p className="text-sm text-gray-400 mt-1">Panneau d'administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Identifiant
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors"
              placeholder="admin"
              required
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:border-[#0A2342] focus:outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
              ✗ {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A2342] text-white rounded-xl py-3.5 font-semibold hover:bg-[#1B4F8C] transition-colors disabled:opacity-50 mt-2"
          >
            {loading ? 'Connexion en cours…' : 'Se connecter'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Accès réservé aux administrateurs AZES
        </p>
      </div>
    </div>
  )
}
