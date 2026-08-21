# marcmassa.dev (portfolio)

Personal portfolio — static HTML/CSS/JS, no build step.

## Local preview

Open `index.html` directly in a browser, or serve it locally:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy (GitHub Pages)

1. Create a new **public** GitHub repo (e.g. `marcmassa/portfolio` or `marcmassa/marcmassa.github.io`).
2. `git remote add origin <repo-url>`
3. `git add . && git commit -m "Initial portfolio" && git push -u origin master`
4. In the repo's **Settings → Pages**, set source to `Deploy from branch`, branch `master`, folder `/ (root)`.
5. The site publishes at `https://<username>.github.io/<repo>/` (or `https://<username>.github.io/` if the repo is named `<username>.github.io`).

## Before the first deploy

Two placeholders in `assets/content.js` need filling in:
- `links.linkedin` — your LinkedIn profile URL.
- `links.cv` — a link to a **public-safe** CV copy placed inside this repo (never link to `../marc/` — that directory is private and outside this repo on purpose).

See `AGENTS.md` for the hard rules this repo operates under (repo isolation, no PII, no salary/negotiation content).
