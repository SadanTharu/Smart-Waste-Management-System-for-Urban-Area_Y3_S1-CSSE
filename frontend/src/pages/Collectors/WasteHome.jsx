import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './WasteHome.css'; 

const WasteHome = () => {
  const navigate = useNavigate(); 

  
  const handleViewAllRecords = () => {
    navigate('/addnewwastecollection'); 
  };

  const handleViewWasteIssues = () => {
    navigate('/DisplayCollectionRecords'); 
  };
  const handleResidentList = () => {
    navigate('/ReportIssues'); 
  };
  const handleResident = () => {
    navigate('/IssueList'); 
  };

  return (
    <div className="dashboard-container">
   <div className='content'>
   <h2 className="dashboard-title">Waste Collection</h2>
      <div className="button-container">
        <button onClick={handleViewAllRecords} className="dashboard-button">
          Add New Collection Record
        </button>
        <button onClick={handleViewWasteIssues} className="dashboard-button">
          View All Collection Record
        </button>
        <button onClick={handleResidentList} className="dashboard-button">
          Add New Issue
        </button>
        <button onClick={handleResident} className="dashboard-button">
          View All Issues
        </button>
      </div> 
   </div>
    </div>
  );
};

export default WasteHome;
