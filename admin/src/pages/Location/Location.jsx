import React from "react";
import { Link } from "react-router-dom";
import "./Location.css";
import { assets } from "../../assets/assets";

const Location = () => {
  return (
    <div className="location-container-main">
      <div className="locationtopiccontainner-main">
        <h1>Location Management</h1>
      </div>
      <div className="locationtopiccontainner-2-main">
        <div className="location-actions-main">
          <Link to="/addlocation" className="location-action-main">
            <img src={assets.addDisease} alt="" />

            <p>Add New Location</p>
          </Link>
          <Link to="/list" className="location-action-main">
            <img src={assets.viewAdded} alt="" />

            <p>View Added Location</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Location;
