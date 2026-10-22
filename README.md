# Mubashshir Uddin — personal site

Static site for GitHub Pages. No build step.

## Deploy
1. Repo named `pitabread7022.github.io` (so robots.txt and sitemap.xml sit at the domain root and are honored).
2. Push all files to `main`, then Settings → Pages → Deploy from branch → `main` / root.
3. Optional: add `resume.pdf` to the repo root. The "Résumé" buttons will serve it; otherwise they open a print-ready résumé.
4. If you keep the `/homepage` project path instead, search-and-replace `https://pitabread7022.github.io/` in index.html, robots.txt and sitemap.xml.

## After it's live
- Google Search Console: add the site, submit `sitemap.xml`, request indexing.
- Put the URL on LinkedIn (Contact info + Featured), the GitHub profile README, and your resume header.
- Add repo topics and a Pages "social preview" image in the repo settings.
- Test: PageSpeed Insights, and paste the URL into LinkedIn Post Inspector to check the preview card.
- Update the "Now" section and `lastmod` in sitemap.xml whenever you change things.
