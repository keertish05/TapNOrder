export default function CategoryBar({
  categories = [],
  activeCategory,
  onChange
}) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`px-4 py-2 rounded-xl border whitespace-nowrap transition
            ${
              activeCategory === cat.id
                ? "bg-orange-100 border-orange-400 text-orange-600"
                : "bg-white border-gray-200 hover:border-orange-300"
            }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
