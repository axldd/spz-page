import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Serve the whole site from a sub-path, for the temporary GitHub Pages preview
 * at https://axldd.github.io/spz-page/.
 *
 * Astro's own `base` already prefixes the assets it emits, but not the internal
 * links written by hand in templates and markdown (`/kalender/`,
 * `/wp-content/uploads/….pdf`, the meta-refresh in the redirect stubs, …). There
 * are ~108 of those. Rewriting them here keeps that knowledge in one place
 * instead of scattering a base-aware helper through every template.
 *
 * Inactive unless PREVIEW_BASE is set, so production builds are untouched.
 * Delete this integration, the env var in .github/workflows/deploy.yml, and the
 * `base` line in astro.config.mjs once the custom domain is live.
 */
export default function previewBase(base) {
  const prefix = `/${String(base).replace(/^\/+|\/+$/g, '')}`;

  /** Root-relative URLs that must not be touched. */
  const skip = (url) =>
    !url.startsWith('/') || // absolute, mailto:, #anchor, …
    url.startsWith('//') || // protocol-relative
    url.startsWith(`${prefix}/`) ||
    url === prefix;

  const withBase = (url) => (skip(url) ? url : prefix + url);

  function rewrite(html) {
    return (
      html
        // href="/…", src="/…"
        .replace(/\b(href|src)="([^"]*)"/g, (_m, attr, url) => `${attr}="${withBase(url)}"`)
        // srcset="/a.webp 640w, /b.webp 1024w"
        .replace(/\bsrcset="([^"]*)"/g, (_m, value) => {
          const rewritten = value
            .split(',')
            .map((candidate) => {
              const trimmed = candidate.trim();
              if (!trimmed) return candidate;
              const [url, ...rest] = trimmed.split(/\s+/);
              return [withBase(url), ...rest].join(' ');
            })
            .join(', ');
          return `srcset="${rewritten}"`;
        })
        // <meta http-equiv="refresh" content="0; url=/rss.xml">
        .replace(
          /content="(\d+;\s*url=)([^"]*)"/gi,
          (_m, head, url) => `content="${head}${withBase(url)}"`,
        )
    );
  }

  return {
    name: 'spz:preview-base',
    hooks: {
      'astro:build:done': ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        let touched = 0;

        const walk = (current) => {
          for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
            const full = path.join(current, entry.name);
            if (entry.isDirectory()) {
              walk(full);
            } else if (entry.name.endsWith('.html')) {
              const before = fs.readFileSync(full, 'utf8');
              const after = rewrite(before);
              if (after !== before) {
                fs.writeFileSync(full, after);
                touched++;
              }
            }
          }
        };
        walk(root);

        // A public copy of the whole site must not compete with the real one in
        // search results.
        fs.writeFileSync(
          path.join(root, 'robots.txt'),
          '# Temporary preview of spz-anwaelte.de — not for indexing.\nUser-agent: *\nDisallow: /\n',
        );

        logger.info(`preview build: prefixed internal links with ${prefix} in ${touched} page(s)`);
      },
    },
  };
}
