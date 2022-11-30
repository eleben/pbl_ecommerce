import React, { createContext, useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { getCookie, setCookie, eraseCookie } from "./cookie";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setItems] = useState([]);

  useEffect(() => {
    setItems((prevState) => getCookie("cart_items") || []);
  }, []);
  const removeFromCart = (item_code) => {
    setItems((prevState) =>
      prevState.filter((cartItem) => cartItem.item_code !== item_code)
    );
  };
  const addToCart = (addedItem) => {
    let loggedInuser = getCookie("user_id");
    if (!loggedInuser || loggedInuser === undefined) {
      Swal.fire({
        icon: "error",
        title: "Oops, you forgot to login. So you can't add items",
        text: "Something went wrong!",
        footer: '<a href="/login">Take me to Login</a>',
      });
      return
    }
    let quantity_ordered = 1;
    let website_image = addedItem.website_image || "";
    setItems((prevState) => [
      ...prevState,
      { ...addedItem, quantity_ordered, website_image },
    ]);
    setCookie("cart_items", [
      ...prevState,
      { ...addedItem, quantity_ordered, website_image },
    ]);
  };

  const addToCartWithQty = (addedItem, qty) => {
    let quantity_ordered = parseInt(qty);
    setItems((prevState) => [...prevState, { ...addedItem, quantity_ordered }]);
  };
  const emptyCart = () => {
    setItems((prevState) => []);
    eraseCookie("cart_items");
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        addToCartWithQty,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;
