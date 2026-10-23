
import { Link } from "react-router-dom";
import { useHerbs } from "../hooks/useHerbs";
import HerbGrid from "../components/herbal/HerbGrid";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

export default function HomePage() {
  const { herbs, loading, error, reload } = useHerbs();

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">
            🌿 HERBAL NUSANTARA
          </span>

          <h1>
            Mengenal Alam,
            <br />
            Menjaga Pengetahuan.
          </h1>

          <p>
            Jelajahi tanaman herbal Nusantara,
            kenali manfaat tradisional, bukti penelitian,
            dan informasi keamanannya.
          </p>

          <Link to="/catalog" className="primary-button">
            Jelajahi Herbal →
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              KATALOG HERBAL
            </span>

            <h2>Kenali tanaman herbal</h2>
          </div>

          <Link to="/catalog">
            Lihat Semua →
          </Link>
        </div>

        {loading && <Loading />}

        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => reload()}
          />
        )}

        {!loading && !error && (
          <HerbGrid herbs={herbs.slice(0, 3)} />
        )}
      </section>
    </div>
  );
}
