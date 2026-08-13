This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Genius Design Pro — site meubles MDF (`/mdf`)

Site vitrine complet et autonome pour l'atelier de fabrication de meubles en
MDF, monté sous `/mdf`. Il ne touche à aucune page du site AZES.

- **Pages** : accueil, collections (+ 8 fiches produit), le sur-mesure,
  réalisations, l'atelier, devis, contact.
- **Contenu éditorial** : tout est centralisé dans `lib/mdf/data.ts` (prix,
  délais, coordonnées, catalogue, FAQ). C'est le seul fichier à modifier pour
  faire vivre le site.
- **Composants** : `components/mdf/`. Les visuels de meubles sont des
  illustrations SVG (`FurnitureArt.tsx`) — pour passer à de vraies photos,
  remplacer le `<svg>` par une `<Image />` en gardant le conteneur.
- **Design system** : jetons `--color-mdf-*` et utilitaires `.mdf-*` dans
  `app/globals.css`, activés par la classe `.mdf-scope` du layout.
- **Devis** : `POST /api/mdf/devis`, stocké dans `mdf-demandes.json` via le
  même backend que le reste du site (fichier en local, Upstash Redis sur
  Vercel).

Pour publier ce site en racine du domaine, déplacer `app/mdf/` vers un groupe
de routes (par ex. `app/(mdf)/`) et ajuster les liens internes.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
