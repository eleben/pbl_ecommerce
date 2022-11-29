import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { HiOutlineArrowLeft } from "react-icons/hi";
import CartContext from "../CartContext";

const ItemDetail = ({ item, setIsOpen }) => {
  const [lgShow, setLgShow] = useState(true);
  const { cartItems, addToCart } = useContext(CartContext);

  const alreadyInCart = cartItems.filter(
    (cartItem) => cartItem.item_code === item.item_code
  );
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
        // style={{ "z-index": "3" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {item.web_item_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <small
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => {
              setLgShow((lgShow) => !lgShow);
              setIsOpen(lgShow);
            }}
          >
            <HiOutlineArrowLeft /> Back to shopping
          </small>

          <ItemFullDetail
            item={item}
            inCart={alreadyInCart}
            handleAddToCart={addToCart}
            // style={{ "z-index": "3" }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
const ItemFullDetail = ({ item, inCart, handleAddToCart }) => {
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
  const [qtyOrdered, setQtyOrdered] = useState(1);
  return (
    <>
      <section class="product-details spad">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6">
              <div class="product__details__pic">
                <div class="product__details__pic__item">
                  {item.website_image ? (
                    <img
                      style={{ cursor: "pointer" }}
                      alt="An image of "
                      src={item.website_image}
                    />
                  ) : (
                    <div
                      className="altImageStyle"
                      style={{ cursor: "pointer" }}
                    >
                      {altImageInitials(item.web_item_name)}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6">
              <div class="product__details__text">
                <h3>{item.web_item_name}</h3>

                <p>
                  Classification: {item.item_group} <br />
                  <small>{item.web_long_description || item.name}</small>
                </p>

                <em style={{ color: "red" }}>
                  Already in Cart: {inCart.length}
                </em>
                <br />
                <br />
                {/* <div class="product__details__quantity">
                  <div class="quantitys">
                    <div class="pro-qty">
                      <input type="number"  onChange={(e)=>{setQtyOrdered((prevState)=>e.target.value)}} />
                    </div>
                  </div>
                </div> */}
                <button
                  class="primary-btn"
                  onClick={() => handleAddToCart(item)}
                >
                  ADD TO QUOTE
                </button>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="product__details__tab">
                <div class="tab-content">
                  <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="product__details__tab__desc">
                      <h6>Product Infomation</h6>
                      <p>{item.web_long_description || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ItemDetail;
