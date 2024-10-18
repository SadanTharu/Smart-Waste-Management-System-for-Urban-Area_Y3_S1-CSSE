import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './payment.css';

const AdminBankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [showVerified, setShowVerified] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/bankDetails/list');
        setBankDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching bank details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBankDetails();
  }, []);

  const handleVerify = async (id) => {
    try {
      await axios.post('http://localhost:4000/api/bankDetails/verify', { id });
      setBankDetails(bankDetails.map(detail => 
        detail._id === id ? { ...detail, verified: true } : detail
      ));
      setNotification('Bank detail verified successfully!');
      setTimeout(() => setNotification(''), 3000);
    } catch (error) {
      console.error('Error verifying bank detail:', error);
      setNotification('Error verifying bank detail.');
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const filteredDetails = bankDetails.filter((detail) => {
    const matchesSearch = detail.residentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      (!startDate || new Date(detail.date).toLocaleDateString() >= new Date(startDate)) &&
      (!endDate || new Date(detail.date).toLocaleDateString() <= new Date(endDate));
    const matchesPaymentMethod = detail.paymentMethod === paymentMethod;
    const matchesVerifiedStatus = showVerified ? detail.verified : !detail.verified;

    return matchesSearch && matchesDate && matchesPaymentMethod && matchesVerifiedStatus;
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-bankdetails-container">
      <h2 className="admin-bankdetails-header">Admin View - Bank Details</h2>

      {notification && <div className="admin-bankdetails-notification">{notification}</div>}

      <div className="admin-bankdetails-buttons">
        <button className={`admin-bankdetails-btn ${paymentMethod === 'bank' ? 'active' : ''}`} onClick={() => setPaymentMethod('bank')}>
          Bank Transfers
        </button>
        <button className={`admin-bankdetails-btn ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
          Card Payments
        </button>
        <button className={`admin-bankdetails-btn ${showVerified ? 'active' : ''}`} onClick={() => setShowVerified(!showVerified)}>
          {showVerified ? 'Show Unverified' : 'Show Verified'}
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by Resident Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="admin-bankdetails-search-input"
      />

      <div className="admin-bankdetails-filter-container">
        <div className="admin-bankdetails-date-filter">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="admin-bankdetails-date-input" />
        </div>
        <div className="admin-bankdetails-date-filter">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="admin-bankdetails-date-input" />
        </div>
      </div>

      <table className="admin-bankdetails-table">
        <thead>
          <tr>
            <th>Resident ID</th>
            <th>Resident Name</th>
            <th>Payment Method</th>
            <th>Bank</th>
            <th>Branch</th>
            <th>Amount</th>
            <th>Receipt</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.length > 0 ? (
            filteredDetails.map((detail) => (
              <tr key={detail._id}>
                <td>{detail.residentID}</td>
                <td>{detail.residentName}</td>
                <td>{detail.paymentMethod}</td>
                <td>{detail.paymentMethod === 'bank' ? detail.bank : 'N/A'}</td>
                <td>{detail.paymentMethod === 'bank' ? detail.branch : 'N/A'}</td>
                <td>{detail.amount}</td>
                <td>
                  {detail.receiptUrl ? (
                    <img src={detail.receiptUrl} alt="Receipt" className="admin-bankdetails-receipt" />
                  ) : (
                    'No Receipt'
                  )}
                </td>
                <td>
                  {!detail.verified ? (
                    <button className="admin-bankdetails-verify-button" onClick={() => handleVerify(detail._id)}>Verify</button>
                  ) : (
                    'Verified'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No bank details found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBankDetails;
