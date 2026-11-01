import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Text pages. `slug` is the public path (without slashes), e.g.
 * "rechtsgebiete/familienrecht/scheidung" -> /rechtsgebiete/familienrecht/scheidung/
 */
const seiten = defineCollection({
  loader: glob({ base: 'src/content/seiten', pattern: '**/*.md' }),
  schema: z.object({
    slug: z.string(),
    /** Short title: navigation, breadcrumbs, <title>. */
    title: z.string(),
    /** Optional longer page heading (<h1>); falls back to title. */
    heading: z.string().optional(),
    description: z.string().optional(),
    /** Rechtsgebiete only: "familienrecht" groups the page under Familienrecht. */
    parent: z.string().optional(),
    order: z.number().default(99),
    /** WordPress page ID (old URL ?page_id=N), used for the legacy redirects. */
    wpId: z.number().optional(),
  }),
});

/** Lawyer profiles, rendered under /rechtsanwaelte/<slug>/. */
const anwaelte = defineCollection({
  loader: glob({ base: 'src/content/anwaelte', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string(),
      name: z.string(),
      role: z.string(),
      photo: image(),
      order: z.number(),
      wpId: z.number().optional(),
    }),
});

export const collections = { seiten, anwaelte };
