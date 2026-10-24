# HerbaNusantara Backend API

## Lokal
1. `npm install`
2. `npm run dev`
3. Tes `http://localhost:3000/api/health` dan `http://localhost:3000/api/herbs`.

## Deploy backend
Deploy folder ini sebagai Node.js web service (contoh: Render). Build/install: `npm install`; start: `npm start`.
Atur `FRONTEND_URL` menjadi URL frontend Vercel yang sudah ter-deploy. Port diambil dari `process.env.PORT`.

Endpoint: `GET /api/health`, `GET /api/herbs`, `GET /api/herbs?search=jahe`, `GET /api/herbs/:id`.
