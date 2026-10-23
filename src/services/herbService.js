
const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function request(endpoint, signal) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    signal,
    headers: {
      Accept: "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(
      `Permintaan gagal dengan status ${response.status}`
    );
  }

  return response.json();
}

export async function getHerbs(signal) {
  const result = await request("/herbs", signal);
  return result.data;
}

export async function searchHerbs(query, signal) {
  const params = new URLSearchParams({
    search: query
  });

  const result = await request(
    `/herbs?${params.toString()}`,
    signal
  );

  return result.data;
}

export async function getHerbById(id, signal) {
  const result = await request(`/herbs/${id}`, signal);
  return result.data;
}
