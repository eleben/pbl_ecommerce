import React, { useContext } from "react";
import { useState } from "react";
import CartContext from "../CartContext";
import ItemDetail from "./ItemDetail";

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
      <div class="col-lg-3 col-md-4 col-sm-6 mix powder">
        <div class="featured__item">
          <div
            class="featured__item__pic set-bg"
            data-setbg={item.website_image || "img/featured/featured-1.png"}
            // style={`background-image: url(${item.website_image || "img/featured/featured-1.png"})`}
          >
            {item.website_image ? (
              <img
                style={{ cursor: "pointer" }}
                alt="An image of "
                src={item.website_image}
                onClick={() => {
                  launchModal();
                }}
              />
            ) : (
              <div className="altImageStyle" style={{cursor: "pointer"}} onClick={() => {
                launchModal();
              }}>
                {altImageInitials(item.web_item_name)}
              </div>
            )}
            <ul class="featured__item__pic__hover">
              {/* <li>
                <a href="#">
                  <i class="fa fa-heart"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="fa fa-retweet"></i>
                </a>
              </li> */}
              <li>
                <a onClick={()=>addToCart(item)}>
                  <i class="fa fa-shopping-cart"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="featured__item__text">
            <h6>
              <u>
                <a
                  onClick={() => {
                    launchModal();
                  }}
                >
                  {item.web_item_name}
                </a>
              </u>
            </h6>
          </div>
        </div>
      </div>
    </>
  );
};


const GridRowItem =({item})=>{
  <div class="row list-row w-100 mb-4">
				<div class="col-2 border text-center rounded list-image">
					<a class="product-link product-list-link" href="/products/chemicals-and-supplies/absolute-ethanol-99" style="text-decoration: none">
						<div class="card-img-top no-image-list">
							Ae
						</div>
					</a>
					
				</div>
			<div class="col-10 text-left"><div style="display: flex; margin-left: -15px;">
			<div class="col-8" style="margin-right: -15px;">
				<a class="" href="/products/chemicals-and-supplies/absolute-ethanol-99" style="color: var(--gray-800); font-weight: 500;">
					Absolute ethanol 99% 1L
				</a>
			</div>
		<div class="col-4 cart-action-container ">
				<div id="WEB-ITM-0003" class="btn
					btn-sm btn-primary btn-add-to-cart-list mb-0
					" data-item-code="Abs-1L" style="margin-top: 0px !important; max-height: 30px; float: right;
						padding: 0.25rem 1rem; min-width: 135px;">
					<span class="mr-2">
						<svg class="icon icon-md">
							<use href="#icon-assets"></use>
						</svg>
					</span>
					Add to Quote
				</div>

				<div class="cart-indicator list-indicator hidden">
					1
				</div>

				<a href="/cart">
					<div id="WEB-ITM-0003" class="btn
						btn-sm btn-primary btn-add-to-cart-list
						ml-4 go-to-cart mb-0 mt-0
						hidden" data-item-code="Abs-1L" style="padding: 0.25rem 1rem; min-width: 135px;">
						Go to Quote
					</div>
				</a>
			</div></div>
			<p class="product-code">
				Solvent Mixtures | Item Code : Abs-1L
			</p>
			<div class="mt-2" style="color: var(--gray-600) !important; font-size: 13px;">
				
			</div>
			<div class="product-price">
				
		</div></div></div>

}
export default GridItem;
