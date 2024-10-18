import React, { useState } from 'react';
import axios from 'axios';
import './MakePayment.css';

const BankDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // Default payment method
  const [formData, setFormData] = useState({
    residentID: '',
    residentName: '',
    bank: '',
    branch: '',
    amount: '',
    images: null,
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const [notification, setNotification] = useState(null);

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
    form.append('paymentMethod', paymentMethod);
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
        setNotification({ message: 'Payment Submitted Successfully', type: 'success' });
        setFormData({
          residentID: '',
          residentName: '',
          bank: '',
          branch: '',
          amount: '',
          images: null,
          cardNumber: '',
          cardHolder: '',
          expiryDate: '',
          cvv: ''
        });
      } else {
        setNotification({ message: 'Error submitting payment', type: 'error' });
      }
    } catch (error) {
      setNotification({ message: 'Error submitting payment', type: 'error' });
    }
  };

  const handleCancel = () => {
    setFormData({
      residentID: '',
      residentName: '',
      bank: '',
      branch: '',
      amount: '',
      images: null,
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
    setNotification(null);
    setPaymentMethod(''); // Reset payment method
  };

  return (
    <div className="payment-form-container">
      <h2 className="payment-form-header">Select Payment Method</h2>
      
      <div className="payment-method-buttons">
        <button className={`payment-method-btn ${paymentMethod === 'card' ? 'active' : ''}`} 
          onClick={() => setPaymentMethod('card')}>
          Card Payment
        </button>
        <button className={`payment-method-btn ${paymentMethod === 'bank' ? 'active' : ''}`} 
          onClick={() => setPaymentMethod('bank')}>
          Bank Transfer
        </button>
      </div>

      <form method="POST" onSubmit={handleSubmit}>
        <table className="payment-form-table">
          <tbody>
            <tr>
              <td><label htmlFor="residentID" className="payment-form-label">Resident ID:</label></td>
              <td><input type="text" name="residentID" className="payment-form-input" placeholder="Resident ID" value={formData.residentID} onChange={handleChange} required /></td>
            </tr>
            <tr>
              <td><label htmlFor="residentName" className="payment-form-label">Resident Name:</label></td>
              <td><input type="text" name="residentName" className="payment-form-input" placeholder="Resident Name" value={formData.residentName} onChange={handleChange} required /></td>
            </tr>

            {paymentMethod === 'bank' && (
              <>
                <tr>
                  <td><label htmlFor="bank" className="payment-form-label">Bank:</label></td>
                  <td><input type="text" name="bank" className="payment-form-input" placeholder="Bank Name" value={formData.bank} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="branch" className="payment-form-label">Branch:</label></td>
                  <td><input type="text" name="branch" className="payment-form-input" placeholder="Branch" value={formData.branch} onChange={handleChange} required /></td>
                </tr>
              </>
            )}

            <tr>
              <td><label htmlFor="amount" className="payment-form-label">Amount:</label></td>
              <td><input type="number" name="amount" className="payment-form-input" placeholder="Amount" value={formData.amount} onChange={handleChange} required /></td>
            </tr>

            {paymentMethod === 'bank' && (
              <tr>
                <td><label htmlFor="images" className="payment-form-label">Upload Receipt:</label></td>
                <td><input type="file" name="images" className="payment-form-input" onChange={handleChange} required /></td>
              </tr>
            )}

            {paymentMethod === 'card' && (
              <>
                <tr>
                  <td><label htmlFor="cardNumber" className="payment-form-label">Card Number:</label></td>
                  <td><input type="text" name="cardNumber" className="payment-form-input" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="cardHolder" className="payment-form-label">Card Holder:</label></td>
                  <td><input type="text" name="cardHolder" className="payment-form-input" placeholder="Card Holder" value={formData.cardHolder} onChange={handleChange} required /></td>
                </tr>
                <tr>
                  <td><label htmlFor="cvv" className="payment-form-label">CVV:</label></td>
                  <td><input type="text" name="cvv" className="payment-form-input" placeholder="CVV" value={formData.cvv} onChange={handleChange} required /></td>
                </tr>
              </>
            )}
          </tbody>
        </table>

        <div className="payment-form-actions">
          <button type="submit" className="payment-form-button">Submit Payment</button>
          <button type="button" className="payment-form-button cancel-button" onClick={handleCancel}>Cancel</button>
        </div>

        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default BankDetails;
