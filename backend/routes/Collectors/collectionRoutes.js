import express from 'express';
import { 
    addCollectionRecord, 
    getAllCollectionRecords, 
    getCollectionRecordById, 
    updateCollectionRecord, 
    deleteCollectionRecord 
} from '../../controllers/Collectors/collectionController.js';


const CollectionRecordRoute = express.Router();

// Route to add a new collection record
CollectionRecordRoute.post('/add', addCollectionRecord);

// Route to get all collection records
CollectionRecordRoute.get('/', getAllCollectionRecords);

// Route to get a collection record by ID
CollectionRecordRoute.get('/:id', getCollectionRecordById);

// Route to update a collection record by ID
CollectionRecordRoute.put('/:id', updateCollectionRecord);

// Route to delete a collection record
CollectionRecordRoute.delete('/:id', deleteCollectionRecord);

export default CollectionRecordRoute;
