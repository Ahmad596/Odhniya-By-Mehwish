# Odhniya Admin Panel — Frontend

A modular, responsive HTML/CSS/JavaScript admin panel based on the supplied sales dashboard screenshot.

## Run locally

No `npm install` is needed. Use a local HTTP server (ES modules do not reliably run from `file://`).

**VS Code:** Open this folder, install the *Live Server* extension if needed, then right-click `index.html` → **Open with Live Server**.

**Python alternative:**

```bash
cd odhniya-admin
python -m http.server 5500
```

Open http://localhost:5500

## Structure

```text
odhniya-admin/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── main.js
│   ├── components/
│   │   ├── chart.js
│   │   ├── layout.js
│   │   └── modal.js
│   ├── data/
│   │   └── store.js
│   ├── utils/
│   │   └── helpers.js
│   └── views/
│       └── pages.js
└── README.md
```

## Working features

- Responsive sidebar navigation and dashboard views
- Search, status filtering, date filtering, pagination
- Add, edit and delete product forms with validation
- Dashboard metrics, SVG sales chart and top-selling collections
- Promotional code creation/removal
- JSON export
- LocalStorage persistence in the same browser

## Important integration notes

- **Not connected to your existing backend.** The project source was not supplied, so existing API endpoints, authentication, database models, and routes cannot be verified.
- `js/data/store.js` is the integration seam. Replace its localStorage functions with calls to your existing product API once you share the repository files and endpoint contracts.
- Statistics and chart are **demonstration data**, not live transactions.
- Authentication, notifications, and user management are **placeholders**, not implemented server-side features.
- Product photos are remote illustrative Unsplash URLs, **not authentic catalog photos**. Replace with your own licensed product images under `assets/` or your backend media URLs. Missing photos use a styled fallback.
- Fonts are loaded from Google Fonts when internet is available; system fonts provide fallback.
- This is a standalone frontend, not a replacement for your existing backend.
