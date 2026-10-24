import herbs from "../data/herbs.js";

export function getAllHerbs() {
  return herbs;
}

export function getHerbById(id) {
  return herbs.find((herb) => herb.id === Number(id));
}

export function searchHerbs(keyword = "") {
  const normalizedKeyword = String(keyword).trim().toLowerCase();
  if (!normalizedKeyword) return getAllHerbs();

  return herbs.filter((herb) => {
    const searchableFields = [herb.name, herb.scientificName, herb.category, herb.description, herb.traditional, herb.evidence, herb.safety];
    return searchableFields.some((field) => String(field || "").toLowerCase().includes(normalizedKeyword)) ||
      herb.benefits.some((benefit) => benefit.toLowerCase().includes(normalizedKeyword));
  });
}
