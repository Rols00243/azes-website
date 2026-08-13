'use client'

import { BanknotesIcon, IdentificationIcon } from '@heroicons/react/24/outline'
import { DEVISES, prixDefaut } from '@/lib/fondations/constants'
import type { Devise } from '@/lib/fondations/types'
import { Carte, ChampNombre, ChampSelect, ChampTexte, Grille, Note, type EtapeProps } from './ui'

export default function EtapeProjet({ input, maj }: EtapeProps) {
  const { projet } = input

  const changerDevise = (devise: Devise) => {
    maj('projet', { devise })
    // La grille de prix est réindexée sur la nouvelle devise (taux indicatifs).
    maj('prix', prixDefaut(devise))
  }

  return (
    <div className="space-y-5">
      <Carte
        titre="Identification du projet"
        description="Ces informations figurent en tête du devis imprimé."
        icone={IdentificationIcon}
      >
        <Grille>
          <ChampTexte
            label="Intitulé du projet"
            valeur={projet.nom}
            onChange={(v) => maj('projet', { nom: v })}
            placeholder="Fondations — villa R+0"
          />
          <ChampTexte
            label="Client / maître d'ouvrage"
            valeur={projet.client}
            onChange={(v) => maj('projet', { client: v })}
            placeholder="Nom du client"
          />
          <ChampTexte
            label="Localisation"
            valeur={projet.localisation}
            onChange={(v) => maj('projet', { localisation: v })}
            placeholder="Commune, ville"
          />
          <ChampTexte
            label="Référence du devis"
            valeur={projet.reference}
            onChange={(v) => maj('projet', { reference: v })}
            placeholder="DEV-2026-001"
          />
        </Grille>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Date du devis</label>
          <input
            type="date"
            value={projet.date}
            onChange={(e) => maj('projet', { date: e.target.value })}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#1B4F8C] focus:bg-white transition-colors"
          />
        </div>
      </Carte>

      <Carte
        titre="Conditions financières"
        description="Devise, provisions et taxes appliquées au récapitulatif."
        icone={BanknotesIcon}
        accent="#2A7A4B"
      >
        <Grille>
          <ChampSelect<Devise>
            label="Devise"
            valeur={projet.devise}
            options={DEVISES.map((d) => ({ valeur: d.code, label: `${d.label} (${d.symbole})` }))}
            onChange={changerDevise}
            aide="Changer de devise recharge la grille de prix indicative."
          />
          <ChampNombre
            label="Aléas et imprévus"
            valeur={projet.aleas}
            onChange={(v) => maj('projet', { aleas: v })}
            unite="%"
            aide="Provision sur le sous-total (5 à 10 % en usage courant)."
          />
          <ChampNombre
            label="Marge entreprise"
            valeur={projet.marge}
            onChange={(v) => maj('projet', { marge: v })}
            unite="%"
          />
          <ChampNombre
            label="TVA"
            valeur={projet.tva}
            onChange={(v) => maj('projet', { tva: v })}
            unite="%"
            aide="16 % en République Démocratique du Congo."
          />
        </Grille>
        <Note>
          Les prix par défaut sont des ordres de grandeur du marché congolais. Ajustez-les dans
          l&apos;onglet <strong>Prix</strong> avant de remettre un devis à un client.
        </Note>
      </Carte>
    </div>
  )
}
