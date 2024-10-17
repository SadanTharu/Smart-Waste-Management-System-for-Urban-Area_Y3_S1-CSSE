import CollectionRecordModel from "../../models/Collectors/CollectionRecordModel.js";

// Add a new collection record
const addCollectionRecord = async (req, res) => {
    const { staffID, collectorName, binID, wasteType, weight } = req.body;

    try {
        const newRecord = new CollectionRecordModel({
            staffID,
            collectorName,
            binID,
            wasteType,
            weight,
        });

        const savedRecord = await newRecord.save();
        savedRecord.weight = `${savedRecord.weight} KG`;
        res.status(201).json(savedRecord);
    } catch (error) {
        res.status(400).json({ error: 'Error adding collection record: ' + error.message });
    }
};

// Get all collection records
const getAllCollectionRecords = async (req, res) => {
    try {
        const records = await CollectionRecordModel.find();
        const recordsWithWeight = records.map(record => ({
            ...record.toObject(),
            weight: `${record.weight} KG`
        }));
        res.status(200).json(recordsWithWeight);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a collection record by ID
const getCollectionRecordById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const record = await CollectionRecordModel.findById(id);
        
        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        record.weight = `${record.weight} KG`;
        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a collection record by ID
const updateCollectionRecord = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedRecord = await CollectionRecordModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedRecord) {
            return res.status(404).json({ error: 'Record not found' });
        }

        updatedRecord.weight = `${updatedRecord.weight} KG`;
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a collection record by ID
const deleteCollectionRecord = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRecord = await CollectionRecordModel.findByIdAndDelete(id);

        if (!deletedRecord) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { addCollectionRecord, getAllCollectionRecords, getCollectionRecordById, updateCollectionRecord, deleteCollectionRecord };
