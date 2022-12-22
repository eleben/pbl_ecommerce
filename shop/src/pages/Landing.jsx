import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { authDetails } from "../assets/auth";
import { companyDetails } from "../assets/companyInfo";
import { fetchShopItems } from "../assets/shopItems";
import CartContext from "../CartContext";

import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Landing = ({ keys }) => {
  return (
    <>
      <Header />

      {keys === null ? (
        <div id="preloder">
          <div class="loader"></div>
        </div>
      ) : (
        <DefaultTwenty ga={keys} />
      )}

      {/* {cartPayload === undefined || cartPayload ===null || !cartPayload ? (
        <div id="preloder">
          <div class="loader"></div>
        </div>
        <>
          {JSON.stringify(keys)}
          <DefaultNoItems />
          Keys {JSON.stringify(keys)}
        </>
      ) : (
        <Featured itemsPayload={cartPayload} />
      )} */}

      <Footer />
    </>
  );
};

const DefaultTwenty = ({ ga }) => {
  const [cartPayload, setCartPayload] = useState(null);

  const { companyData, setKeysGlobally, setCompanyDataGlobally } =
    useContext(CartContext);

  // const {setCompanyDataGlobally}

  useEffect(() => {
    setKeysGlobally(ga);
  }, []);

  const loadContextItems = () => {
    //const k = await loadKeys();
    fetchShopItems(ga).then((r) => {
      setCartPayload((prevState) => r);
    });
    companyDetails().then((r) => {
      setCompanyDataGlobally(r);
    });
  };
  useEffect(() => {
    loadContextItems();
  }, []);

  return (
    <>
      {!cartPayload || cartPayload === undefined || cartPayload === null  || !companyData ? (
        <div id="preloder">
          <div class="loader"></div>
        </div>
      ) : (
        <Featured itemsPayload={cartPayload} />
      )}
    </>
  );
};

const DefaultNoItems = () => {
  return (
    <>
      <div className="no-items">
        {/* <img src="./no-ecommerce-items.jpg" alt="No items found" /> */}

        <div class="no-img-bg"></div>

        <h3>Sorry, we did not find any e-commerce items</h3>

        <h5>Possible reasons: </h5>
        <br />
        <ol>
          <li>
            Perhaps you haven't published any items from the Item Doctype{" "}
          </li>
          <li>E-Commerce REST API credentials aren't set up or are invalid.</li>
        </ol>

        <span>
          If you have the right credentials,
          <a href="/app" target="_blank">
            Click Me{" "}
          </a>{" "}
          to address the issue
        </span>
      </div>
    </>
  );
};

export default Landing;
