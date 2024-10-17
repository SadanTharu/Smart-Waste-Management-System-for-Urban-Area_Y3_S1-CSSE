import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menu, setMenu] = useState("home");

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Payments
        </Link>
        <Link
          to="/WasteHome"
          onClick={() => setMenu("wastecollection")}
          className={menu === "wastecollection" ? "active" : ""}
        >
          Waste collection
        </Link>
        <Link
          to="/wastemanagement"
          onClick={() => setMenu("wastemanagement")}
          className={menu === "wastemanagement" ? "active" : ""}
        >
          Waste management
        </Link>
      </ul>
      <div className="navbar-right">
        <button>Sign In</button>
      </div>
    </div>
  );
};
export default Navbar;

