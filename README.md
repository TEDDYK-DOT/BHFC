# BHFC — Football Club Website

A polished React + TypeScript + Vite website concept for a football club, designed as a premium demo experience for BHFC.

## Stack

- React 19
- TypeScript
- Vite
- Oxlint

## Local development

```bash
npm install
npm run dev -- --host
```

## Production build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Deploy on Render

This project is configured as a Render Static Site in `render.yaml`.

1. Push the project to its GitHub repository.
2. In Render, choose **New > Blueprint** and connect the repository.
3. Review the `bhfc` static site settings and create the Blueprint.

Render builds the site with `npm run build`, publishes `dist`, and rewrites client-side routes to `index.html`. After the initial deployment, Render can deploy updates from the connected branch automatically.

You can also create a Static Site manually with build command `npm run build` and publish directory `dist`.

## Notes

- This project uses sample club content and placeholder partner branding, clearly marked as demonstration data.
- The current site is a front-end prototype intended for portfolio use and future expansion into CMS, data integration, and admin features.
- The repository is currently connected to the GitHub remote at https://github.com/TEDDYK-DOT/BHFC.git.
