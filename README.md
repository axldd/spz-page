# spz-anwaelte.de

Website of Rechtsanwälte Storsberg und von Schumann, Rüsselsheim.

## Tech stack

- [Astro](https://astro.build): static site generator; pages are Markdown and `.astro` files
- [Tailwind CSS](https://tailwindcss.com): styling
- GitHub Pages: hosting; `.github/workflows/deploy.yml` builds and deploys on every push to `main`

Content lives in `src/content/` (Markdown), page templates in `src/pages/`,
contact details and navigation in `src/data/site.ts`.

## Local development

Requires Node.js (LTS).

```
npm install
npm run dev       # dev server at http://localhost:4321
npm run build     # production build into dist/
npm run preview   # serve the build locally
```
