'use client'

import { motion } from 'framer-motion'
import { ShieldCheckIcon, EyeIcon, RocketLaunchIcon, UserGroupIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'

const missions = [
  { icon: RocketLaunchIcon, title: 'Développer', desc: "Piloter le développement des ZES conformément à la stratégie nationale de croissance économique.", color: '#2A7A4B' },
  { icon: ShieldCheckIcon,  title: 'Réguler',    desc: "Veiller au respect du cadre juridique et réglementaire applicable aux zones économiques spéciales.", color: '#1B4F8C' },
  { icon: EyeIcon,          title: 'Promouvoir', desc: "Promouvoir les opportunités d'investissement auprès des partenaires nationaux et internationaux.", color: '#C4894A' },
  { icon: UserGroupIcon,    title: 'Accompagner', desc: "Offrir un accompagnement de A à Z aux investisseurs, aménageurs et entreprises via le Guichet Unique.", color: '#8B5E3C' },
]

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } }

export default function AProposPage() {
  return (
    <div className="bg-[#040810] min-h-screen">

      <DarkPageHero
        eyebrow="À propos"
        title="L'Agence des Zones"
        titleAccent="Économiques Spéciales"
        subtitle="Créée par la Loi n°23-011, l'AZES est l'institution publique chargée de mettre en œuvre la politique nationale en matière de zones économiques spéciales en RDC."
        variant={2}
        accentColor="#2A7A4B"
      />

      {/* ── PRÉSENTATION ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#071d30]" />
        <div className="absolute inset-0 opacity-[0.15]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1400&q=60')`, backgroundSize: 'cover', backgroundPosition: 'center 60%' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{ inset: 0, background: 'radial-gradient(ellipse 75% 120% at -5% 55%, rgba(42,122,75,0.28) 0%, rgba(42,122,75,0.08) 45%, transparent 65%)' }} />
          <div className="absolute" style={{ inset: 0, background: 'radial-gradient(ellipse 50% 60% at 108% 30%, rgba(196,137,74,0.14) 0%, transparent 60%)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-[#2A7A4B]/25 via-white/10 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp}>
              <div className="inline-flex items-center gap-2 text-[#2A7A4B] text-xs font-bold uppercase tracking-widest mb-4">
                <span className="w-6 h-px bg-[#2A7A4B]/60" /> Notre histoire
              </div>
              <h2 className="text-3xl font-bold text-white mb-6">Née d'une vision ambitieuse pour la RDC</h2>
              <div className="space-y-4 text-white/55 leading-relaxed text-sm">
                <p>L'AZES a été instituée en 2023 dans le cadre de la stratégie nationale de diversification économique et de promotion de l'industrialisation de la République Démocratique du Congo.</p>
                <p>Dotée d'une personnalité juridique et d'une autonomie financière, l'Agence est placée sous la tutelle du Ministère en charge de l'Économie et coordonne ses actions avec les ministères sectoriels concernés.</p>
                <p>Sa mission première est de transformer le potentiel économique exceptionnel de la RDC en opportunités concrètes d'emploi, d'investissement et de création de richesse pour les Congolaises et les Congolais.</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Fondée en', value: '2023', color: '#2A7A4B' },
                { label: 'Effectif', value: '85 agents', color: '#1B4F8C' },
                { label: 'Budget annuel', value: '$45M', color: '#C4894A' },
                { label: 'Zones gérées', value: '4 ZES', color: '#8B5E3C' },
              ].map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="relative bg-white/[0.07] border border-white/[0.12] rounded-2xl p-6 text-center overflow-hidden hover:border-white/25 transition-all">
                  <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                  <div className="text-3xl font-bold mb-1" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-sm text-white/40">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MISSIONS ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#040810]" />
        <div className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=50')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[400px]"
            style={{ background: 'radial-gradient(ellipse at right top, rgba(27,79,140,0.12) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[300px]"
            style={{ background: 'radial-gradient(ellipse at left bottom, rgba(42,122,75,0.10) 0%, transparent 65%)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#2A7A4B] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#2A7A4B]/60" /> Nos missions <span className="w-6 h-px bg-[#2A7A4B]/60" />
            </div>
            <h2 className="text-3xl font-bold text-white">Quatre axes d'action prioritaires</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {missions.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 hover:border-white/20 hover:bg-white/[0.07] transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${m.color}, transparent)` }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${m.color}20`, border: `1px solid ${m.color}30` }}>
                  <m.icon className="w-5 h-5" style={{ color: m.color }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{m.title}</h3>
                <p className="text-sm text-white/45 leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOUVERNANCE ── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[#071525]" />
        <div className="absolute inset-0 opacity-[0.12]"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=60')`, backgroundSize: 'cover', backgroundPosition: 'center 25%' }} />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute" style={{ inset: 0, background: 'radial-gradient(ellipse 70% 100% at 110% 50%, rgba(42,122,75,0.20) 0%, rgba(42,122,75,0.07) 45%, transparent 65%)' }} />
          <div className="absolute" style={{ inset: 0, background: 'radial-gradient(ellipse 50% 55% at -5% 80%, rgba(196,137,74,0.14) 0%, transparent 60%)' }} />
        </div>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-[#2A7A4B]/15" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 text-[#2A7A4B] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#2A7A4B]/60" /> Gouvernance <span className="w-6 h-px bg-[#2A7A4B]/60" />
            </div>
            <h2 className="text-3xl font-bold text-white">Direction générale</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { nom: 'Dr. Jean-Baptiste Kabila',    poste: 'Directeur Général',            depuis: '2023', color: '#2A7A4B' },
              { nom: 'Prof. Marie-Claire Mutombo',  poste: 'Directrice Générale Adjointe', depuis: '2023', color: '#1B4F8C' },
              { nom: 'Me. Patrick Ilunga',          poste: 'Secrétaire Général',           depuis: '2024', color: '#C4894A' },
            ].map((p, i) => (
              <motion.div
                key={p.nom}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-6 bg-white/[0.07] border border-white/[0.12] rounded-2xl hover:border-white/25 transition-all overflow-hidden relative group"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: `linear-gradient(135deg, ${p.color}30, ${p.color}10)`, border: `1px solid ${p.color}40` }}>
                  <span className="text-xl font-bold text-white">{p.nom.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
                </div>
                <div className="font-bold text-white mb-1 text-sm">{p.nom}</div>
                <div className="text-xs text-white/40 mb-1">{p.poste}</div>
                <div className="text-xs font-semibold" style={{ color: p.color }}>Depuis {p.depuis}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
