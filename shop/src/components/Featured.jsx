import React, { useEffect } from "react";
import { useState } from "react";
import GridItem from "./GridItem";
import CartContext from "../CartContext";
import { useContext } from "react";
import Cart from "../pages/Cart";
import { BsCart4 } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import {call} from 'frappe-react-sdk';
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";

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

  const [showCart, setShowCart] = useState(false);
  const launchCartModal = () => {
    setShowCart(!showCart);
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

  const filterGroupSearch =(value)=>{
    //console.log(value)
    if (value === "" || value === undefined) {
      setSidePanelGroups((prevState) => uniqGrps);
      return;
    }
    const regexp = new RegExp(value, "i");
    setSidePanelGroups((prevState) => uniqGrps.filter(itemGr=>regexp.test(itemGr)));

    // setSidePanelGroups((prevState) => prevState.filter(itemGr=>itemGr.toLowerCase().includes(value)));
  }
  const filterSearch = (value) => {
    if (value === "" || value === undefined) {
      setPageData((pageData) => itemsPayload.items);
      return;
    }
    const regexp = new RegExp(value, "i");
    //console.log(value);
    setPageData((pageData) =>
      itemsPayload.items.filter((item) => regexp.test(item.web_item_name))
    );
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

  return (
    <>
      {showCart && <Cart setIsOpen={launchCartModal} />}

      {/* <section
        class="hero hero-normal"
        style={{
          position: "sticky",
          top: "0",
          background: "#f8f8f8",
          padding: "10px 16px",
          "z-index": "2",
        }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-3">
              <div class="hero__categories" onClick={showItemDepartments}>
                <div class="hero__categories__all">
                  <i class="fa fa-bars"></i>
                  <span>All Categories</span>
                </div>

                <ul
                  style={{
                    display: showDepartments ? "block" : "none",
                    height: "500px",
                    overflow: "scroll",
                  }}
                >
                  {uniqueItemGroups.map((itemGroup, key) => {
                    return (
                      <li key={key}>
                        <small
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setGroupFilter((groupFilter) => itemGroup);
                            filterByCategory(itemGroup);
                          }}
                        >
                          {itemGroup} {` (${itemCountPerGroup(itemGroup)})`}
                        </small>
                        <hr />
                      </li>
                    );
                  })}
                </ul>
                <p>
                  <b>Filtered by: </b>
                  {groupFilter}
                </p>
                <button
                  class="btn btn-link"
                  onClick={() => {
                    setGroupFilter((groupFilter) => "All");
                    filterByCategory("All");
                  }}
                >
                  Clear Filter
                </button>
              </div>
            </div>

            <div class="col-lg-9">
              <div class="hero__search">
                <div class="hero__search__form">
                  <form action="#">
                    <input
                      type="text"
                      placeholder="Type to search"
                      onChange={(e) => {
                        filterSearch(e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div class="header__cart">
               
                  <p onClick={() => launchCartModal()}>
                    <BsCart4 style={{ color: "green", "font-size": "48px" }} />
                    <span> {cartItems.length}</span> Cart
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <nav
        class="navbar sticky-top navbar-light"
        style={{ "background-color": "#f8f8f8" }}
      >
        <div className="container">
          <div class="dropdown navbar-filter" >
            <button
              class="btn btn-success dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Filter by Category
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <ul>
                <li
                  class="dropdown-item"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setGroupFilter((groupFilter) => "All");
                    filterByCategory("All");
                  }}
                >
                  All Items
                </li>
                <hr />

                {uniqueItemGroups.map((itemGroup, key) => {
                  return (
                    <li key={key}>
                      <small
                        style={{ cursor: "pointer" }}
                        class="dropdown-item"
                        onClick={() => {
                          setGroupFilter((groupFilter) => itemGroup);
                          filterByCategory(itemGroup);
                        }}
                      >
                        {itemGroup} {` (${itemCountPerGroup(itemGroup)})`}
                      </small>
                      <hr />
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
              }}
            />
          </div>

          <span class="navbar-text">
            <p onClick={() => launchCartModal()}>
              <BsCart4 style={{ color: "green", "font-size": "24px" }} />
              <span> {cartItems.length}</span> Cart
            </p>
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
          <div className="col-3 sidepanel-filter" style={{"overflow":"scroll"}}>
            <div classname="container">
            <p>All Item Groups</p>
           
            <div class="form-group has-search">
              <span class="fa fa-search form-control-feedback"></span>
              <input
                type="text"
                class="form-control"
                placeholder="Search item group"
                onChange={(e) => {
                  console.log(e.target.value)
                  filterGroupSearch(e.target.value);
                }}
              />
            </div><br/>
            {sidePanelGroups.length > 1 ? (
              <Form >
                <ul>
                  {sidePanelGroups.map((itemGroup, index) => (
                    <Form.Check
                      type="checkbox"
                      id={itemGroup}
                      label={`${itemGroup}`}
                      checked={multipleGroupFilters.includes(itemGroup)}
                      onChange ={(e)=>console.log(e)}
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
          </div>
          <div className="col-9">
            <section class="featured spad content" style={{ padding: "16px" }}>
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
                 
                  {multipleGroupFilters.length > 0 || groupFilter!=="All" ? (
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
                {/* <div class="row">
            <div class="col-lg-12">
              <div class="section-title">
                <h2>Featured Products</h2>
              </div>
              <div class="featured__controls">
                <ul>
                  <li
                    class="active"
                    onClick={() => {
                      setGroupFilter((groupFilter) => "All");
                      filterByCategory("All");
                    }}
                  >
                    All
                  </li>
                  {itemsPayload.featured_item_groups.map((row) => (
                    <li
                      class={groupFilter === row ? "active" : ""}
                      data-filter={row}
                      onClick={() => {
                        setGroupFilter((groupFilter) => row);
                        filterByCategory(row);
                      }}
                    >
                      {row}
                      {`(${itemCountPerGroup(row)})`}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div> */}

                {/* <div class="row featured__filter">
            {pageData.map((row, id) => (
              <GridItem key={id} item={row} />
              
            ))}
          </div> */}
                <div class="row">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
