<<<<<<< HEAD
# NovaPulse Login — React + Express

A responsive, original login experience built with React, Vite, Express, and CSS. The Express API checks mock credentials and serves the production frontend from the same service.

## Demo login

- **Email:** `demo@novapulse.dev`
- **Password:** `Nova@12345`

This is mock authentication for a learning/demo project. It does not use a database, hash passwords, create real accounts, or provide production-grade sessions. Do not use real passwords.

## Run locally

1. Install Node.js 18 or newer.
2. Open this folder in VS Code.
3. In the terminal, run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the Vite URL shown in the terminal (usually `http://localhost:5173`).

The frontend sends `POST /api/login` to the Express server. Vite proxies `/api` to `http://localhost:5000` during development.

## Production build

```bash
npm install
npm run build
npm start
```

Open `http://localhost:5000`. Health check: `http://localhost:5000/api/health`.

## Automatic deployment from GitHub (Render)

GitHub Pages only hosts static files; this project also needs an Express API. Use Render so the frontend and backend deploy together.

1. Create a GitHub repository named `novapulse-login`.
2. Upload/push the complete contents of this folder to the repository's `main` branch.
3. Sign in to Render and choose **New → Blueprint**.
4. Connect the GitHub repository and select its `render.yaml`.
5. Review and create the service. Render builds the Vite app and starts Express.
6. Every push to the connected branch triggers a new deployment because `autoDeploy: true` is set.

The Render service URL will be shown in its dashboard. The included GitHub Actions workflow also runs a build check on every push and pull request.

### Push commands

Run these inside this project folder (replace the URL if you already created a repository):

```bash
git init
git add .
git commit -m "Create NovaPulse login project"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/novapulse-login.git
git push -u origin main
```

If `origin` already exists, use `git remote set-url origin https://github.com/YOUR-USERNAME/novapulse-login.git` instead of adding it again.

## Project structure

```text
novapulse-login/
├── .github/workflows/ci.yml
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── style.css
├── index.html
├── package.json
├── render.yaml
├── server.js
└── vite.config.js
```

## Optional demo credentials

You can override the demo account in the Render environment settings:

- `DEMO_EMAIL`
- `DEMO_PASSWORD`

For a real application, replace the mock login with a secure authentication provider, password hashing, rate limiting, HTTPS-only cookies, CSRF protection, and server-side sessions.
=======
# Nova-plus-website
>>>>>>> f1639c0655e171eefbda998c696be973d78f99d4
