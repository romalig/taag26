# PRD: Docker Container for Local Development

## Overview

Set up a Docker-based local development environment for `taag-web`, a Next.js 16 marketing/landing-page site for TAAG (advanced microbiological solutions). The goal is to allow developers to spin up the full application with a single command using Docker Compose.

---

## Project Analysis

### Technology Stack

| Component | Version / Detail |
|-----------|-----------------|
| Framework | Next.js 16.1.3 (App Router) |
| Runtime | Node.js (LTS compatible) |
| Language | TypeScript 5 |
| React | 19.2.3 |
| CSS | Tailwind CSS 4 via `@tailwindcss/postcss` |
| Fonts | Google Fonts (Sora) via `next/font/google` — downloaded at container startup (first compilation) |
| Animation | Framer Motion 12.34.0 |
| Icons | Lucide React 0.562.0 |
| Particles | tsparticles 3.9.1 + @tsparticles/react 3.0.0 |
| PDF | @react-pdf/renderer 4.3.2 |
| Linting | ESLint 9 + eslint-config-next 16.1.3 |
| Package manager | npm (package-lock.json present) |

### Architecture

- **Pure frontend SPA/SSR** — no database, no backend API, no external services required.
- **App Router** — `app/` directory structure with multiple routes: `/`, `/aigor`, `/customized`, `/industrial`, `/labs`, `/TxA`, `/where`.
- **Static assets** — large `public/` directory with many images (PNG, SVG) and local font files.
- **Remote images** — `images.unsplash.com` whitelisted in `next.config.ts`.
- **No `.env` files** detected — no secrets or environment variables currently required.

### Existing Docker Configuration

- No `.docker/` folder exists.
- No `Dockerfile` exists.
- No `docker-compose.yml` exists.

### .gitignore Status

The `.gitignore` already covers `node_modules/`, `.next/`, `/build`, `/out/`, `*.log`, `.env*`. No additions needed for Docker artifacts.

---

## Requirements

### Functional Requirements

1. **FR-1**: Developers must be able to run `docker compose up` from the project root to start the app.
2. **FR-2**: The app must be accessible at `http://localhost:3000` inside the container.
3. **FR-3**: Source code changes made on the host machine must be reflected inside the container (hot-reload / fast refresh) for development workflow.
4. **FR-4**: `node_modules` inside the container must be isolated from the host (avoid conflicts between host and container architectures).
5. **FR-5**: The image must correctly install npm dependencies using `package-lock.json` for reproducible installs.
6. **FR-6**: The `public/` assets (images, fonts) must be served correctly.

### Non-Functional Requirements

1. **NFR-1**: The Dockerfile must use a lean base image to keep image size reasonable.
2. **NFR-2**: The `Dockerfile` lives in `.docker/`; `.dockerignore` and `docker-compose.yml` live at the project root (Docker requires `.dockerignore` in the build context directory, not the Dockerfile directory).
3. **NFR-3**: The solution targets **development** mode (`next dev`) — production optimization is out of scope for this task.
4. **NFR-4**: The running container must have internet access so `next/font/google` can download the Sora font on first startup. No internet access is required during `docker build`.
5. **NFR-5**: A `.dockerignore` at the project root must be provided to prevent copying unnecessary files into the build context (e.g., `node_modules`, `.next`, large image assets).

---

## Assumptions & Decisions

| # | Decision |
|---|----------|
| A1 | Node.js base image: `node:22-alpine` — current LTS (since Oct 2024), compatible with Next.js 16 and React 19, small footprint. |
| A2 | Development mode only (`next dev`) for this task. Production Dockerfile is deferred. |
| A3 | Port `3000` exposed (Next.js default). No need to change it. |
| A4 | `node_modules` mounted as an anonymous Docker volume to prevent host/container architecture conflicts. |
| A5 | No environment variables are required at this time. An `.env.example` is not needed. |
| A6 | No additional services (database, cache, etc.) are needed — `docker-compose.yml` will have a single service. |
| A7 | `docker-compose.yml` references the `Dockerfile` from `.docker/Dockerfile`. |

---

## Deliverables

| File | Location | Purpose |
|------|----------|---------|
| `Dockerfile` | `.docker/Dockerfile` | Development Dockerfile for the Next.js app |
| `.dockerignore` | Project root (`.dockerignore`) | Exclude unnecessary files from build context |
| `docker-compose.yml` | Project root | Orchestrates container startup for development |

---

## Out of Scope

- Production Docker image / multi-stage production build
- CI/CD pipeline integration
- Additional services (databases, Redis, etc.)
- SSL/TLS termination
- Environment-specific configuration beyond dev mode
