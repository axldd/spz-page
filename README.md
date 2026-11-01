# spz-anwaelte.de

Website of **Rechtsanwälte Storsberg und von Schumann**, Rüsselsheim: a static
replacement for the old WordPress site, built with [Astro](https://astro.build)
+ Tailwind CSS and served by GitHub Pages.

```
edit a file → push to main → GitHub Action builds → live ~2 minutes later
```

## Where things live

| What | File |
| --- | --- |
| Contact details (address, phone, e-mail), navigation | `src/data/site.ts` |
| Kanzlei, Rechtsgebiete pages, Impressum, Datenschutz | `src/content/seiten/*.md` (`slug` in the header = URL) |
| Lawyer profiles + photos | `src/content/anwaelte/*.md`, `src/assets/anwaelte/` |
| Start page, Rechtsgebiete overview, Kontakt | `src/pages/index.astro`, `src/pages/rechtsgebiete/index.astro`, `src/pages/kontakt.astro` |
| Colours | `src/styles/global.css` (`@theme`) |

The site loads nothing from third parties: no web fonts, no embedded map, no
analytics, no cookies.

## Local development

```
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Content migration

All text was taken verbatim from the WordPress database dump (Oct/Nov 2026);
only formatting changed (headings, lists, line wrapping). The old site used
plain permalinks (`/?page_id=13`). A small script on the start page forwards
every old `?page_id=N` link to the new URL.

| Old | New |
| --- | --- |
| `?page_id=12` | `/` |
| `?page_id=13` | `/kanzlei/` |
| `?page_id=15` / `18` / `27` / `117` | `/rechtsanwaelte/` (+ `uwe-storsberg/`, `petra-von-schumann/`, `joerg-puechner/`) |
| `?page_id=30` | `/rechtsgebiete/` |
| `?page_id=124` | `/rechtsgebiete/familienrecht/` |
| `?page_id=198 … 224` | `/rechtsgebiete/familienrecht/<thema>/` |
| `?page_id=130` / `143` | `/rechtsgebiete/sozialrecht/`, `/rechtsgebiete/asyl-und-auslaenderrecht/` |
| `?page_id=24` | `/kontakt/` |
| `?page_id=3` | `/impressum/` (the Datenschutzerklärung is now its own page, `/datenschutz/`) |

## Preview vs. go-live

The workflow currently builds with `PREVIEW_BASE=/spz-page`, which serves the
site at <https://axldd.github.io/spz-page/> with `noindex` on every page.

To go live on www.spz-anwaelte.de:

1. Remove the `PREVIEW_BASE` line from `.github/workflows/deploy.yml`.
2. Add `public/CNAME` containing `www.spz-anwaelte.de` and set the custom domain
   under Settings → Pages.
3. Point DNS at GitHub Pages (check GitHub's docs for the current records),
   then enable "Enforce HTTPS".
4. Optionally delete `src/integrations/preview-base.mjs` and its use in
   `astro.config.mjs`.

## Before go-live: content the firm has to review

- **Datenschutzerklärung** (`src/content/seiten/datenschutz.md`) is the old
  text from 2018, unchanged. It no longer matches the site: it mentions cookies
  and analytics (there are none), describes outdated SSL details, points to
  `www.xyrechtsanwaelte.de/datenschutz`, and does not name GitHub Pages as the
  host. It must be updated by the firm.
- **Impressum**: please have it checked for completeness (e.g. the address of
  the Berufshaftpflichtversicherung, the Berufsbezeichnung).
- Typos carried over verbatim: "Gesellschafzt", "Petra vom Schumann"
  (Familienrecht), "von Schuman" and fax "571342" (Datenschutz), "festfgesetzt",
  "nzw.", "Eheparterin" (Unterhalt), "Reesterrente", "Rendite" (Versorgungsausgleich),
  "zerüttet", "deutschland weit" (Scheidung), "Ausländerecht".
- Sozialrecht still talks about "Hartz IV" (now Bürgergeld).
- Portrait photos are only 150–170 px wide; better originals would help.
