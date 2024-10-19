import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { StoreContext } from "../../context/StoreContext"; // Import your context
import "./Header.css";

const Header = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const { userProfile } = useContext(StoreContext); // Access user profile from context

  const handleButtonClick = () => {
    if (!userProfile || !userProfile.googleId) {
      // If user is not logged in, navigate to the login page
      navigate('/'); // Adjust the path as necessary
    } else {
      // If user is logged in, navigate to the available bins route
      navigate('/available-bins');
    }
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Rewaste</h2>
        <p>
          We offer convenient service where we collect your waste from designated remote areas.
        </p>
        <button onClick={handleButtonClick}>Request to clear bins</button>
      </div>
    </div>
  );
};

export default Header;
