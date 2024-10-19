import React, { useState, useContext, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const clientId = "190098913382-cgc12ml4nme8u32kjgumdcm50nhsc28g.apps.googleusercontent.com";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userProfile, setUserProfile } = useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [showPopup, setShowPopup] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const onSuccessLogin = async (res) => {
    const userProfile = res.profileObj;
    console.log("User logged in:", userProfile);

    try {
      const response = await axios.post("http://localhost:4000/api/auth/google", {
        googleId: userProfile.googleId,
        email: userProfile.email,
        name: userProfile.name,
        vault: 0,
      });
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
    setShowPopup(false);
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen); // Toggle mobile menu visibility
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <div className="navbar-toggle" onClick={toggleMobileMenu}>
        ☰
      </div>
      <ul className={`navbar-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => { setMenu("home"); setIsMobileMenuOpen(false); }} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        <a href="#CollectionZone" onClick={() => { setMenu("CollectionZone"); setIsMobileMenuOpen(false); }} className={menu === "CollectionZone" ? "active" : ""}> Collection Zone </a>
        <a href="#CustomPickup" onClick={() => { setMenu("CustomPickup"); setIsMobileMenuOpen(false); }} className={menu === "CustomPickup" ? "active" : ""}> Custom Pickup </a>
        <a href="#BinRequest" onClick={() => { setMenu("BinRequest"); setIsMobileMenuOpen(false); }} className={menu === "BinRequest" ? "active" : ""}> Bin Request </a>
        <a href="#payment" onClick={() => { setMenu("payment"); setIsMobileMenuOpen(false); }} className={menu === "payment" ? "active" : ""}> Payment </a>
      </ul>
      <div className="navbar-right">
        {isLoggedIn ? (
          <>
            <span>Welcome, {userProfile?.name}</span>
            {userProfile?.imageUrl && (
              <img
                src={userProfile?.imageUrl}
                alt="Profile"
                className="profile-image"
                onClick={togglePopup}
              />
            )}
            {showPopup && (
              <div className="profile-popup" ref={popupRef}>
                <h3>Profile Details</h3>
                <img
                  src={userProfile?.imageUrl}
                  alt="Profile"
                  className="profile-popup-image"
                />
                <p><strong>Name:</strong> {userProfile?.name}</p>
                <p><strong>Email:</strong> {userProfile?.email}</p>
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Logout"
                  onLogoutSuccess={onLogoutSuccess}
                />
              </div>
            )}
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
