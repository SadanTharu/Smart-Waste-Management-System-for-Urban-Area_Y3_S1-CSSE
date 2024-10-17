import UserModel from '../../models/User/UserModel.js';

//function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /.+\@.+\..+/;
    return emailRegex.test(email);
};

//  function to validate contact number format
const isValidContactNumber = (contactNo) => {
    return /^\d{10}$/.test(contactNo);
};

// Create a new user
const createUser = async (req, res) => {
    const {wasteBinId, residentId, userName, address, contactNo, email } = req.body;

    //  validations
    if (!wasteBinId||!residentId || !userName || !address || !contactNo || !email) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!isValidContactNumber(contactNo)) {
        return res.status(400).json({ error: 'Invalid contact number format' });
    }

    try {
        const existingUser = await UserModel.findOne({ $or: [{ residentId }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Resident ID or Email already exists' });
        }

        const newUser = new UserModel(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a user by residentId
const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findOne({ residentId: req.params.residentId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
const updateUser = async (req, res) => {
    const { userName, address, contactNo, email } = req.body;

    //  validations
    if (!userName || !address || !contactNo || !email) {
        return res.status(400).json({ error: 'All fields are required for updating' });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!isValidContactNumber(contactNo)) {
        return res.status(400).json({ error: 'Invalid contact number format' });
    }

    try {
        const user = await UserModel.findOneAndUpdate(
            { residentId: req.params.residentId },
            req.body,
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const user = await UserModel.findOneAndDelete({ residentId: req.params.residentId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get a user by wasteBinId
const getUserByWasteBinId = async (req, res) => {
    try {
        const user = await UserModel.findOne({ wasteBinId: req.params.wasteBinId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser, getUserByWasteBinId };
