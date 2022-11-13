import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartContext from "../CartContext";

const ItemDetail = ({ item, setIsOpen }) => {
  const [lgShow, setLgShow] = useState(true);
  const {cartItems, addToCart} = useContext(CartContext)

  const alreadyInCart = cartItems.filter(cartItem=>cartItem.item_code===item.item_code)
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
            {item.web_item_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <i class="fa fa-arrow-left" aria-hidden="true">
            Back to items
          </i>

          <ItemFullDetail item={item} inCart={alreadyInCart} handleAddToCart ={addToCart} />
        </Modal.Body>
      </Modal>
    </>
  );
};
const ItemFullDetail = ({ item,inCart,handleAddToCart }) => {
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
                    <div className="altImageStyle" style={{cursor: "pointer"}}>
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

                <em style={{"color":"red"}}>Already in Cart: {inCart.length}</em><br/><br/>
                {/* <div class="product__details__quantity">
                  <div class="quantity">
                    <div class="pro-qty">
                      <input type="text" value="1" />
                    </div>
                  </div>
                </div> */}
                <button class="primary-btn" onClick={()=>handleAddToCart(item)}>
                  ADD TO QUOTE
                </button>

                {/* <ul>
                  <li>
                    <b>Availability</b> <span>In Stock</span>
                  </li>
                  <li>
                    <b>Shipping</b>{" "}
                    <span>
                      01 day shipping. <samp>Free pickup today</samp>
                    </span>
                  </li>
                  <li>
                    <b>Weight</b> <span>0.5 kg</span>
                  </li>
                  <li>
                    <b>Share on</b>
                    <div class="share">
                      <a href="#">
                        <i class="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i class="fa fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i class="fa fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i class="fa fa-pinterest"></i>
                      </a>
                    </div>
                  </li>
                </ul> */}
              </div>
            </div>
            <div class="col-lg-12">
              <div class="product__details__tab">
                {/* <ul class="nav nav-tabs" role="tablist">
                  <li class="nav-item">
                    <a
                      class="nav-link active"
                      data-toggle="tab"
                      href="#tabs-1"
                      role="tab"
                      aria-selected="true"
                    >
                      Description
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#tabs-2"
                      role="tab"
                      aria-selected="false"
                    >
                      Information
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      data-toggle="tab"
                      href="#tabs-3"
                      role="tab"
                      aria-selected="false"
                    >
                      Reviews <span>(1)</span>
                    </a>
                  </li>
                </ul> */}
                <div class="tab-content">
                  <div class="tab-pane active" id="tabs-1" role="tabpanel">
                    <div class="product__details__tab__desc">
                      <h6>Product Infomation</h6>
                      <p>{item.web_long_description || "-"}</p>
                    </div>
                  </div>
                  {/* <div class="tab-pane" id="tabs-2" role="tabpanel">
                    <div class="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>
                        Vestibulum ac diam sit amet quam vehicula elementum sed
                        sit amet dui. Pellentesque in ipsum id orci porta
                        dapibus. Proin eget tortor risus. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Vestibulum ac diam
                        sit amet quam vehicula elementum sed sit amet dui. Donec
                        rutrum congue leo eget malesuada. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Curabitur arcu
                        erat, accumsan id imperdiet et, porttitor at sem.
                        Praesent sapien massa, convallis a pellentesque nec,
                        egestas non nisi. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere
                        cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Proin eget
                        tortor risus.
                      </p>
                      <p>
                        Praesent sapien massa, convallis a pellentesque nec,
                        egestas non nisi. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Mauris blandit aliquet
                        elit, eget tincidunt nibh pulvinar a. Cras ultricies
                        ligula sed magna dictum porta. Cras ultricies ligula sed
                        magna dictum porta. Sed porttitor lectus nibh. Mauris
                        blandit aliquet elit, eget tincidunt nibh pulvinar a.
                      </p>
                    </div>
                  </div> */}
                  {/* <div class="tab-pane" id="tabs-3" role="tabpanel">
                    <div class="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>
                        Vestibulum ac diam sit amet quam vehicula elementum sed
                        sit amet dui. Pellentesque in ipsum id orci porta
                        dapibus. Proin eget tortor risus. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Vestibulum ac diam
                        sit amet quam vehicula elementum sed sit amet dui. Donec
                        rutrum congue leo eget malesuada. Vivamus suscipit
                        tortor eget felis porttitor volutpat. Curabitur arcu
                        erat, accumsan id imperdiet et, porttitor at sem.
                        Praesent sapien massa, convallis a pellentesque nec,
                        egestas non nisi. Vestibulum ac diam sit amet quam
                        vehicula elementum sed sit amet dui. Vestibulum ante
                        ipsum primis in faucibus orci luctus et ultrices posuere
                        cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Proin eget
                        tortor risus.
                      </p>
                    </div>
                  </div> */}
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
