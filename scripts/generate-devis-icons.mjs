/**
 * Génère les icônes PNG de l'application « Devis Fondations ».
 *
 *   node scripts/generate-devis-icons.mjs
 *
 * Encodage PNG maison (zlib seul) : aucune dépendance graphique à installer.
 * Le motif reprend une semelle filante et son amorce de poteau.
 */

import { deflateSync } from 'node:zlib'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const DOSSIER = join(RACINE, 'public', 'icons')

const BLEU = [27, 79, 140]
const BLANC = [255, 255, 255]
const OCRE = [196, 137, 74]

/* ─────────────────────────────  Encodeur PNG  ───────────────────────────── */

const TABLE_CRC = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buffer) {
  let c = 0xffffffff
  for (const octet of buffer) c = TABLE_CRC[(c ^ octet) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function bloc(type, data) {
  const longueur = Buffer.alloc(4)
  longueur.writeUInt32BE(data.length)
  const corps = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(corps))
  return Buffer.concat([longueur, corps, crc])
}

function encoderPNG(taille, pixels) {
  const entete = Buffer.alloc(13)
  entete.writeUInt32BE(taille, 0)
  entete.writeUInt32BE(taille, 4)
  entete[8] = 8 // profondeur
  entete[9] = 6 // RGBA
  const brut = Buffer.alloc(taille * (taille * 4 + 1))
  for (let y = 0; y < taille; y++) {
    brut[y * (taille * 4 + 1)] = 0 // filtre « None »
    pixels.copy(brut, y * (taille * 4 + 1) + 1, y * taille * 4, (y + 1) * taille * 4)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    bloc('IHDR', entete),
    bloc('IDAT', deflateSync(brut, { level: 9 })),
    bloc('IEND', Buffer.alloc(0)),
  ])
}

/* ────────────────────────────────  Dessin  ─────────────────────────────── */

/** Coin arrondi : distance au rectangle intérieur, en coordonnées normalisées. */
function dansRectangleArrondi(x, y, rayon) {
  const dx = Math.max(rayon - x, 0, x - (1 - rayon))
  const dy = Math.max(rayon - y, 0, y - (1 - rayon))
  return dx * dx + dy * dy <= rayon * rayon
}

/**
 * Motif de l'icône en coordonnées normalisées (0 → 1).
 * `echelle` resserre le dessin pour laisser la zone de sécurité des icônes maskable.
 */
function couleurMotif(x, y, echelle) {
  const u = 0.5 + (x - 0.5) / echelle
  const v = 0.5 + (y - 0.5) / echelle

  // Amorce de poteau
  if (u >= 0.435 && u <= 0.565 && v >= 0.2 && v < 0.53) return BLANC

  // Semelle filante évasée
  if (v >= 0.53 && v <= 0.68) {
    const progression = (v - 0.53) / 0.15
    const demiLargeur = 0.065 + progression * 0.235
    if (Math.abs(u - 0.5) <= demiLargeur) return BLANC
  }

  // Béton de propreté
  if (v >= 0.72 && v <= 0.79 && u >= 0.16 && u <= 0.84) return OCRE

  return null
}

function genererIcone(taille, { maskable = false } = {}) {
  const pixels = Buffer.alloc(taille * taille * 4)
  const echelle = maskable ? 1 / 0.78 : 1
  const rayon = maskable ? 0 : 0.2

  for (let py = 0; py < taille; py++) {
    for (let px = 0; px < taille; px++) {
      const x = (px + 0.5) / taille
      const y = (py + 0.5) / taille
      const index = (py * taille + px) * 4

      if (!maskable && !dansRectangleArrondi(x, y, rayon)) {
        pixels[index + 3] = 0
        continue
      }

      const motif = couleurMotif(x, y, echelle) ?? BLEU
      pixels[index] = motif[0]
      pixels[index + 1] = motif[1]
      pixels[index + 2] = motif[2]
      pixels[index + 3] = 255
    }
  }
  return encoderPNG(taille, pixels)
}

/* ────────────────────────────────  Sortie  ─────────────────────────────── */

mkdirSync(DOSSIER, { recursive: true })

const fichiers = [
  ['devis-192.png', genererIcone(192)],
  ['devis-512.png', genererIcone(512)],
  ['devis-maskable-512.png', genererIcone(512, { maskable: true })],
  ['devis-180.png', genererIcone(180, { maskable: true })],
]

for (const [nom, contenu] of fichiers) {
  writeFileSync(join(DOSSIER, nom), contenu)
  console.log(`✓ public/icons/${nom} (${(contenu.length / 1024).toFixed(1)} Ko)`)
}
