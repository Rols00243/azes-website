'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { CalendarDaysIcon, FolderArrowDownIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function GuichetUniqueCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#071828]">
      {/* Aerial Congo / industrial zone image — strong atmospheric feel */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.22 }}
          loading="lazy"
        />
      </div>

      {/* Dark overlay gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(7,24,40,0.92) 0%, rgba(27,79,140,0.80) 50%, rgba(7,24,40,0.92) 100%)' }} />

      {/* Animated amber glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(196,137,74,0.3) 0%, transparent 65%)' }}
        />
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -top-20 left-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{ backgroundColor: '#1B4F8C' }}
        />
      </div>

      {/* Top/bottom accent lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,137,74,0.5) 50%, transparent)' }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(196,137,74,0.35) 50%, transparent)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 text-sm text-white/90 font-medium border border-white/10">
            <div className="w-2 h-2 bg-[#C4894A] rounded-full animate-pulse" />
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
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-sm"
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
