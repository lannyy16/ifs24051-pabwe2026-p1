
import { useHerbs } from "../hooks/useHerbs";
import HerbSearch from "../components/herbal/HerbSearch";
import HerbGrid from "../components/herbal/HerbGrid";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

export default function CatalogPage() {
  const {
    herbs,
    loading,
    error,
    search,
    reload
  } = useHerbs();

  return (
    <section className="section">
      <div className="page-heading">
        <span className="section-label">
          ENSIKLOPEDIA HERBAL
        </span>

        <h1>Katalog Herbal</h1>

        <p>
          Temukan berbagai tanaman herbal dan pelajari
          informasi tradisional serta keamanannya.
        </p>
      </div>

      <HerbSearch onSearch={search} />

      {loading && <Loading />}

      {error && (
        <ErrorMessage
          message={error}
          onRetry={() => reload()}
        />
      )}

      {!loading && !error && (
        <>
          <p className="result-count">
            {herbs.length} herbal ditemukan
          </p>

          <HerbGrid herbs={herbs} />
        </>
      )}
    </section>
  );
}
