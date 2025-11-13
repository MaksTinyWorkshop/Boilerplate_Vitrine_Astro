# Boilerplate Vitrine Astro

Ce template fournit un socle éditorial neutre pour bâtir un site vitrine avec [Astro](https://astro.build). Les contenus sont gérés en Markdown et décrivent des sections réutilisables : la rédaction peut donc assembler des pages sans toucher au code, tandis que les développeurs gardent la main sur les composants et le design system.

## Installation & commandes

```bash
npm install
npm run dev     # serveur de développement
npm run build   # build statique prêt pour la prod
npm run preview # prévisualiser le build
npm run lint    # vérifier schémas et types de contenu
```

## Architecture générale

```
├── public/                     # Assets statiques servis tels quels
│   └── images/                 # Logos, visuels, illustrations
├── src/
│   ├── components/             # Composants Astro (Hero, CTA, Tarifs, Formulaires…)
│   ├── content/                # Contenus pilotés par Markdown + Zod
│   │   ├── config.ts           # Schémas des collections (pages, sections)
│   │   ├── pages/              # Pages : frontmatter + liste de sections
│   │   └── sections/           # Sections typées (hero, markdown, tarifs, etc.)
│   ├── layouts/                # Layouts globaux (BaseLayout…)
│   ├── lib/                    # Utilitaires (render sections, data partagée…)
│   └── pages/                  # Routes Astro (`index`, `[slug]`, API…)
├── webcore.config.scss         # Configuration du thème global (typo, couleurs…)
└── tailwind.config.mjs         # Config Tailwind utilisée par certains styles
```

### Comment sont rendues les pages ?

1. Chaque fichier dans `src/content/pages` contient un frontmatter avec :
   - `title`/`description` pour le SEO,
   - `sections`, un tableau de slugs correspondant à des fichiers dans `src/content/sections`.
2. `src/lib/sectionRenderer.ts` mappe la clé `component` d’une section vers le composant Astro adéquat.
3. Les composants reçoivent uniquement des props typées (Zod) et rendent la section.

## Personnaliser le template

### Identité & navigation

- `src/lib/siteData.ts` centralise `siteConfig`, une configuration unique pour :
  - `brand` : nom, tagline, logos (header/footer),
  - `navigation.main` / `navigation.footer` : liens de navigation primaires et secondaires,
  - `contact` : coordonnées, bouton principal, liens sociaux,
  - `legal` : libellés et URLs des pages légales,
  - `interactions.callback` : libellés et champs du module “Être rappelé”,
- Remplacez les logos et visuels dans `public/images` puis ajustez les chemins/alt dans `siteConfig`.

### Internationalisation optionnelle

Par défaut, le routage est préfixé par la langue (`/fr/...`, `/en/...`). Pour servir uniquement la version française sans préfixe, définissez la variable d'environnement `PUBLIC_I18N_ENABLED` à `false` (par exemple dans `.env`, `.env.local` ou directement avant la commande `npm run dev`). Exemple :

```bash
echo "PUBLIC_I18N_ENABLED=false" >> .env
```

Relancez ensuite le serveur Astro. Le site sera servi sur `/`, `/contact`, etc., et le sélecteur de langue disparaîtra. Repassez la variable à `true` (ou supprimez-la) pour réactiver instantanément l'internationalisation et les URLs préfixées.

### Contenus éditoriaux

- **Pages** : dupliquez un fichier dans `src/content/pages`, ajustez le frontmatter et les sections.
- **Sections standard** (`hero`, `markdown`, `cta`, `feature-grid`, `parcours`, `faq`, `tarifs`, `contact-form`, etc.) :
  - frontmatter = configuration (titres, CTA, listes…),
  - corps Markdown = contenu riche pour les variantes `markdown`.
- **Formulaire de contact** : `src/content/sections/contact/formulaire.md`
  - Chaque `formula` correspond à un onglet du formulaire,
  - Les champs disponibles sont listés dans le tableau `fields`.
  - **Connexion Google Sheets** :
    1. Créez une feuille avec une première ligne d'en-têtes (`Date Demande`, `Formule`, puis un en-tête par champ du formulaire). Les libellés doivent correspondre aux labels des champs pour que les colonnes se remplissent automatiquement.
    2. Depuis l'onglet `Extensions > Apps Script` de la feuille, copiez le contenu de `src/server/googleAppsScripts/contactScript.js`, puis ajustez `CONTACT_SHEET_ID`, `CONTACT_SHEET_NAME`, les destinataires de notification et, si besoin, la constante `STATIC_HEADERS`.
    3. Dans `Project Settings > Script properties`, ajoutez une propriété `GOOGLE_CONTACT_SCRIPT_SECRET` si vous souhaitez verrouiller l'accès, puis faites-la suivre dans le champ `secret` du payload côté Astro (`src/server/contact.server.ts`).
    4. Déployez le script en tant qu'application Web (`Deploy > New deployment`) et copiez l'URL `exec` dans la variable d'environnement `GOOGLE_CONTACT_SCRIPT_URL` (ou `GOOGLE_APPS_SCRIPT_URL` pour un point d'entrée commun) de votre projet Astro.
- **Tarifs** : `src/content/sections/tarifs/offre.md`
  - `plans` décrit les cartes affichées,
  - `options` contrôle le configurateur (quantités, tarifs dynamiques),
  - le script client synchronise automatiquement le plan sélectionné avec le formulaire (`/contact`).

### Ajouter un nouveau type de section

1. Créez le composant Astro dans `src/components/`.
2. Étendez les schémas Zod dans `src/content/config.ts` pour typer le frontmatter.
3. Ajoutez le mapping dans `src/lib/sectionRenderer.ts`.
4. Créez un fichier Markdown dans `src/content/sections/<categorie>/` avec `component: "<votre-cle>"`.

### Styles

- `webcore.config.scss` centralise les variables (polices, thèmes Mindleaf…).
- Les composants utilisent principalement du SCSS modulaires.
- Tailwind est disponible si vous souhaitez prototyper rapidement des variations.

## Bonnes pratiques d’édition

- Préfixez vos slugs de section (`hero/hero-accueil`, `markdown/home1`…) pour garder une hiérarchie claire.
- Gardez les descriptions concises dans les frontmatters, placez le contenu long dans le corps Markdown.
- Les assets statiques (images, PDFs) vont dans `public/`; référencez-les ensuite avec des chemins absolus (`/images/...`).
- Validez vos contenus avec `npm run lint` : le script s’appuie sur les schémas Zod définis dans `config.ts`.

## Déploiement

La commande `npm run build` génère `dist/`, un bundle statique à déployer sur Netlify, Vercel, Cloudflare Pages, GitHub Pages ou tout autre hébergeur statique.  
Astro gère automatiquement le `BASE_URL`, ce qui permet de servir le template depuis un sous-dossier si nécessaire.

---

Ce boilerplate est volontairement générique : adaptez-le librement (CMS, animations, intégration CRM…) tout en conservant la séparation nette entre le contenu (Markdown), la configuration (siteData, schémas Zod) et la présentation (composants Astro).
