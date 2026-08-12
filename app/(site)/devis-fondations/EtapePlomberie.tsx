'use client'

import { BeakerIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { DIAMETRES_PVC } from '@/lib/fondations/constants'
import type { TuyauLigne } from '@/lib/fondations/types'
import {
  Carte,
  ChampNombre,
  ChampSelect,
  ChampTexte,
  Grille,
  Note,
  type EtapeProps,
} from './ui'

const optionsDiametre = DIAMETRES_PVC.map((d) => ({ valeur: d, label: `Ø ${d} mm` }))
const optionsBarre = [3, 4, 6].map((l) => ({ valeur: l, label: `${l} m` }))

export default function EtapePlomberie({ input, maj }: EtapeProps) {
  const { plomberie } = input

  const majLigne = (id: string, patch: Partial<TuyauLigne>) =>
    maj('plomberie', {
      lignes: plomberie.lignes.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    })

  const ajouterLigne = () =>
    maj('plomberie', {
      lignes: [
        ...plomberie.lignes,
        {
          id: `pl-${Date.now().toString(36)}`,
          designation: 'Nouvelle attente',
          diametre: 63,
          longueur: 0,
          longueurBarre: 6,
          coudes: 0,
          tes: 0,
          manchons: 0,
        },
      ],
    })

  const supprimerLigne = (id: string) =>
    maj('plomberie', { lignes: plomberie.lignes.filter((l) => l.id !== id) })

  return (
    <div className="space-y-5">
      <Carte
        titre="Tuyaux d'attente et réservations"
        description="Réseaux PVC posés avant coulage : évacuations, alimentations et fourreaux traversant les fondations."
        icone={BeakerIcon}
        actif={plomberie.actif}
        onToggle={(v) => maj('plomberie', { actif: v })}
        accent="#1E7A9E"
      >
        <div className="space-y-4">
          {plomberie.lignes.map((ligne) => (
            <div key={ligne.id} className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-3">
              <div className="flex items-end gap-2">
                <div className="flex-1 min-w-0">
                  <ChampTexte
                    label="Désignation du réseau"
                    valeur={ligne.designation}
                    onChange={(v) => majLigne(ligne.id, { designation: v })}
                    placeholder="Attente eaux-vannes WC"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => supprimerLigne(ligne.id)}
                  aria-label={`Supprimer ${ligne.designation}`}
                  className="w-11 h-11 shrink-0 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
              <Grille colonnes={3}>
                <ChampSelect<number>
                  label="Diamètre"
                  valeur={ligne.diametre}
                  options={optionsDiametre}
                  onChange={(v) => majLigne(ligne.id, { diametre: v })}
                />
                <ChampNombre
                  label="Longueur développée"
                  valeur={ligne.longueur}
                  onChange={(v) => majLigne(ligne.id, { longueur: v })}
                  unite="ml"
                />
                <ChampSelect<number>
                  label="Longueur commerciale"
                  valeur={ligne.longueurBarre}
                  options={optionsBarre}
                  onChange={(v) => majLigne(ligne.id, { longueurBarre: v })}
                />
                <ChampNombre
                  label="Coudes"
                  valeur={ligne.coudes}
                  onChange={(v) => majLigne(ligne.id, { coudes: v })}
                />
                <ChampNombre
                  label="Tés / culottes"
                  valeur={ligne.tes}
                  onChange={(v) => majLigne(ligne.id, { tes: v })}
                />
                <ChampNombre
                  label="Manchons"
                  valeur={ligne.manchons}
                  onChange={(v) => majLigne(ligne.id, { manchons: v })}
                />
              </Grille>
            </div>
          ))}
          <button
            type="button"
            onClick={ajouterLigne}
            className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
          >
            <PlusIcon className="w-5 h-5" /> Ajouter un réseau
          </button>
        </div>

        <Grille colonnes={3}>
          <ChampNombre
            label="Chutes de découpe"
            valeur={plomberie.chutes}
            onChange={(v) => maj('plomberie', { chutes: v })}
            unite="%"
          />
          <ChampNombre
            label="Collages par pot de colle"
            valeur={plomberie.joinsParPot}
            onChange={(v) => maj('plomberie', { joinsParPot: v })}
          />
          <ChampNombre
            label="Fourreaux et réservations"
            valeur={plomberie.fourreaux}
            onChange={(v) => maj('plomberie', { fourreaux: v })}
            unite="u."
            aide="Traversées de longrine ou de soubassement."
          />
        </Grille>
        <Note>
          Posez les attentes <strong>avant</strong> le coulage : la réservation d&apos;une traversée
          coûte quelques dollars, sa reprise au marteau-piqueur en coûte cent fois plus.
        </Note>
      </Carte>
    </div>
  )
}
