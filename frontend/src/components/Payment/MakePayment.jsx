import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DiseaseInquiry.css';

const BankDetails = () => {
  const [formData, setFormData] = useState({
    residentID: '',
    residentName: '',
    bank: '',
    branch: '',
    amount: '',
    images: null,
  });

  const [notification, setNotification] = useState(null);
//   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (let key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:4000/api/bankDetails/add", form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setNotification({ message: 'Bank Details Added Successfully', type: 'success' });
        // Reset the form 
        setFormData({
            residentID: '',
            residentName: '',
            bank: '',
            branch: '',
            amount: '',
            images: null,
        });

        // // Navigate to viewDiseaseInquiry page
        // navigate('/viewInquiry');

      } else {
        setNotification({ message: 'Error adding Bank Details', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error adding Bank Details', type: 'error' });
    }
  };

  // Handle form reset when the Cancel button is clicked
  const handleCancel = () => {
    // Reset the form to its initial state
    setFormData({
        residentID: '',
        residentName: '',
        bank: '',
        branch: '',
        amount: '',
        images: null,
    });

    // Optionally, clear any notifications if necessary
    setNotification(null);
  };

  return (
    <div className="form-container1">
      {/* <InquiryHeader /> */}
      <h2 className='header12'>Complete Payment</h2>
      <form method="POST" onSubmit={handleSubmit}>
        <table className='table-container1'>
          <tbody>
            <tr>
              <td><label htmlFor="residentID">Resident ID:</label></td>
              <td><input type="text" name="residentID" placeholder="Resident ID" value={formData.residentID} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="residentName">Resident Name:</label></td>
              <td><input type="text" name="residentName" placeholder="Resident Name" value={formData.emaresidentNameil} onChange={handleChange} required /></td>
            </tr>
            {/* <tr>
              <td><label htmlFor="phone">Phone Number:</label></td>
              <td><input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="inquiryDate">Inquiry Date:</label></td>
              <td><input type="date" name="inquiryDate" placeholder="Inquiry Date" value={formData.inquiryDate} onChange={handleChange} required /></td>
            </tr> */}
            <tr>
              <td><label htmlFor="bank">Bank:</label></td>
              <td>
                <select name="bank" value={formData.bank} onChange={handleChange} required>
                  <option value="">Select Bank</option>
                  <option value="Western">Western</option>
                  <option value="Central">Central</option>
                  <option value="Southern">Southern</option>
                  <option value="Northern">Northern</option>
                  <option value="Eastern">Eastern</option>
                  <option value="North Western">North Western</option>
                  <option value="North Central">North Central</option>
                  <option value="Uva">Uva</option>
                  <option value="Sabaragamuwa">Sabaragamuwa</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="branch">Branch:</label></td>
              <td>
                <select name="branch" value={formData.branch} onChange={handleChange} required>
                  <option value="">Select Branch</option>
                  <option value="Western">Western</option>
                  <option value="Central">Central</option>
                  <option value="Southern">Southern</option>
                  <option value="Northern">Northern</option>
                  <option value="Eastern">Eastern</option>
                  <option value="North Western">North Western</option>
                  <option value="North Central">North Central</option>
                  <option value="Uva">Uva</option>
                  <option value="Sabaragamuwa">Sabaragamuwa</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><label htmlFor="amount">Amount:</label></td>
              <td><input type="number" name="amount" placeholder="Amount" value={formData.amount} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="images">Images:</label></td>
              <td><input type="file" name="images" onChange={handleChange} accept="image/*" required /></td>
            </tr>
          </tbody>
        </table>
        <div className='button-container'>
          <button className='btn-submit' type="submit">Submit </button>

          <button className='btn-cancel' type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
      {notification && <p className={`notification ${notification.type}`}>{notification.message}</p>}
    </div>
  );
};

export default BankDetails;
