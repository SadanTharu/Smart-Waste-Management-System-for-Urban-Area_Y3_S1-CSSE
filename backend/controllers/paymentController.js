import PaymentModel from '../models/paymentModel.js';

// Handle payment and store payment details
const processPayment = async (req, res) => {
    const { user, totalCost } = req.body;

    console.log('Received payment request:', { user, totalCost }); // Log the received data

    try {
        // Check if user and totalCost are provided
        if (!user || !user._id || !totalCost) {
            console.error('Missing required fields: user or totalCost'); // Log error if fields are missing
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        // Store payment details
        const payment = new PaymentModel({
            userId: user._id,
            paidAmount: totalCost,
        });

        console.log('Saving payment details:', payment); // Log payment details before saving

        await payment.save();

        console.log('Payment recorded successfully for user:', user._id); // Log success message
        res.json({ success: true, message: 'Payment recorded successfully.' });
    } catch (error) {
        console.error('Error processing payment:', error); // Log the error message
        res.status(500).json({ success: false, message: 'An error occurred while processing the payment.' });
    }
};

// Export the processPayment function
export { processPayment };
