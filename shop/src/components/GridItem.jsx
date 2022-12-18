import React, { useContext } from "react";
import { useState } from "react";
import CartContext from "../CartContext";
import ItemDetail from "./ItemDetail";
import {MdLocalOffer} from "react-icons/md";
import { MdOutlineRequestQuote } from "react-icons/md";

// const GridItem = ({ item }) => {
//   const [showModal, setShowModal] = useState(false);
//   const launchModal = () => {
//     setShowModal(!showModal);
//   };
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
//   const { addToCart } = useContext(CartContext);
//   return (
//     <>
//       {showModal && <ItemDetail item={item} setIsOpen={launchModal} />}
//       <div class="col-lg-3 col-md-4 col-sm-6 mix powder">
//         <div class="featured__item">
//           <div
//             class="featured__item__pic set-bg"
//             data-setbg={item.website_image || "img/featured/featured-1.png"}
//             // style={`background-image: url(${item.website_image || "img/featured/featured-1.png"})`}
//           >
//             {item.website_image ? (
//               <img
//                 style={{ cursor: "pointer" }}
//                 alt="An image of "
//                 src={item.website_image}
//                 onClick={() => {
//                   launchModal();
//                 }}
//               />
//             ) : (
//               <div
//                 className="altImageStyle"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => {
//                   launchModal();
//                 }}
//               >
//                 {altImageInitials(item.web_item_name)}
//               </div>
//             )}
//             <ul class="featured__item__pic__hover">
//               {/* <li>
//                 <a href="#">
//                   <i class="fa fa-heart"></i>
//                 </a>
//               </li>
//               <li>
//                 <a href="#">
//                   <i class="fa fa-retweet"></i>
//                 </a>
//               </li> */}
//               <li>
//                 <a onClick={() => addToCart(item)}>
//                   <i class="fa fa-shopping-cart"></i>
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <div class="featured__item__text">
//             <h6>
//               <u>
//                 <a
//                   onClick={() => {
//                     launchModal();
//                   }}
//                 >
//                   {item.web_item_name}
//                 </a>
//               </u>
//             </h6>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const GridItem = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const launchModal = () => {
    setShowModal(!showModal);
  };
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
  const { addToCart } = useContext(CartContext);

  return (
    <>
    {showModal && <ItemDetail item={item} setIsOpen={launchModal} />}
      <div class="card mb-3">
        <div class="row no-gutters">
          <div class="col-md-4">
            {/* <img src={item.website_image} className="card-img" alt={item.web_item_name} /> */}
            {item.website_image ? (
              <img
                style={{ cursor: "pointer" }}
                alt="An image of "
                src={`https://portal.premierbiolife.com${item.website_image}`}
                onClick={() => {
                  launchModal();
                }}
              />
            ) : (
              <div
                className="altImageStyle"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  launchModal();
                }}
              >
                {altImageInitials(item.web_item_name)}
              </div>
            )}
          </div>
          <div class="col-md-4">
            <div class="card-body">
              <br />

              <u
                class="card-title"
                onClick={() => {
                  launchModal();
                }}
              >
                {item.web_item_name}
                {/* <h5 class="card-title">{item.web_item_name}</h5> */}
              </u>

              <p class="card-text">
                {item.item_group} | Item Code: {item.item_code}
              </p>
              {/* <span><MdLocalOffer/> <b>On offer! </b> <button type="button" class="btn btn-link">More details! </button></span>  */}
            </div>
          </div>
          <div class="col-md-4">
         
            <br />
            <button style={{"margin-bottom":"5px"}} className="btn btn-primary btn-md" onClick={() => addToCart(item)}>
              <MdOutlineRequestQuote />
              &nbsp;&nbsp; Add to Quote
            </button>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
export default GridItem;
