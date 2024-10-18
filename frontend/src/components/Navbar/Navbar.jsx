import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { StoreContext } from "../../context/StoreContext";

const clientId =
  "190098913382-cgc12ml4nme8u32kjgumdcm50nhsc28g.apps.googleusercontent.com";
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userProfile, setUserProfile } =
    useContext(StoreContext);
  const [menu, setMenu] = useState("home");

  const onSuccessLogin = (res) => {
    console.log("User logged in:", res.profileObj);
    setIsLoggedIn(true);
    setUserProfile(res.profileObj);
  };

  const onFailureLogin = (res) => {
    console.log("Login failed:", res);
  };

  const onLogoutSuccess = () => {
    console.log("User logged out.");
    setIsLoggedIn(false);
    setUserProfile(null);
  };

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
        {isLoggedIn ? (
          <>
            <span>Welcome, {userProfile?.name}</span>
            <GoogleLogout
              clientId={clientId}
              buttonText="Logout"
              onLogoutSuccess={onLogoutSuccess}
            />
          </>
        ) : (
          <GoogleLogin
            clientId={clientId}
            buttonText="Sign In"
            onSuccess={onSuccessLogin}
            onFailure={onFailureLogin}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
