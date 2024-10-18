import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [method, setMethod] = useState('Card');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    residentID: '',
    residentName: '',
    amount: '',
    paymentMethod: 'Bank Transfer',
    payment: false,
    date: Date.now(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment Details:', formData);
  };

  const handleProceed = () => {
    navigate('/bankDetails', { state: { amount: formData.amount } });
  };

  return (
    <div className="payment-form-container">
      <h2 className="payment-form-header">Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="residentID">Resident ID:</label>
          <input
            type="text"
            name="residentID"
            value={formData.residentID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="residentName">Resident Name:</label>
          <input
            type="text"
            name="residentName"
            value={formData.residentName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Card Payment">Card Payment</option>
          </select>
        </div>
        <div>
          <p>Select Payment Method:</p>
          <div>
            <label>
              <input
                type="radio"
                value="Card"
                checked={method === 'Card'}
                onChange={() => setMethod('Card')}
              />
              Card Payment
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="Bank"
                checked={method === 'Bank'}
                onChange={() => setMethod('Bank')}
              />
              Bank Transfer
            </label>
          </div>
          <div className="navigate-payment">
            <button type="button" className="btn-navigate-payment" onClick={handleProceed}>
              Next
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Payment;
