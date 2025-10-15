# DragonLog

[![License](https://img.shields.io/github/license/osmarbetancourt/DragonLog)](LICENSE)
![Last Commit](https://img.shields.io/github/last-commit/osmarbetancourt/DragonLog)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.180-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.13-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Docker Compose](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)](https://docs.docker.com/compose/)
[![Deployment: Hetzner](https://img.shields.io/badge/Deployment-Hetzner-FF1F00?logo=hetzner&logoColor=white)](https://www.hetzner.com/)

> “Let none log escape thy dragon’s gaze.”

An immersive, dark-fantasy observability experience built with Next.js 15. DragonLog guides visitors through an interactive grimoire, a shimmering planar transition, and a rune-laden landing keep—all scored with ambient audio and punctuated by ember-lit effects. The live site is available at **[thydragonlog.com](https://thydragonlog.com)**.

- **Creative direction:** [`DRAGONLOG_LANDING_PROMPT.md`](DRAGONLOG_LANDING_PROMPT.md)
- **License:** [MIT](LICENSE)

---

## Experience Flow

1. **Arcane Portal (BookPhase):** A GSAP-driven tome opens page-by-page atop a Vanta fog layer. Progressing through the passages primes the ambient score and culminates in a portal summon CTA.
2. **Translocation Veil:** A cinematic tunnel animation bridges the storybook and the application, using layered gradients, particles, and timed copy.
3. **Landing Keep:** The main site showcases feature runes, technology pillars, CTA panels, and lore blocks with scroll-triggered reveals, responsive rune carousels, and adaptive typography.
4. **Atmospheric Layering:** Cursor rune trails, ember particle fields, and adaptive ambient audio provide continual motion and feedback across phases.

---

## Highlights

- **Interactive codex narrative** (`BookPortal.tsx`) with page flip logic, viewport-aware scaling, and ambient audio hooks.
- **Rune trail cursor** (`CursorRuneTrail.tsx`) that lerps tail nodes and reacts to rune-marked UI elements.
- **Phase-aware ambient system** (`AmbientEffects.tsx`, `ambientAudioManager.ts`) powering ember fields and fading soundscapes.
- **Landing showcase** (`LandingShowcase.tsx`) featuring parallax banners, particle canvas overlays, CTA galleries, and technology pillars styled as arcane relics.
- **Rune lore carousel** (`RuneLoreCarousel.tsx`) optimized for touch devices with responsive radius calculations and 3D rotation.
- **Themed assets** in `public/images/`, including portal art, rune glyphs, and the DragonLog crest (SVG), plus custom gothic fonts in `public/fonts/`.

---

## Technology Stack

| Layer               | Tooling & Libraries |
|---------------------|---------------------|
| Framework           | [Next.js 15](https://nextjs.org/) (App Router, Turbopack builds) |
| UI & Animations     | React 19, GSAP, `react-scroll-parallax`, custom CSS keyframes |
| 3D / Visual FX      | Three.js, Vanta Fog integration, canvas particle systems |
| Styling              | Tailwind-compatible utility classes, custom CSS modules |
| Audio               | Web Audio API via `ambientAudioManager.ts` |
| Tooling             | TypeScript 5, ESLint 9, npm, Docker & Docker Compose |
| Deployment          | Caddy (reverse proxy), GitHub Actions → Hetzner (Debian) |

---

## Repository Layout

```text
.
├── README.md
├── docker-compose.yml              # Dev stack (Next.js in watch mode)
├── docker-compose.prod.yml         # Production stack (Next.js + optional Caddy)
├── Caddyfile                       # TLS / reverse proxy config (commented for now)
├── DRAGONLOG_LANDING_PROMPT.md     # Creative brief & copy direction
├── LICENSE
└── frontend/
    ├── Dockerfile                  # Multi-stage dev/prod builder
    ├── Dockerfile.prod             # Standalone production image (npm start)
    ├── package.json
    ├── public/                     # Images, audio, fonts, icons
    └── src/app/                    # App Router pages & components
        ├── page.tsx                # Phase orchestrator
        ├── layout.tsx              # Metadata, fonts, providers
        └── components/             # Book portal, landing showcase, FX systems
```

---

## Prerequisites

- Node.js **>= 20** and npm
- or Docker **>= 24** with Docker Compose

Optional but recommended: install the gothic fonts locally for design reviews (`public/fonts/`).

---

## Local Development (Node & npm)

```bash
cd frontend
npm install
npm run dev
```

The dev server starts on [http://localhost:3000](http://localhost:3000). Edit files in `frontend/src/app/**`—Hot Module Replacement keeps the experience live.

### Environment variables

Create `frontend/.env.local` (copied from `.env` if present) and set:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000 # optional if you wire an API
```

Additional assets expected in `public/`:

- `audio/DragonLog_theme.mp3` → ambient score triggered by the portal
- `favicon.ico`, `apple-touch-icon.png` → ensures the dragon crest appears in all contexts

### Useful npm scripts

| Command           | Description |
|-------------------|-------------|
| `npm run dev`     | Next.js dev server with polling (WSL-friendly) |
| `npm run lint`    | ESLint using Next.js config |
| `npm run build`   | Production build (Turbopack) |
| `npm start`       | Serve the built app (used in production image) |

---

## Local Development (Docker)

### Dev stack

```bash
docker compose up --build
```

- Mounts the `frontend/` directory into the container for live reloads.
- Ports: `3000` (Next.js).

### Production stack

1. Create a `.env` file at the repository root and populate at minimum:

   ```bash
   NEXT_PUBLIC_SITE_URL=https://thydragonlog.com
   NEXT_PUBLIC_API_URL=https://api.thydragonlog.com # optional
   ```

2. Build and run:

   ```bash
   docker compose -f docker-compose.prod.yml up --build -d
   ```

By default the production compose file exposes the frontend on `3000`. Re-enable the `Caddyfile` entries (remove the comments) and keep the `caddy` service to terminate TLS for `thydragonlog.com` when you are ready for HTTPS.

---

## Deployment Pipeline (Hetzner)

A GitHub Actions workflow in `.github/workflows/deploy.yml` syncs the repository to a Debian-based Hetzner server and restarts the production stack.

### Required GitHub secrets

- `HETZNER_HOST`
- `HETZNER_USER`
- `HETZNER_PASSWORD`
- `HETZNER_PROJECT_PATH` (remote directory, e.g. `/srv/dragonlog`)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_URL`

Ensure Docker and Docker Compose are installed on the Hetzner host. The workflow uses `sshpass` for simplicity; consider migrating to SSH keys in production environments.

---

## Customisation Guide

- **Narrative & Copy:** Update `BookPortal.tsx`, `LandingShowcase.tsx`, and `RuneLoreCarousel.tsx`. The creative brief lives in [`DRAGONLOG_LANDING_PROMPT.md`](DRAGONLOG_LANDING_PROMPT.md).
- **Audio:** Replace `public/audio/DragonLog_theme.mp3` and adjust fade timings in `ambientAudioManager.ts` if needed.
- **Branding:** Swap assets in `public/images/` and ensure equivalent ICO/PNG files exist for favicon entries in `layout.tsx`.
- **Styling:** Tailwind utility classes are embedded alongside bespoke CSS inside components. Keep comments tight and gothic tone consistent.

---

## License

Released under the [MIT License](LICENSE). Crafted by Osmar Betancourt and contributors—may the dragon’s gaze guard your deployments.
