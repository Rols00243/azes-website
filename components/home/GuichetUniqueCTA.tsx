'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarDaysIcon, FolderArrowDownIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function GuichetUniqueCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-white" aria-label="Guichet Unique">

      {/* Soft directional vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, transparent 55%, rgba(255,255,255,0.5) 100%)' }} />

      {/* Top + bottom accent lines */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(196,137,74,0.35) 50%, transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(196,137,74,0.25) 50%, transparent)' }} />

      {/* Ambient glow — warm amber center */}
      <motion.div aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(196,137,74,0.06) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div aria-hidden
        className="absolute -top-16 left-1/4 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(27,79,140,0.05) 0%, transparent 70%)' }}
        animate={{ y: [0, -18, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-[#C4894A]/10 border border-[#C4894A]/20 rounded-full px-4 py-1.5 mb-6 text-sm text-[#C4894A] font-semibold">
            <div className="w-2 h-2 bg-[#C4894A] rounded-full animate-pulse" />
            Service prioritaire
          </div>

          <h2 className="text-4xl sm:text-5xl font-bold text-[#0A2342] mb-4">
            Votre porte d'entrée vers les ZES
          </h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Le Guichet Unique de l'AZES centralise toutes vos démarches administratives.
            Simplifiez votre installation en RDC.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demarches#rdv"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#0A2342] text-white font-semibold rounded-xl hover:bg-[#1B4F8C] transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Prendre RDV
            </Link>
            <Link
              href="/demarches#dossier"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#C4894A] text-white font-semibold rounded-xl hover:bg-[#a87540] transition-all hover:scale-105 active:scale-95 shadow-md"
            >
              <FolderArrowDownIcon className="w-5 h-5" />
              Soumettre un dossier
            </Link>
            <Link
              href="/guichet-unique"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-[#0A2342]/20 text-[#0A2342] font-semibold rounded-xl hover:bg-[#0A2342]/5 hover:border-[#0A2342]/40 transition-all hover:scale-105 active:scale-95"
            >
              <PhoneIcon className="w-5 h-5" />
              Contacter
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Lun–Ven 08h00–17h00 · Réponse garantie en 48h ouvrées
          </p>
        </motion.div>
      </div>
    </section>
  )
}
