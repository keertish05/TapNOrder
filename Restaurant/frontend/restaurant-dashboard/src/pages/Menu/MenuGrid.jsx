import MenuCard from "./MenuCard";
import EmptyState from "./EmptyState";

export default function MenuGrid({ items }) {
  if (!items.length) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <MenuCard key={item._id} item={item} />
      ))}
    </div>
  );
}
