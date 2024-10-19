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

// Function to update bin status
const updateBinStatus = async (req, res) => {
    const { binId } = req.params; // UUID passed in the URL
    const { status } = req.body; // Expect status to be passed in the request body

    console.log('Updating bin status for bin ID:', binId); // Log the bin ID

    try {
        const updatedBin = await BinPurchaseModel.findOneAndUpdate(
            { binId }, // Use binId to find the document
            { status }, // Update the status
            { new: true } // Return the updated document
        );

        if (!updatedBin) {
            console.log('Bin not found for ID:', binId); // Log if bin not found
            return res.status(404).json({ success: false, message: 'Bin not found' });
        }

        console.log('Bin status updated successfully:', updatedBin); // Log successful update
        res.json({ success: true, data: updatedBin });
    } catch (error) {
        console.error('Error updating bin status:', error); // Log error message
        res.status(500).json({ success: false, message: 'An error occurred while updating bin status.' });
    }
};

const getBinPurchasesByUser = async (req, res) => {
    const { userId } = req.params;

    console.log('Fetching bin purchases for user:', userId); // Log userId

    try {
        // Find bin purchases by userId
        const binPurchases = await BinPurchaseModel.find({ userId });

        if (!binPurchases || binPurchases.length === 0) {
            console.log('No bin purchases found for user:', userId); // Log no purchases found
            return res.status(404).json({ success: false, message: 'No bin purchases found for this user.' });
        }

        console.log('Bin purchases found:', binPurchases); // Log the bin purchases

        res.json({ success: true, binPurchases });
    } catch (error) {
        console.error('Error fetching bin purchases:', error); // Log error message
        res.status(500).json({ success: false, message: 'An error occurred while fetching bin purchases.' });
    }
};

const getFullBins = async (req, res) => {
    try {
        const fullBins = await BinPurchaseModel.find({ status: true }); // Find bins with status true

        if (!fullBins || fullBins.length === 0) {
            return res.status(404).json({ success: false, message: 'No full bins found.' });
        }

        res.json({ success: true, fullBins });
    } catch (error) {
        console.error('Error fetching full bins:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching full bins.' });
    }
};

const setBinStatusToFalse = async (req, res) => {
    const { binId } = req.params; // Get bin ID from URL params
    const { status } = req.body; // Get status from request body (should be false)

    try {
        const updatedBin = await BinPurchaseModel.findOneAndUpdate(
            { binId }, // Search for the bin by binId
            { status: false }, // Update status to false
            { new: true } // Return the updated document
        );

        if (!updatedBin) {
            return res.status(404).json({ success: false, message: 'Bin not found.' });
        }

        res.json({ success: true, message: 'Bin status updated to false successfully.' });
    } catch (error) {
        console.error('Error updating bin status:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating bin status.' });
    }
};

// Export the storeBinPurchases function
export { storeBinPurchases, getBinPurchasesByUser, updateBinStatus, getFullBins, setBinStatusToFalse };
