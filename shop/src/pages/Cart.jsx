import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartContext from "../CartContext";
import { HiOutlineArrowLeft } from "react-icons/hi";
const Cart = () => {
  const [lgShow, setLgShow] = useState(true);
  const { cartItems, removeFromCart } = useContext(CartContext);
  
  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        fullscreen={true}
        onHide={() => {
          setLgShow((lgShow) => !lgShow);
          setIsOpen(lgShow);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            My Quotation List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3
            style={{ color: "green" }}
            onClick={() => {
              setLgShow((lgShow) => !lgShow);
              setIsOpen(lgShow);
            }}
          >
            <HiOutlineArrowLeft /> Back to shopping
          </h3>
          <ShoppingCart items={cartItems} handleOnRemove={removeFromCart} />
          <hr />
          <div class="row">
            <div class="col-lg-12">
              <div class="shoping__cart__btns">
                <button
                  onClick={() => {
                    setLgShow((lgShow) => !lgShow);
                    setIsOpen(lgShow);
                  }}
                  class="primary-btn cart-btn"
                >
                  CONTINUE SHOPPING
                </button>
                <button class="primary-btn cart-btn cart-btn-right">
                  <span class="icon_loading"></span>
                  Submit Cart
                </button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
const ShoppingCart = ({ items, handleOnRemove }) => {
  const altImageInitials = (itemName) => {
    let initials = itemName
      .split(" ")
      .map((i) => i.charAt(0))
      .join("");
    return itemName
      .split(" ")
      .map((i) => i.charAt(0))
      .join("")
      .toUpperCase();
  };
  let uniqueItems = [items.map(itm=>itm.item_code)];
  return (
    <>
      {/* <p>{JSON.stringify(items)}</p> */}
      <section class="shoping-cart spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="shoping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th class="shoping__product">Products</th>
                      <th>Classification</th>
                      <th>Quantity</th>
                      {/* <th>Total</th> */}
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((shoppingCartItem) => (
                      <tr>
                        <td class="shoping__cart__item">
                          {shoppingCartItem.website_image ? (
                            <img
                              style={{ cursor: "pointer" }}
                              alt="An image of "
                              src={shoppingCartItem.website_image}
                              className ="thumbNailStyle"
                            />
                          ) : (
                            <div className="altImageStyle">
                              {altImageInitials(shoppingCartItem.web_item_name)}
                            </div>
                          )}
                          <h5>{shoppingCartItem.web_item_name}</h5>
                        </td>
                        <td class="shoping__cart__price">
                          {shoppingCartItem.item_group}
                        </td>
                        <td class="shoping__cart__quantity">
                          <div class="quantity">
                            <div class="pro-qty">
                              <input
                                type="text"
                                value={shoppingCartItem.quantity_ordered}
                              />
                            </div>
                          </div>
                        </td>
                        {/* <td class="shoping__cart__total">$110.00</td> */}
                        <td class="shoping__cart__item__close">
                          <span
                            class="icon_close"
                            onClick={() =>
                              handleOnRemove(shoppingCartItem.item_code)
                            }
                          ></span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
