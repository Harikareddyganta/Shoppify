import React, { useContext, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import drop_down from "../Assets/nav_dropdown.png";

const Navbar = () => {
  const [menu, setmenu] = useState("Shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const drop_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPIFY</p>
      </div>
      <img
        onClick={drop_toggle}
        src={drop_down}
        alt=""
        className="nav-drop-down"
      />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setmenu("Shop")}>
          {" "}
          <Link to="/" style={{ textDecoration: "none" }}>
            {" "}
            Shop
          </Link>{" "}
          {menu === "Shop" ? <hr /> : <></>}{" "}
        </li>
        <li onClick={() => setmenu("Men")}>
          {" "}
          <Link to="/mens" style={{ textDecoration: "none" }}>
            {" "}
            Men{" "}
          </Link>{" "}
          {menu === "Men" ? <hr /> : <></>}
        </li>
        <li onClick={() => setmenu("Women")}>
          {" "}
          <Link to="/womens" style={{ textDecoration: "none" }}>
            Women
          </Link>
          {menu === "Women" ? <hr /> : <></>}
        </li>
        <li onClick={() => setmenu("Kids")}>
          {" "}
          <Link to="/kids" style={{ textDecoration: "none" }}>
            {" "}
            Kid{" "}
          </Link>
          {menu === "Kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          >
            Logout
          </button>
        ) : (
          <button>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </button>
        )}
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
