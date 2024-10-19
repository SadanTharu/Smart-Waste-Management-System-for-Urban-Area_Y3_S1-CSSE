import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CalPayment.css';

const CalPayment = () => {
    const [paymentOption, setPaymentOption] = useState('');
    const [weight, setWeight] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    const handleWeightChange = (e) => {
        const value = e.target.value;
        setWeight(value);
    };

    const handlePaymentOptionClick = (option) => {
        setPaymentOption(option);
        setTotalAmount(option === 'flatBased' ? 5000 : 0); // Automatically set flat payment for the month or reset
    };

    const calculatePayment = () => {
        if (paymentOption === 'weightBased') {
            const parsedWeight = parseFloat(weight); // Parse weight to number
            if (parsedWeight >= 0) {
                setTotalAmount(parsedWeight * 300); // 300 rupees per kg
            } else {
                alert("Please enter a valid weight");
            }
        }
    };

    const handleProceed = () => {
        if (totalAmount > 0) {
            navigate('/pay', { state: { amount: totalAmount } });
        } else {
            alert("Please calculate the total amount before proceeding.");
        }
    };

    return (
        <div className="payment-section-container">
            <h2 className="payment-title">Select Payment Option</h2>

            <div className="payment-option-buttons">
                <button 
                    className="btn-weight-based" 
                    onClick={() => handlePaymentOptionClick('weightBased')}
                >
                    Weight-based
                </button>
                <button 
                    className="btn-flat-based" 
                    onClick={() => handlePaymentOptionClick('flatBased')}
                >
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
