
export function validateSearch(query) {
  if (typeof query !== "string") {
    return "Pencarian harus berupa teks";
  }

  if (query.trim().length === 0) {
    return "Masukkan nama herbal yang ingin dicari";
  }

  if (query.length > 100) {
    return "Pencarian maksimal 100 karakter";
  }

  return "";
}
