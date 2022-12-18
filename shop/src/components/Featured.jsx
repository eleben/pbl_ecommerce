import React, { useEffect } from "react";
import { useState } from "react";
import GridItem from "./GridItem";
import CartContext from "../CartContext";
import { useContext } from "react";
import Cart from "../pages/Cart";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
// import {call} from 'frappe-react-sdk';
import { fetchShopItemsWithFilter } from "../assets/shopItemsFilter";
import Swal from "sweetalert2";

import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import Search from "./Search";
import { fetchOffers } from "../assets/offers";
import HeroBanner from "./banner.jpg";

const Featured = ({ itemsPayload }) => {
  //console.log("New World order ||");
  const { cartItems } = useContext(CartContext);

  //console.log(JSON.stringify(itemsPayload));

  const [pageData, setPageData] = useState(itemsPayload.items || []);
  let itemGroups = itemsPayload.items.map((row) => row.item_group);
  let uniqGrps = [...new Set(itemGroups)];
  const [uniqueItemGroups, setUniqueItemGroups] = useState(uniqGrps || []);
  const [sidePanelGroups, setSidePanelGroups] = useState(uniqGrps || []);

  const [showDepartments, setShowDepartments] = useState(false);
  const [showCategories, setShowshowCategories] = useState(false);
  const [groupFilter, setGroupFilter] = useState("All");
  const [multipleGroupFilters, setMultipleGroupFilters] = useState([]);

  const [dbSearch, setDBSearch] = useState([]);
  const [searchTxt, setSearchtxt] = useState("a");

  const handleUpdatePageData = (item) => {
    let exists = pageData.find((x) => x.item_code === item.item_code);
    if (!exists) {
      let updated = [...pageData, item];
      setPageData((prevState) => updated);
    }
  };
  const handleDeepSearch = () => {};
  const [showCart, setShowCart] = useState(false);
  const launchCartModal = () => {
    // setShowCart(prevState=>!showCart);
    setShowCart((prevState) => !showCart);
  };
  const showItemDepartments = () => {
    setShowDepartments((currState) => !currState);
  };
  const showItemCategories = () => {
    setShowshowCategories((currState) => !currState);
  };

  const handleGroupFilterSelect = (itemGroup, isAdd) => {
    if (isAdd === true) {
      setMultipleGroupFilters((prevState) => [...prevState, itemGroup]);
      return;
    }
    setMultipleGroupFilters((prevState) =>
      prevState.filter((group) => group !== itemGroup)
    );
  };

  const filterGroupSearch = (value) => {
    //console.log(value)
    if (value === "" || value === undefined) {
      setSidePanelGroups((prevState) => uniqGrps);
      return;
    }
    const regexp = new RegExp(value, "i");
    setSidePanelGroups((prevState) =>
      uniqGrps.filter((itemGr) => regexp.test(itemGr))
    );

    // setSidePanelGroups((prevState) => prevState.filter(itemGr=>itemGr.toLowerCase().includes(value)));
  };
  const filterSearch = (value) => {
    if (value === "" || value === undefined) {
      setPageData((pageData) => itemsPayload.items);
      return;
    }
    const regexp = new RegExp(value, "i");

    let filteredData = itemsPayload.items.filter((item) =>
      // regexp.test(item.web_item_name)
      {
        let itemDescription = item.web_item_name;
        return itemDescription.toLowerCase().match(value.toLowerCase());
      }
    );
    // console.log(JSON.stringify(filteredData));
    if (filteredData.length < 1) {
      fetchShopItemsWithFilter(searchTxt).then((r) => {
        if (r !== undefined) {
          let updatedD= r.product_results.map((searchItem) => {


            return searchItem
            // setPageData((prevState) => [...pageData, searchItem]);
            // handleUpdatePageData(searchItem);
            // filterSearch(value);
          });
          setPageData((prevState) => updatedD); 
        }
      });
      
      return;
    }
    setPageData((pageData) => filteredData);
  };
  const filterByCategory = (category) => {
    if (category === "" || category === undefined || category === "All") {
      setPageData((pageData) => itemsPayload.items);
      return;
    }
    const regexp = new RegExp(category, "i");
    //console.log(category);
    setPageData((pageData) =>
      itemsPayload.items.filter((item) => regexp.test(item.item_group))
    );
  };
  const itemCountPerGroup = (group) => {
    let filtered = itemsPayload.items.filter(
      (item) => item.item_group === group
    );
    return filtered.length || 0;
  };

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const performOffersSearch = (itemGroups) => {
    let field_filters = { item_group: ["IN", itemGroups] };

    fetchShopItemsWithFilter({ field_filters }).then((r) => {
      // setPageData((prevState)=>{...pageData,...r.product_results})
    });
  };
  return (
    <>
      {showCart && <Cart setIsOpen={launchCartModal} />}

      {/* {searchTxt} */}
      {/* {pageData.length < 1 && <p style={{"color":"red"}}>Searching..</p>
      // <Search searchTxt updatePayload={handleUpdatePageData} />
      // <div id="preloder">
      //   <div class="loader"></div>
      // </div>
      } */}

      <nav
        class="navbar sticky-top navbar-light"
        style={{ "background-color": "#f8f8f8" }}
      >
        <div className="container">
          <div class="dropdown navbar-filter">
            <button
              class="btn btn-success dropdown-toggle "
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter by Category
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <ul class="list-group" style={{ "list-style-type": "none" }}>
                <li
                  class="dropdown-item list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setGroupFilter((groupFilter) => "All");
                    filterByCategory("All");
                  }}
                >
                  All Items
                </li>

                {uniqueItemGroups.map((itemGroup, key) => {
                  return (
                    <li key={key}>
                      <small
                        style={{ cursor: "pointer" }}
                        class="dropdown-item list-group-item"
                        onClick={() => {
                          setGroupFilter((groupFilter) => itemGroup);
                          filterByCategory(itemGroup);
                        }}
                      >
                        {itemGroup} {` (${itemCountPerGroup(itemGroup)})`}
                      </small>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div class="form-group has-search">
            <span class="fa fa-search form-control-feedback"></span>
            <input
              type="text"
              class="form-control"
              placeholder="Search for products"
              onChange={(e) => {
                filterSearch(e.target.value);
                setSearchtxt((prevState) => e.target.value);
              }}
            />
            <div></div>
          </div>

          {/* <span class="navbar-text"> */}
          <span
            class="navbar-text btn btn-success"
            onClick={() => {
              launchCartModal();
              launchCartModal();
            }}
          >
            <BsCart4 style={{ "font-size": "24px" }} />
            {`  ${cartItems.length} In Cart`}
          </span>
        </div>
      </nav>

      <hr />
      {/* <div class="cart-float">
        <h4 onClick={() => launchCartModal()}>
          <BsCart4 style={{ color: "green", "font-size": "48px" }} />
          <span> {cartItems.length}</span>
        </h4>
      </div> */}
      <div className="container">
        <div className="row">
          <div
            className="col-3 sidepanel-filter hero__categories"
            // style={{ overflow: "scroll" }}
          >
            <div classname="container">
              <p>All Item Groups</p>

              <div class="form-group has-search">
                <span class="fa fa-search form-control-feedback"></span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search item group"
                  onChange={(e) => {
                    console.log(e.target.value);
                    filterGroupSearch(e.target.value);
                  }}
                />
              </div>
              <br />
              {sidePanelGroups.length > 1 ? (
                <Form>
                  <ul>
                    {sidePanelGroups.map((itemGroup, index) => (
                      <Form.Check
                        type="checkbox"
                        id={itemGroup}
                        label={`${itemGroup}`}
                        checked={multipleGroupFilters.includes(itemGroup)}
                        onChange={(e) => console.log(e)}
                        onClick={(e) => {
                          handleGroupFilterSelect(itemGroup, e.target.checked);
                          // //console.log(e.)
                        }}
                      />
                    ))}
                  </ul>
                </Form>
              ) : (
                "All item Group"
              )}
            </div>
          </div>{" "}
          <>
            <div className="col-9">
              <div class="container">
                <div className="row">
                  <section
                    class="featured spad content"
                    style={{ padding: "16px" }}
                  >
                    <div class="container">
                      <div>
                        {multipleGroupFilters !== undefined
                          ? multipleGroupFilters.map((group, index) => (
                              <>
                                <Badge className="filterPill" bg="info">
                                  <p>
                                    {group}{" "}
                                    <AiOutlineCloseCircle
                                      onClick={() => {
                                        handleGroupFilterSelect(group, false);
                                      }}
                                    />
                                  </p>
                                </Badge>
                              </>
                            ))
                          : "No filter selected"}

                        {multipleGroupFilters.length > 0 ||
                        groupFilter !== "All" ? (
                          <button
                            class="btn btn-link"
                            onClick={() => {
                              setGroupFilter((groupFilter) => "All");
                              filterByCategory("All");

                              multipleGroupFilters.map((itemG) =>
                                handleGroupFilterSelect(itemG, false)
                              );
                            }}
                          >
                            Clear Filters
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                      <br />
                      {pageData.length < 1 && searchTxt.length > 3 && (
                        <h4 style={{ color: "red" }}>
                          Searching, please wait..
                        </h4>
                      )}

                      {/* {JSON.stringify(pageData)} */}
                      <HeroSection />
                      <br />

                      <div
                        class="row"
                        id="item-listing"
                        data-bs-spy="scroll"
                        data-bs-target="#nav-scr"
                      >
                        {/* <OffersSection /> */}

                        <br />
                        {pageData.map((row, id) =>
                          multipleGroupFilters.includes(row.item_group) ||
                          multipleGroupFilters.length < 1 ? (
                            <GridItem key={id} item={row} />
                          ) : (
                            ""
                          )
                        )}
                      </div>
                    </div>
                  </section>
                </div>{" "}
              </div>{" "}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

const OffersSection = () => {
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
      {offers === null || !offers ? (
        <div></div>
      ) : (
        <div class="col-12">
          <div class="card border-success mb-3 offer-section">
            <div class="card-body">
              <h4 class="card-title">
                <MdLocalOffer /> <b>We have Offers!</b>
              </h4>
              <div class="row">
                {/* <div class="col-9" >
                  <ImageCarousel listing={offers} style={{width:"100%"}}/>
                </div> */}
                <div class="col-3">
                  <div className="altImageStyle" style={{ cursor: "pointer" }}>
                    OFFER
                  </div>
                </div>
                <div class="col-9">
                  <ul className="offer-list">
                    {randomThree(offers).map((offer, id) => (
                      <li>
                        <b>{offer.name}</b>
                        <button
                          type="button"
                          class="btn btn-link"
                          onClick={() => alertAnOffer(offer)}
                        >
                          Learn more
                        </button>
                      </li>
                    ))}
                  </ul>
                  {offers.length > 3 && (
                    <button type="button" class="btn btn-link">
                      More offers...
                    </button>
                  )}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ImageCarousel = ({ listing }) => {
  return (
    <>
      <div class="container">
        <div id="myCarousel" class="carousel slide" data-ride="carousel">
          {/* <!-- Indicators --> */}
          <ol class="carousel-indicators">
            {listing.map((item, id) => (
              <li
                data-target="#myCarousel"
                data-slide-to={String(id)}
                class={id === 0 ? "active" : ""}
              ></li>
            ))}

            {/* <li data-target="#myCarousel" data-slide-to="1"></li> */}
            {/* <li data-target="#myCarousel" data-slide-to="2"></li> */}
          </ol>

          {/* <!-- Wrapper for slides --> */}
          <div class="carousel-inner">
            {listing.map((item, id) => (
              <div class="item active">
                <div className="altImageStyle" style={{ cursor: "pointer" }}>
                  {item.name.slice(0, 5).toUpperCase()}
                </div>
                <div class="carousel-caption">
                  <h3>{item.offer_detail}</h3>
                  <p>{item.offer_expiry}</p>
                </div>
              </div>
            ))}

            {/* <div class="item">
              <div className="altImageStyle" style={{ cursor: "pointer" }}>
                OFFER2
              </div>
              <div class="carousel-caption">
                <h3>Chicago</h3>
                <p>Thank you, Chicago!</p>
              </div>
            </div>

            <div class="item">
              <div className="altImageStyle" style={{ cursor: "pointer" }}>
                OFFER3
              </div>
              <div class="carousel-caption">
                <h3>New York</h3>
                <p>We love the Big Apple!</p>
              </div>
            </div> */}
          </div>

          {/* <!-- Left and right controls --> */}
          <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="right carousel-control"
            href="#myCarousel"
            data-slide="next"
          >
            <span class="glyphicon glyphicon-chevron-right"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
};
const HeroSection = () => {
  return (
    <>
      {/* "/assets/pbl_ecommerce/banner.jpg" */}
      <div class="hero__item set-bg main-hero">
        {/* {window.location.origin} */}
        <div class="hero__text">
          <span>Quality Equipment</span>
          <h2>
            At amazing <br />
            Prices
          </h2>
          <p>Free Pickup, Warranty and Delivery available</p>
          <a href="#item-listing" id="nav-scr" class="primary-btn">
            SHOP NOW
          </a>
        </div>
      </div>
    </>
  );
};
export default Featured;
