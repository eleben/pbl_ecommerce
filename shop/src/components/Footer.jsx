import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { footerDetailsInfo } from "../assets/footer";
const Footer = () => {
  // const [footerDetails, setFooterDetails] = useState(null);

  // useEffect(()=>{
  //   footerDetailsInfo().then(r=>{
  //     setFooterDetails(prevState=>r)
  //   })
  // })
  return (
    <>
      <nav class="navbar fixed-bottom navbar-light bg-light">
        <div className="container">
          <a class="navbar-brand" href="#">
            {/* <BsFillArrowUpCircleFill /> */}

            {/* {footerDetails && <FooterInfo details={footerDetails} />} */}
          </a>
          <span></span>
          <span class="navbar-text">
            <small>Powered by ERPNext</small>
          </span>
        </div>
      </nav>
    </>
  );
};

const FooterInfo = ({ details }) => {
  return (
    <>
      {details.footer_items && (
        <>
        <ul style={{"list-style-type":"none"}} class="list-group list-group-flush">
          {details.footer_items.map((item, idx) => (
            <li class="list-group-item"><a href={item.url}>{item.label}</a></li>
          ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Footer;
