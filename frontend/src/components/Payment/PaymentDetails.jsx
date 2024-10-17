import React, { useState } from 'react';
import axios from 'axios';

const PaymentDetails = () => {
  const [formData, setFormData] = useState({
    residentName: '',
    bankName: '',
    branch: '',
    amount: '',
    date: '',
    images: null,
  });
  
  const [message, setMessage] = useState('');

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, images: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create FormData object to send with file
    const data = new FormData();
    data.append('residentName', formData.residentName);
    data.append('bankName', formData.bankName);
    data.append('branch', formData.branch);
    data.append('amount', formData.amount);
    data.append('date', formData.date);
    data.append('images', formData.images); // Append the file

    try {
      const response = await axios.post('http://localhost:4000/api/payments/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        setMessage('Payment details added successfully');
        setFormData({
          residentName: '',
          bankName: '',
          branch: '',
          amount: '',
          date: '',
          images: null,
        });
      } else {
        setMessage('Error adding payment details');
      }
    } catch (error) {
      console.error('There was an error uploading the payment details!', error);
      setMessage('Error adding payment details');
    }
  };

  return (
    <div className="payment-form">
      <h2>Add Payment Details</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="residentName">Resident Name</label>
          <input
            type="text"
            id="residentName"
            name="residentName"
            value={formData.residentName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bankName">Bank Name</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={formData.bankName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch</label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="images">Upload Receipt</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default PaymentDetails;
