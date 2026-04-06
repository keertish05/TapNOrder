import { createContext, useContext, useState } from "react";

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenu = async (restaurant) => {
    try {
      const res = await fetch(
        `http://localhost:4002/api/v1/menu/dish/restaurant/690f1bf6a5cd308778a5733c`
      );
      const data = await res.json();

      setDishes(data.data); // IMPORTANT
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MenuContext.Provider value={{ dishes, fetchMenu, loading }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => useContext(MenuContext);