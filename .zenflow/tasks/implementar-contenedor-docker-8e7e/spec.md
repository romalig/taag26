# Technical Specification: Docker Container for Local Development

## Technical Context

| Item | Detail |
|------|--------|
| Project | `taag-web` — Next.js 16.1.3 marketing/landing site |
| Runtime | Node.js 22 LTS (Alpine) |
| Language | TypeScript 5 |
| Framework | Next.js 16.1.3 (App Router) |
| CSS | Tailwind CSS 4 via `@tailwindcss/postcss` |
| Key deps | React 19, Framer Motion 12, tsparticles 3, @react-pdf/renderer 4, Lucide React |
| Package manager | npm (`package-lock.json` present) |
| External services | None (pure frontend SSR/SPA) |
| Fonts | Google Fonts (Sora) — downloaded by Next.js at container startup (first compilation) |
| Environment variables | None required |

---

## Implementation Approach

### Strategy: Development-only bind-mount setup

The design separates **build time** (dependency installation) from **runtime** (source code):

1. **`docker build`**: Only `package.json` and `package-lock.json` are copied into the image. `npm ci` installs all dependencies inside the container. This keeps the image deterministic and architecture-safe (no host `node_modules` contamination).

2. **`docker compose up`**: The project root is bind-mounted into `/app` in the container. A named anonymous volume is layered over `/app/node_modules` so the container-native modules are never overwritten by the host.

3. **Hot reload**: Next.js dev server (`next dev`) watches file changes via the bind mount. Host edits are reflected immediately without rebuilding the image.

4. **Google Fonts**: The container has outbound internet access at runtime. `next/font/google` downloads the Sora font during the first compilation inside the container.

### Why `node:22-alpine`

- Current LTS since October 2024; supported through April 2027.
- Fully compatible with Next.js 16 and React 19.
- Alpine base keeps the image small (~180 MB layer vs ~1 GB for `node:22`).

---

## Source Code Structure Changes

No application source files are modified. Three new files are created:

```
project-root/
├── .docker/
│   └── Dockerfile          ← NEW: development Dockerfile
├── .dockerignore            ← NEW: build-context exclusions
└── docker-compose.yml       ← NEW: compose orchestration
```

---

## File Specifications

### `.docker/Dockerfile`

```dockerfile
FROM node:22-alpine

WORKDIR /app

# Copy only dependency manifests first (layer-cache friendly)
COPY package.json package-lock.json ./

# Install dependencies with locked versions, skip optional platform binaries
RUN npm ci

# Next.js dev server listens on 3000 by default
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
```

**Key decisions:**
- No `COPY . .` — source code is injected at runtime via bind mount.
- `npm ci` uses `package-lock.json` for reproducible, exact installs.
- No `--omit=dev` — devDependencies (TypeScript, ESLint, Tailwind postcss plugin) are required at dev time.
- Single stage (no multi-stage) — production optimization is out of scope.

---

### `.dockerignore`

Placed at project root (Docker requires `.dockerignore` adjacent to the build context, not the Dockerfile).

```
node_modules
.next
.git
.gitignore
.zenflow
*.log
*.pem
.DS_Store
.env*
public
```

**Notes:**
- `public/` is excluded from the build context (hundreds of MB of images). It is not needed during `docker build` because only `package.json` and `package-lock.json` are `COPY`-ed. At runtime the full project root (including `public/`) is bind-mounted, so Next.js can serve all static assets normally.
- `.zenflow/` excluded to keep internal tooling out of the build context.

---

### `docker-compose.yml`

```yaml
services:
  web:
    build:
      context: .
      dockerfile: .docker/Dockerfile
    ports:
      - "3000:3000"
    volumes:
      - .:/app                          # bind-mount source (hot reload)
      - /app/node_modules               # anonymous volume — isolates container node_modules
    environment:
      - NODE_ENV=development
      - CHOKIDAR_USEPOLLING=true        # ensures file-change events work on macOS/Windows hosts
      - WATCHPACK_POLLING=true          # Next.js internal watcher fallback for Docker volumes
```

**Key decisions:**
- `CHOKIDAR_USEPOLLING=true` and `WATCHPACK_POLLING=true` are required on macOS and Windows because inotify events are not propagated through Docker Desktop volume mounts. Without these, `next dev` will not detect file changes.
- No `depends_on` — no additional services.
- No `restart: always` — development mode; restarts are intentional.

---

## Data Model / API / Interface Changes

None. This is a pure infrastructure change with no application code modifications.

---

## Delivery Phases

This task is small and has a single delivery phase.

### Phase 1 — Create all three files

1. Create `.docker/Dockerfile`
2. Create `.dockerignore` at project root
3. Create `docker-compose.yml` at project root

---

## Verification Approach

### Build verification
```bash
docker compose build --no-cache
```
Expected: image builds successfully, `npm ci` exits 0.

### Runtime verification
```bash
docker compose up
```
Expected:
- Container starts, Next.js dev server logs appear.
- `http://localhost:3000` loads the TAAG landing page in the browser.
- Editing any source file (e.g., `app/page.tsx`) triggers fast refresh in the browser without restarting the container.

### Lint (host, no Docker required)
```bash
npm run lint
```
(No lint-able files are added by this task.)

### No unit tests
This task adds infrastructure files only (Dockerfile, docker-compose, .dockerignore). There is no test framework configured in the project, and Docker configuration files are verified by the build/run steps above.
