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



This repo is configured with `vercel.json` to:
- Build and serve `frontend` as a static Vite app.
- Deploy `api/*.js` as Node serverless functions.
- Route SPA paths to `index.html`.

Production API endpoints:
- `POST /api/login`
- `GET /api/health`

Demo credentials:
- `user@netflix.com / netflix123`


