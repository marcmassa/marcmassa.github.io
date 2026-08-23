# AGENTS.md — Local scope: `portfolio/`

> Extends the global `CV/AGENTS.md`. Read this before editing anything in `portfolio/`.

## What lives here

Marc's public portfolio site — its own git repository, rooted exactly at
`portfolio/`. This is the one directory under `CV/` that is meant to be public
and git-tracked.

## Hard rules

1. **This repo's root is `portfolio/`, never `CV/`.** Never run `git init`,
   `git add`, or any git command from `CV/` itself while intending to affect this
   repo — always `cd portfolio/` first (or `git -C portfolio/ ...`).
2. **No PII beyond what's already public.** No phone number, no home address, no
   unpublished personal documents. Re-author any copy pulled from `marc/`, don't
   paste it verbatim. This extends to **repo structure**, not just personal data:
   public-facing copy (anything in `graph-data.js`'s `detail` text, rendered to
   visitors) must never name `marc/` or `mama/` explicitly, even in passing —
   "portfolio/" is the only `CV/` subdirectory name safe to mention publicly
   (confirmed by Marc 2026-08-23, after a draft sentence briefly did this).
3. **No salary, interview-prep, or negotiation content, ever.** This directory is
   public. That material stays out of git entirely.
4. **Visual identity is locked to the established brand**: dark navy background,
   node-graph motif (teal "platform" nodes, amber `#E0A94A` "AI" nodes), memoji
   avatar. Match `kofi-cover.html`'s Canvas approach rather than inventing a new
   visual language.
5. **Before every commit**, mentally re-run R2/R5.5 from
   `CV/specs/portfolio-site/requirements.md`: does this commit contain anything
   private, or anything copied verbatim from `marc/`/`mama/`? If unsure, don't commit.
6. **Accessibility of information is a standing priority (added 2026-08-21).**
   The interactive graph (Cytoscape.js, canvas-rendered) is not natively
   reachable by screen readers or keyboard-only users — every piece of content
   the graph can show MUST also exist in a real, semantic, keyboard-navigable
   HTML fallback (see R10 in `requirements.md`). When adding a new graph node
   or detail panel field, add it to the fallback list in the same change, not
   as a follow-up. Motion/animation additions (panel transitions, node
   feedback) MUST respect `prefers-reduced-motion`.
