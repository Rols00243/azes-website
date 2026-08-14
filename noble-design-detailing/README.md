# Noble Design Detailing — site vitrine

Site vitrine statique (HTML / CSS / JavaScript, sans framework ni dépendance à installer)
pour une activité de **detailing automobile**.

> **Projet indépendant.** Ce site n'a rien à voir avec le site AZES situé à la racine du
> dépôt : ce sont deux sites différents. Aucun fichier, aucune dépendance, aucune
> configuration n'est partagé entre les deux. Ce dossier se déploie seul (`base` /
> « Root Directory » = `noble-design-detailing`) et peut être déplacé tel quel dans son
> propre dépôt à tout moment — il suffit de copier le dossier.

## Aperçu

| Page | Fichier | Contenu |
| --- | --- | --- |
| Accueil | `index.html` | Hero, prestations, comparateur avant/après, méthode, avis, CTA |
| Prestations | `services.html` | Les 6 prestations en détail + FAQ |
| Tarifs | `tarifs.html` | 3 forfaits, grille d'options, FAQ tarifaire |
| Réalisations | `galerie.html` | Comparateur, galerie filtrable, visionneuse |
| L'atelier | `a-propos.html` | Histoire, engagements, équipement, zone d'intervention |
| Contact | `contact.html` | Formulaire de devis, coordonnées, horaires |
| Mentions légales | `mentions-legales.html` | Modèle à compléter (RGPD inclus) |
| Page 404 | `404.html` | Page d'erreur aux couleurs du site |

## Lancer le site en local

Aucune installation n'est nécessaire. Ouvrez simplement `index.html` dans un navigateur, ou
servez le dossier :

```bash
cd noble-design-detailing
python3 -m http.server 8080
# puis http://localhost:8080
```

## ⚠️ À personnaliser avant la mise en ligne

Toutes les informations ci-dessous sont des **valeurs d'exemple**. Les emplacements sont
signalés dans le code par le commentaire `⚠️ COORDONNÉES À REMPLACER`.

| Élément | Valeur actuelle (exemple) | Où |
| --- | --- | --- |
| Téléphone | `06 12 34 56 78` / `tel:+33612345678` | toutes les pages (en-tête, pied, contact) |
| E-mail | `contact@nobledesigndetailing.fr` | toutes les pages + `data-devis` du formulaire |
| Adresse | `12 rue des Artisans, 69100 Villeurbanne` | pied de page, `contact.html`, JSON-LD |
| Horaires | mardi–samedi | pied de page, `contact.html`, JSON-LD |
| Réseaux sociaux | liens génériques Instagram / Facebook / WhatsApp | pied de page de `index.html` |
| Tarifs | 89 € / 249 € / 890 € + grille d'options | `tarifs.html`, `services.html`, `index.html` |
| Statistiques | « +450 véhicules », « 4,9/5 », « 127 avis » | `index.html`, `galerie.html`, JSON-LD |
| Avis clients | 3 témoignages fictifs | `index.html` |
| Mentions légales | SIRET, TVA, hébergeur, assurance | `mentions-legales.html` |
| Domaine | `https://www.nobledesigndetailing.fr/` | balises `canonical`, `sitemap.xml`, JSON-LD |

Remplacement rapide en ligne de commande :

```bash
cd noble-design-detailing
grep -rl "06 12 34 56 78" . | xargs sed -i 's/06 12 34 56 78/VOTRE NUMÉRO/g'
grep -rl "+33612345678" . | xargs sed -i 's/+33612345678/+33VOTRENUMERO/g'
grep -rl "contact@nobledesigndetailing.fr" . | xargs sed -i 's/contact@nobledesigndetailing.fr/VOTRE@EMAIL.FR/g'
```

## Remplacer les visuels

Les images de `assets/img/` sont des **illustrations SVG génériques** créées pour la
démonstration. Remplacez-les par vos photos (format `.jpg` ou `.webp`, ~1600 px de large,
compressées) :

- `hero-voiture.svg` → photo d'accueil (véhicule détouré ou en situation)
- `avant.svg` / `apres.svg` → **même cadrage**, avant et après traitement (comparateur)
- `galerie-1.svg` … `galerie-9.svg` → vos réalisations
- `atelier.svg` → photo de l'atelier
- `logo.svg` → votre logo (le monogramme « ND » actuel est un placeholder)

Pensez à mettre à jour les attributs `src` **et** `alt` correspondants dans le HTML.

## Faire fonctionner le formulaire de devis

Par défaut, le formulaire de `contact.html` ouvre le logiciel de messagerie du visiteur avec
une demande pré-remplie (`mailto:`). C'est fonctionnel sans serveur, mais peu fiable sur
mobile. Pour recevoir les demandes directement par e-mail, branchez un service de
formulaire — par exemple avec [Formspree](https://formspree.io) :

```html
<!-- dans contact.html, remplacer la balise <form> -->
<form class="formulaire" action="https://formspree.io/f/VOTRE_ID" method="POST">
```

…et supprimer l'attribut `data-devis` (c'est lui qui déclenche le comportement `mailto:`
dans `assets/js/main.js`).

Alternatives équivalentes : Web3Forms, Netlify Forms (`data-netlify="true"`), Getform.

## Mise en ligne

Le site étant 100 % statique, tout hébergeur convient. Les fichiers `netlify.toml` et
`vercel.json` du dossier sont déjà configurés pour un déploiement **sans build** :

- **Netlify** : connecter le dépôt, le `netlify.toml` fait le reste (`base` =
  `noble-design-detailing`). Ou glisser-déposer le dossier sur netlify.com.
- **Vercel** : connecter le dépôt et régler « Root Directory » sur `noble-design-detailing`
  — indispensable, sinon Vercel construit le projet Next.js de la racine (le site AZES) au
  lieu de celui-ci.
- **Cloudflare Pages** : répertoire de publication `noble-design-detailing`, aucune commande
  de build.
- **GitHub Pages** : publier le dossier depuis les réglages du dépôt.
- **Hébergement classique (OVH, Ionos…)** : envoyer le contenu du dossier par FTP.

Après la mise en ligne, mettez à jour l'URL du domaine dans `sitemap.xml`, `robots.txt`, les
balises `canonical` et le bloc JSON-LD de `index.html`.

## Détails techniques

- Aucune dépendance, aucun build : HTML5, CSS moderne (variables, grid, `clamp()`) et
  JavaScript natif.
- Seule ressource externe : les polices Google Fonts (Playfair Display + Inter). Elles
  peuvent être hébergées localement si vous souhaitez zéro requête tierce.
- Responsive du mobile au grand écran, menu plein écran sur mobile.
- Accessibilité : navigation au clavier, lien d'évitement, `aria-*` sur les composants
  interactifs, respect de `prefers-reduced-motion`.
- SEO : titres et descriptions par page, Open Graph, `sitemap.xml`, `robots.txt` et données
  structurées `AutoDetailing` (schema.org) sur l'accueil.
