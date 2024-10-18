import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VerifiedBankDetails = () => {
  const [verifiedDetails, setVerifiedDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerifiedBankDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bankDetails/verified');
        setVerifiedDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching verified bank details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiedBankDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="verified-bankdetails-container">
      <h2>Verified Bank Details</h2>
      <table className="admin-bankdetails-table">
        <thead>
          <tr>
            <th>Resident ID</th>
            <th>Resident Name</th>
            <th>Payment Method</th>
            <th>Bank</th>
            <th>Branch</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {verifiedDetails.length > 0 ? (
            verifiedDetails.map((detail) => (
              <tr key={detail._id}>
                <td>{detail.residentID}</td>
                <td>{detail.residentName}</td>
                <td>{detail.paymentMethod}</td>
                <td>{detail.paymentMethod === 'bank' ? detail.bank : 'N/A'}</td>
                <td>{detail.paymentMethod === 'bank' ? detail.branch : 'N/A'}</td>
                <td>{detail.amount}</td>
                <td>{new Date(detail.date).toLocaleDateString()}</td>
                <td>
                  {detail.receiptUrl ? (
                    <img src={detail.receiptUrl} alt="Receipt" style={{ width: '100px', height: 'auto' }} />
                  ) : (
                    'No Receipt'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No verified bank details found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VerifiedBankDetails;
