
import express from "express";
import cors from "cors";
import { herbs } from "../src/data/herbs.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "HerbaNusantara API berjalan"
  });
});

app.get("/api/herbs", (req, res) => {
  const query = String(req.query.search || "").trim();

  if (query.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Pencarian maksimal 100 karakter"
    });
  }

  const result = herbs.filter((herb) => {
    const searchableText = [
      herb.name,
      herb.latin,
      herb.category,
      herb.desc
    ]
      .join(" ")
      .toLowerCase();

    return searchableText.includes(query.toLowerCase());
  });

  res.json({
    success: true,
    total: result.length,
    data: result
  });
});

app.get("/api/herbs/:id", (req, res) => {
  const herb = herbs.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!herb) {
    return res.status(404).json({
      success: false,
      message: "Herbal tidak ditemukan"
    });
  }

  res.json({
    success: true,
    data: herb
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan"
  });
});

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server"
  });
});

app.listen(PORT, () => {
  console.log(`Backend berjalan di http://localhost:${PORT}`);
});
