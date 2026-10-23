import { Link } from "react-router-dom";
import styles from "../../styles/HerbCard.module.css";


export default function HerbCard({ herb }) {
  return (
    <article className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundColor: herb.color }}
      >
        <span>{herb.emoji}</span>
      </div>

      <div className={styles.content}>
        <span className={styles.category}>
          {herb.category}
        </span>

        <h3>{herb.name}</h3>

        <p className={styles.latin}>
          {herb.latin}
        </p>

        <p className={styles.description}>
          {herb.desc}
        </p>

        <Link
          to={`/herbs/${herb.id}`}
          className={styles.link}
        >
          Lihat Detail →
        </Link>
      </div>
    </article>
  );
}
