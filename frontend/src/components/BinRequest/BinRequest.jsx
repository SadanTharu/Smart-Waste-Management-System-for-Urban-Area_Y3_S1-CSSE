import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import "./BinRequest.css";

// Initialize Stripe
const stripePromise = loadStripe('your-publishable-key-here'); // Replace with your Stripe publishable key

const BinRequest = ({ url }) => {
  const [bins, setBins] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/garbagebin/list'); // Adjust the URL according to your backend API
        if (response.data.success) {
          setBins(response.data.data);
          
          // Console log the binimage paths
          response.data.data.forEach(bin => console.log(bin.binimage));

          const initialQuantities = response.data.data.reduce((acc, bin) => {
            acc[bin._id] = 0; // Initialize quantity to 0 for each bin
            return acc;
          }, {});
          setQuantities(initialQuantities);
        } else {
          console.error('Failed to fetch bins:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching bins:', error);
      }
    };

    fetchBins();
  }, []);

  const handleQuantityChange = (id, change) => {
    const newQuantity = quantities[id] + change;
    if (newQuantity >= 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }));
    }
  };

  useEffect(() => {
    // Calculate total cost whenever quantities change
    const newTotalCost = bins.reduce((acc, bin) => {
      return acc + (bin.price * quantities[bin._id]); // Calculate price * quantity
    }, 0);
    setTotalCost(newTotalCost);
  }, [quantities, bins]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/checkout', {
        items: bins.map((bin) => ({
          id: bin._id,
          quantity: quantities[bin._id],
          price: bin.price,
        })),
        totalCost
      });

      const { sessionId } = response.data;
      const stripe = await stripePromise;

      // Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div className="bin-request" id='BinRequest'>
      <h1>Available Garbage Bins for Purchase</h1>
      {bins.length > 0 ? (
        <ul>
          {bins.map((bin) => (
            <li key={bin._id}>
              <h2>{bin.wasteType}</h2>
              <p>Capacity: {bin.capacity}L</p>
              <img src={`http://localhost:4000/${bin.binimage}`} className='imagepromoList' alt="Garbage Bin"/>
              
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(bin._id, -1)}>-</button>
                <span>{quantities[bin._id]}</span>
                <button onClick={() => handleQuantityChange(bin._id, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No garbage bins available for purchase at the moment.</p>
      )}
      <h3>Total Cost: ${totalCost}</h3> {/* Display total cost */}

      <button onClick={handleCheckout} className="checkout-button">
        Proceed to Payment
      </button> {/* Payment Button */}
    </div>
  );
};

export default BinRequest;
