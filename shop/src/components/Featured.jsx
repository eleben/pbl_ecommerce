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
import { fetchOffers } from "../assets/offers";

const Featured = ({ itemsPayload }) => {
  //console.log("New World order ||");
  const { cartItems,keys } = useContext(CartContext);


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
      fetchShopItemsWithFilter(searchTxt, keys).then((r) => {
        if (r !== undefined) {
          let updatedD = r.product_results.map((searchItem) => {
            return searchItem;
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

    fetchShopItemsWithFilter({ field_filters },keys).then((r) => {
      // setPageData((prevState)=>{...pageData,...r.product_results})
    });
  };
  return (
    <>
      {showCart && <Cart setIsOpen={launchCartModal} />}

{/* {JSON.stringify(keys)} */}
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



const HeroSection = () => {
  const [offers, setOffers] = useState(null);

  const {keys} = useContext(CartContext)

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
    fetchOffers(keys).then((r) => {
      setOffers((prevState) => r);
    });
  }, []);
  return (
    <>
      {/* "/assets/pbl_ecommerce/banner.jpg" */}
      {/* https://codepen.io/Washable/pen/Oxqjbq */}

      <div class="hero__item set-bg main-hero">
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
          style={{ height: "100%", "overflow-x": "hidden" }}
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
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

            {offers === null || !offers ? (
              <div></div>
            ) : (
              offers.map((offer, idx) => (
                <div class="carousel-item ">
                  <div class="hero__text">
                    <span>Till {offer.offer_expiry}</span>
                    <h4>
                      {offer.name}
                      <br />
                    </h4>
                    <p>Free Pickup, Warranty and Delivery available</p>
                    <a href="#item-listing" id="nav-scr" class="primary-btn">
                      SHOP NOW
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
    </>
  );
};
export default Featured;
