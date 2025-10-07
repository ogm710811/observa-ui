# Observa UI — Micro Frontend Portal Host

An executive-first, ops-friendly dashboard UI that serves as the **host shell** for a Tech Health Dashboard micro frontend ecosystem.

This repository provides the React-based portal shell, exposing the app layout, header, navbar, and routing using Vite, TypeScript, and Tailwind CSS. Additional tools and features (e.g., Observability, Service Catalog) are integrated as **remote modules** via [Vite's Module Federation](https://github.com/originjs/vite-plugin-federation).

---

## Architecture

- **Host App**:  
  This repo (`observa-ui`) is the main entrypoint and UI shell, exposing the layout, navigation, header, and base routers.  
  Micro frontend modules (other dashboards/tools) are loaded dynamically at runtime via module federation.
- **Micro Frontends (Remotes)**:  
  Each feature/module (e.g., Observability) is developed and deployed separately and is loaded by this host at routes such as `/observability`, `/catalog`, etc.

---

## Quick Start

1. **Prerequisites**
    - Node.js 18+ and npm

2. **Install**
    - `npm install`

3. **Run locally**
    - `npm run dev`
    - Open the URL shown in the terminal (e.g., http://localhost:5173)

4. **Build for production**
    - `npm run build`
    - Preview locally: `npm run preview`

---

## Project scripts

- `dev` – Start the Vite dev server
- `build` – Type-check with TypeScript and build with Vite
- `preview` – Preview the production build locally

---

## Tech stack

- [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/) for dev/build
- [Vite Module Federation Plugin](https://github.com/originjs/vite-plugin-federation)
- [Tailwind CSS 3](https://tailwindcss.com/) for styling
- Radix UI primitives and Lucide React icons

---

## Micro Frontend Integration

- Remotes are loaded from their own domains (e.g., [observability.ogm710811.org](https://observability.ogm710811.org)), managed via AWS S3 + CloudFront.
- To add or update a tool, adjust the `module federation` plugin config and navigation/routes accordingly (see project documentation).

---

## Contributing

Open issues and PRs are welcome. For significant changes, please discuss via an issue first.

---

## License

Internal/demo use. Add a LICENSE file or update this section if a formal license is required.