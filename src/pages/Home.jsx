
import { useEffect, useState } from "react";

export default function Home() {
  const [herbs, setHerbs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHerbs() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `/api/herbs?search=${encodeURIComponent(search)}`
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data herbal");
        }

        const result = await response.json();

        setHerbs(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHerbs();
  }, [search]);

  return (
    <main style={{ padding: "40px 7%" }}>
      <section>
        <h1>🌿 HerbaNusantara</h1>

        <h2>Temukan Kebaikan Tanaman Herbal</h2>

        <p>
          Jelajahi berbagai tanaman herbal Indonesia
          dan kenali manfaat tradisionalnya.
        </p>

        <input
          type="search"
          placeholder="Cari tanaman herbal..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            width: "100%",
            maxWidth: "500px",
            padding: "12px",
            marginTop: "20px"
          }}
        />
      </section>

      <section style={{ marginTop: "40px" }}>
        <h2>Daftar Tanaman Herbal</h2>

        {loading && <p>Memuat data herbal...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && herbs.length === 0 && (
          <p>Tanaman herbal tidak ditemukan.</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px"
          }}
        >
          {herbs.map((herb) => (
            <article
              key={herb.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #ddd"
              }}
            >
              <h3>🌱 {herb.name}</h3>

              <p>
                <i>{herb.latin}</i>
              </p>

              <p>{herb.category}</p>

              <p>{herb.desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
