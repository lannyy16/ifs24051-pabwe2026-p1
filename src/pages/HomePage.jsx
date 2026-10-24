
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
          throw new Error("Gagal mengambil data herbal.");
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
    <main className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            🌿 HERBANUSANTARA
          </span>

          <h1>
            Temukan Kebaikan
            <br />
            <span>Tanaman Herbal</span>
          </h1>

          <p>
            Kenali berbagai tanaman herbal Indonesia,
            manfaat tradisional, dan informasi ilmiahnya.
          </p>

          <div className="hero-search">
            <input
              type="search"
              placeholder="Cari tanaman herbal..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>
        </div>
      </section>

      <section className="herb-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              ENSIKLOPEDIA HERBAL
            </span>

            <h2>Jelajahi Tanaman Herbal</h2>
          </div>

          <span className="herb-count">
            {herbs.length} tanaman
          </span>
        </div>

        {loading && (
          <p className="status-message">
            Memuat data herbal...
          </p>
        )}

        {error && (
          <div className="error-box">
            <p>{error}</p>
            <p>
              Pastikan backend Express berjalan di
              localhost:3000.
            </p>
          </div>
        )}

        {!loading && !error && herbs.length === 0 && (
          <p className="status-message">
            Tanaman herbal tidak ditemukan.
          </p>
        )}

        <div className="herb-grid">
          {herbs.map((herb) => (
            <article className="herb-card" key={herb.id}>
              <div className="herb-card-icon">
                🌿
              </div>

              <span className="herb-category">
                {herb.category || "Tanaman Herbal"}
              </span>

              <h3>{herb.name}</h3>

              <p className="herb-latin">
                {herb.latin}
              </p>

              <p className="herb-description">
                {herb.desc}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
