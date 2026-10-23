
import HerbCard from "./HerbCard";
import EmptyState from "../common/EmptyState";

export default function HerbGrid({ herbs }) {
  if (herbs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="herb-grid">
      {herbs.map((herb) => (
        <HerbCard
          key={herb.id}
          herb={herb}
        />
      ))}
    </div>
  );
}
