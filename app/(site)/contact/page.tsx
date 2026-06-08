export const dynamic = 'force-dynamic'

import { MapPinIcon, PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline'
import DarkPageHero from '@/components/ui/DarkPageHero'
import LightSection from '@/components/ui/LightSection'
import { getBureaux } from '@/lib/server-data'
import ContactForm from './ContactForm'

export default function ContactPage() {
  const bureaux = getBureaux()

  return (
    <div className="min-h-screen">
      <DarkPageHero
        eyebrow="Nous contacter"
        title="Contact &"
        titleAccent="Bureaux"
        subtitle="Notre équipe est à votre disposition pour répondre à toutes vos questions concernant les ZES de la RDC."
        variant={3}
        accentColor="#1E7A9E"
      />

      {/* ── Bureaux ── */}
      <LightSection className="py-20" image="aerial">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 text-[#1E7A9E] text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-6 h-px bg-[#1E7A9E]/60" /> Nos bureaux
            </div>
            <h2 className="text-3xl font-bold text-[#0A2342]">Où nous trouver</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bureaux.map((b) => (
              <div
                key={b.id}
                className="relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 hover:shadow-md transition-all overflow-hidden group"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${b.color}, transparent)` }} />
                <h3 className="font-bold text-[#0A2342] mb-4">{b.ville}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-2.5 text-gray-600"><MapPinIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: b.color }} />{b.adresse}</div>
                  <div className="flex gap-2.5"><PhoneIcon className="w-4 h-4 flex-shrink-0" style={{ color: b.color }} /><a href={`tel:${b.tel}`} className="text-gray-600 hover:text-[#0A2342] transition-colors">{b.tel}</a></div>
                  <div className="flex gap-2.5"><EnvelopeIcon className="w-4 h-4 flex-shrink-0" style={{ color: b.color }} /><a href={`mailto:${b.email}`} className="text-gray-600 hover:text-[#0A2342] transition-colors">{b.email}</a></div>
                  <div className="flex gap-2.5 text-gray-500"><ClockIcon className="w-4 h-4 flex-shrink-0" style={{ color: b.color }} />{b.horaires}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LightSection>

      {/* ── Formulaire + Infos ── */}
      <LightSection className="py-20" alt image="infra">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </LightSection>
    </div>
  )
}
