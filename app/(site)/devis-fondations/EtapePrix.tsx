'use client'

import { ArrowPathIcon, CurrencyDollarIcon, UsersIcon } from '@heroicons/react/24/outline'
import { LIBELLES_PRIX, prixDefaut } from '@/lib/fondations/constants'
import { formatQuantite, symboleDevise } from '@/lib/fondations/format'
import type { DevisResultat, Lot } from '@/lib/fondations/types'
import { Carte, ChampNombre, Grille, Interrupteur, Note, type EtapeProps } from './ui'

interface Props extends EtapeProps {
  resultat: DevisResultat
}

interface EntreePrix {
  cle: string
  label: string
  unite: string
  quantite: number
}

export default function EtapePrix({ input, maj, resultat }: Props) {
  const { projet, prix } = input
  const symbole = symboleDevise(projet.devise)

  // Seuls les prix réellement utilisés par le devis en cours sont proposés.
  const groupes = new Map<Lot, EntreePrix[]>()
  for (const ligne of resultat.lignes) {
    if (!ligne.prixKey) continue
    const liste = groupes.get(ligne.lot) ?? []
    if (!liste.some((e) => e.cle === ligne.prixKey)) {
      liste.push({
        cle: ligne.prixKey,
        label: LIBELLES_PRIX[ligne.prixKey]?.label ?? ligne.designation,
        unite: ligne.unite,
        quantite: ligne.quantite,
      })
    }
    groupes.set(ligne.lot, liste)
  }

  const majPrix = (cle: string, valeur: number) => maj('prix', { [cle]: valeur })

  return (
    <div className="space-y-5">
      <Carte
        titre="Grille de prix unitaires"
        description={`Prix ${projet.devise} — la quantité rappelée à côté de chaque poste provient du métré.`}
        icone={CurrencyDollarIcon}
        accent="#2A7A4B"
      >
        <button
          type="button"
          onClick={() => maj('prix', prixDefaut(projet.devise))}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
        >
          <ArrowPathIcon className="w-4 h-4" /> Réinitialiser les prix indicatifs
        </button>

        {[...groupes.entries()].map(([lot, entrees]) => (
          <div key={lot}>
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">{lot}</h3>
            <Grille>
              {entrees.map((e) => (
                <ChampNombre
                  key={e.cle}
                  label={e.label}
                  valeur={prix[e.cle] ?? 0}
                  onChange={(v) => majPrix(e.cle, v)}
                  unite={symbole}
                  aide={`Quantité au métré : ${formatQuantite(e.quantite)} ${e.unite}`}
                />
              ))}
            </Grille>
          </div>
        ))}

        {groupes.size === 0 && (
          <Note>
            Aucun poste à chiffrer pour l&apos;instant : renseignez la géométrie et les ouvrages.
          </Note>
        )}
      </Carte>

      <Carte titre="Main d'œuvre" icone={UsersIcon} accent="#C4894A">
        <div className="flex items-center justify-between gap-4 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-3">
          <div>
            <div className="text-sm font-medium text-gray-800">Chiffrer la main d&apos;œuvre</div>
            <div className="text-[11px] text-gray-500 leading-snug mt-0.5">
              Ajoute un lot au devis, calculé au ratio sur les quantités du métré.
            </div>
          </div>
          <Interrupteur
            valeur={input.mainOeuvre.actif}
            onChange={(v) => maj('mainOeuvre', { actif: v })}
            label="la main d'œuvre"
          />
        </div>
        <Note>
          Les taux de main d&apos;œuvre se règlent dans la grille ci-dessus, section « Main
          d&apos;œuvre ». Pour un chantier en régie, mettez ces taux à zéro et chiffrez le personnel
          à part.
        </Note>
      </Carte>
    </div>
  )
}
