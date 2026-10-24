# HerbaNusantara — Fullstack Web App (React + Vite + Express)

Proyek ini telah direstrukturisasi secara rapi dengan arsitektur **Clean Separation of Concerns (Frontend & Backend)** untuk mempermudah pemeliharaan kode, pengujian, dan deployment.

---

## 📁 Struktur Folder Proyek

```text
ifs24051-pabwe2026-proyek1/
├── backend/                       # Server API Express.js
│   ├── controllers/               # Controller HTTP request & response
│   │   └── herbController.js
│   ├── data/                      # Sumber data tanaman herbal
│   │   └── herbs.js
│   ├── routes/                    # Rute API Express (/api/herbs, dsb.)
│   │   └── herbRoutes.js
│   ├── services/                  # Business logic backend
│   │   └── herbService.js
│   ├── .env.example               # Contoh konfigurasi environment backend
│   ├── package.json               # Dependency backend (express, cors)
│   ├── README.md                  # Panduan khusus backend & deploy
│   └── server.js                  # Entry point server Express
│
├── frontend/                      # Client Application React (Vite)
│   ├── src/
│   │   ├── components/            # Komponen UI (Navbar, Footer, HerbCard, Modal, Brand)
│   │   ├── hooks/                 # Custom Hook React (useHerbs)
│   │   ├── pages/                 # Halaman utama (HomePage, CatalogPage, Finder, Auth, dsb.)
│   │   ├── services/              # Service pemanggilan API & unit test
│   │   │   ├── herbService.js
│   │   │   └── herbService.test.js
│   │   ├── App.jsx                # Root component & aplikasi state
│   │   ├── main.jsx               # Entry point React Vite
│   │   └── style.css              # Styling CSS
│   ├── .env.example               # Contoh konfigurasi environment frontend
│   ├── index.html                 # Template HTML Vite
│   ├── package.json               # Dependency frontend (react, lucide-react, vite, vitest)
│   ├── README.md                  # Panduan khusus frontend & deploy
│   ├── vercel.json                # Konfigurasi SPA rewrite untuk Vercel
│   └── vite.config.js             # Konfigurasi proxy dev & plugin React
│
├── .gitignore                     # Mengabaikan node_modules, build dist, dan .env
├── package.json                   # Script root untuk menjalankan frontend & backend
└── README.md                      # Dokumentasi utama proyek
```

---

## 🚀 Panduan Menjalankan Proyek

### Kebutuhan
- **Node.js** versi 20 atau yang lebih baru
- **npm** (bawaan Node.js)

### Opsi A: Menjalankan Langsung dari Root Folder (Paling Praktis)

1. **Install seluruh dependency (Frontend & Backend):**
   ```bash
   npm run install:all
   ```

2. **Jalankan Backend (Terminal 1):**
   ```bash
   npm run dev:backend
   ```
   Backend berjalan di: `http://localhost:3000`

3. **Jalankan Frontend (Terminal 2):**
   ```bash
   npm run dev:frontend
   ```
   Frontend berjalan di: `http://localhost:5173`

---

### Opsi B: Menjalankan Melalui Masing-Masing Folder

#### 1. Backend
```bash
cd backend
npm install
npm run dev
```

#### 2. Frontend
Buka terminal baru:
```bash
cd frontend
npm install
npm run dev
```

---

## 🧪 Menjalankan Pengujian (Unit Test)

Unit test menggunakan **Vitest** untuk memverifikasi logika `herbService`:
```bash
npm test
```
atau dari folder frontend:
```bash
cd frontend
npm test
```

---

## 🌐 Endpoint API Backend

| Method | Endpoint | Keterangan |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health-check status server |
| `GET` | `/api/herbs` | Mengambil seluruh katalog tanaman herbal |
| `GET` | `/api/herbs?search=jahe` | Pencarian tanaman herbal berdasarkan nama/kategori |
| `GET` | `/api/herbs/:id` | Mengambil detail tanaman berdasarkan ID |

---

## ☁️ Panduan Deployment

### 1. Deploy Backend (contoh: Render / Railway)
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Environment Variables:
  - `PORT`: (otomatis diisi oleh penyedia hosting)
  - `FRONTEND_URL`: URL frontend Anda di Vercel (misal: `https://herbanusantara.vercel.app`)

### 2. Deploy Frontend (Vercel)
- Root Directory pada pengaturan proyek Vercel: `frontend`
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables:
  - `VITE_API_URL`: URL publik backend yang telah aktif (misal: `https://herbanusantara-api.onrender.com`)
