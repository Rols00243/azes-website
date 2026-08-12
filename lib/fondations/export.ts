/**
 * Exports du devis : CSV (tableur) et JSON (sauvegarde / partage du dossier).
 */

import { formatNombre } from './format'
import type { DevisInput, DevisResultat } from './types'

function telecharger(nomFichier: string, contenu: string, type: string) {
  const blob = new Blob([contenu], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nomFichier
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

function slug(texte: string): string {
  return (
    texte
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase() || 'devis'
  )
}

const csvCell = (v: string | number) => {
  const s = String(v)
  return /[";\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

/** Le point-virgule est le séparateur attendu par Excel en configuration francophone. */
export function exporterCSV(input: DevisInput, resultat: DevisResultat) {
  const { projet } = input
  const { lignes, totaux, metre } = resultat
  const l: string[] = []

  l.push(['Devis fondations', projet.nom].map(csvCell).join(';'))
  l.push(['Client', projet.client].map(csvCell).join(';'))
  l.push(['Localisation', projet.localisation].map(csvCell).join(';'))
  l.push(['Référence', projet.reference].map(csvCell).join(';'))
  l.push(['Date', projet.date].map(csvCell).join(';'))
  l.push(['Devise', projet.devise].map(csvCell).join(';'))
  l.push('')
  l.push(['Linéaire de fondation (ml)', formatNombre(metre.lineaireTotal)].map(csvCell).join(';'))
  l.push(['Volume de fouille (m3)', formatNombre(metre.fouilles.volumeTotal)].map(csvCell).join(';'))
  l.push(['Volume de béton (m3)', formatNombre(metre.totauxBeton.volume)].map(csvCell).join(';'))
  l.push(['Acier total (kg)', formatNombre(metre.acier.totalKg)].map(csvCell).join(';'))
  l.push(['Surface de coffrage (m2)', formatNombre(metre.coffrage.surface)].map(csvCell).join(';'))
  l.push('')
  l.push(['Lot', 'Désignation', 'Unité', 'Quantité', 'P.U.', 'Montant'].join(';'))
  for (const ligne of lignes) {
    l.push(
      [
        ligne.lot,
        ligne.designation,
        ligne.unite,
        formatNombre(ligne.quantite),
        formatNombre(ligne.pu),
        formatNombre(ligne.montant),
      ]
        .map(csvCell)
        .join(';')
    )
  }
  l.push('')
  for (const lot of totaux.lots) {
    l.push([`Sous-total ${lot.lot}`, '', '', '', '', formatNombre(lot.montant)].map(csvCell).join(';'))
  }
  l.push(['Sous-total', '', '', '', '', formatNombre(totaux.sousTotal)].map(csvCell).join(';'))
  l.push([`Aléas ${projet.aleas} %`, '', '', '', '', formatNombre(totaux.montantAleas)].map(csvCell).join(';'))
  l.push([`Marge ${projet.marge} %`, '', '', '', '', formatNombre(totaux.montantMarge)].map(csvCell).join(';'))
  l.push(['Total HT', '', '', '', '', formatNombre(totaux.totalHT)].map(csvCell).join(';'))
  l.push([`TVA ${projet.tva} %`, '', '', '', '', formatNombre(totaux.montantTVA)].map(csvCell).join(';'))
  l.push(['Total TTC', '', '', '', '', formatNombre(totaux.totalTTC)].map(csvCell).join(';'))

  // BOM UTF-8 pour qu'Excel lise correctement les accents
  telecharger(`devis-fondations-${slug(projet.nom)}.csv`, '﻿' + l.join('\r\n'), 'text/csv;charset=utf-8')
}

export function exporterJSON(input: DevisInput) {
  telecharger(
    `devis-fondations-${slug(input.projet.nom)}.json`,
    JSON.stringify(input, null, 2),
    'application/json'
  )
}

export function lireFichierJSON(fichier: File): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader()
    lecteur.onload = () => {
      try {
        resolve(JSON.parse(String(lecteur.result)))
      } catch (e) {
        reject(e)
      }
    }
    lecteur.onerror = () => reject(lecteur.error)
    lecteur.readAsText(fichier)
  })
}
