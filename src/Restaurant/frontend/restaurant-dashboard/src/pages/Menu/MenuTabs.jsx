export default function MenuTabs({ activeTab, onChange }) {
  return (
    <div className="flex gap-6 border-b">
      {["popular", "recent"].map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-2 font-medium capitalize transition
            ${
              activeTab === tab
                ? "border-b-2 border-orange-500 text-orange-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
