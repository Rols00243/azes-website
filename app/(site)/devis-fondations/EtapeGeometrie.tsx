'use client'

import { PlusIcon, Squares2X2Icon, TrashIcon } from '@heroicons/react/24/outline'
import { lineaireFondations } from '@/lib/fondations/calcul'
import { formatNombre } from '@/lib/fondations/format'
import type { Segment } from '@/lib/fondations/types'
import {
  Carte,
  ChampNombre,
  ChampTexte,
  Grille,
  Note,
  Segmente,
  Statistique,
  type EtapeProps,
} from './ui'

export default function EtapeGeometrie({ input, maj }: EtapeProps) {
  const { geometrie } = input
  const lineaire = lineaireFondations(geometrie)

  const majSegment = (id: string, patch: Partial<Segment>) =>
    maj('geometrie', {
      segments: geometrie.segments.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    })

  const ajouterSegment = () =>
    maj('geometrie', {
      segments: [
        ...geometrie.segments,
        {
          id: `seg-${Date.now().toString(36)}`,
          nom: `Tronçon ${geometrie.segments.length + 1}`,
          longueur: 0,
          nombre: 1,
        },
      ],
    })

  const supprimerSegment = (id: string) =>
    maj('geometrie', { segments: geometrie.segments.filter((s) => s.id !== id) })

  return (
    <div className="space-y-5">
      <Carte
        titre="Linéaire des fondations"
        description="Toutes les quantités découlent de ce linéaire : saisissez-le avec soin."
        icone={Squares2X2Icon}
      >
        <Segmente
          valeur={geometrie.mode}
          onChange={(mode) => maj('geometrie', { mode })}
          options={[
            { valeur: 'simple', label: 'Bâtiment rectangulaire' },
            { valeur: 'detaille', label: 'Tronçon par tronçon' },
          ]}
        />

        {geometrie.mode === 'simple' ? (
          <>
            <Grille>
              <ChampNombre
                label="Longueur hors tout"
                valeur={geometrie.longueur}
                onChange={(v) => maj('geometrie', { longueur: v })}
                unite="m"
              />
              <ChampNombre
                label="Largeur hors tout"
                valeur={geometrie.largeur}
                onChange={(v) => maj('geometrie', { largeur: v })}
                unite="m"
              />
              <ChampNombre
                label="Murs de refend"
                valeur={geometrie.refends}
                onChange={(v) => maj('geometrie', { refends: v })}
                unite="ml"
                aide="Linéaire cumulé des murs porteurs intérieurs."
              />
            </Grille>
            <Note>
              Périmètre = 2 × (longueur + largeur), auquel s&apos;ajoute le linéaire des refends. Pour
              un bâtiment en L ou en U, passez en mode « tronçon par tronçon ».
            </Note>
          </>
        ) : (
          <div className="space-y-3">
            {geometrie.segments.map((seg) => (
              <div
                key={seg.id}
                className="grid grid-cols-12 gap-2 items-end bg-gray-50 border border-gray-200 rounded-xl p-3"
              >
                <div className="col-span-12 sm:col-span-5">
                  <ChampTexte
                    label="Désignation"
                    valeur={seg.nom}
                    onChange={(v) => majSegment(seg.id, { nom: v })}
                  />
                </div>
                <div className="col-span-5 sm:col-span-3">
                  <ChampNombre
                    label="Longueur"
                    valeur={seg.longueur}
                    onChange={(v) => majSegment(seg.id, { longueur: v })}
                    unite="m"
                  />
                </div>
                <div className="col-span-4 sm:col-span-2">
                  <ChampNombre
                    label="Nombre"
                    valeur={seg.nombre}
                    onChange={(v) => majSegment(seg.id, { nombre: v })}
                  />
                </div>
                <div className="col-span-3 sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => supprimerSegment(seg.id)}
                    aria-label={`Supprimer ${seg.nom}`}
                    className="w-11 h-11 flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={ajouterSegment}
              className="w-full flex items-center justify-center gap-2 py-3 border-2 border-dashed border-gray-300 rounded-xl text-sm font-semibold text-gray-500 hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors"
            >
              <PlusIcon className="w-5 h-5" /> Ajouter un tronçon
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Statistique label="Linéaire total" valeur={formatNombre(lineaire)} unite="ml" />
          <Statistique
            label="Emprise au sol"
            valeur={
              geometrie.mode === 'simple'
                ? formatNombre(input.geometrie.longueur * input.geometrie.largeur)
                : '—'
            }
            unite="m²"
            accent="#C4894A"
          />
        </div>
      </Carte>
    </div>
  )
}
