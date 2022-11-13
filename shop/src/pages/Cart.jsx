import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartContext from "../CartContext";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Swal from "sweetalert2";

const Cart = () => {
  const [lgShow, setLgShow] = useState(true);
  const { cartItems, removeFromCart } = useContext(CartContext);

  
  let inCart = cartItems.map(itm=>itm.item_code);
  const uniqueItems =[...new Set(inCart)]

  let uniqueCartItems = uniqueItems.map(itemCode=>{
    let filtered = cartItems.find(item=>item.item_code===itemCode)
    let quantity_ordered = cartItems.filter(item=>item.item_code===itemCode).length
    return {...filtered,quantity_ordered}
  })
  const submitOrder =()=>{
    Swal.fire({
      title: `Posting an RFQ for ${uniqueCartItems.length} items`,
      text: "A request for quotation won't break your bank [yet ;)] but it is always advisable to cancel and crosscheck your order.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'This is ok, send it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
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
           <p>My Quotation List: {uniqueItems.length} items in cart:. {inCart.length} quantities in total</p> 
           <small
            style={{ color: "green" }}
            onClick={() => {
              setLgShow((lgShow) => !lgShow);
              setIsOpen(lgShow);
            }}
          >
            <HiOutlineArrowLeft /> Back to shopping
          </small>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ShoppingCart items={uniqueCartItems} handleOnRemove={removeFromCart} />
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
                <button class="primary-btn cart-btn cart-btn-right" onClick={()=>{submitOrder()}}>
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
                      <th class="shoping__product">Product(s)</th>
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
