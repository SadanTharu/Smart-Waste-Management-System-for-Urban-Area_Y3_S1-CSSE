import Garbage from '../models/garbageModel.js';

// Function to store garbage details
const storeGarbageDetails = async (req, res) => {
    const { binId, weight, costPerKg } = req.body;

    console.log('Received garbage details:', { binId, weight, costPerKg });

    try {
        if (!binId || weight === undefined || costPerKg === undefined) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        const totalCost = weight * costPerKg; // Calculate total cost

        const garbage = new Garbage({
            binId,
            weight,
            costPerKg,
            totalCost,
        });

        await garbage.save();
        res.json({ success: true, message: 'Garbage details recorded successfully.' });
    } catch (error) {
        console.error('Error storing garbage details:', error);
        res.status(500).json({ success: false, message: 'An error occurred while storing garbage details.' });
    }
};

// Export the function
export { storeGarbageDetails };
