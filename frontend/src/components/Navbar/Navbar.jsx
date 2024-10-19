import React, { useState, useContext, useRef, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"; // Import axios for HTTP requests

const clientId =
  "190098913382-cgc12ml4nme8u32kjgumdcm50nhsc28g.apps.googleusercontent.com";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn, userProfile, setUserProfile } =
    useContext(StoreContext);
  const [menu, setMenu] = useState("home");
  const [showPopup, setShowPopup] = useState(false); // State for managing the popup
  const popupRef = useRef(null); // Ref for the popup
  const navigate = useNavigate();

  const handleValuteClick = () => {
    navigate("/vault", { state: { vaultName: "My Vault", userName: userProfile?.name, vaultBalance: 1000 } });
  };

  const onSuccessLogin = async (res) => {
    const userProfile = res.profileObj;
    console.log("User logged in:", userProfile); // Log userProfile to check contents
    
    // Store user data in the database
    try {
      const response = await axios.post("http://localhost:4000/api/auth/google", {
        googleId: userProfile.googleId,
        email: userProfile.email,
        name: userProfile.name,
        vault: 0,
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
    setShowPopup(false); // Close the popup on logout
  };

  const togglePopup = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
  };

  // Handle click outside of the popup to close it
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the popup
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link to="/" onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""} >
          Home
        </Link>
        <a href="#CollectionZone" onClick={() => setMenu("CollectionZone")} className={menu === "CollectionZone" ? "active" : ""}> Collection Zone </a>
        <a href="#CustomPickup" onClick={() => setMenu("CustomPickup")} className={menu === "CustomPickup" ? "active" : ""}> Custom Pickup </a>
        <a href="#BinRequest" onClick={() => setMenu("BinRequest")} className={menu === "BinRequest" ? "active" : ""}> Bin Request </a>
        <a href="#payment" onClick={() => setMenu("payment")} className={menu === "payment" ? "active" : ""}> Payment </a>
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
                onClick={togglePopup} // Show popup on click
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
                <div className="profile-buttons">
                  <button className="profile-button" onClick={handleValuteClick}>Vault</button>
                  <button className="profile-button">Bins</button>
                </div>
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
