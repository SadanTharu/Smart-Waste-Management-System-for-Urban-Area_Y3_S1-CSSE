import collectionModel from '../models/collectionRequestModel.js';
import fs from 'fs';
//add collection 
const addCollection = async (req, res) => {

    const collection = new collectionModel({
        name: req.body.name,
        wasteType: req.body.wasteType,
        date: req.body.date,
        address: req.body.address,
        reason: req.body.reason,
        userId: req.body.userId, // Store the userId with the request

    })

    try {
        await collection.save();
        res.json({ success: true, message: "collection added successfully" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding collection" })
    }
}


//all collection lists
const collectionList = async (req, res) => {
    try {
        const collection = await collectionModel.find({});
        res.json({ success: true, data: collection })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching collection" })
    }
}


//remove collection 
const removeCollection = async (req, res) => {
    try {
        const collection = await collectionModel.findById(req.body.id);
        await collectionModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "collection removed successfully" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing collection" })
    }
}


// Update collection (text-only)
const updateCollection = async (req, res) => {
    const id = req.params.id;
    const { name, wasteType, date, address, reason } = req.body; // Only text fields

    try {
        const updatedCollection = await collectionModel.findByIdAndUpdate(
            id,
            { name, wasteType, date, address, reason },
            { new: true } // Return the updated document
        );

        if (!updatedCollection) {
            return res.status(404).json({ success: false, message: "Collection not found" });
        }

        res.json({ success: true, data: updatedCollection });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating collection" });
    }
};

// Fetch all collections for a specific user
const collectionListByUser = async (req, res) => {
    try {
        const collection = await collectionModel.find({ userId: req.params.userId });
        res.json({ success: true, data: collection });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching collection" });
    }
};
// Update acceptance status of collection
const updateAcceptanceStatus = async (req, res) => {
    const { id, isAccepted } = req.body; // Receive collection ID and the status

    try {
        const updatedCollection = await collectionModel.findByIdAndUpdate(
            id,
            { isAccepted },
            { new: true } // Return the updated document
        );

        if (!updatedCollection) {
            return res.status(404).json({ success: false, message: "Collection not found" });
        }

        res.json({ success: true, data: updatedCollection });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating acceptance status" });
    }
};


export { addCollection, collectionList, removeCollection, updateCollection,collectionListByUser,updateAcceptanceStatus }