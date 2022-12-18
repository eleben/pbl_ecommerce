import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { fetchOffers } from "../assets/offers";
import CartContext from "../CartContext";

import { getCookie } from "../cookie";
const Header = () => {
  const { loading } = useContext(CartContext);

  const [offers, setOffers] = useState(null);

  const randomThree = (array) => {
    let n = 3;

    let shuffled = array.sort(function () {
      return 0.5 - Math.random();
    });

    let selected = shuffled.slice(0, n);

    return selected;
  };
  const alertAnOffer = (offer) => {
    Swal.fire({
      title: `<strong>
           <u>${offer.name}</u>
        </strong>`,

      html: `
          <h4>${offer.offer_detail}</h4>
          <em>Expires on ${offer.offer_expiry}</em>
        `,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: "Noted, great!",
    });
  };
  useEffect(() => {
    fetchOffers().then((r) => {
      setOffers((prevState) => r);
    });
  }, []);

  return (
    <>
      {/* <div id="preloder">
        <div class="loader"></div>
      </div> */}

      <div class="humberger__menu__overlay"></div>
      <div class="humberger__menu__wrapper">
        <div class="humberger__menu__logo">
          <a href="#">
            <img src="img/logo.png" alt="" />
          </a>
        </div>
        <div class="humberger__menu__cart">
          <ul>
            <li>
              <a href="#">
                <i class="fa fa-heart"></i> <span>1</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa fa-shopping-bag"></i> <span>3</span>
              </a>
            </li>
          </ul>
          <div class="header__cart__price">
            item: <span>$150.00</span>
          </div>
        </div>
        <div class="humberger__menu__widget">
          {/* <div class="header__top__right__language">
            <img src="img/language.png" alt="" />
            <div>English</div>
            <span class="arrow_carrot-down"></span>
            <ul>
              <li>
                <a href="#">Spanis</a>
              </li>
              <li>
                <a href="#">English</a>
              </li>
            </ul>
          </div> */}
          <div class="header__top__right__auth">
            <a href="#">
              <i class="fa fa-user"></i> Login
            </a>
          </div>
        </div>
        <nav class="humberger__menu__nav mobile-menu">
          <ul>
            <li class="active">
              <a href="./index.html">Home</a>
            </li>
            <li>
              <a href="./shop-grid.html">Shop</a>
            </li>
            <li>
              <a href="#">Pages</a>
              <ul class="header__menu__dropdown">
                <li>
                  <a href="./shop-details.html">Shop Details</a>
                </li>
                <li>
                  <a href="./shoping-cart.html">Shoping Cart</a>
                </li>
                <li>
                  <a href="./checkout.html">Check Out</a>
                </li>
                <li>
                  <a href="./blog-details.html">Blog Details</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="./blog.html">Blog</a>
            </li>
            <li>
              <a href="./contact.html">Contact</a>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap"></div>
        <div class="header__top__right__social">
          <a href="#">
            <i class="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i class="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fa fa-linkedin"></i>
          </a>
          <a href="#">
            <i class="fa fa-pinterest-p"></i>
          </a>
        </div>
        <div class="humberger__menu__contact">
          <ul>
            <li>
              <i class="fa fa-envelope"></i> info@premier-biolife.com
            </li>
            {/* <li>Free Shipping for all Order of $99</li> */}
          </ul>
        </div>
      </div>

      <header class="header">
        <div class="header__top">
          <div class="container">
            <div class="row">
              <div class="col-lg-6">
                <div class="header__top__left">
                  <ul>
                    <li>
                      <i class="fa fa-envelope"></i> info@premier-biolife.com
                    </li>
                    {/* <li>Free Shipping for all Order of $99</li> */}
                  </ul>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="header__top__right">
                  <div class="header__top__right__social">
                    <a href="#">
                      <i class="fa fa-facebook"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-linkedin"></i>
                    </a>
                    <a href="#">
                      <i class="fa fa-pinterest-p"></i>
                    </a>
                  </div>
                  {/* <div class="header__top__right__language">
                      <img src="img/language.png" alt="" />
                      <div>English</div>
                      <span class="arrow_carrot-down"></span>
                      <ul>
                        <li>
                          <a href="#">Spanis</a>
                        </li>
                        <li>
                          <a href="#">English</a>
                        </li>
                      </ul>
                    </div> */}
                  <div class="header__top__right__auth">
                    <p>{getCookie("full_name") || "N/A"}</p>
                    {getCookie("full_name") === "Guest" && (
                      <a href="/login">
                        <i class="fa fa-user"></i> Login
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              {/* <ImageCarousel listing={offers} style={{width:"100%"}}/> */}
              {/* <OffersCarousel  /> */}
            </div>
          </div>
          <div class="humberger__open">
            <i class="fa fa-bars"></i>
          </div>
        </div>
      </header>
    </>
  );
};

const OffersCarousel = () => {
  return (
    <>
      <div class="car-container">
        <div class="carousel">
          {["SM", "IA", "BBA", "DAP", "ZZ"].map((group, id) => (
            <div id="some-div" class="item">
             
              <p className="">{group}</p>
              
            </div>
          ))}
        </div>
        {/* <h1>This is a continue scroll carousel</h1> */}
      </div>
    </>
  );
};

export default Header;
