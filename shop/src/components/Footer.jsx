import React from "react";
import {BsFillArrowUpCircleFill} from 'react-icons/bs'
const Footer = () => {
  return (
    <>
    
      <nav class="navbar fixed-bottom navbar-light bg-light">
        <div className="container">
        <a class="navbar-brand" href="#">
          <BsFillArrowUpCircleFill/>
          
        </a>
        <span></span>
        <span class="navbar-text"><small>Powered by ERPNext</small></span>
        </div>
      </nav>
    </>
  );
};

export default Footer;
