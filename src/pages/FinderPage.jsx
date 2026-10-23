
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const topics = [
  {
    label: "Relaksasi",
    query: "Chamomile"
  },
  {
    label: "Pencernaan",
    query: "Jahe"
  },
  {
    label: "Minuman Herbal",
    query: "Rosella"
  },
  {
    label: "Herbal Nusantara",
    query: "Temulawak"
  }
];

export default function FinderPage() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const navigate = useNavigate();

  function handleSearch() {
    if (!selectedTopic) {
      return;
    }

    navigate(
      `/catalog?search=${encodeURIComponent(selectedTopic)}`
    );
  }

  return (
    <section className="section">
      <div className="page-heading">
        <span className="section-label">
          HERBAL FINDER
        </span>

        <h1>Temukan herbal</h1>

        <p>
          Pilih kategori untuk menemukan tanaman herbal
          yang berkaitan dengan topik pilihanmu.
        </p>
      </div>

      <div className="finder-grid">
        {topics.map((topic) => (
          <button
            key={topic.label}
            className={
              selectedTopic === topic.query
                ? "finder-option selected"
                : "finder-option"
            }
            onClick={() => setSelectedTopic(topic.query)}
          >
            {topic.label}
          </button>
        ))}
      </div>

      <button
        className="primary-button"
        onClick={handleSearch}
        disabled={!selectedTopic}
      >
        Cari Herbal →
      </button>

      <p className="disclaimer">
        Finder ini hanya membantu eksplorasi informasi herbal.
        Tidak digunakan untuk mendiagnosis penyakit.
      </p>
    </section>
  );
}
