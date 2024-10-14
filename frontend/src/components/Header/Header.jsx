import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Rewaste</h2>
        <p>
          we offer convenient service where we collct your waste from
          designaneted remote areas
        </p>
        <button>View Collecting Places</button>
      </div>
    </div>
  );
};

export default Header;
