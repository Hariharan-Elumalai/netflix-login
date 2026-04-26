# 🎬 Netflix Login Clone

A pixel-perfect Netflix login page replica with React (Vite) frontend + Express backend.

---

## 📁 Project Structure

```
netflix-app/
├── frontend/              # React + Vite app
│   └── src/
│       ├── App.jsx        # Routing setup
│       └── pages/
│           ├── Login.jsx  # Netflix login UI
│           ├── Login.css  # Login styles
│           ├── Dashboard.jsx  # Post-login dashboard
│           └── Dashboard.css
├── backend/
│   └── server.js          # Express API server
├── start.sh               # One-command startup
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

**Option 1 — One command (run both servers):**
```bash
chmod +x start.sh
./start.sh
```

**Option 2 — Manually:**

Terminal 1 (Backend):
```bash
cd backend
node server.js
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

Then open: **http://localhost:5173**

---

## 🔑 Demo Credentials

| Email | Password | Name |
|-------|----------|------|
| user@netflix.com | netflix123 | Netflix User |
| test@test.com | test123 | Test User |
| admin@netflix.com | admin123 | Admin |

---

## ✨ Features

### Frontend
- ✅ Netflix-accurate login UI with floating labels
- ✅ Frontend validation (empty fields, email format, password length)
- ✅ Axios API integration with the Express backend
- ✅ Loading spinner during API calls
- ✅ Error messages for failed login attempts
- ✅ React Router redirect to Dashboard on success
- ✅ Fully responsive (mobile + desktop)
- ✅ Session storage for auth token persistence

### Backend
- ✅ Express server on port 5000
- ✅ CORS configured for frontend origin
- ✅ Mock user authentication (no database)
- ✅ Proper HTTP status codes (200, 400, 401)
- ✅ Mock JWT token returned on success

### Dashboard
- ✅ Auto-rotating hero banner
- ✅ Content rows (Trending, New Releases, Continue Watching)
- ✅ Hover card effects with play/add buttons
- ✅ Sign Out clears session and redirects to login

---

## 🔗 API Reference

### POST /api/login
**Request:**
```json
{ "email": "user@netflix.com", "password": "netflix123" }
```

**Success (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "user": { "name": "Netflix User", "email": "user@netflix.com" },
  "token": "mock-jwt-token-..."
}
```

**Error (401):**
```json
{ "success": false, "message": "Incorrect email or password." }
```
