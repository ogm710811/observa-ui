# Observa UI - v1

An executive-first, ops-friendly dashboard UI that surfaces the health of services across environments and regions. This repository contains the React UI built with Vite, TypeScript, and Tailwind CSS. It currently uses an in-app mock aggregator for data; it’s structured to later call a real Health Aggregator API backed by Observe queries.

What’s new in this version
- Right-side Details drawer per service with: p95, error rate, SLO burn rate, last deploy, and recent incidents.
- Preferences drawer with per-user view options (Exec vs Ops mode, auto-refresh, sparklines, secondary metrics, etc.).
- Filters for Environment, Region, Team, and free-text Search.
- KPI tiles and Service Health grid with status legend and freshness timestamp.

Quick start
1) Prerequisites
   - Node.js 18+ and npm

2) Install
   - npm i

3) Run locally
   - npm run dev
   - Open the URL shown in the terminal (e.g., http://localhost:5173)

4) Build for production
   - npm run build
   - Preview locally: npm run preview

Project scripts
- dev: Start the Vite dev server
- build: Type-check with TypeScript project references and build with Vite
- preview: Preview the production build locally

Tech stack
- React 18, TypeScript
- Vite 5 for dev/build
- Tailwind CSS 3 for styling
- Radix UI primitives and lucide-react icons
- Recharts for simple trend sparklines
- Framer Motion for micro-interactions

Data model and mock aggregator
- The UI is wired to a small in-app mock that simulates a Health Aggregator API.
- See src/App.tsx for the mockFetchHealth function and seed data.
- Planned real path: Observe → /health Aggregator API → UI.

Key features at a glance
- Filters: Environment, Region, Team, and Search to scope displayed services.
- Modes: Exec (minimal) vs Ops (detailed) toggle.
- Details drawer: Per-service metrics and recent incidents.
- Preferences: Persisted locally via localStorage (store/pref.ts; types in types/prefs.ts).
- Auto-refresh: Optional, interval is user-configurable in Preferences.

Configuration and preferences
- Preferences are stored in localStorage today via src/store/pref.ts using the schema in src/types/prefs.ts.
- Defaults can be adjusted in those files; the Preferences drawer UI lives in src/components/PreferencesDrawer.tsx.

Documentation
- Dashboard overview and data guide: docs/DASHBOARD.md

Repository structure (selected)
- src/App.tsx: Main UI and mock data wiring
- src/components/PreferencesDrawer.tsx: Preferences UI
- src/store/pref.ts: Load/save preferences
- src/types/prefs.ts: Preferences types
- vite.config.ts, tsconfig.json: Build and tooling configuration
- tailwind.config.ts, postcss.config.js: Styling configuration

Future integration
- Replace mockFetchHealth with real API calls (e.g., /api/services, /api/incidents, /api/meta/*) as documented in docs/DASHBOARD.md.
- Wire user preferences to a backend (e.g., PUT /api/user-prefs) when available.

Contributing
- Open issues and PRs are welcome. For substantial changes, please discuss via an issue first.

License
- Internal/demo use. Add a LICENSE file or update this section if a formal license is required.
