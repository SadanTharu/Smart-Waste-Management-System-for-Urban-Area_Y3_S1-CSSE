import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/addlocation" className="sidebar-option">
          <img src={assets.disease_icon} alt="" />
          <p>add location</p>
        </NavLink>
        <NavLink to="/list" className="sidebar-option">
          <img src={assets.disease_icon} alt="" />
          <p>added location list</p>
        </NavLink>
        <NavLink to="/collection" className="sidebar-option">
          <img src={assets.disease_icon} alt="" />
          <p>collection requests</p>
        </NavLink>
        <NavLink to="/bins" className="sidebar-option">
          <img src={assets.disease_icon} alt="" />
          <p>Bins Types</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
