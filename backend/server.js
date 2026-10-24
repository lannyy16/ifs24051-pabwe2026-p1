
import express from "express";
import cors from "cors";
import herbRoutes from "./routes/herbRoutes.js";

// Membaca .env jika didukung oleh versi Node.js
if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // Abaikan jika file .env tidak tersedia
  }
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const allowedOrigin = process.env.FRONTEND_URL;

app.disable("x-powered-by");

// Konfigurasi CORS
app.use(
  cors({
    origin(origin, callback) {
      // Izinkan request tanpa Origin, misalnya health check
      if (!origin || !allowedOrigin) {
        return callback(null, true);
      }

      const normalize = (url) => url.trim().replace(/\/+$/, "");
      const normalizedOrigin = normalize(origin);

      const allowedOrigins = allowedOrigin
        .split(",")
        .map(normalize);

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Origin tidak diizinkan oleh CORS.")
      );
    },
  })
);

app.use(express.json({ limit: "20kb" }));

// Pemeriksaan kesehatan API
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "HerbaNusantara API aktif.",
  });
});

// Rute tanaman herbal
app.use("/api/herbs", herbRoutes);

// Rute tidak ditemukan
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan.`,
  });
});

// Penanganan error
app.use((err, _req, res, _next) => {
  if (err.message === "Origin tidak diizinkan oleh CORS.") {
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }

  console.error("Kesalahan server:", err);

  return res.status(500).json({
    success: false,
    message: "Terjadi kesalahan internal pada server.",
  });
});

// Jalankan server secara lokal saja
if (process.env.VERCEL !== "1") {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `HerbaNusantara API berjalan pada http://localhost:${PORT}`
    );
  });
}

// Ekspor aplikasi untuk Vercel
export default app;
