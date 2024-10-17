import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './ViewBankDetails.css';

const ViewBankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bank details from the backend
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bankDetails/list');
        setBankDetails(response.data); // Assuming the response has an array of bank details
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bank details', error);
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="table-container">
      <h2>View Bank Details</h2>
      <table className="details-table">
        <thead>
          <tr>
            <th>Resident ID</th>
            <th>Resident Name</th>
            <th>Bank</th>
            <th>Branch</th>
            <th>Amount</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {bankDetails.map((detail) => (
            <tr key={detail._id}>
              <td>{detail.residentID}</td>
              <td>{detail.residentName}</td>
              <td>{detail.bank}</td>
              <td>{detail.branch}</td>
              <td>{detail.amount}</td>
              <td>
                <img 
                  src={`http://localhost:4000/${detail.images}`} 
                  alt="Receipt" 
                  width="100" 
                  height="100" 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBankDetails;
