import React from "react";
import "./Navbar.css";
import navlogo from "../../Assets/navlogoo.png";
import navprofile from "../../Assets/navprofile.png";
import arrowicon from "../../Assets/arrow_icon.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="navlogo" />
      <div className="admin-logo">
        <img src={navprofile} alt="" className="navprofile" />
        <img src={arrowicon} alt="" className="arrowicon" />
      </div>
    </div>
  );
};

export default Navbar;
