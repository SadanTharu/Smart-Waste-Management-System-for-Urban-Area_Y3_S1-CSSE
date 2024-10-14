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
        <a
          href="#prediction"
          onClick={() => setMenu("prediction")}
          className={menu === "prediction" ? "active" : ""}
        >
          Waste collection
        </a>
        <a
          href="#diseases"
          onClick={() => setMenu("diseases")}
          className={menu === "diseases" ? "active" : ""}
        >
          Waste management
        </a>
      </ul>
      <div className="navbar-right">
        <button>Sign In</button>
      </div>
    </div>
  );
};

export default Navbar;
