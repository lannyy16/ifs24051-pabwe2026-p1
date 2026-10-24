
import { useState } from "react";
import { Link } from "react-router-dom";

import { useHerbs } from "../hooks/useHerbs";

import Loading from "../components/common/Loading.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

export default function CatalogPage() {
  // Nilai awal pencarian dibaca dari URL (?search=...), mis. dari Herbal Finder
  const [search, setSearch] = useState(
    () =>
      new URLSearchParams(window.location.search).get("search") ?? ""
  );

  const {
    herbs,
    loading,
    error
  } = useHerbs(search);

  return (
    <div className="catalog-page">
      <section className="catalog-hero">
        <div className="catalog-hero-content">
          <span className="section-label">
            KATALOG HERBAL
          </span>

          <h1>Jelajahi Herbal Nusantara</h1>

          <p>
            Temukan berbagai tanaman herbal,
            nama ilmiah, kategori, dan informasi
            penggunaannya.
          </p>
        </div>
      </section>

      <section className="catalog-content">
        <div className="catalog-heading">
          <div>
            <span className="section-label">
              DAFTAR TANAMAN
            </span>

            <h2>Koleksi Herbal</h2>

            <p>
              Cari tanaman herbal berdasarkan nama,
              kategori, atau informasi yang tersedia.
            </p>
          </div>

          <div className="catalog-count">
            {!loading && !error && (
              <span>
                {herbs.length} tanaman herbal
              </span>
            )}
          </div>
        </div>

        <div className="catalog-search">
          <label htmlFor="herb-search">
            Cari tanaman herbal
          </label>

          <input
            id="herb-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Contoh: jahe, kunyit, rimpang..."
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
            >
              Hapus pencarian
            </button>
          )}
        </div>

        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && herbs.length === 0 && (
          <div className="catalog-empty">
            <h3>Herbal tidak ditemukan</h3>

            <p>
              Coba gunakan nama atau kata kunci
              yang berbeda.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
            >
              Tampilkan Semua Herbal
            </button>
          </div>
        )}

        {!loading && !error && herbs.length > 0 && (
          <div className="herb-grid">
            {herbs.map((herb) => (
              <article
                className="herb-card"
                key={herb.id}
              >
                <div
                  className="herb-card-visual"
                  style={{ backgroundColor: herb.color }}
                  aria-hidden="true"
                >
                  {herb.emoji}
                </div>

                <div className="herb-card-content">
                  <span className="herb-category">
                    {herb.category}
                  </span>

                  <h3>{herb.name}</h3>

                  <p className="scientific-name">
                    {herb.latin ?? herb.scientificName}
                  </p>

                  <p className="herb-description">
                    {herb.desc ?? herb.description}
                  </p>

                  <div className="herb-card-footer">
                    <Link
                      to={`/herbs/${herb.id}`}
                      className="herb-detail-link"
                    >
                      Lihat Detail Herbal →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="catalog-disclaimer">
        <p>
          Informasi dalam katalog ini disediakan
          untuk tujuan edukasi. Konsultasikan
          penggunaan herbal dengan tenaga kesehatan.
        </p>
      </section>
    </div>
  );
}
