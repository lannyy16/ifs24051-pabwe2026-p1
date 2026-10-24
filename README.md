# HerbaNusantara — React + Vite + Express

Proyek ini merupakan versi refactor untuk meningkatkan struktur folder, clean code, best practice, dan separation of concerns.

## Kebutuhan
- Node.js 20+ (atau versi Node yang mendukung Vite yang terpasang)
- npm atau Bun

## Menjalankan proyek di VS Code

### 1. Install dependency frontend
Dari terminal pada folder utama proyek:
```bash
npm install
```

### 2. Install dependency backend
Buka terminal kedua:
```bash
cd backend
npm install
```

### 3. Jalankan backend
Di terminal backend:
```bash
npm run dev
```
API akan berjalan pada `http://localhost:3000`.

### 4. Jalankan frontend
Di terminal baru, kembali ke folder utama proyek:
```bash
npm run dev
```
Buka URL yang diberikan Vite, biasanya `http://localhost:5173`.

## Endpoint API
- `GET /api/health` — status API
- `GET /api/herbs` — semua tanaman
- `GET /api/herbs?search=jahe` — pencarian tanaman
- `GET /api/herbs/1` — detail tanaman dengan ID 1

Frontend menggunakan proxy Vite dari `/api` ke backend port 3000.

## Struktur penting
- `src/App.jsx` — komposisi halaman dan state tingkat aplikasi
- `src/pages/` — halaman beranda, katalog, finder, artikel, dashboard, autentikasi
- `src/components/` — navbar, footer, kartu herbal, detail herbal
- `src/hooks/useHerbs.js` — fetch data, loading, error, dan pembatalan request
- `src/services/herbService.js` — komunikasi frontend dengan API
- `backend/controllers/` — handler HTTP
- `backend/services/` — logika data backend
- `backend/data/herbs.js` — satu sumber data tanaman

## Pengujian
```bash
npm test
```
Untuk build frontend:
```bash
npm run build
```

## Catatan autentikasi
Login dan registrasi pada versi ini masih demo frontend. Data akun hanya disimpan di state aplikasi, bukan database, dan kata sandi tidak persisten. Jangan gunakan kata sandi asli. Untuk autentikasi nyata, dibutuhkan endpoint backend, hashing kata sandi, validasi server, dan sesi/token yang aman.

## Catatan informasi herbal
Informasi yang tersedia untuk edukasi dan tidak menggantikan diagnosis, konsultasi, atau pengobatan dari tenaga kesehatan.
