
import { useHerbs } from "../hooks/useHerbs";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/ErrorMessage";

export default function DashboardPage() {
  const {
    herbs,
    loading,
    error,
    reload
  } = useHerbs();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => reload()}
      />
    );
  }

  const categories = new Set(
    herbs.map((herb) => herb.category)
  );

  return (
    <section className="section">
      <div className="page-heading">
        <span className="section-label">
          DASHBOARD
        </span>

        <h1>Ringkasan Herbal</h1>
      </div>

      <div className="dashboard-grid">
        <article className="dashboard-card">
          <span>Total Herbal</span>
          <strong>{herbs.length}</strong>
        </article>

        <article className="dashboard-card">
          <span>Kategori</span>
          <strong>{categories.size}</strong>
        </article>
      </div>

      <h2>Data Herbal</h2>

      <div className="dashboard-list">
        {herbs.map((herb) => (
          <div key={herb.id}>
            <span>{herb.emoji}</span>
            <span>{herb.name}</span>
            <span>{herb.category}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

