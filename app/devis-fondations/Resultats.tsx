'use client'

import { useState } from 'react'
import {
  ArrowDownTrayIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon,
  PrinterIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline'
import { LONGUEUR_BARRE_ACIER } from '@/lib/fondations/constants'
import { exporterCSV, exporterJSON } from '@/lib/fondations/export'
import { formatMontant, formatNombre, formatQuantite } from '@/lib/fondations/format'
import type { DevisInput, DevisResultat, Lot } from '@/lib/fondations/types'
import { Carte, Segmente, Statistique } from './ui'

interface Props {
  input: DevisInput
  resultat: DevisResultat
}

/**
 * Tableau de métré : liste lisible sans défilement horizontal sur téléphone,
 * vrai tableau à partir de `sm`.
 */
function Tableau({ entetes, lignes }: { entetes: string[]; lignes: (string | number)[][] }) {
  if (lignes.length === 0) {
    return <p className="text-sm text-gray-400 italic">Poste non retenu dans ce devis.</p>
  }
  return (
    <>
      <div className="sm:hidden divide-y divide-gray-100">
        {lignes.map((ligne, i) =>
          entetes.length === 2 ? (
            <div key={i} className="flex items-baseline justify-between gap-3 py-2.5">
              <span className="text-sm text-gray-600">{ligne[0]}</span>
              <span className="text-sm font-bold tabular-nums text-[#0A2342] text-right shrink-0">
                {ligne[1]}
              </span>
            </div>
          ) : (
            <div key={i} className="py-3">
              <div className="text-sm font-semibold text-[#0A2342] mb-1.5">{ligne[0]}</div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1">
                {ligne.slice(1).map((cellule, j) => (
                  <div key={j} className="flex items-baseline justify-between gap-2">
                    <dt className="text-[10px] uppercase tracking-wide text-gray-400">
                      {entetes[j + 1]}
                    </dt>
                    <dd className="text-xs font-semibold tabular-nums text-gray-700 text-right">
                      {cellule}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )
        )}
      </div>

      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400">
            {entetes.map((e, i) => (
              <th key={e} className={`pb-2 font-bold ${i > 0 ? 'text-right' : ''}`}>
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {lignes.map((ligne, i) => (
            <tr key={i}>
              {ligne.map((cellule, j) => (
                <td
                  key={j}
                  className={`py-2.5 ${j > 0 ? 'text-right tabular-nums font-semibold text-[#0A2342]' : 'text-gray-600 pr-3'}`}
                >
                  {cellule}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </>
  )
}

export default function Resultats({ input, resultat }: Props) {
  const [vue, setVue] = useState<'metre' | 'devis'>('metre')
  const { metre, lignes, totaux, alertes } = resultat
  const { projet } = input
  const mt = (v: number) => formatMontant(v, projet.devise)

  const lots = [...new Set(lignes.map((l) => l.lot))] as Lot[]

  return (
    <div className="space-y-5">
      {alertes.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 devis-no-print">
          <div className="flex items-center gap-2 mb-2">
            <ExclamationTriangleIcon className="w-5 h-5 text-amber-600" />
            <h2 className="font-bold text-amber-900 text-sm">Points à vérifier</h2>
          </div>
          <ul className="space-y-1.5">
            {alertes.map((a, i) => (
              <li key={i} className="text-xs text-amber-800 leading-relaxed flex gap-2">
                <span className="text-amber-500">•</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 devis-no-print">
        <Statistique label="Linéaire" valeur={formatNombre(metre.lineaireTotal, 1)} unite="ml" />
        <Statistique
          label="Fouilles"
          valeur={formatNombre(metre.fouilles.volumeTotal, 1)}
          unite="m³"
          accent="#8B5E3C"
        />
        <Statistique
          label="Béton"
          valeur={formatNombre(metre.totauxBeton.volume, 2)}
          unite="m³"
          accent="#1B4F8C"
        />
        <Statistique
          label="Ciment"
          valeur={formatNombre(Math.ceil(metre.totauxBeton.cimentSacs + metre.maconnerie.cimentSacs), 0)}
          unite="sacs"
          accent="#2A7A4B"
        />
        <Statistique
          label="Acier"
          valeur={formatNombre(metre.acier.totalKg, 0)}
          unite="kg"
          accent="#C4894A"
        />
        <Statistique
          label="Coffrage"
          valeur={formatNombre(metre.coffrage.surface, 1)}
          unite="m²"
          accent="#8B5E3C"
        />
        <Statistique
          label="Blocs"
          valeur={formatNombre(metre.maconnerie.blocs, 0)}
          unite="u."
          accent="#1B4F8C"
        />
        <Statistique label="Total TTC" valeur={mt(totaux.totalTTC)} accent="#2A7A4B" />
      </div>

      <div className="devis-no-print">
        <Segmente
          valeur={vue}
          onChange={setVue}
          options={[
            { valeur: 'metre', label: 'Métré détaillé' },
            { valeur: 'devis', label: 'Devis estimatif' },
          ]}
        />
      </div>

      {vue === 'metre' ? (
        <div className="space-y-5 devis-no-print">
          <Carte titre="Terrassement" icone={TableCellsIcon} accent="#8B5E3C">
            <Tableau
              entetes={['Poste', 'Quantité']}
              lignes={[
                ['Fouilles en rigole', `${formatNombre(metre.fouilles.volumeRigole)} m³`],
                ['Fouilles en puits', `${formatNombre(metre.fouilles.volumePuits)} m³`],
                ['Total déblai', `${formatNombre(metre.fouilles.volumeTotal)} m³`],
                ['Remblai réutilisé', `${formatNombre(metre.fouilles.remblai)} m³`],
                ['Terres à évacuer (foisonnées)', `${formatNombre(metre.fouilles.evacuation)} m³`],
              ]}
            />
          </Carte>

          <Carte titre="Bétons" icone={TableCellsIcon}>
            <Tableau
              entetes={['Ouvrage', 'Volume', 'Dosage', 'Ciment', 'Sable', 'Gravier']}
              lignes={metre.betons.map((b) => [
                b.nom,
                `${formatNombre(b.volume)} m³`,
                `${b.dosage} kg/m³`,
                `${formatNombre(b.cimentSacs, 1)} sacs`,
                `${formatNombre(b.sable)} m³`,
                `${formatNombre(b.gravier)} m³`,
              ])}
            />
            {metre.betons.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Statistique label="Volume total" valeur={formatNombre(metre.totauxBeton.volume)} unite="m³" />
                <Statistique
                  label="Ciment (bétons)"
                  valeur={formatNombre(metre.totauxBeton.cimentSacs, 1)}
                  unite="sacs"
                />
                <Statistique label="Sable" valeur={formatNombre(metre.totauxBeton.sable)} unite="m³" />
                <Statistique label="Eau" valeur={formatNombre(metre.totauxBeton.eau, 0)} unite="L" />
              </div>
            )}
          </Carte>

          <Carte titre="Aciers" icone={TableCellsIcon} accent="#C4894A">
            <Tableau
              entetes={['Diamètre', 'Longueur', 'Poids', `Barres de ${LONGUEUR_BARRE_ACIER} m`]}
              lignes={metre.acier.parDiametre.map((a) => [
                `HA ${a.diametre}`,
                `${formatNombre(a.ml, 1)} ml`,
                `${formatNombre(a.kg, 1)} kg`,
                formatQuantite(a.barres),
              ])}
            />
            {metre.acier.detail.length > 0 && (
              <>
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 pt-2">
                  Détail par ouvrage
                </h3>
                <Tableau
                  entetes={['Ouvrage', 'Désignation', 'Longueur', 'Poids']}
                  lignes={metre.acier.detail.map((d) => [
                    d.element,
                    d.designation,
                    `${formatNombre(d.ml, 1)} ml`,
                    `${formatNombre(d.kg, 1)} kg`,
                  ])}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Statistique
                    label="Acier total"
                    valeur={formatNombre(metre.acier.totalKg, 0)}
                    unite="kg"
                    accent="#C4894A"
                  />
                  <Statistique
                    label="Fil d'attache"
                    valeur={formatNombre(metre.acier.filAttacheKg, 1)}
                    unite="kg"
                    accent="#C4894A"
                  />
                </div>
              </>
            )}
          </Carte>

          <Carte titre="Coffrage" icone={TableCellsIcon} accent="#8B5E3C">
            <Tableau
              entetes={['Poste', 'Quantité']}
              lignes={
                metre.coffrage.surface > 0
                  ? [
                      ['Surface à coffrer', `${formatNombre(metre.coffrage.surface)} m²`],
                      [metre.coffrage.panneauLabel, `${formatQuantite(metre.coffrage.panneaux)} u.`],
                      [
                        'Chevrons de raidissement',
                        `${formatQuantite(metre.coffrage.chevrons)} u. (${formatNombre(metre.coffrage.chevronsMl)} ml)`,
                      ],
                      ['Clous', `${formatNombre(metre.coffrage.clousKg, 1)} kg`],
                    ]
                  : []
              }
            />
          </Carte>

          <Carte titre="Maçonnerie et dallage" icone={TableCellsIcon}>
            <Tableau
              entetes={['Poste', 'Quantité']}
              lignes={[
                ['Surface de soubassement', `${formatNombre(metre.maconnerie.surface)} m²`],
                ['Blocs', `${formatQuantite(metre.maconnerie.blocs)} u.`],
                ['Mortier de pose', `${formatNombre(metre.maconnerie.mortierVolume, 3)} m³`],
                ['Ciment (mortier)', `${formatNombre(metre.maconnerie.cimentSacs, 1)} sacs`],
                ['Sable (mortier)', `${formatNombre(metre.maconnerie.sable, 2)} m³`],
                ...(metre.dallage.surface > 0
                  ? ([
                      ['Surface dallée', `${formatNombre(metre.dallage.surface)} m²`],
                      ['Moellons (hérisson)', `${formatNombre(metre.dallage.herisson)} m³`],
                      ['Lit de sable', `${formatNombre(metre.dallage.sable)} m³`],
                      ['Film polyane', `${formatNombre(metre.dallage.polyane)} m²`],
                      ['Béton de dallage', `${formatNombre(metre.dallage.betonVolume)} m³`],
                      ['Treillis soudé', `${formatQuantite(metre.dallage.treillisPanneaux)} panneaux`],
                    ] as (string | number)[][])
                  : []),
              ]}
            />
          </Carte>

          <Carte titre="Plomberie — tuyaux d'attente" icone={TableCellsIcon} accent="#1E7A9E">
            <Tableau
              entetes={['Réseau', 'Ø', 'Longueur', 'Barres', 'Coudes', 'Tés', 'Manchons']}
              lignes={metre.plomberie.lignes.map((l) => [
                l.designation,
                `${l.diametre} mm`,
                `${formatNombre(l.longueur, 1)} ml`,
                formatQuantite(l.barres),
                formatQuantite(l.coudes),
                formatQuantite(l.tes),
                formatQuantite(l.manchons),
              ])}
            />
            {metre.plomberie.lignes.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                <Statistique
                  label="Colle PVC"
                  valeur={formatQuantite(metre.plomberie.collePots)}
                  unite="pots"
                  accent="#1E7A9E"
                />
                <Statistique
                  label="Fourreaux"
                  valeur={formatQuantite(metre.plomberie.fourreaux)}
                  unite="u."
                  accent="#1E7A9E"
                />
              </div>
            )}
          </Carte>
        </div>
      ) : (
        <div className="space-y-5 devis-no-print">
          {lots.map((lot) => {
            const lignesLot = lignes.filter((l) => l.lot === lot)
            const total = lignesLot.reduce((s, l) => s + l.montant, 0)
            return (
              <Carte key={lot} titre={lot} icone={ClipboardDocumentListIcon}>
                <div className="sm:hidden divide-y divide-gray-100">
                  {lignesLot.map((l) => (
                    <div key={l.id} className="py-3">
                      <div className="text-sm font-semibold text-[#0A2342] mb-1.5">{l.designation}</div>
                      <div className="flex items-baseline justify-between gap-3 text-xs">
                        <span className="text-gray-500 tabular-nums">
                          {formatQuantite(l.quantite)} {l.unite} × {formatNombre(l.pu, projet.devise === 'CDF' ? 0 : 2)}
                        </span>
                        <span className="font-bold tabular-nums text-[#0A2342]">
                          {formatNombre(l.montant, projet.devise === 'CDF' ? 0 : 2)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-3 pt-3 border-t-2 border-gray-200">
                    <span className="text-xs font-bold uppercase text-gray-500">Sous-total</span>
                    <span className="font-bold tabular-nums text-[#1B4F8C]">{mt(total)}</span>
                  </div>
                </div>

                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-wide text-gray-400">
                        <th className="pb-2 font-bold">Désignation</th>
                        <th className="pb-2 font-bold text-right">Qté</th>
                        <th className="pb-2 font-bold text-right">Unité</th>
                        <th className="pb-2 font-bold text-right">P.U.</th>
                        <th className="pb-2 font-bold text-right">Montant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {lignesLot.map((l) => (
                        <tr key={l.id}>
                          <td className="py-2.5 pr-3 text-gray-600">{l.designation}</td>
                          <td className="py-2.5 text-right tabular-nums font-semibold text-[#0A2342]">
                            {formatQuantite(l.quantite)}
                          </td>
                          <td className="py-2.5 text-right text-gray-400">{l.unite}</td>
                          <td className="py-2.5 text-right tabular-nums text-gray-600">
                            {formatNombre(l.pu, projet.devise === 'CDF' ? 0 : 2)}
                          </td>
                          <td className="py-2.5 text-right tabular-nums font-bold text-[#0A2342]">
                            {formatNombre(l.montant, projet.devise === 'CDF' ? 0 : 2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-200">
                        <td colSpan={4} className="pt-3 text-right text-xs font-bold uppercase text-gray-500">
                          Sous-total {lot}
                        </td>
                        <td className="pt-3 text-right tabular-nums font-bold text-[#1B4F8C]">{mt(total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </Carte>
            )
          })}

          <div className="bg-[#0A2342] text-white rounded-2xl p-5 space-y-2.5">
            {[
              ['Sous-total', totaux.sousTotal],
              [`Aléas et imprévus (${projet.aleas} %)`, totaux.montantAleas],
              [`Marge entreprise (${projet.marge} %)`, totaux.montantMarge],
            ].map(([label, valeur]) => (
              <div key={String(label)} className="flex justify-between text-sm text-blue-100">
                <span>{label}</span>
                <span className="tabular-nums font-semibold">{mt(Number(valeur))}</span>
              </div>
            ))}
            <div className="flex justify-between text-sm font-bold border-t border-white/15 pt-2.5">
              <span>Total HT</span>
              <span className="tabular-nums">{mt(totaux.totalHT)}</span>
            </div>
            <div className="flex justify-between text-sm text-blue-100">
              <span>TVA ({projet.tva} %)</span>
              <span className="tabular-nums font-semibold">{mt(totaux.montantTVA)}</span>
            </div>
            <div className="flex justify-between items-center border-t border-white/15 pt-3">
              <span className="font-bold text-[#C4894A] uppercase text-xs tracking-wider">Total TTC</span>
              <span className="tabular-nums font-bold text-2xl">{mt(totaux.totalTTC)}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 devis-no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center justify-center gap-2 py-3.5 bg-[#1B4F8C] text-white font-semibold rounded-xl hover:bg-[#163f70] transition-colors text-sm"
        >
          <PrinterIcon className="w-5 h-5" /> Imprimer / PDF
        </button>
        <button
          type="button"
          onClick={() => exporterCSV(input, resultat)}
          className="flex items-center justify-center gap-2 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors text-sm"
        >
          <TableCellsIcon className="w-5 h-5" /> Exporter en CSV
        </button>
        <button
          type="button"
          onClick={() => exporterJSON(input)}
          className="flex items-center justify-center gap-2 py-3.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-[#1B4F8C] hover:text-[#1B4F8C] transition-colors text-sm"
        >
          <ArrowDownTrayIcon className="w-5 h-5" /> Sauvegarder le dossier
        </button>
      </div>

    </div>
  )
}
