/**
 * Extraction des images d'un PDF, sans dépendance ni moteur de rendu.
 *
 * Les plans qui circulent sur chantier sont le plus souvent des scans ou des
 * photos encapsulés dans un PDF : l'image JPEG y est stockée telle quelle
 * (filtre DCTDecode), il suffit donc de la retrouver dans le flux d'octets.
 * Un PDF purement vectoriel (export CAO) ne contient aucune image : il faut
 * alors passer par le DXF ou par une exportation en image.
 */

export interface ImagePDF {
  type: 'image/jpeg'
  donnees: Uint8Array
  octets: number
}

/**
 * Repère les images JPEG encapsulées, de la plus grande à la plus petite
 * (la plus grande est le fond de plan ; les petites sont vignettes et logos).
 */
export function extraireImagesPDF(donnees: Uint8Array): ImagePDF[] {
  const images: ImagePDF[] = []
  const n = donnees.length
  let i = 0

  while (i < n - 3) {
    // Marqueur de début d'image JPEG : FF D8 FF
    if (donnees[i] === 0xff && donnees[i + 1] === 0xd8 && donnees[i + 2] === 0xff) {
      const debut = i
      let j = i + 2
      let fin = -1
      // Marqueur de fin : FF D9
      while (j < n - 1) {
        if (donnees[j] === 0xff && donnees[j + 1] === 0xd9) {
          fin = j + 2
          break
        }
        j++
      }
      if (fin < 0) break
      const octets = fin - debut
      // En dessous de 8 Ko, c'est une vignette ou une icône, pas un plan.
      if (octets > 8192) {
        images.push({ type: 'image/jpeg', donnees: donnees.subarray(debut, fin), octets })
      }
      i = fin
      continue
    }
    i++
  }

  return images.sort((a, b) => b.octets - a.octets)
}

/** Nombre de pages déclarées, utile pour prévenir l'utilisateur. */
export function compterPagesPDF(donnees: Uint8Array): number {
  const texte = new TextDecoder('latin1').decode(donnees.subarray(0, Math.min(donnees.length, 4_000_000)))
  const parType = texte.match(/\/Type\s*\/Page[^s]/g)
  if (parType && parType.length) return parType.length
  const parCompte = texte.match(/\/Count\s+(\d+)/)
  return parCompte ? Number(parCompte[1]) : 1
}
