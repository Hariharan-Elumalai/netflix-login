## Netflix Login Clone

This project contains:
- `frontend`: Vite + React app
- `backend`: Local Express mock API (for local development)
- `api`: Vercel serverless API routes (for production deployment)

## Local Development

Run backend:

```bash
cd backend
npm install
npm start
```

Run frontend (new terminal):

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` and proxies `/api/*` to local backend `http://localhost:5000` in development.

## Vercel Deployment (Single Project)

1. Import this GitHub repository in Vercel.
2. Keep project root as repository root.
3. Deploy.

This repo is configured with `vercel.json` to:
- Build and serve `frontend` as a static Vite app.
- Deploy `api/*.js` as Node serverless functions.
- Route SPA paths to `index.html`.

Production API endpoints:
- `POST /api/login`
- `GET /api/health`

Demo credentials:
- `user@netflix.com / netflix123`
- `test@test.com / test123`
- `admin@netflix.com / admin123`

