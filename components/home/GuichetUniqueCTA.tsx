'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarDaysIcon, FolderArrowDownIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function GuichetUniqueCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#0A2342]">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,35,66,0.95) 0%, rgba(27,79,140,0.85) 50%, rgba(10,35,66,0.95) 100%)' }} />

      {/* Amber glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(196,137,74,0.15) 0%, transparent 60%)' }} />
      </div>

      {/* Top/bottom accent lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,137,74,0.4) 50%, transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,137,74,0.3) 50%, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 text-sm text-white/90 font-medium">
            <div className="w-2 h-2 bg-[#C4894A] rounded-full" />
            Service prioritaire
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Votre porte d'entrée vers les ZES
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Le Guichet Unique de l'AZES centralise toutes vos démarches administratives.
            Simplifiez votre installation en RDC.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demarches#rdv"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-white text-[#0A2342] font-semibold rounded-xl hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              Prendre RDV
            </Link>
            <Link
              href="/demarches#dossier"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#C4894A] text-white font-semibold rounded-xl hover:bg-[#a87540] transition-all hover:scale-105 active:scale-95 shadow-lg"
            >
              <FolderArrowDownIcon className="w-5 h-5" />
              Soumettre un dossier
            </Link>
            <Link
              href="/guichet-unique"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95"
            >
              <PhoneIcon className="w-5 h-5" />
              Contacter
            </Link>
          </div>

          <p className="mt-8 text-sm text-blue-200/70">
            Lun–Ven 08h00–17h00 · Réponse garantie en 48h ouvrées
          </p>
        </motion.div>
      </div>
    </section>
  )
}
