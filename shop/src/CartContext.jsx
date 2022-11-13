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

    // let itemInCart = cartItems.filter(
    //   (item) => addedItem.item_code === item.item_code
    // );

    // if (cartItems === [] || itemInCart === []) {
    //   let quantity_ordered = 1;
    //   setItems((prevState) => [
    //     ...prevState,
    //     { ...addedItem, quantity_ordered },
    //   ]);
    //   return;
    // }

    // setItems((prevState) =>
    //   prevState.map((item) => {
    //     addedItem.item_code === item.item_code
    //       ? (item.quantity_ordered = parseInt(item.quantity_ordered + 1))
    //       : item;
    //   })
    // );
  };
  return (
    <CartContext.Provider value={{ cartItems, addToCart,removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;
