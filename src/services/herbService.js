
const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

async function request(endpoint, options = {}) {
  const { signal, ...fetchOptions } = options;

  let response;

  try {
    response = await fetch(`${API_URL}${endpoint}`, {
      ...fetchOptions,
      signal,
      headers: {
        Accept: "application/json",
        ...fetchOptions.headers
      }
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error(
      "Tidak dapat terhubung ke server. Pastikan backend berjalan."
    );
  }

  let result;

  try {
    result = await response.json();
  } catch {
    throw new Error("Respons server tidak valid.");
  }

  if (!response.ok || result.success === false) {
    throw new Error(
      result.message || `Permintaan gagal (${response.status})`
    );
  }

  return result;
}

export async function getHerbs(signal) {
  const result = await request("/herbs", { signal });

  if (!Array.isArray(result.data)) {
    throw new Error("Format data herbal tidak valid.");
  }

  return result.data;
}

export async function searchHerbs(query, signal) {
  const params = new URLSearchParams({
    search: query
  });

  const result = await request(
    `/herbs?${params.toString()}`,
    { signal }
  );

  if (!Array.isArray(result.data)) {
    throw new Error("Format hasil pencarian tidak valid.");
  }

  return result.data;
}

export async function getHerbById(id, signal) {
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    throw new Error("ID herbal tidak valid.");
  }

  const result = await request(
    `/herbs/${encodeURIComponent(id)}`,
    { signal }
  );

  if (!result.data || typeof result.data !== "object") {
    throw new Error("Data herbal tidak ditemukan.");
  }

  return result.data;
}
