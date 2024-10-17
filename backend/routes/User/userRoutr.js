import express from 'express';
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserByWasteBinId,
} from '../../controllers/User/userController.js';

const IssueForAdminrouter = express.Router();

// Create a new user
IssueForAdminrouter.post('/user', createUser); 

// Get all users
IssueForAdminrouter.get('/user', getAllUsers); 

// Get a user by residentId
IssueForAdminrouter.get('/user/:residentId', getUserById); 

// Update a user
IssueForAdminrouter.put('/user/:residentId', updateUser); 

// Delete a user
IssueForAdminrouter.delete('/user/:residentId', deleteUser);

//get User By WasteBinId
IssueForAdminrouter.get('/user/:wasteBinId', getUserByWasteBinId);

export default IssueForAdminrouter;
