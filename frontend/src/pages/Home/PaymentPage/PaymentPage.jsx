import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe('your-public-key-here');

const PaymentPage = ({ location }) => {
  const totalCost = location.state.totalCost;

  return (
    <div>
      <h1>Complete Your Payment</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm totalCost={totalCost} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
