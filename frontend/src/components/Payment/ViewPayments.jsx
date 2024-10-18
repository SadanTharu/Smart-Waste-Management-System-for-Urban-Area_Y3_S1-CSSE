import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// import './ViewBankDetails.css';

const ViewBankDetails = () => {
  const [bankDetails, setBankDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('bank'); // Default to 'bank'

  // Fetch bank details from the API
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

  // Filter bank details based on the search query, date range, and payment method
  const filteredDetails = bankDetails.filter((detail) => {
    const matchesSearch = detail.residentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate =
      (!startDate || new Date(detail.date).toLocaleDateString() >= new Date(startDate)) &&
      (!endDate || new Date(detail.date).toLocaleDateString() <= new Date(endDate));
    const matchesPaymentMethod = detail.paymentMethod === paymentMethod;

    return matchesSearch && matchesDate && matchesPaymentMethod;
  });

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setStartDate('');
    setEndDate('');
    setPaymentMethod('bank'); // Reset payment method
  };

  // Delete bank detail handler
  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost:4000/api/bankDetails/remove', { id });
      setBankDetails(bankDetails.filter((detail) => detail._id !== id));
    } catch (error) {
      console.error('Error deleting bank detail:', error);
    }
  };

  // Report generation
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Bank Details Report', 14, 20);

    const tableData = filteredDetails.map((detail) => [
      detail.residentID,
      detail.residentName,
      detail.paymentMethod === 'bank' ? detail.bank : 'N/A',
      detail.paymentMethod === 'bank' ? detail.branch : 'N/A',
      detail.amount,
      new Date(detail.date).toLocaleDateString(),
    ]);

    doc.autoTable({
      head: [['Resident ID', 'Resident Name', 'Bank', 'Branch', 'Amount', 'Date']],
      body: tableData,
      startY: 30,
      theme: 'grid',
      headStyles: { fillColor: [45, 106, 79] },
    });

    doc.save('Bank_Details_Report.pdf');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-bankdetails-container">
      <h2 className="header45">View Bank Details</h2>

      <div className="payment-method-buttons">
        <button className={`payment-method-btn ${paymentMethod === 'bank' ? 'active' : ''}`} 
          onClick={() => setPaymentMethod('bank')}>
          Bank Transfers
        </button>
        <button className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`} 
          onClick={() => setPaymentMethod('card')}>
          Card Payments
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by Resident Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <div className="filter-container">
        <div className="date-filter">
          <label>Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="date-filter">
          <label>End Date:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="clear_btn">
          <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
      </div>

      <button onClick={generatePDF} className="print-button">Print Bank Details</button>

      <div className="bankdetails-grid">
        {filteredDetails.length > 0 ? (
          filteredDetails.map((detail) => (
            <div key={detail._id} className="bankdetails-card">
              <div className="bankdetails-details">
                <h3>{detail.residentName}</h3>
                <p><strong>Resident ID:</strong> {detail.residentID}</p>
                {paymentMethod === 'bank' ? (
                  <>
                    <p><strong>Bank:</strong> {detail.bank}</p>
                    <p><strong>Branch:</strong> {detail.branch}</p>
                    <p><strong>Amount:</strong> {detail.amount}</p>
                    {detail.receiptUrl && (
                      <p>
                        <strong>Upload Receipt:</strong>
                        <img src={detail.receiptUrl} alt="Receipt" style={{ width: '100px', height: 'auto' }} />
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p><strong>Amount:</strong> {detail.amount}</p>
                    <p><strong>Card Holder:</strong> {detail.cardHolder}</p>
                  </>
                )}
                <p><strong>Date:</strong> {new Date(detail.date).toLocaleDateString()}</p>
              </div>
              <div className="bankdetails-actions">
                <button className="button98" onClick={() => handleDelete(detail._id)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <p>No bank details found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewBankDetails;
