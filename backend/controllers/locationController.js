import locationModel from '../models/locationModel.js';
import fs from 'fs';
//add location 
const addLocation = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const location = new locationModel({
        locationName: req.body.locationName,
        wasteType: req.body.wasteType,
        openTime: req.body.openTime,
        address: req.body.address,
        image: image_filename
    });

    try {
        await location.save();
        res.json({ success: true, message: "Location added successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding location" });
    }
};


//all location lists
const locationList = async (req, res) => {
    try {
        const locations = await locationModel.find({});
        res.json({ success: true, data: locations });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error fetching locations" });
    }
};


//remove location 
const removeLocation = async (req, res) => {
    try {
        const location = await locationModel.findById(req.body.id);
        fs.unlink(`uploads/${location.image}`, () => {});  // Remove image file from uploads folder
        await locationModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Location removed successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing location" });
    }
};


// Update location
const updateLocation = async (req, res) => {
    const id = req.params.id;
    const { locationName, wasteType, openTime, address } = req.body;
    let image = req.file ? req.file.filename : req.body.image;

    try {
        const updatedLocation = await locationModel.findByIdAndUpdate(
            id,
            { locationName, wasteType, openTime, address, image },
            { new: true }
        );

        if (!updatedLocation) {
            return res.status(404).json({ success: false, message: "Location not found" });
        }

        res.json({ success: true, data: updatedLocation });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating location" });
    }
};



export {addLocation,locationList,removeLocation,updateLocation}