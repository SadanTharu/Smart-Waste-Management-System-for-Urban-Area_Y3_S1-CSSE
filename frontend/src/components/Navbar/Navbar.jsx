import React, { useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";


const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const navigate = useNavigate();
  const {token,setToken} = useContext(StoreContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/")
  }

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
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
         :  <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="navbar-profile-dropdown">
                  <li onClick={()=>navigate('/profile')}>
                      <img src={assets.profile} alt="" />
                      <p>My Profile</p>
                  </li>
                
                  
                  <hr />
                  <li onClick={logout}>
                      <img src={assets.logout_icon} alt="" />
                      <p>Logout</p>
                  </li>
                </ul>
           </div> 
          }
        
      </div>
    </div>
  );
};

export default Navbar;
