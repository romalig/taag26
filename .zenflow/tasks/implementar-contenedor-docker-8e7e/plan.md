# Full SDD workflow

## Configuration
- **Artifacts Path**: {@artifacts_path} → `.zenflow/tasks/{task_id}`

---

## Agent Instructions

If you are blocked and need user clarification, mark the current step with `[!]` in plan.md before stopping.

---

## Workflow Steps

### [x] Step: Requirements
<!-- chat-id: c243fa83-2bca-44e4-aa8e-db538393e70f -->

Create a Product Requirements Document (PRD) based on the feature description.

1. Review existing codebase to understand current architecture and patterns
2. Analyze the feature definition and identify unclear aspects
3. Ask the user for clarifications on aspects that significantly impact scope or user experience
4. Make reasonable decisions for minor details based on context and conventions
5. If user can't clarify, make a decision, state the assumption, and continue

Save the PRD to `{@artifacts_path}/requirements.md`.

### [x] Step: Technical Specification
<!-- chat-id: d7c0d152-b63f-490f-a4ad-c2358a1b7748 -->

Create a technical specification based on the PRD in `{@artifacts_path}/requirements.md`.

1. Review existing codebase architecture and identify reusable components
2. Define the implementation approach

Save to `{@artifacts_path}/spec.md` with:
- Technical context (language, dependencies)
- Implementation approach referencing existing code patterns
- Source code structure changes
- Data model / API / interface changes
- Delivery phases (incremental, testable milestones)
- Verification approach using project lint/test commands

### [x] Step: Planning
<!-- chat-id: 1c0d6af7-e582-4f24-8f91-9ee333320190 -->

Create a detailed implementation plan based on `{@artifacts_path}/spec.md`.

1. Break down the work into concrete tasks
2. Each task should reference relevant contracts and include verification steps
3. Replace the Implementation step below with the planned tasks

Rule of thumb for step size: each step should represent a coherent unit of work (e.g., implement a component, add an API endpoint). Avoid steps that are too granular (single function) or too broad (entire feature).

Important: unit tests must be part of each implementation task, not separate tasks. Each task should implement the code and its tests together, if relevant.

If the feature is trivial and doesn't warrant full specification, update this workflow to remove unnecessary steps and explain the reasoning to the user.

Save to `{@artifacts_path}/plan.md`.

### [x] Step: Create .dockerignore at project root
<!-- chat-id: e6b37e63-c4c1-4d66-93cc-f2f59e11bb62 -->

Create `.dockerignore` at the project root to exclude unnecessary files from the Docker build context.

Content to include:
- `node_modules`
- `.next`
- `.git`
- `.gitignore`
- `.zenflow`
- `*.log`
- `*.pem`
- `.DS_Store`
- `.env*`
- `public`

Reference: spec.md § `.dockerignore`

### [x] Step: Create .docker/Dockerfile
<!-- chat-id: daba1850-eeb4-4967-97c4-b602ca4e9f11 -->

Create `.docker/Dockerfile` for the Next.js development container.

- Base image: `node:22-alpine`
- `WORKDIR /app`
- `COPY package.json package-lock.json ./`
- `RUN npm ci`
- `EXPOSE 3000`
- `CMD ["npm", "run", "dev"]`

Reference: spec.md § `.docker/Dockerfile`

### [x] Step: Create docker-compose.yml at project root
<!-- chat-id: d282a89f-2661-468c-b63f-82944ae9f39a -->

Create `docker-compose.yml` at the project root to orchestrate the development container.

- Single service `web`
- Build context `.` with dockerfile `.docker/Dockerfile`
- Port mapping `3000:3000`
- Bind mount `.:/app` for hot reload
- Anonymous volume `/app/node_modules` to isolate container node_modules
- Environment variables: `NODE_ENV=development`, `CHOKIDAR_USEPOLLING=true`, `WATCHPACK_POLLING=true`

Reference: spec.md § `docker-compose.yml`

### [ ] Step: Verify Docker build and runtime

Run build and smoke-test the container:

1. `docker compose build --no-cache` — expected: exits 0, `npm ci` completes successfully
2. `docker compose up` — expected: Next.js dev server starts, `http://localhost:3000` loads the TAAG landing page
3. Edit a source file (e.g., `app/page.tsx`) — expected: fast refresh triggers in the browser without container restart
