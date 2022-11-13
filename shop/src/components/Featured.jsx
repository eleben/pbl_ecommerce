import React from "react";
import { useState } from "react";
import ItemDetail from "./ItemDetail";
import { itemsPayload } from "../assets/dummyItem";
import GridItem from "./GridItem";
import CartContext from "../CartContext";
import { useContext } from "react";
import Cart from "../pages/Cart";
import { BsCart4 } from "react-icons/bs";
const Featured = () => {
  const itemGroups = itemsPayload.items.map((row) => row.item_group);
  let uniqueItemGroups = [...new Set(itemGroups)];
  const [showDepartments, setShowDepartments] = useState(false);
  const [showCategories, setShowshowCategories] = useState(false);
  const [pageData, setPageData] = useState(itemsPayload.items);
  const [groupFilter, setGroupFilter] = useState("All");

  const { cartItems } = useContext(CartContext);
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

  const filterSearch = (value) => {
    if (value === "" || value === undefined) {
      setPageData((pageData) => itemsPayload.items);
      return;
    }
    const regexp = new RegExp(value, "i");
    console.log(value);
    // setPageData(pageData=>itemsPayload.items.filter(item=>item.web_item_name.includes(value)))
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
    console.log(category);
    // setPageData(pageData=>itemsPayload.items.filter(item=>item.web_item_name.includes(value)))
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
      {/* <p>{JSON.stringify(cartItems.map(t=>JSON.stringify(t)))}</p> */}
      {showCart && <Cart setIsOpen={launchCartModal} />}
      <section class="hero hero-normal">
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
                      placeholder={`Type to search. We have ${numberWithCommas(
                        itemsPayload.items.length
                      )} consumables available !`}
                      onChange={(e) => {
                        filterSearch(e.target.value);
                      }}
                    />
                  </form>
                </div>
                <div class="header__cart">
                  <ul>
                    <li>
                      {/* <a>
                      <i class="fa fa-shopping-bag fa-5x" onClick={()=>launchCartModal()}></i> <span>{cartItems.length}</span>
                    </a> */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div  class="cart-float">
        <h4 onClick={() => launchCartModal()}>
          <BsCart4 style={{"color":"green","font-size":"48px"}}  />
          <span>  {cartItems.length}</span>
        </h4>
      </div>
      <section class="featured spad">
        <div class="container">
          <div class="row">
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
          </div>
          <div class="row featured__filter">
            {pageData.map((row) => (
              <GridItem item={row} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Featured;
