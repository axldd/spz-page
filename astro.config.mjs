// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import previewBase from './src/integrations/preview-base.mjs';

/**
 * Temporary GitHub Pages preview. Set PREVIEW_BASE=/spz-page to build a copy
 * that works at https://axldd.github.io/spz-page/ (noindex everywhere). Unset
 * (production) the site is served from the domain root.
 */
const PREVIEW_BASE = process.env.PREVIEW_BASE;

export default defineConfig({
  site: PREVIEW_BASE ? 'https://axldd.github.io' : 'https://www.spz-anwaelte.de',
  base: PREVIEW_BASE ?? '/',
  trailingSlash: 'always',
  integrations: [...(PREVIEW_BASE ? [previewBase(PREVIEW_BASE)] : []), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
