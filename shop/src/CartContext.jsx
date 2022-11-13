import React, { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setItems] = useState([]);

  const removeFromCart= (item_code)=>{
    setItems((prevState) => prevState.filter(cartItem=>cartItem.item_code!==item_code));
  }
  const addToCart = (addedItem) => {
    let quantity_ordered = 1;
    setItems((prevState) => [...prevState, { ...addedItem, quantity_ordered }]);

  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;
