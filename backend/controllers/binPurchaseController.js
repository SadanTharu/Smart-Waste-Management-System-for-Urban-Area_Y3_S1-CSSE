import BinPurchaseModel from '../models/binPurchaseModel.js';

// Function to store bin purchases
const storeBinPurchases = async (req, res) => {
    const { userId, items } = req.body;

    console.log('Received bin purchase request:', { userId, items }); // Log the received data

    try {
        // Check if userId and items are provided
        if (!userId || !items || !Array.isArray(items) || items.length === 0) {
            console.error('Missing required fields: userId or items'); // Log error if fields are missing
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        // Iterate through items to save each bin purchase
        for (const item of items) {
            const binPurchase = new BinPurchaseModel({
                userId: userId,
                binId: item.generatedId, // Assuming you're using generatedId from the checkout
                wasteType: item.wasteType,
                capacity: item.capacity,
                quantity: item.quantity,
                price: item.price,
            });

            console.log('Saving bin purchase details:', binPurchase); // Log purchase details before saving

            await binPurchase.save(); // Save to the database
            console.log('Bin purchase recorded successfully for user:', userId); // Log success message
        }

        res.json({ success: true, message: 'Bin purchases recorded successfully.' });
    } catch (error) {
        console.error('Error storing bin purchases:', error); // Log the error message
        res.status(500).json({ success: false, message: 'An error occurred while storing bin purchases.' });
    }
};

// Export the storeBinPurchases function
export { storeBinPurchases };
