import React from 'react';
import { Link } from 'react-router-dom';
import './TreatmentDashboard.css'; // Import the CSS file

const TreatmentDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-background">
        <div className="dashboard-content">
          <h1 className="dashboard-title">
            Welcome <br/> CROPSHIED ADMIN PANEL
          </h1>
          <div className="dashboard-links">
            <Link to="/AddNewRemedies" className="dashboard-link">
              Add New Remedy
            </Link>
            <Link to="/RemedyList" className="dashboard-link">
              Remedy Collection
            </Link>
            {/* Add more links or buttons here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentDashboard;
