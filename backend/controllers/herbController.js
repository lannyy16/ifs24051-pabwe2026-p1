import { getAllHerbs, getHerbById, searchHerbs } from "../services/herbService.js";

export function listHerbs(req, res) {
  const keyword = typeof req.query.search === "string" ? req.query.search : "";
  const data = keyword ? searchHerbs(keyword) : getAllHerbs();
  res.json({ success: true, count: data.length, data });
}

export function getHerb(req, res) {
  const herb = getHerbById(req.params.id);
  if (!herb) return res.status(404).json({ success: false, message: "Tanaman tidak ditemukan." });
  return res.json({ success: true, data: herb });
}
