import React from "react";
import { Link } from "react-router-dom";
import "./Location.css";
import { assets } from "../../assets/assets";

const Location = () => {
  return (
    <div className="disease-container-main">
      <div className="diseasetopiccontainner-main">
        <h1>Location Management</h1>
      </div>
      <div className="diseasetopiccontainner-2-main">
        <div className="disease-actions-main">
          <Link to="/addlocation" className="disease-action-main">
            <img src={assets.addDisease} alt="" />

            <p>Add New Location</p>
          </Link>
          <Link to="/list" className="disease-action-main">
            <img src={assets.viewAdded} alt="" />

            <p>View Added Location</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Location;
