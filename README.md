# MethodMatch

Find the right UX research method for your project.

MethodMatch is a decision-support tool for UX professionals. Filter 17 established research methods by research question, design phase, analysis focus, data collection approach, cost, and time.

**Live app:** deploy via Vercel (or any static host) from this repo.

## Stack

- Vite
- TypeScript
- React
- shadcn/ui
- Tailwind CSS

## Local development

```sh
npm install
npm run dev
```

Other useful scripts:

```sh
npm run build   # production build
npm run preview # preview production build
npm run lint    # ESLint
npm test        # Vitest
```

## Deploy

This is a static SPA. On Vercel, `vercel.json` rewrites all routes to `index.html` so deep links like `/about` work.

1. Import the GitHub repo into [Vercel](https://vercel.com)
2. Use the default Vite settings (`npm run build`, output `dist`)
3. Deploy

Any static host that supports SPA fallbacks (Netlify, GitHub Pages with a 404 redirect, etc.) also works.

## License

MIT
