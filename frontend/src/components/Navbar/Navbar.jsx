import React, { useState, useContext } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"; // Import axios for HTTP requests

const clientId =
  "190098913382-cgc12ml4nme8u32kjgumdcm50nhsc28g.apps.googleusercontent.com";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userProfile, setUserProfile } =
    useContext(StoreContext);
  const [menu, setMenu] = useState("home");

  const onSuccessLogin = async (res) => {
    const userProfile = res.profileObj;
    console.log("User logged in:", userProfile);
    
    // Store user data in the database
    try {
      const response = await axios.post("http://localhost:4000/api/auth/google", {
        googleId: userProfile.googleId,
        email: userProfile.email,
        name: userProfile.name,
      });
      console.log("User data stored in database:", response.data);
      setIsLoggedIn(true);
      setUserProfile(userProfile);
    } catch (error) {
      console.error("Error storing user data in the database:", error);
    }
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
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""} >
          Home
        </Link>
        <a href="#prediction" onClick={() => setMenu("prediction")} className={menu === "prediction" ? "active" : ""}> Custom Pickup </a>
        <a href="#diseases" onClick={() => setMenu("diseases")} className={menu === "diseases" ? "active" : ""}> Waste management </a>
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
