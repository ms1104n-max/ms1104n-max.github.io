# Sai Nikhil Mattapalli — Portfolio

Personal portfolio site for Sai Nikhil Mattapalli — AI/ML Engineer.
Healthcare ML, RAG systems, and Generative AI in production.

## Stack

Vanilla HTML, CSS, and JavaScript. No build step. Hosted on GitHub Pages.

## Local development

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Project layout

```
.
├── assets/
│   ├── css/styles.css         Editorial dark theme
│   ├── js/main.js             Live console + UI behavior
│   ├── files/Resume.pdf       Résumé download
│   ├── images/sai-nikhil.jpg  Portrait used in About section
│   └── certificates/          Award PDFs (legacy, optional)
├── data/                      JSON files (unused — legacy)
├── index.html                 Single-page portfolio
└── package.json
```

`index.html` is the source of truth for content. The `data/*.json` files are
not loaded at runtime and exist only as legacy artifacts.

## Deployment

Push to `main` on GitHub. Settings → Pages → deploy from `main` /(root).
