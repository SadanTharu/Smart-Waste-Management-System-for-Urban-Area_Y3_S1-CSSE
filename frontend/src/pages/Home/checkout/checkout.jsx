import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './checkout.css'; // Import your CSS styling

const CheckoutPage = () => {
  const location = useLocation();
  const { checkoutData } = location.state || {};
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  if (!checkoutData) {
    return <p>No items selected.</p>;
  }

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();

    // Add validation and backend integration for card payment here
    console.log('Payment submitted:', cardDetails);

    alert("Payment successful!"); // You can customize this or navigate to a success page.
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <h2>Total Cost: ${checkoutData.totalCost}</h2>

      <h3>Selected Items:</h3>
      <ul>
        {checkoutData.selectedItems.map((item) => (
          <li key={item.id}>
            {item.wasteType} - {item.capacity}L (x{item.quantity}) - ${item.price * item.quantity}
          </li>
        ))}
      </ul>

      <h3>Enter Card Details:</h3>
      <form onSubmit={handlePayment} className="card-details-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={cardDetails.cardNumber}
            onChange={handleCardInputChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="text"
            id="expirationDate"
            name="expirationDate"
            value={cardDetails.expirationDate}
            onChange={handleCardInputChange}
            placeholder="MM/YY"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cvv">CVV:</label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cardDetails.cvv}
            onChange={handleCardInputChange}
            placeholder="123"
            required
          />
        </div>

        <button type="submit" className="payment-button">Submit Payment</button>
      </form>

      <h3>User Details:</h3>
      <p><strong>Name:</strong> {checkoutData.user?.name}</p>
      <p><strong>Email:</strong> {checkoutData.user?.email}</p>
    </div>
  );
};

export default CheckoutPage;
