import express from "express";
import cors from "cors";
import herbRoutes from "./routes/herbRoutes.js";

// Dukung pembacaan file .env secara otomatis di Node 20+ jika file ada
if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile();
  } catch {
    // Abaikan jika file .env belum dibuat
  }
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const allowedOrigin = process.env.FRONTEND_URL;

app.disable("x-powered-by");
app.use(cors({
  origin(origin, callback) {
    // Izinkan request tanpa Origin (curl/health check) atau jika FRONTEND_URL tidak diset (pengembangan lokal)
    if (!origin || !allowedOrigin) return callback(null, true);
    const normalizedOrigin = origin.replace(/\/$/, "");
    const allowed = allowedOrigin.split(",").map((o) => o.trim().replace(/\/$/, ""));
    if (allowed.includes(normalizedOrigin)) return callback(null, true);
    return callback(new Error("Origin tidak diizinkan oleh CORS."));
  }
}));

app.use(express.json({ limit: "20kb" }));
app.get("/api/health", (_req, res) => res.json({ success: true, message: "HerbaNusantara API aktif." }));
app.use("/api/herbs", herbRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan.` }));
app.use((err, _req, res, _next) => {
  if (err.message === "Origin tidak diizinkan oleh CORS.") return res.status(403).json({ success: false, message: err.message });
  console.error("Kesalahan server:", err);
  return res.status(500).json({ success: false, message: "Terjadi kesalahan internal pada server." });
});

app.listen(PORT, "0.0.0.0", () => console.log(`HerbaNusantara API berjalan pada port ${PORT}`));
