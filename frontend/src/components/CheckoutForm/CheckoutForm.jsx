import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const CheckoutForm = ({ totalCost }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const { data: clientSecret } = await axios.post('http://localhost:4000/api/payment/create', { totalCost });

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentResult.error) {
        setError(`Payment failed: ${paymentResult.error.message}`);
        setProcessing(false);
      } else if (paymentResult.paymentIntent.status === 'succeeded') {
        history.push('/success');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing}>
        {processing ? 'Processing...' : `Pay $${totalCost}`}
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;
