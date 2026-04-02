import { useState } from "react";
import CategoryBar from "./CategoryBar";
import MenuTabs from "./MenuTabs";
import MenuGrid from "./MenuGrid";
import { useMenuData } from "./hooks/useMenuData";
import AddMenuModal from "../../components/AddMenuPopup/AddMenuPopup";

const categories = [
  { id: "all", name: "All" },
  { id: "starters", name: "Starters" },
  { id: "main_course", name: "Main Course" },
  { id: "fast_food", name: "Fast Food" },
  { id: "snacks", name: "Snacks" },
  { id: "beverages", name: "Beverages" },
  { id: "desserts", name: "Desserts" },
  { id: "breakfast", name: "Breakfast" },
  { id: "combos", name: "Combos" },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("popular");
  const [openAddModal, setOpenAddModal] = useState(false);

  const { items, loading } = useMenuData(activeCategory, activeTab);

  return (
    <div className="p-6 space-y-6 w-full relative">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Your Menu</h1>

        <button
          onClick={() => setOpenAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add New Item
        </button>
      </div>

      {/* Categories */}
      <CategoryBar
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Tabs */}
      <MenuTabs activeTab={activeTab} onChange={setActiveTab} />

      {/* Menu Items */}
      <MenuGrid items={items} loading={loading} />

      {openAddModal && (
        <AddMenuModal onClose={() => setOpenAddModal(false)} />
      )}
    </div>
  );
}
