# HerbaNusantara — React (P4)\n\nStarter website edukasi herbal menggunakan React + Vite, disusun mengikuti workflow praktikum ReactJS pada dokumen P4 (workspace, package, source `src`, menjalankan dev server).\n\n## Menjalankan di VS Code\n1. Extract ZIP dan buka folder `HerbaNusantara-React`.\n2. Buka terminal di folder proyek.\n3. Jalankan `bun install` (atau `npm install`).\n4. Jalankan `bun run dev` (atau `npm run dev`).\n5. Buka URL localhost yang ditampilkan Vite.\n\n## Build\n`bun run build` / `npm run build`\n\n## Struktur\n- `src/main.jsx` — entry React\n- `src/App.jsx` — halaman, navigasi, katalog, finder, dashboard, detail herbal\n- `src/data.js` — data contoh herbal\n- `src/style.css` — tampilan responsif\n\nData masih contoh lokal; favorit disimpan selama halaman aktif, belum backend. Informasi herbal untuk edukasi, bukan diagnosis atau saran pengobatan.\n

## Struktur `src` (dibuat lebih terorganisasi untuk presentasi)

```text
src/
├── components/
│   └── layout/          # ruang komponen layout reusable
├── data/
│   └── herbs.js         # data contoh tanaman herbal
├── pages/
│   └── App.jsx          # halaman dan navigasi prototipe
├── styles/
│   └── global.css       # gaya global website
├── utils/               # ruang helper
└── main.jsx             # entry point React
```

Versi ini mengatur ulang file sumber agar lebih mudah dijelaskan. Fitur dan tampilan utama tetap berasal dari prototipe sebelumnya.
