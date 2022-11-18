import React, { createContext, useState } from "react";
import { useEffect } from "react";
import { fetchShopItems } from "./assets/shopItems";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setItems] = useState([]);
  const [itemsPayload, setItemsPayload] = useState({});
  const [pageData, setPageData] = useState([]);
  const [uniqueItemGroups, setUniqueItemGroups] = useState([]);

  const loadContext = () => {
    let r = fetchShopItems();
    setItemsPayload((prevState) => r);
    setPageData((prevState) => r.items);
    let itemGroups = r.items.map((row) => row.item_group);
    let uniqGrps = [...new Set(itemGroups)];
    setUniqueItemGroups((prevState) => uniqGrps);

  };

  const removeFromCart = (item_code) => {
    setItems((prevState) =>
      prevState.filter((cartItem) => cartItem.item_code !== item_code)
    );
  };
  const addToCart = (addedItem) => {
    let quantity_ordered = 1;
    setItems((prevState) => [...prevState, { ...addedItem, quantity_ordered }]);
  };
  useEffect(() => {
    loadContext()
  },[]);
  return (
    <CartContext.Provider
      value={{
        itemsPayload,
        pageData,
        uniqueItemGroups,
        cartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;
