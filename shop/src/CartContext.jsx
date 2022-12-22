import React, { createContext, useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { getCookie, setCookie, eraseCookie } from "./cookie";
const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setItems] = useState([]);
  const [keys, setKeys] = useState({});
  const[companyData, setCompanyData] = useState(null)
  // useEffect(() => {null
  //   setItems((prevState) => getCookie("cart_items") || []);
  // }, []);
  const removeFromCart = (item_code) => {
    setItems((prevState) =>
      cartItems.filter((cartItem) => cartItem.item_code !== item_code)
    );
  };

  const setCompanyDataGlobally=(cData)=>{
    setCompanyData(prevState=>cData)
  }
  const addToCart = (addedItem) => {
    let loggedInuser = getCookie("user_id");
    if (
      !loggedInuser ||
      loggedInuser === undefined ||
      loggedInuser === "Administrator" ||
      loggedInuser === "Guest"
    ) {
      Swal.fire({
        icon: "error",
        title:
          "Oops, you forgot to login or you're logged in as Administrator. So you can't add items",
        // text: "",
        footer: '<a href="/login">Take me to Login</a>',
      });
      return;
    }
    let quantity_ordered = 1;
    let website_image = addedItem.website_image || "";
    setItems((prevState) => [
      ...cartItems,
      { ...addedItem, quantity_ordered, website_image },
    ]);
    setCookie("cart_items", [
      ...cartItems,
      { ...addedItem, quantity_ordered, website_image },
    ]);
  };

  const addToCartWithQty = (addedItem, qty) => {
    let quantity_ordered = parseInt(qty);
    setItems((prevState) => [...cartItems, { ...addedItem, quantity_ordered }]);
  };
  const emptyCart = () => {
    setItems((prevState) => []);
    eraseCookie("cart_items");
  };
  const setKeysGlobally = (args) => {
    setKeys((prevState) => args);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        keys,
        companyData,
        addToCart,
        removeFromCart,
        addToCartWithQty,
        emptyCart,
        setKeysGlobally,
        setCompanyDataGlobally
       
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartContext;
