import React, { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CartContext from "../CartContext";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import { RiDeleteBin5Line } from "react-icons/ri";

import { getCookie } from "../cookie";
import { submitQuote } from "../assets/cartSubmit";

const Cart = ({setIsOpen}) => {
  const [lgShow, setLgShow] = useState(true);
  const { cartItems, removeFromCart, emptyCart } = useContext(CartContext);

  const [submitting, setSubmitting] = useState(false);
  let inCart = cartItems.map((itm) => itm.item_code);
  const uniqueItems = [...new Set(inCart)];

  const uniqueItemQty = (items) => {
    let totalQty = 0;
    items.forEach((item) => {
      totalQty += parseInt(item.quantity_ordered);
    });
    return totalQty;
  };
  let uniqueCartItems = uniqueItems.map((itemCode) => {
    let filtered = cartItems.find((item) => item.item_code === itemCode);
    // let quantity_ordered = cartItems.filter(item=>item.item_code===itemCode).length
    let itemsInQuestion = cartItems.filter(
      (item) => item.item_code === itemCode
    );
    let quantity_ordered = uniqueItemQty(itemsInQuestion);
    return { ...filtered, quantity_ordered };
  });

  const submitOrder = (payloadItemsToSubmit) => {
    let loggedInUser = getCookie("user_id");
    Swal.fire({
      title: `Posting an RFQ for ${uniqueCartItems.length} items as ${loggedInUser}`,
      text: "Price quotation and taxes will shared to your email. Are you sure to send this request for quotation?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "This is ok, send it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setSubmitting((prevState) => true);
        let user = getCookie("user_id");
        submitQuote(user, payloadItemsToSubmit).then((r) => {
          setSubmitting((prevState) => false);
          if (r.exception) {
            Swal.fire("Error!", `${r.exc_type} .`, "danger");
            return;
          }
          if (r.message.exception !== undefined) {
            Swal.fire("Error!", `${r.message.error} .`, "danger");
            return;
          }
          Swal.fire(
            "Posted!",
            `Your quotation has been submitted under ID ${r.message} .`,
            "success"
          );
          emptyCart();
        });
      }
    });
  };
  return (
    <>
      {submitting && (
        <div id="preloder">
          <div class="loader"></div>
        </div>
      )}
      <Modal
        size="lg"
        show={lgShow}
        fullscreen={true}
        onHide={() => {
          setLgShow((lgShow) => !lgShow);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        // style={{"z-index": "3"}}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <p>
              My Quotation List: {uniqueItems.length} items in cart:.{" "}
              {inCart.length} quantities in total
            </p>
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
          <GuideStepper />
          <ShoppingCart
            items={uniqueCartItems}
            handleOnRemove={removeFromCart}
            handleQuoteSubmit={submitOrder}
            // style={{"z-index": "3"}}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
// const ShoppingCart = ({ items, handleOnRemove, handleQuoteSubmit }) => {
//   const [payload, setPayload] = useState([]);
//   useEffect(() => {
//     setPayload((prevState) => items);
//   }, []);
//   const altImageInitials = (itemName) => {
//     let initials = itemName
//       .split(" ")
//       .map((i) => i.charAt(0))
//       .join("");
//     return itemName
//       .split(" ")
//       .map((i) => i.charAt(0))
//       .join("")
//       .toUpperCase();
//   };
//   const handleUpdateQty = (itemCode, qtyOrdered) => {
//     if (qtyOrdered === undefined || qtyOrdered === "") {
//       qtyOrdered = 1;
//     }

//     setPayload((prevState) =>
//       prevState.map((item) => {
//         if (item.item_code === itemCode) {
//           item.quantity_ordered = parseInt(qtyOrdered);
//         }
//         return item;
//       })
//     );
//   };
//   return (
//     <>

//       <section class="shoping-cart spad">
//         <div class="container">
//           <div class="row">
//             <h2 style={{ "margin-left": "50%" }}>Your Cart</h2>
//             <hr />
//             <div class="col-lg-12">
//               <div class="shoping__cart__table">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th class="shoping__product">Product(s)</th>
//                       <th>Classification</th>
//                       <th>Quantity</th>

//                       <th></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {payload.map((shoppingCartItem) => (
//                       <tr>
//                         <td class="shoping__cart__item">
//                           {shoppingCartItem.website_image !== undefined ? (
//                             <img
//                               style={{ cursor: "pointer" }}
//                               alt="An image of "
//                               src={shoppingCartItem.website_image}
//                               className="thumbNailStyle"
//                             />
//                           ) : (
//                             <div className="altImageStyle">
//                               {altImageInitials(shoppingCartItem.web_item_name)}
//                             </div>
//                           )}
//                           <h5>{shoppingCartItem.web_item_name}</h5>
//                         </td>
//                         <td class="shoping__cart__price">
//                           {shoppingCartItem.item_group}
//                         </td>
//                         <td class="shoping__cart__quantity">

//                           <div class="quantity">
//                             <div class="pro-qty">
//                               <input
//                                 type="number"
//                                 defaultValue={shoppingCartItem.quantity_ordered}
//                                 onChange={(e) => {
//                                   handleUpdateQty(
//                                     shoppingCartItem.item_code,
//                                     e.target.value
//                                   );
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </td>
//                         <td class="shoping__cart__item__close">
//                           <span
//                             class="icon_close"
//                             onClick={() =>
//                               handleOnRemove(shoppingCartItem.item_code)
//                             }
//                           ></span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//         <hr />
//         <div class="row" style={{"sticky":"bottom","bott":"fixed"}}>
//           <div class="col-lg-12">
//             <div class="shoping__cart__btns">
//               <button
//                 onClick={() => {
//                   setLgShow((lgShow) => !lgShow);
//                   setIsOpen(lgShow);
//                 }}
//                 class="primary-btn cart-btn"
//               >
//                 CONTINUE SHOPPING
//               </button>
//               <button
//                 class="primary-btn cart-btn cart-btn-right"
//                 onClick={() => {
//                   handleQuoteSubmit(payload);
//                 }}
//               >
//                 <span class="icon_loading"></span>
//                 Submit Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

const ShoppingCart = ({ items, handleOnRemove, handleQuoteSubmit }) => {
  const [payload, setPayload] = useState([]);
  useEffect(() => {
    setPayload((prevState) => items);
  }, []);
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
  const handleUpdateQty = (itemCode, qtyOrdered) => {
    if (qtyOrdered === undefined || qtyOrdered === "") {
      qtyOrdered = 1;
    }

    setPayload((prevState) =>
      prevState.map((item) => {
        if (item.item_code === itemCode) {
          item.quantity_ordered = parseInt(qtyOrdered);
        }
        return item;
      })
    );
  };
  const handleAddOrRemove = (itemCode, operation) => {
    let value = 0;
    operation === "add" ? (value = 1) : (value = -1);
    setPayload((prevState) =>
      prevState.map((item) => {
        if (item.item_code === itemCode) {
          let computed = item.quantity_ordered + parseInt(value);
          item["quantity_ordered"] = computed;
        }
        return item;
      })
    );
  };
  return (
    <>
      <br />
      {/* {JSON.stringify(payload)} */}
      <div class="container">
        <div class="row no-gutters">
          <div class="col-md-9">
            {payload.map((shoppingCartItem, index) => (
              <>
                <div class="col-md-9">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">
                        {shoppingCartItem.web_item_name}
                      </h4>
                      <div class="container">
                        <div className="row">
                          <div class="col-md-6">
                            <small>{`Item Group: ${shoppingCartItem.item_group} | Item Code: ${shoppingCartItem.item_code}`}</small>
                          </div>

                          <div class="col-md-3">
                            <Form.Control
                              type="number"
                              id="inputPassword5"
                              min="1"
                              defaultValue={shoppingCartItem.quantity_ordered}
                              aria-describedby="passwordHelpBlock"
                              onChange={(e) => {
                                handleUpdateQty(
                                  shoppingCartItem.item_code,
                                  e.target.value
                                );
                              }}
                            />
                          </div>
                          <div class="col-md-3">
                            <button
                              class="btn btn-warning"
                              onClick={() => {
                                console.log("Deleting");
                                handleOnRemove(shoppingCartItem.item_code);
                                setPayload((prevState) =>
                                  payload.filter(
                                    (item) =>
                                      item.item_code !==
                                      shoppingCartItem.item_code
                                  )
                                );
                              }}
                            >
                              <RiDeleteBin5Line />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </>
            ))}
          </div>
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Cart Summary</h5>
                <p class="card-text">
                  Total Items In Cart: [{payload.length}]{" "}
                </p>
                <em style={{ color: "green" }}>
                  Please confirm your items before sending a RFQ
                </em>
                <br /><br /><br />

                <button
                  class="btn btn-primary btn-lg"
                  onClick={() => {
                    handleQuoteSubmit(payload);
                  }}
                >
                  SUBMIT CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const GuideStepper = () => {
  return (
    <>
      <div class="md-stepper-horizontal orange">
        <div class="md-step active editable">
          <div class="md-step-circle">
            <span>1</span>
          </div>
          <div class="md-step-title">Add to quote & checkout</div>
          <div class="md-step-bar-left"></div>
          <div class="md-step-bar-right"></div>
        </div>
        <div class="md-step active email">
          <div class="md-step-circle">
            <span>2</span>
          </div>
          <div class="md-step-title">Quotation is sent to you</div>
          <div class="md-step-optional">To your registered email</div>
          <div class="md-step-bar-left"></div>
          <div class="md-step-bar-right"></div>
        </div>
        <div class="md-step active">
          <div class="md-step-circle">
            <span>3</span>
          </div>
          <div class="md-step-title">Plan your order</div>
          <div class="md-step-bar-left"></div>
          <div class="md-step-bar-right"></div>
        </div>
        {/* <div class="md-step">
      <div class="md-step-circle"><span>4</span></div>
      <div class="md-step-title">Shipping</div>
      <div class="md-step-bar-left"></div>
      <div class="md-step-bar-right"></div>
    </div> */}
      </div>
    </>
  );
};
export default Cart;
