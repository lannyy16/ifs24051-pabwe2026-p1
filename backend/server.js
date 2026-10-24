import express from "express";
import herbRoutes from "./routes/herbRoutes.js";

const app = express();
const PORT = Number(process.env.PORT) || 3000;
app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));
app.get("/api/health", (_req, res) => res.json({ success: true, message: "HerbaNusantara API aktif." }));
app.use("/api/herbs", herbRoutes);
app.use((req, res) => res.status(404).json({ success: false, message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan.` }));
app.use((err, _req, res, _next) => {
  console.error("Kesalahan server:", err);
  res.status(500).json({ success: false, message: "Terjadi kesalahan internal pada server." });
});
app.listen(PORT, "0.0.0.0", () => console.log(`HerbaNusantara API berjalan di http://localhost:${PORT}`));
