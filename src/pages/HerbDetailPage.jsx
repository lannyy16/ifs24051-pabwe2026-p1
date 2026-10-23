
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getHerbById } from "../services/herbService";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

export default function HerbDetailPage() {
  const { id } = useParams();

  const [herb, setHerb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadHerb() {
      setLoading(true);
      setError("");

      try {
        const data = await getHerbById(
          id,
          controller.signal
        );

        setHerb(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadHerb();

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!herb) {
    return <p>Herbal tidak ditemukan.</p>;
  }

  return (
    <section className="section detail-page">
      <Link to="/catalog">
        ← Kembali ke katalog
      </Link>

      <div
        className="detail-hero"
        style={{ backgroundColor: herb.color }}
      >
        <span>{herb.emoji}</span>
      </div>

      <span className="section-label">
        {herb.category}
      </span>

      <h1>{herb.name}</h1>

      <p className="latin">{herb.latin}</p>

      <p>{herb.desc}</p>

      <div className="detail-information">
        <article>
          <h2>Penggunaan Tradisional</h2>
          <p>{herb.traditional}</p>
        </article>

        <article>
          <h2>Bukti Penelitian</h2>
          <p>{herb.evidence}</p>
        </article>

        <article>
          <h2>Keamanan</h2>
          <p>{herb.safety}</p>
        </article>
      </div>

      <p className="disclaimer">
        Informasi ini bersifat edukatif dan bukan pengganti
        diagnosis atau pengobatan profesional.
      </p>
    </section>
  );
}
