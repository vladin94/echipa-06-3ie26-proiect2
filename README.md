# KYOTO — Cultural Editorial Website

A final university team project: a production-ready cultural editorial website powered by Strapi CMS as a headless backend, built with React, TypeScript, Vite, Tailwind CSS, and React Router.

---

## Project Purpose

KYOTO is an editorial website exploring Japan's ancient capital — its temples, gardens, gastronomy, crafts, and living traditions. The project demonstrates full-stack web development skills with a headless CMS architecture: Strapi provides content management, React renders the frontend, and Netlify hosts the deployed site.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS (with dark mode) |
| Routing | React Router v7 |
| CMS backend | Strapi (hosted on Strapi Cloud) |
| Deployment | Netlify |
| Fonts | Playfair Display, Inter, Cormorant Garamond |
| Icons | Lucide React |

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/kyoto-editorial.git
cd kyoto-editorial
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```
VITE_STRAPI_URL=https://your-strapi-instance.strapiapp.com/admin
```

Replace the URL with your actual Strapi Cloud instance URL.

### 4. Start the development server

```bash
npm run dev
```

The site runs at `http://localhost:5173`.

---

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_STRAPI_URL` | Full URL to your Strapi admin panel (e.g. `https://xxx.strapiapp.com/admin`) |

The application automatically strips `/admin` from the URL and appends `/api` for all REST API requests. Do not hardcode the URL anywhere in the source code.

---

## Strapi Integration

### Required Content Types

Configure these in your Strapi admin panel:

#### Collection Type: `Category`
| Field | Type |
|---|---|
| `title` | Short text |
| `slug` | UID (auto-generated from title) |
| `description` | Long text |
| `cover` | Media (single image) |

#### Collection Type: `Article`
| Field | Type |
|---|---|
| `title` | Short text |
| `slug` | UID |
| `excerpt` | Long text |
| `content` | Rich text (or long text) |
| `cover` | Media (single image) |
| `gallery` | Media (multiple images) |
| `category` | Relation → Category (many-to-one) |
| `author` | Short text |
| `layoutVariant` | Enumeration: `editorial`, `split`, `gallery`, `feature` |
| `publishedAt` | Date/time (auto) |

#### Single Type: `About`
| Field | Type |
|---|---|
| `title` | Short text |
| `intro` | Long text |
| `teamMembers` | Component (repeatable): `name`, `role`, `bio`, `image` |

#### Collection Type: `Page` (optional)
| Field | Type |
|---|---|
| `title` | Short text |
| `slug` | UID |
| `heroText` | Long text |
| `content` | Long text |
| `cover` | Media |
| `contactDetails` | Component: `email`, `phone`, `address` |

Create a Page entry with `slug = contact` to power the Contact page with CMS content.

### API Permissions

In Strapi admin → Settings → Users & Permissions → Public:
- Enable `find` and `findOne` for `Article`, `Category`, `Page`
- Enable `find` for `About`

---

## Build Instructions

```bash
npm run build
```

The production build outputs to the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## Netlify Deployment

### Deploy via GitHub

1. Push the repository to GitHub
2. Log in to [Netlify](https://netlify.com)
3. Click **Add new site → Import an existing project**
4. Connect your GitHub repository
5. Build settings (auto-detected from `netlify.toml`):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variable:
   - Key: `VITE_STRAPI_URL`
   - Value: your Strapi Cloud URL
7. Deploy

The `netlify.toml` includes an SPA redirect rule that ensures React Router handles all client-side routes correctly.

### Manual Deploy

```bash
npm run build
# Then drag the dist/ folder into Netlify's deploy drop zone
```

---

## Project Structure

```
├── public/                  # Static assets
├── src/
│   ├── assets/              # Local image/icon assets
│   ├── components/          # Reusable UI components
│   │   ├── Header.tsx       # Sticky nav, search, dark mode toggle, offcanvas menu
│   │   ├── Footer.tsx       # Site footer
│   │   ├── ArticleCard.tsx  # Article card (3 variants)
│   │   ├── CategoryCard.tsx # Category card
│   │   ├── ContactForm.tsx  # Frontend contact form
│   │   ├── ImageGallery.tsx # Masonry gallery with lightbox
│   │   ├── SectionHeading.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   ├── hooks/
│   │   ├── useTheme.tsx     # Theme context (light/dark)
│   │   └── useFetch.ts      # Generic fetch hook
│   ├── layouts/
│   │   └── Layout.tsx       # Page wrapper with Header + Footer
│   ├── lib/
│   │   ├── strapi-api.ts    # Strapi REST API layer
│   │   └── fallback.ts      # Kyoto-themed fallback content
│   ├── pages/
│   │   ├── HomePage.tsx     # Cinematic home with hero + sections
│   │   ├── CategoriesPage.tsx
│   │   ├── CategoryDetailPage.tsx
│   │   ├── ArticleDetailPage.tsx  # 4 layout variants
│   │   ├── AboutPage.tsx
│   │   └── ContactPage.tsx
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx              # Router setup
│   ├── main.tsx
│   └── index.css            # Tailwind + custom layer utilities
├── .env                     # Environment variables (not committed)
├── netlify.toml             # Netlify build + SPA redirect config
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## License

University project — for academic demonstration purposes.


Responsabilitățile echipei
Activitățile din cadrul proiectului au fost împărțite în mod echilibrat între membrii echipei, fiecare fiind responsabil de o zonă principală de dezvoltare și documentare:

| Membru | Rol | Responsabilități |
|---|---|---|
| Vlad | Coordonarea proiectului, organizarea repository-ului, integrarea finală, redactarea secțiunilor generale din README, prezentarea scopului proiectului, a tehnologiilor folosite și verificarea finală a documentației |
| Alex | Frontend & configurare locală | Redactarea secțiunilor despre rularea locală, variabilele de mediu, structura proiectului și verificarea pașilor de instalare, dezvoltare și build |
| Robert | Strapi & integrare CMS | Redactarea secțiunilor despre integrarea cu Strapi, tipurile de conținut, permisiunile API și verificarea coerenței dintre README și structura CMS-ului |
| Ariana | Deploy & livrare | Redactarea secțiunilor despre build, publicarea pe Netlify, deploy manual, verificările finale pentru livrare și secțiunea de licență |
