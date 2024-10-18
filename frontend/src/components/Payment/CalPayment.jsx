import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalPayment.css';

const CalPayment = () => {
    const [paymentOption, setPaymentOption] = useState('');
    const [weight, setWeight] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    const handleWeightBasedClick = () => {
        setPaymentOption('weightBased');
        setTotalAmount(0); // Reset total amount for weight-based option
    };

    const handleFlatBasedClick = () => {
        setPaymentOption('flatBased');
        setTotalAmount(5000); // Automatically set flat payment for the month
    };

    const calculatePayment = () => {
        if (paymentOption === 'weightBased') {
            const calculatedAmount = weight * 300; // 300 rupees per kg
            setTotalAmount(calculatedAmount);
        }
    };

    const handleProceed = () => {
        // Navigate to the BankDetails page and pass the total amount
        navigate('/payment', { state: { amount: totalAmount } });
    };

    return (
        <div className="payment-section-container">
            <h2 className="payment-title">Select Payment Option</h2>

            <div className="payment-option-buttons">
                <button className="btn-weight-based" onClick={handleWeightBasedClick}>
                    Weight-based
                </button>
                <button className="btn-flat-based" onClick={handleFlatBasedClick}>
                    Flat-based
                </button>
            </div>

            {paymentOption === 'weightBased' && (
                <div className="weight-input-section">
                    <label htmlFor="weight" className="weight-label">Enter weight (in kg):</label>
                    <input
                        type="number"
                        id="weight"
                        className="weight-input-field"
                        value={weight}
                        onChange={handleWeightChange}
                        placeholder="Enter weight"
                    />
                </div>
            )}

            {paymentOption === 'weightBased' && (
                <div className="calculate-button-section">
                    <button className="btn-calculate" onClick={calculatePayment}>
                        Calculate Payment
                    </button>
                </div>
            )}

            <div className="total-amount-display">
                {totalAmount > 0 && <p className="total-amount-text">Total Amount: {totalAmount} rupees</p>}
            </div>

            <div className="proceed-button-section">
                <button className="btn-proceed" onClick={handleProceed} disabled={totalAmount === 0}>
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
};

export default CalPayment;
