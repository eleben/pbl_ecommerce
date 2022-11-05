import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";

const Base = () => {
  return (
    <>
      <Header />

      <Hero />
      <div className="container">
        <p>---------------------------------------</p>
<h3>To load components dynamically here</h3>
<p>---------------------------------------</p>
      </div>
      <Footer />
    </>
  );
};

export default Base;
