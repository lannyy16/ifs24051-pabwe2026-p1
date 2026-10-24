
import { Link } from "react-router-dom";
import { useHerbs } from "../hooks/useHerbs";
import Loading from "../components/common/Loading.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";

export default function HomePage() {
  const { herbs, loading, error } = useHerbs();

  const featuredHerbs = herbs.slice(0, 4);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            HERBANUSANTARA
          </span>

          <h1>
            Mengenal Kekayaan
            <span> Herbal Nusantara</span>
          </h1>

          <p>
            Temukan informasi tanaman herbal Indonesia,
            manfaat tradisional, bukti ilmiah, dan
            panduan keamanan penggunaannya.
          </p>

          <div className="hero-actions">
            <Link to="/catalog" className="btn-primary">
              Jelajahi Herbal
            </Link>

            <Link to="/finder" className="btn-secondary">
              Cari Herbal
            </Link>
          </div>
        </div>

        {!loading && !error && herbs[0] && (
          <aside
            className="hero-specimen"
            aria-label={`Contoh herbal: ${herbs[0].name}`}
          >
            <div
              className="specimen-plate"
              style={{ backgroundColor: herbs[0].color }}
              aria-hidden="true"
            >
              {herbs[0].emoji}
            </div>

            <div className="specimen-label">
              <strong>{herbs[0].name}</strong>
              <em>{herbs[0].latin ?? herbs[0].scientificName}</em>
              <span>{herbs[0].category}</span>
            </div>
          </aside>
        )}
      </section>

      <section className="home-introduction">
        <div className="section-heading">
          <span className="section-label">
            TENTANG HERBANUSANTARA
          </span>

          <h2>Belajar tentang tanaman herbal</h2>

          <p>
            HerbaNusantara menyediakan informasi mengenai
            tanaman herbal yang digunakan dalam tradisi
            Indonesia serta informasi ilmiah dan
            keamanan penggunaannya.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <div className="feature-icon">🌿</div>

            <h3>Katalog Herbal</h3>

            <p>
              Jelajahi berbagai tanaman herbal
              berdasarkan nama dan kategori.
            </p>

            <Link to="/catalog">
              Lihat katalog →
            </Link>
          </article>

          <article className="feature-card">
            <div className="feature-icon">🔎</div>

            <h3>Herbal Finder</h3>

            <p>
              Temukan informasi herbal berdasarkan
              keluhan atau kata kunci.
            </p>

            <Link to="/finder">
              Cari herbal →
            </Link>
          </article>

          <article className="feature-card">
            <div className="feature-icon">📚</div>

            <h3>Artikel Herbal</h3>

            <p>
              Pelajari informasi dan pengetahuan
              mengenai tanaman herbal.
            </p>

            <Link to="/article">
              Baca artikel →
            </Link>
          </article>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <span className="section-label">
            PILIHAN HERBAL
          </span>

          <h2>Kenali tanaman herbal</h2>

          <p>
            Berikut beberapa tanaman herbal yang
            tersedia dalam katalog.
          </p>
        </div>

        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage message={error} />
        )}

        {!loading && !error && herbs.length === 0 && (
          <p>Belum ada data herbal tersedia.</p>
        )}

        {!loading && !error && (
          <div className="herb-grid">
            {featuredHerbs.map((herb) => (
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

                  <Link
                    to={`/herbs/${herb.id}`}
                    className="herb-detail-link"
                  >
                    Lihat detail →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="catalog-action">
          <Link to="/catalog" className="btn-primary">
            Lihat Semua Herbal
          </Link>
        </div>
      </section>

      <section className="home-disclaimer">
        <h2>Informasi dan keamanan</h2>

        <p>
          Informasi herbal pada website ini bertujuan
          untuk edukasi. Informasi tradisional tidak
          selalu didukung bukti klinis yang kuat.
          Tanaman herbal bukan pengganti diagnosis
          maupun pengobatan dari tenaga kesehatan.
        </p>
      </section>
    </div>
  );
}
