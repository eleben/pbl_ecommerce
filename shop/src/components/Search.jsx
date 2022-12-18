import React, { useContext, useState } from "react";
import CartContext from "../CartContext";
import Modal from "react-bootstrap/Modal";
import { MdOutlineRequestQuote } from "react-icons/md";
import { fetchShopItemsWithFilter } from "../assets/shopItemsFilter";
const Search = ({ searchTxt, updatePayload }) => {
  const [lgShow, setLgShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchPayload, setSearchPayload] = useState({});
  const { addToCart } = useContext(CartContext);
  const filterSearch = (str) => {
    if (str === undefined || str === "") {
      return;
    }
    if (str.length < 4) {
      return;
    }
    setIsLoading((prevState) => true);
    fetchShopItemsWithFilter(str).then((r) => {
      setSearchPayload(r);
      setIsLoading((prevState) => false);
    });
  };

  return (
    <>
      <Modal
        size="lg"
        show={lgShow}
        fullscreen={false}
        keyboard={false}
        backdrop="static"
        onHide={() => {
          setLgShow((lgShow) => !lgShow);
          setIsOpen(lgShow);
        }}
        aria-labelledby="example-modal-sizes-title-lg"
        // style={{ "z-index": "3" }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Global Search
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
            <div></div>
          </div>

          <small>Type at least 4 characters</small>
          {isLoading && <p style={{ color: "red" }}>Searching..</p>}

          <hr />
          
          {/* {JSON.stringify(searchPayload)} */}
          {searchPayload.product_results !== undefined
            ? searchPayload.product_results.map((searchItem, index) => (
                <div class="card" key={index}>
                  <div class="row">
                    <div class="col-md-7">
                      <h5 class="card-title">{searchItem.web_item_name}</h5>
                      <div class="card-body">
                        <p>Item Group {searchItem.item_group}</p> |{" "}
                        <small>Item Code: {searchItem.item_code}</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <button
                      style={{ "margin-bottom": "5px" }}
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        updatePayload(searchItem);
                        addToCart(searchItem);
                      }}
                    >
                      <MdOutlineRequestQuote />
                      &nbsp;&nbsp; Add to Quote
                    </button>
                  </div>
                </div>
              ))
            : ""}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Search;
