import express from 'express';
import { addCollection, collectionList, removeCollection, updateCollection } from '../controllers/collectionController.js';

const collectionRouter = express.Router();

// No image handling needed

collectionRouter.post("/add", addCollection);  // Add new collection (text data only)
collectionRouter.get("/list", collectionList); // Get all collections
collectionRouter.post("/remove", removeCollection); // Remove a collection
collectionRouter.put("/update/:id", updateCollection); // Update a collection (text data only)

export default collectionRouter;
