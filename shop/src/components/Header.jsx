import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { companyDetails } from "../assets/companyInfo";
import Table from "react-bootstrap/Table";

import CartContext from "../CartContext";
import Modal from "react-bootstrap/Modal";
import { getCookie } from "../cookie";
import Cart from "../pages/Cart";

import logoImg from "./logo.png";
import { fetchQuoteHistory } from "../assets/quoteHistory";
import { GrDocumentPdf } from "react-icons/gr";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const [showHist, setShowHist] = useState(false);
  const openHistoryDialog = () => {
    setShowHist((prevState) => !showHist);
  };
  const launchCartModal = () => {
    setShowCart((prevState) => !showCart);
  };
  const [companyInfo, setCompanyInfo] = useState(null);
  const handleSidePanel = () => {
    let menu_wrapper = document.getElementById("menu_wrapper");
    let menu_overlay = document.getElementById("menu_overlay");

    menu_wrapper.classList.add("show__humberger__menu__wrapper");
    menu_overlay.classList.add("active");
    document.body.classList.add("over_hid");
   
    // $(".humberger__menu__wrapper").addClass("show__humberger__menu__wrapper");
    // $(".humberger__menu__overlay").addClass("active");
    // $("body").addClass("over_hid");
  };
  const handleSidePanelClose = () => {
    let menu_wrapper = document.getElementById("menu_wrapper");
    let menu_overlay = document.getElementById("menu_overlay");

    menu_wrapper.classList.remove("show__humberger__menu__wrapper");
    menu_overlay.classList.remove("active");
    document.body.classList.remove("over_hid");
  };
  useEffect(() => {
    companyDetails().then((r) => {
      setCompanyInfo((prevState) => r);
    });
  }, []);
  return (
    <>
      {/* {JSON.stringify(companyInfo)} */}
      {showCart && <Cart setIsOpen={launchCartModal} />}
      {showHist && (
        <QuoteHistory
          handleOpenHistory={openHistoryDialog}
          user={getCookie("user_id")}
        />
      )}
      <header class="header" id="myHeader">
        {companyInfo && (
          <>
            {/* <!-- Humberger Begin --> */}
            <div
              class="humberger__menu__overlay"
              id="menu_overlay"
              onClick={() => {
                handleSidePanelClose();
              }}
            ></div>
            <div class="humberger__menu__wrapper" id="menu_wrapper">
              <div class="humberger__menu__logo">
                <a href="/landing">
                  <img
                    src={companyInfo.company_logo || logoImg}
                    alt="Company Logo"
                    style={{
                      "object-fit": "contain",
                      width: "auto",
                      height: "70px",
                    }}
                  />
                </a>
              </div>
              <div class="humberger__menu__cart">
                <ul>
                  <li>
                    <a
                      id="shopping-cart-btn"
                      href="#"
                      onClick={() => {
                        setShowCart((prevstate) => !showCart);
                      }}
                    >
                      <i class="fa fa-shopping-bag"></i>{" "}
                      <span>{cartItems.length || 0}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="humberger__menu__widget">
                <div class="header__top__right__language">
                  <img src="img/language.png" alt="" />
                  <div>English</div>
                  <span class="arrow_carrot-down"></span>
                  <ul>
                    <li>
                      <a href="#">English</a>
                    </li>
                  </ul>
                </div>
                <div class="header__top__right__auth">
                  <a
                    href={
                      getCookie("full_name") === "Guest"
                        ? "/login"
                        : "/?cmd=web_logout"
                    }
                  >
                    <i class="fa fa-user"></i>
                    {getCookie("full_name") === "Guest" ? "Login" : "Logout"}
                  </a>
                </div>
              </div>
              {/* <p>Something to consider</p> */}
              <div id="mobile-menu-wrap">
              <nav class="humberger__menu__nav mobile-menu" id="mobile-menu">
                <ul>
                  <li class="active">
                    <a href="/landing">Company Website</a>
                  </li>
                  <li class="active">
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (
                          getCookie("full_name").includes([
                            "Administrator",
                            "Guest",
                          ])
                        ) {
                          Swal.fire({
                            icon: "error",
                            title: "Unauthorized !",
                            text: "Oops, you forgot to login or you're logged in as Administrator. So you can't access quotations",
                            footer: '<a href="/login">Take me to Login</a>',
                          });
                          return;
                        }
                        openHistoryDialog();
                      }}
                    >
                      Quote History
                    </a>
                  </li>
                  <li>
                    <a href="/contact" target="_blank">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
              
              </div>
              <div class="header__top__right__social"></div>
              <div class="humberger__menu__contact">
                <ul>
                  <li>
                    <i class="fa fa-envelope"></i>{" "}
                    {
                      <a href={`mailto:${companyInfo.email || ""}`}>
                        {companyInfo.email || ""}
                      </a>
                    }
                  </li>
                </ul>
              </div>
            </div>
            {/* Humberger End */}
            <div class="header__top">
              <div class="container">
                <div class="row">
                  <div class="col-lg-6 col-md-6">
                    <div class="header__top__left">
                      <ul>
                        <li>
                          <i class="fa fa-envelope"></i>{" "}
                          {
                            <a href={`mailto:${companyInfo.email || ""}`}>
                              {companyInfo.email || ""}
                            </a>
                          }
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                    <div class="header__top__right">
                      <div class="header__top__right__social">
                        {/* <a href="#">
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
                    </a> */}
                      </div>
                      <div class="header__top__right__language">
                        <img src="img/language.png" alt="" />
                        <div>English</div>
                        <span class="arrow_carrot-down"></span>
                        <ul>
                          {/* <li>
                        <a href="#">Spanis</a>
                      </li> */}
                          <li>
                            <a href="#">English</a>
                          </li>
                        </ul>
                      </div>
                      <div class="header__top__right__auth">
                        <a
                          href={
                            getCookie("full_name") === "Guest"
                              ? "/login"
                              : "/?cmd=web_logout"
                          }
                        >
                          <i class="fa fa-user"></i>
                          {getCookie("full_name") === "Guest"
                            ? "Login"
                            : "Logout"}
                        </a>
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
                    <a href="./landing">
                      <img
                        src={companyInfo.company_logo || logoImg}
                        alt="Company Logo"
                        style={{
                          "object-fit": "contain",
                          width: "auto",
                          height: "70px",
                        }}
                      />
                    </a>
                  </div>
                </div>
                <div class="col-lg-6">
                  <nav class="header__menu">
                    <ul>
                      <li>
                        <a href="/landing">Company Website</a>
                      </li>
                      <li class="active">
                        <a
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (
                              getCookie("full_name").includes([
                                "Administrator",
                                "Guest",
                              ])
                            ) {
                              Swal.fire({
                                icon: "error",
                                title: "Unauthorized !",
                                text: "Oops, you forgot to login or you're logged in as Administrator. So you can't access quotations",
                                footer: '<a href="/login">Take me to Login</a>',
                              });
                              return;
                            }
                            openHistoryDialog();
                          }}
                        >
                          Quote History
                        </a>
                      </li>
                      <li>
                        <a href="/contact" target="_blank">
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div class="col-lg-3">
                  <div class="header__cart">
                    <ul>
                      <li>
                        <a
                          id="shopping-cart-btn"
                          href="#"
                          onClick={() => {
                            setShowCart((prevstate) => !showCart);
                          }}
                        >
                          <i class="fa fa-shopping-bag"></i>{" "}
                          <span>{cartItems.length || 0}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="humberger__open" onClick={() => handleSidePanel()}>
                <i class="fa fa-bars"></i>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};
const QuoteHistory = ({ handleOpenHistory, user }) => {
  const [lgShow, setLgShow] = useState(true);

  const [quoteHistory, setQuoteHistory] = useState(null);

  const { keys } = useContext(CartContext);

  useEffect(() => {
    fetchQuoteHistory(user, keys).then((r) => {
      setQuoteHistory((prevState) => r);
    });
  }, []);
  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        fullscreen={true}
        onHide={() => {
          setLgShow((lgShow) => !lgShow);
          handleOpenHistory(lgShow);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        // style={{ "z-index": "3" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Hi, {decodeURI(getCookie("full_name"))}, below is your quote history
            :
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <small
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => {
              setLgShow((lgShow) => !lgShow);
              handleOpenHistory(lgShow);
            }}
          >
            <HiOutlineArrowLeft /> Back to shopping
          </small>
          <br />
          {quoteHistory === null ? (
            <em>Loading...</em>
          ) : (
            <FullQuoteHistory history={quoteHistory} />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

const FullQuoteHistory = ({ history }) => {
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const humanReadableDate = (datestr) => {
    let dateString = datestr.split(" ")[0];
    const options = { year: "numeric", month: "short", day: "numeric" };
    return `${new Date(dateString).toLocaleDateString(undefined, options)} ${
      datestr.split(" ")[1]
    }`;
  };
  return (
    <>
      {history.length < 1 ? (
        <em>No results found</em>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Date Requested</th>
                <th colSpan={2}>Quote ID</th>
                <th colSpan={2}>Company</th>
                <th>Grand Total</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              <>
                {history.map((quotation, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{humanReadableDate(quotation.creation)}</td>
                    <td colSpan={2}>{quotation.name}</td>
                    <td colSpan={2}>
                      <b>{quotation.party_name}</b>
                    </td>
                    <td>
                      {quotation.docstatus == "1" ? (
                        <>{numberWithCommas(quotation.grand_total)}</>
                      ) : (
                        <em>Pending</em>
                      )}
                    </td>
                    <td>
                      {quotation.docstatus == "1" ? (
                        <a
                          href={`/printview?doctype=Quotation&name=${quotation.name}`}
                          target="_blank"
                        >
                          <GrDocumentPdf
                            style={{
                              "font-size": "14px",
                              color: "green",
                              cursor: "pointer",
                            }}
                          />
                        </a>
                      ) : (
                        <em style={{ color: "red" }}>N/a</em>
                      )}
                    </td>
                  </tr>
                ))}
              </>
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
export default Header;
