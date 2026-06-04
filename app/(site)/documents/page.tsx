'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { documents, categories, categoryConfig, type DocCategory } from '@/lib/data/documents'
import DocumentCard from '@/components/DocumentCard'
import { MagnifyingGlassIcon, Squares2X2Icon, ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

const zoneList = ['Toutes', ...Array.from(new Set(documents.filter(d => d.zone).map(d => d.zone!)))]

export default function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState<DocCategory | 'Toutes'>('Toutes')
  const [selectedZone, setSelectedZone] = useState('Toutes')
  const [sortDate, setSortDate] = useState<'desc' | 'asc'>('desc')
  const [view, setView] = useState<'grid' | 'list'>('list')

  const filtered = useMemo(() => {
    let result = [...documents]
    if (search) result = result.filter(d =>
      d.titre.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      (d.reference?.toLowerCase().includes(search.toLowerCase()) ?? false)
    )
    if (selectedCat !== 'Toutes') result = result.filter(d => d.categorie === selectedCat)
    if (selectedZone !== 'Toutes') result = result.filter(d => d.zone === selectedZone)
    result.sort((a, b) => {
      const diff = new Date(a.datePublication).getTime() - new Date(b.datePublication).getTime()
      return sortDate === 'desc' ? -diff : diff
    })
    return result
  }, [search, selectedCat, selectedZone, sortDate])

  const countByCategory = useMemo(() => {
    const counts: Partial<Record<DocCategory, number>> = {}
    documents.forEach(d => {
      counts[d.categorie] = (counts[d.categorie] ?? 0) + 1
    })
    return counts
  }, [])

  const hasFilters = selectedCat !== 'Toutes' || selectedZone !== 'Toutes' || search !== ''

  return (
    <div className="bg-[#040810] min-h-screen">
      {/* Hero */}
      <DarkPageHero
        eyebrow="Ressources officielles"
        title="Centre Documentaire"
        subtitle="Lois, décrets, arrêtés, statuts, rapports et formulaires officiels de l'AZES — classés et téléchargeables."
        variant={3}
        accentColor="#8B5E3C"
      >
        <div className="relative max-w-xl">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
          <input
            type="search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher par titre, référence, description..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white text-sm focus:outline-none bg-white/[0.08] border border-white/10 focus:border-white/30 placeholder:text-white/30"
            aria-label="Rechercher dans les documents"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70">
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </DarkPageHero>

      {/* Category cards */}
      <section className="py-10 bg-[#0a1628] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">Parcourir par catégorie</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {/* All */}
            <button
              onClick={() => { setSelectedCat('Toutes'); setSelectedZone('Toutes') }}
              className={`flex flex-col items-start gap-2 p-4 rounded-2xl border text-left transition-all ${
                selectedCat === 'Toutes' && selectedZone === 'Toutes'
                  ? 'border-[#8B5E3C] bg-[#8B5E3C]/20 text-white'
                  : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15 text-white/70'
              }`}
            >
              <span className="text-xl">🗂️</span>
              <div>
                <div className="font-semibold text-sm">Toutes</div>
                <div className="text-xs opacity-60 mt-0.5">{documents.length} documents</div>
              </div>
            </button>

            {categories.map((cat) => {
              const cfg = categoryConfig[cat]
              const count = countByCategory[cat] ?? 0
              const active = selectedCat === cat
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCat(cat); setSelectedZone('Toutes') }}
                  className={`flex flex-col items-start gap-2 p-4 rounded-2xl border text-left transition-all ${
                    active ? 'text-white' : 'border-white/[0.07] bg-white/[0.03] hover:border-white/15 text-white/60'
                  }`}
                  style={active ? { borderColor: `${cfg.color}60`, backgroundColor: `${cfg.color}20` } : {}}
                >
                  <span className="text-xl">{cfg.icon}</span>
                  <div>
                    <div className="font-semibold text-xs leading-tight">{cat}</div>
                    <div className="text-xs opacity-60 mt-0.5">{count} document{count !== 1 ? 's' : ''}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Active filters + results */}
      <section className="py-10 bg-[#040810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter bar */}
          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 mb-6 flex flex-wrap gap-4 items-center">
            {selectedCat !== 'Toutes' && (
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-white/40">Catégorie :</span>
                <span
                  className="px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1.5"
                  style={{ backgroundColor: `${categoryConfig[selectedCat as DocCategory]?.color ?? '#8B5E3C'}30`,
                    color: categoryConfig[selectedCat as DocCategory]?.color ?? '#8B5E3C',
                    border: `1px solid ${categoryConfig[selectedCat as DocCategory]?.color ?? '#8B5E3C'}50` }}
                >
                  {selectedCat}
                  <button onClick={() => setSelectedCat('Toutes')} className="hover:opacity-75">
                    <XMarkIcon className="w-3.5 h-3.5" />
                  </button>
                </span>
              </div>
            )}
            <div>
              <select
                value={selectedZone}
                onChange={e => setSelectedZone(e.target.value)}
                className="text-sm bg-white/[0.06] border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-white/30"
              >
                {zoneList.map(z => <option key={z} className="bg-[#0a1628]">{z}</option>)}
              </select>
            </div>
            <div>
              <select
                value={sortDate}
                onChange={e => setSortDate(e.target.value as 'desc' | 'asc')}
                className="text-sm bg-white/[0.06] border border-white/10 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-white/30"
              >
                <option value="desc" className="bg-[#0a1628]">Plus récent d&apos;abord</option>
                <option value="asc" className="bg-[#0a1628]">Plus ancien d&apos;abord</option>
              </select>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <span className="text-sm text-white/30 font-medium">
                {filtered.length} résultat{filtered.length !== 1 ? 's' : ''}
              </span>
              <div className="flex border border-white/10 rounded-lg overflow-hidden">
                <button
                  onClick={() => setView('grid')}
                  className={`p-2 transition-colors ${view === 'grid' ? 'bg-[#8B5E3C] text-white' : 'bg-transparent text-white/40 hover:bg-white/[0.05]'}`}
                  aria-label="Vue grille"
                >
                  <Squares2X2Icon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2 transition-colors ${view === 'list' ? 'bg-[#8B5E3C] text-white' : 'bg-transparent text-white/40 hover:bg-white/[0.05]'}`}
                  aria-label="Vue liste"
                >
                  <ListBulletIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-24 text-white/30"
              >
                <MagnifyingGlassIcon className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-semibold">Aucun document trouvé</p>
                <p className="text-sm mt-1 opacity-70">Modifiez vos filtres ou votre recherche</p>
                {hasFilters && (
                  <button
                    onClick={() => { setSearch(''); setSelectedCat('Toutes'); setSelectedZone('Toutes') }}
                    className="mt-4 px-4 py-2 text-sm text-[#8B5E3C] border border-[#8B5E3C]/50 rounded-lg hover:bg-[#8B5E3C]/20 transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                )}
              </motion.div>
            ) : view === 'grid' ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filtered.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <DocumentCard doc={doc} view="grid" />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                {filtered.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.02 }}
                  >
                    <DocumentCard doc={doc} view="list" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
