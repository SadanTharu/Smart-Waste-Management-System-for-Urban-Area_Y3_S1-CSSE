import GarbageBin from '../models/GarbageBin.js';

const addGarbageBin = async (req, res) => {
    const binimage = req.file.path; // Assuming you're using multer for file uploads

    const newGarbageBin = new GarbageBin({
        wasteType: req.body.wasteType,
        capacity: req.body.capacity,
        binimage,
    });

    try {
        await newGarbageBin.save();
        res.status(201).json({ success: true, message: 'Garbage bin added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to add garbage bin.' });
    }
};

const listGarbageBins = async (req, res, next) => {
    try {
        const bins = await GarbageBin.find({}); // Fetch all garbage bins
        res.json({ success: true, data: bins });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to retrieve garbage bins." });
    }
};

export { addGarbageBin, listGarbageBins };