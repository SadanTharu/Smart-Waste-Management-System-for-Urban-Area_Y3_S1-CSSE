import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './CollectionRecordDashboard.css'; // Import CSS for styling

const CollectionRecordDashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle button click
  const handleViewAllRecords = () => {
    navigate('/ViewAllRecords');
  };

  const handleViewWasteIssues = () => {
    navigate('/IssueView'); 
  };
  const handleResidentList = () => {
    navigate('/UserList'); 
  };
  const handleResident = () => {
    navigate('/AddNewUser'); 
  };

  return (
    <div className="dashboard-container">
   <div className='content'>
   <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="button-container">
        <button onClick={handleViewAllRecords} className="dashboard-button">
          View All Collection Records
        </button>
        <button onClick={handleViewWasteIssues} className="dashboard-button">
          View All Waste Issues
        </button>
        <button onClick={handleResidentList} className="dashboard-button">
          Resident List
        </button>
        <button onClick={handleResident} className="dashboard-button">
          Add Resident
        </button>
      </div> 
   </div>
    </div>
  );
};

export default CollectionRecordDashboard;
