# Pragadeesh Elangaivendhan — Portfolio

A professional portfolio website built with React, showcasing skills, experience, and projects.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for Production

```bash
npm run build
npm run preview
```

## Customize

Edit `src/data/portfolio.js` for site-only extras (e.g. a project not on your resume).

## Resume sync from PDF (Ollama)

Sync uses **Ollama** locally — free, no API key.

### Setup (one time)

1. Install [Ollama](https://ollama.com)
2. Pull a model:
   ```bash
   ollama pull llama3.2
   ```

### Update portfolio from resume

```bash
npm run sync
git add src/data/portfolio.js Resume_copy.pdf
git commit -m "Update portfolio from resume"
git push
```

Optional `.env` settings (see `.env.example`):

```
OLLAMA_MODEL=llama3.2
OLLAMA_HOST=http://localhost:11434
```

Sync updates personal info, skills, experience, education, and projects from `Resume_copy.pdf`. Site-only projects (not in the PDF) and GitHub links / status badges are preserved. If sync fails, `portfolio.js` is not changed.

The live website is static — Ollama runs only on your machine during `npm run sync`, then you push to deploy.

## Tech Stack

- React 19
- Vite
- Plain CSS (no external UI libraries)
- Ollama (resume sync)
