# Devis Fondations — calculateur de métré

Application web (et application mobile installable) qui calcule le métré et le devis
d'une fondation : fouilles, bétons, barres de fer, fil d'attache, planches ou
contreplaqué, clous, blocs de soubassement, dallage et tuyaux d'attente de plomberie.

- Route : `/devis-fondations`
- Tout le calcul s'exécute dans le navigateur : aucune donnée n'est envoyée au serveur.
- Les devis sont enregistrés dans le `localStorage` de l'appareil, exportables en
  JSON (dossier rechargeable) et en CSV (tableur).

## Organisation du code

| Fichier | Rôle |
| --- | --- |
| `lib/fondations/types.ts` | Types de la saisie et des résultats |
| `lib/fondations/constants.ts` | Constantes techniques, prix indicatifs, saisie par défaut |
| `lib/fondations/calcul.ts` | Moteur de calcul (fonction pure `calculerDevis`) |
| `lib/fondations/format.ts` | Formatage des nombres, montants et dates (fr-FR) |
| `lib/fondations/storage.ts` | Brouillon et devis enregistrés (localStorage) |
| `lib/fondations/export.ts` | Exports CSV et JSON |
| `app/(site)/devis-fondations/` | Interface : 8 onglets de saisie + résultats + document imprimé |
| `public/sw.js`, `public/devis-fondations.webmanifest` | Mode application installable / hors ligne |
| `scripts/generate-devis-icons.mjs` | Génération des icônes PNG (`node scripts/generate-devis-icons.mjs`) |

Le moteur étant une fonction pure sans accès au DOM, il peut être appelé côté serveur
ou dans un test.

## Hypothèses de calcul

**Linéaire.** Mode simple : `2 × (longueur + largeur) + refends`. Mode détaillé :
somme des tronçons saisis. Toutes les quantités linéaires en découlent.

**Terrassement.** Rigole = `linéaire × largeur × profondeur` ; puits =
`nombre × L × l × p`. Le remblai réutilisé est un pourcentage du déblai ; le solde
est évacué après application du coefficient de foisonnement (1,25 par défaut).

**Bétons.** Pour 1 m³ : `dosage` kg de ciment, 0,4 m³ de sable, 0,8 m³ de gravier,
eau ≈ 50 % du poids de ciment. Ouvrages pris en compte : béton de propreté, semelle
filante, semelles isolées, longrine, amorces de poteaux, chaînage d'arase, dallage.

**Aciers.** Masses linéiques normalisées (HA 6 à HA 25), barres commerciales de 12 m.
Aciers filants = `nombre × linéaire`. Cadres = `(longueur / espacement) + 1`, développé
`2 × ((b − 2c) + (h − 2c)) + 2 × 10 cm` de crochets. Nappes des semelles isolées :
quadrillage dans les deux directions. Attentes de poteaux : hauteur de l'amorce plus
la longueur d'attente. Une majoration en % couvre recouvrements et chutes.
Fil d'attache : 10 à 15 kg par tonne d'armatures (réglable).

**Coffrage.** Surface = faces latérales des ouvrages cochés « coffré ». Le nombre de
panneaux tient compte des chutes et du nombre de réemplois. Clous au ratio kg/m².

**Maçonnerie.** Blocs par m² = `1 / ((L + joint) × (H + joint))`, majoré de la casse.
Mortier au ratio m³/m², sable = 1 m³ par m³ de mortier.

**Plomberie.** Par réseau : `barres = ⌈longueur × (1 + chutes) / longueur commerciale⌉`.
La colle est déduite du nombre de collages (raccords + barres).

**Prix.** Les prix par défaut sont des ordres de grandeur du marché congolais en USD,
convertis à titre indicatif en CDF ou EUR. Ils doivent être ajustés avant toute remise
de devis. Le récapitulatif applique successivement aléas, marge puis TVA.

Ces règles relèvent du métré, pas du dimensionnement : les sections et ferraillages
saisis doivent provenir d'une note de calcul de structure.

## Impression

Le document A4 (`DocumentImprime.tsx`) est masqué à l'écran et constitue le seul
contenu conservé à l'impression, grâce aux règles `@media print` de `app/globals.css`.
Il est monté en permanence : `Ctrl+P` depuis n'importe quel onglet imprime le devis.
Les styles d'impression masquent l'en-tête du site, le pied de page et tout élément
portant la classe `devis-no-print`.

## Application mobile installable

`public/devis-fondations.webmanifest` déclare l'application (nom, icônes, couleur de
thème, `display: standalone`). Sur Android, « Ajouter à l'écran d'accueil » installe
l'outil ; sur iOS, « Sur l'écran d'accueil » depuis Safari.

`public/sw.js` met en cache la coquille de l'application et les fichiers statiques
versionnés pour un usage hors ligne (réseau d'abord pour les pages, cache d'abord pour
les ressources). Les routes `/api/*` et `/admin*` ne sont jamais mises en cache, et le
service worker n'est enregistré qu'en production.

Après modification de `public/sw.js`, incrémenter la constante `CACHE` pour invalider
l'ancien cache chez les visiteurs.
