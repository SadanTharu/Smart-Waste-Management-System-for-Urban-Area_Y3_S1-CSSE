import React, { useState } from 'react';
import axios from 'axios';
import './MakePayment.css';
import Stripe from 'stripe'



const BankDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState('card'); // To store selected payment method
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

      {paymentMethod === 'bank' && (
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
              <tr>
                <td><label htmlFor="bank" className="payment-form-label">Bank:</label></td>
                <td>
                  <select name="bank" className="payment-form-select" value={formData.bank} onChange={handleChange} required>
                    <option value="">Select Bank</option>
                    <option value="Bank of Ceylon">Bank of Ceylon</option>
                    <option value="People's Bank">People's Bank</option>
                    <option value="Commercial Bank of Ceylon">Commercial Bank of Ceylon</option>
                    <option value="Hatton National Bank">Hatton National Bank</option>
                    <option value="Sampath Bank">Sampath Bank</option>
                    <option value="Union Bank of Colombo">Union Bank of Colombo</option>
                    <option value="DFCC Bank">DFCC Bank</option>
                    <option value="National Development Bank">National Development Bank</option>
                    <option value="Sri Lanka Savings Bank">Sri Lanka Savings Bank</option>
                    <option value="Cargills Bank">Cargills Bank</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="branch" className="payment-form-label">Branch:</label></td>
                <td>
                  <select name="branch" className="payment-form-select" value={formData.branch} onChange={handleChange} required>
                    <option value="">Select Branch</option>
                    <option value="Colombo Fort">Colombo Fort</option>
                    <option value="Kotte">Kotte</option>
                    <option value="Dehiwala">Dehiwala</option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Negombo">Negombo</option>
                    <option value="Moratuwa">Moratuwa</option>
                    <option value="Jaffna">Jaffna</option>
                    <option value="Galle">Galle</option>
                    <option value="Battaramulla">Battaramulla</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><label htmlFor="amount" className="payment-form-label">Amount:</label></td>
                <td><input type="number" name="amount" className="payment-form-input" placeholder="Amount" value={formData.amount} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="images" className="payment-form-label">Upload Receipt:</label></td>
                <td><input type="file" name="images" className="payment-form-file-input" onChange={handleChange} accept="image/*" required /></td>
              </tr>
            </tbody>
          </table>
          <div className="payment-form-button-container">
            <button className="payment-form-btn-submit" type="submit">Submit</button>
            <button className="payment-form-btn-cancel" type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      {paymentMethod === 'card' && (
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
              <tr>
                <td><label htmlFor="cardNumber" className="payment-form-label">Card Number:</label></td>
                <td><input type="text" name="cardNumber" className="payment-form-input" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="cardHolder" className="payment-form-label">Card Holder:</label></td>
                <td><input type="text" name="cardHolder" className="payment-form-input" placeholder="Card Holder Name" value={formData.cardHolder} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="expiryDate" className="payment-form-label">Expiry Date:</label></td>
                <td><input type="text" name="expiryDate" className="payment-form-input" placeholder="MM/YY" value={formData.expiryDate} onChange={handleChange} required /></td>
              </tr>
              <tr>
                <td><label htmlFor="cvv" className="payment-form-label">CVV:</label></td>
                <td><input type="password" name="cvv" className="payment-form-input" placeholder="CVV" value={formData.cvv} onChange={handleChange} required /></td>
              </tr>
            </tbody>
          </table>
          <div className="payment-form-button-container">
            <button className="payment-form-btn-submit" type="submit">Submit</button>
            <button className="payment-form-btn-cancel" type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      )}

      {notification && <p className={`payment-form-notification ${notification.type}`}>{notification.message}</p>}
    </div>
  );
};

export default BankDetails;
