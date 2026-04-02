import { useEffect, useState } from "react";
import axios from "axios";

const CATEGORY_MAP = {
  all: "All",
  starters: "starter",
  main_course: "main_course",
  fast_food: "fast_food",
  snacks: "snacks",
  beverages: "beverages",
  desserts: "desserts",
  breakfast: "breakfast",
  combos: "combos",
};

export function useMenuData(category, tab) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();

        if (category !== "all") {
          params.append("category", CATEGORY_MAP[category]);
        }

        params.append("sort", tab); // popular | recent

        const res = await axios.get(
          `http://localhost:4002/api/v1/menu?${params.toString()}`,
          { withCredentials: true }
        );
        
        setItems(res.data.data || []);

      } catch (err) {
        console.error("Menu fetch error", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [category, tab]);

  return { items, loading };
}
