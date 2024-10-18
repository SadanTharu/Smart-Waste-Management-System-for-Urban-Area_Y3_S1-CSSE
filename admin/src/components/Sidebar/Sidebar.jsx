import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/dashboard" className="sidebar-option">
          <img src={assets.dashboard_icon} alt="" />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to="/location" className="sidebar-option">
          <img src={assets.disease_icon} alt="" />
          <p>Disease Management</p>
        </NavLink>
        <NavLink to="/collection" className="sidebar-option">
          <img src={assets.disease_icon} alt="" />
          <p>collection requests</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
