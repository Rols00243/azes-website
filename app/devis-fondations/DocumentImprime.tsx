'use client'

/**
 * Document A4 du devis — invisible à l'écran, seul contenu conservé à l'impression
 * (voir les règles `@media print` de app/globals.css). Toujours monté, afin que
 * Ctrl+P depuis n'importe quel onglet imprime le devis et non le formulaire.
 */

import { Fragment } from 'react'
import { formatDate, formatMontant, formatNombre, formatQuantite } from '@/lib/fondations/format'
import type { DevisInput, DevisResultat, Lot } from '@/lib/fondations/types'

export default function DocumentImprime({
  input,
  resultat,
}: {
  input: DevisInput
  resultat: DevisResultat
}) {
  const { metre, lignes, totaux } = resultat
  const { projet } = input
  const mt = (v: number) => formatMontant(v, projet.devise)
  const lots = [...new Set(lignes.map((l) => l.lot))] as Lot[]

  return (
    <div className="devis-impression">
    <h1>Devis estimatif — Fondations</h1>
    <p className="devis-sous-titre">{projet.nom}</p>
    <table className="devis-entete">
      <tbody>
        <tr>
          <th>Client</th>
          <td>{projet.client || '—'}</td>
          <th>Référence</th>
          <td>{projet.reference || '—'}</td>
        </tr>
        <tr>
          <th>Localisation</th>
          <td>{projet.localisation || '—'}</td>
          <th>Date</th>
          <td>{formatDate(projet.date)}</td>
        </tr>
      </tbody>
    </table>

    <h2>1. Quantités principales</h2>
    <table>
      <tbody>
        <tr>
          <th>Linéaire de fondation</th>
          <td>{formatNombre(metre.lineaireTotal)} ml</td>
          <th>Volume de fouille</th>
          <td>{formatNombre(metre.fouilles.volumeTotal)} m³</td>
        </tr>
        <tr>
          <th>Volume de béton</th>
          <td>{formatNombre(metre.totauxBeton.volume)} m³</td>
          <th>Ciment</th>
          <td>
            {formatNombre(Math.ceil(metre.totauxBeton.cimentSacs + metre.maconnerie.cimentSacs), 0)} sacs
          </td>
        </tr>
        <tr>
          <th>Acier</th>
          <td>{formatNombre(metre.acier.totalKg, 0)} kg</td>
          <th>Surface de coffrage</th>
          <td>{formatNombre(metre.coffrage.surface)} m²</td>
        </tr>
      </tbody>
    </table>

    <h2>2. Devis estimatif</h2>
    <table>
      <thead>
        <tr>
          <th>Désignation</th>
          <th>U.</th>
          <th>Qté</th>
          <th>P.U.</th>
          <th>Montant</th>
        </tr>
      </thead>
      <tbody>
        {lots.map((lot) => (
          <Fragment key={lot}>
            <tr className="devis-lot">
              <td colSpan={5}>{lot}</td>
            </tr>
            {lignes
              .filter((l) => l.lot === lot)
              .map((l) => (
                <tr key={l.id}>
                  <td>{l.designation}</td>
                  <td>{l.unite}</td>
                  <td className="devis-num">{formatQuantite(l.quantite)}</td>
                  <td className="devis-num">{formatNombre(l.pu, projet.devise === 'CDF' ? 0 : 2)}</td>
                  <td className="devis-num">{formatNombre(l.montant, projet.devise === 'CDF' ? 0 : 2)}</td>
                </tr>
              ))}
          </Fragment>
        ))}
      </tbody>
    </table>

    <table className="devis-totaux">
      <tbody>
        <tr>
          <th>Sous-total</th>
          <td className="devis-num">{mt(totaux.sousTotal)}</td>
        </tr>
        <tr>
          <th>Aléas et imprévus ({projet.aleas} %)</th>
          <td className="devis-num">{mt(totaux.montantAleas)}</td>
        </tr>
        <tr>
          <th>Marge entreprise ({projet.marge} %)</th>
          <td className="devis-num">{mt(totaux.montantMarge)}</td>
        </tr>
        <tr>
          <th>Total HT</th>
          <td className="devis-num">{mt(totaux.totalHT)}</td>
        </tr>
        <tr>
          <th>TVA ({projet.tva} %)</th>
          <td className="devis-num">{mt(totaux.montantTVA)}</td>
        </tr>
        <tr className="devis-ttc">
          <th>Total TTC</th>
          <td className="devis-num">{mt(totaux.totalTTC)}</td>
        </tr>
      </tbody>
    </table>

    <p className="devis-mention">
      Devis estimatif établi à partir d&apos;un métré théorique. Les quantités sont à confirmer par
      un relevé sur site et une note de calcul de structure signée par un ingénieur. Prix
      unitaires exprimés en {projet.devise}, valables 30 jours.
    </p>
    <div className="devis-signatures">
      <div>Le maître d&apos;ouvrage</div>
      <div>L&apos;entreprise</div>
    </div>
  </div>
  )
}
