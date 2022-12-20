import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { fetchOffers } from "../assets/offers";
import CartContext from "../CartContext";

import { getCookie } from "../cookie";

import logoImg from "./logo.png"


const Header1 = () => {
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
  const getInitials = (name) => {
    if (name === undefined || name === null || name === "") {
      name = "Guest User";
    }

    let names = name.split(" ");

    if (names.length === 1) {
      return names[0].slice(0, 2).toUpperCase();
    }
    return names
      .slice(0, 2)
      .map((i) => i.charAt(0))
      .join("").toUpperCase();
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
            <img src="https://c8.alamy.com/comp/2J2TJ6C/circular-letter-b-abstract-lab-logo-can-be-used-for-business-science-health-medical-laboratory-logo-2J2TJ6C.jpg" alt="" className="logoImg"/>
          </a>
        </div>
        supposda
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
          {/* <a href="#">
            <i class="fa fa-pinterest-p"></i>
          </a> */}
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
                    <div className="altImageStyleLogin">
                      {getInitials(getCookie("full_name") || "Guest User")}
                    </div>
                    
                    {getCookie("full_name") === "Guest" ? (
                      <a href="/login">
                        <i class="fa fa-user"></i> Login
                      </a>): (<a href="/?cmd=web_logout">
                        <i class="fa fa-arrow-left"></i> Logout
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

const Header = () =>{
  const {cartItems} = useContext(CartContext)

 
   return (
    <>
       <header class="header" id="myHeader">
        <div class="header__top">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6">
                        <div class="header__top__left">
                            <ul>
                                <li><i class="fa fa-envelope"></i> hello@colorlib.com</li>
                                <li>Free Shipping for all Order of $99</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6">
                        <div class="header__top__right">
                            <div class="header__top__right__social">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-linkedin"></i></a>
                                <a href="#"><i class="fa fa-pinterest-p"></i></a>
                            </div>
                            <div class="header__top__right__language">
                                <img src="img/language.png" alt=""/>
                                <div>English</div>
                                <span class="arrow_carrot-down"></span>
                                <ul>
                                    <li><a href="#">Spanis</a></li>
                                    <li><a href="#">English</a></li>
                                </ul>
                            </div>
                            <div class="header__top__right__auth">
                                <a href="#"><i class="fa fa-user"></i> Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="header__logo">
                        <a href="./index.html"><img src="img/logo.png" alt=""/></a>
                    </div>
                </div>
                <div class="col-lg-6">
                    <nav class="header__menu">
                        <ul>
                            <li class="active"><a href="./index.html">Home</a></li>
                            {/* <!-- <li><a href="./shop-grid.html">Shop</a></li> --> */}
                            <li><a href="#">Pages</a>
                                <ul class="header__menu__dropdown">
                                    {/* <!-- <li><a href="./shop-details.html">Shop Details</a></li> --> */}
                                    {/* <!-- <li><a href="./shoping-cart.html">Shoping Cart</a></li> --> */}
                                    <li><a href="./checkout.html">Check Out</a></li>
                                   
                                </ul>
                            </li>
                           
                        </ul>
                    </nav>
                </div>
                <div class="col-lg-3">
                    <div class="header__cart">
                        <ul>
                            <li><a id="shopping-cart-btn"><i class="fa fa-shopping-bag"></i> <span>{cartItems.length || 0}</span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="humberger__open">
                <i class="fa fa-bars"></i>
            </div>
        </div>
    </header>
    </>
   )
}

export default Header;
