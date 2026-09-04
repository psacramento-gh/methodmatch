# MethodMatch

**Find the right UX research method for your project.**

MethodMatch is a web-based decision-support tool that helps UX professionals choose the most appropriate research methods based on project constraints. Filter 17 established UX methodologies across six dimensions—research question, design phase, analysis focus, data collection type, cost, and time—to quickly narrow down the best-fit options.

**Live app:** [methodmatch.vercel.app](https://methodmatch.vercel.app)

## Features

- **Interactive filtering** — Combine filters across six dimensions to instantly see matching methods
- **Sortable results table** — Compare methods side by side with cost, time, and focus indicators
- **Shareable filter state** — Filter selections are reflected in the URL so you can bookmark or share a specific view
- **Method details** — Each entry includes a description and a link to an authoritative external resource (e.g. Nielsen Norman Group, MeasuringU)
- **Light/dark theme** — Toggle between themes for comfortable viewing
- **About page** — In-depth overview of the tool, its use cases, and limitations

## Filter dimensions

| Dimension | Examples |
|-----------|----------|
| **Question** | "Are there problems in the interface?", "What features do people want?" |
| **Design phase** | Plan, Design, Release |
| **Analysis focus** | Qualitative, Quantitative |
| **Data collection** | Analytic (logs, analytics), Empirical (direct user interaction) |
| **Cost** | Low, Medium, High |
| **Time** | Low, Medium, High |

## Methods covered

MethodMatch catalogs 17 UX research methods, including:

- **Early-stage discovery:** Interview, Survey, Card Sort, Observation, Contextual Inquiry, Diary Study
- **Problem identification:** Formative Usability Testing, Heuristic Evaluation, Tree Test, Search-Log Analysis, True Intent
- **Comparative evaluation:** A/B Testing, Task-Based Benchmark, Retrospective Benchmark (Survey), PURE, Click Test, Usability Test

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```sh
git clone https://github.com/psacramento-gh/methodmatch.git
cd methodmatch
npm install
```

### Development

```sh
npm run dev
```

The dev server starts at [http://localhost:8080](http://localhost:8080).

### Other scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests with Vitest |
| `npm run test:watch` | Run tests in watch mode |

## Deploy

This is a static SPA. On Vercel, `vercel.json` rewrites all routes to `index.html` so deep links like `/about` work.

1. Import the GitHub repo into [Vercel](https://vercel.com)
2. Use the default Vite settings (`npm run build`, output `dist`)
3. Deploy

Any static host that supports SPA fallbacks (Netlify, GitHub Pages with a 404 redirect, etc.) also works.

## Tech stack

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

## Project structure

```
src/
├── components/     # UI components (filters, table, theme toggle, etc.)
├── data/           # UX method definitions (methods.ts)
├── hooks/          # Filter and sort logic (useMethodFilters)
└── pages/          # Index, About, and NotFound routes
```

Method data lives in `src/data/methods.ts`. To add or update a method, edit that file and adjust the filter options in `useMethodFilters.ts` if new values are introduced.

## About

MethodMatch was developed by [pSacramento](https://www.psacramento.com/) as a lightweight, focused tool for method selection—no signup, no bloat, just fast answers to "which research method should we use?"

For a full overview of the tool's purpose, audience, and limitations, visit the [About page](https://methodmatch.vercel.app/about) in the live app.

## License

MIT
