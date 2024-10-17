import mongoose from 'mongoose';

const collectionRecordSchema = new mongoose.Schema({
    staffID: {
        type: String,
        required: true,
    },
    collectorName: {
        type: String,
        required: true,
    },
    binID: {
        type: String,
        required: true,
    },
    wasteType: {
        type: String,
        required: true,
    },
    weight: {
        type: Number, 
        required: true,
    },
}, { timestamps: true });

const CollectionRecordModel = mongoose.model('CollectionRecord', collectionRecordSchema);

export default CollectionRecordModel;
