import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs
import axios from 'axios'; // For sending data to the backend
import './checkout.css'; // Import your CSS styling

const CheckoutPage = () => {
  const location = useLocation();
  const { checkoutData } = location.state || {};
  console.log('Checkout data:', checkoutData); // Check the structure of checkoutData

  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  if (!checkoutData) {
    console.warn('No checkout data found.');
    return <p>No items selected.</p>;
  }

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    console.log(`Card detail changed: ${name} = ${value}`);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    console.log('Payment process initiated.');

    // Generate unique IDs for each selected item
    const itemsWithIds = checkoutData.selectedItems.map(item => ({
        ...item,
        generatedId: uuidv4(),  // Generate a unique ID for each item
    }));
    console.log('Items with IDs:', itemsWithIds);

    // Prepare the data to send to the backend
    const paymentData = {
        user: {
            _id: checkoutData.user?.googleId,
            name: checkoutData.user?.name,
            email: checkoutData.user?.email,
        },
        items: itemsWithIds,
        totalCost: checkoutData.totalCost,
    };

    console.log('Payment data prepared for backend:', paymentData);

    try {
        // Send the payment data to the backend to store in the database
        const paymentResponse = await axios.post('http://localhost:4000/api/payments/process', paymentData);
        console.log('Payment response:', paymentResponse.data);

        try {
            const binPurchaseResponse = await axios.post('http://localhost:4000/api/binPurchases/store', {
                userId: checkoutData.user?.googleId,
                items: itemsWithIds
            });
            console.log('Bin purchase response:', binPurchaseResponse.data);

            if (paymentResponse.data.success && binPurchaseResponse.data.success) {
                alert('Payment successful and data saved!');
            } else {
                alert('Payment or bin purchase failed. Please try again.');
                console.error('Payment or bin purchase failed:', paymentResponse.data, binPurchaseResponse.data);
            }
        } catch (binPurchaseError) {
            console.error('Error storing bin purchase:', binPurchaseError);
            alert('An error occurred while storing bin purchase. Please try again.');
        }

    } catch (paymentError) {
        console.error('Error processing payment:', paymentError);
        alert('An error occurred during payment. Please try again.');
    }
  };

  return (
    <div className="checkout-page">
  <h1>Checkout</h1>
  
  <div className="checkout-container">
    {/* Left Side: Selected Items and User Details */}
    <div className="left-side">
      <h2>Total Cost: Rs.{checkoutData.totalCost}</h2>

      <h3>Selected Items:</h3>
      <ul>
        {checkoutData.selectedItems.map((item) => (
          <li key={item.id}>
            {item.wasteType} - {item.capacity}L (x{item.quantity}) - Rs.{item.price * item.quantity}
          </li>
        ))}
      </ul>

      <h3>User Details:</h3>
      <p><strong>Name:</strong> {checkoutData.user?.name}</p>
      <p><strong>Email:</strong> {checkoutData.user?.email}</p>
    </div>

    {/* Right Side: Cart and Payment Form */}
    <div className="right-side">
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
    </div>
  </div>
</div>

  );
};

export default CheckoutPage;
