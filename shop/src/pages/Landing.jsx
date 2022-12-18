import React from "react";

import Featured from "../components/Featured";
import Footer from "../components/Footer";
import Header from "../components/Header";
const Landing = ({ cartPayload }) => {
  return (
    <>
      <Header />

      {cartPayload.items === undefined  ? (
        <div id="preloder">
          <div class="loader"></div>
        </div>
      ) : (
        <Featured itemsPayload={cartPayload} />
      )}

      <Footer />
    </>
  );
};

export default Landing;
