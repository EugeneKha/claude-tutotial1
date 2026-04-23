# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # start dev server at http://localhost:3000
npm run build        # production build
npm run lint         # ESLint

npm test             # unit tests (Vitest, runs once)
npm run test:watch   # unit tests in watch mode
npm run test:ui      # unit tests with Vitest UI
npm run test:api     # API tests via Playwright (no browser, auto-starts dev server)
npm run test:e2e     # E2E tests via Playwright Chromium (auto-starts dev server)
npm run test:e2e:ui  # E2E tests with Playwright UI
```

Run a single unit test file:
```bash
npx vitest run tests/unit/utils.test.ts
```

Run a single Playwright test file:
```bash
npx playwright test tests/api/hello.spec.ts --project=api
npx playwright test tests/e2e/home.spec.ts --project=chromium-e2e
```

## Docker

```bash
# build image
docker build -t claude-tutotial1 .

# run container
docker run -p 3000:3000 claude-tutotial1
```

The build uses three stages (`deps` → `builder` → `runner`) and relies on Next.js `output: "standalone"` to produce a minimal image that contains only `server.js` plus the static assets — no `node_modules` in the final layer.

## Architecture

**Next.js App Router** — all pages and layouts live under `app/`. The root layout (`app/layout.tsx`) loads Geist fonts via `next/font/google` and sets up the base HTML shell.

**API routes** live under `app/api/` as Route Handlers (`route.ts`). The `GET /api/hello` route in `app/api/hello/route.ts` serves as the baseline example.

**Shared utilities** live in `lib/utils.ts`. Keep pure, framework-agnostic helpers here.

**Styling** uses Tailwind CSS v4 (CSS-first config — there is no `tailwind.config.js`). Global styles are in `app/globals.css`.

**Testing layers:**
- `tests/unit/` — Vitest + jsdom + React Testing Library. Runs in isolation with no Next.js server.
- `tests/api/` — Playwright `request` context (no browser). Hits the live dev server.
- `tests/e2e/` — Playwright Chromium. Full browser against the live dev server.

Components that use `useRouter`, `usePathname`, or `useSearchParams` require `vi.mock("next/navigation", ...)` in unit tests because jsdom has no Next.js router.
