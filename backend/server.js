
import express from "express";
import cors from "cors";

import { herbs } from "../src/data/herbs.js";

const app = express();

// ==============================
// Middleware
// ==============================

app.use(cors());

app.use(express.json());

// ==============================
// Health Check
// ==============================

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "HerbaNusantara API berjalan",
  });
});

// ==============================
// Get All Herbs
// ==============================

app.get("/api/herbs", (req, res) => {
  try {
    const search = String(
      req.query.search || ""
    )
      .trim()
      .toLowerCase();

    const filteredHerbs = herbs.filter((herb) => {
      const searchableText = [
        herb.name,
        herb.latin,
        herb.category,
        herb.desc,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(search);
    });

    res.status(200).json({
      success: true,
      total: filteredHerbs.length,
      data: filteredHerbs,
    });
  } catch (error) {
    console.error("Error mengambil data herbal:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil data herbal",
    });
  }
});

// ==============================
// Get Herb By ID
// ==============================

app.get("/api/herbs/:id", (req, res) => {
  try {
    const { id } = req.params;

    const herb = herbs.find(
      (item) => String(item.id) === id
    );

    if (!herb) {
      return res.status(404).json({
        success: false,
        message: "Herbal tidak ditemukan",
      });
    }

    res.status(200).json({
      success: true,
      data: herb,
    });
  } catch (error) {
    console.error("Error mengambil detail herbal:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil detail herbal",
    });
  }
});

// ==============================
// 404 Not Found
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// ==============================
// Global Error Handler
// ==============================

app.use((error, req, res, next) => {
  console.error("Server Error:", error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    success: false,
    message: "Terjadi kesalahan pada server",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 3000;

const HOST = process.env.APP_HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(
    `HerbaNusantara API berjalan di ${HOST}:${PORT}`
  );
});
