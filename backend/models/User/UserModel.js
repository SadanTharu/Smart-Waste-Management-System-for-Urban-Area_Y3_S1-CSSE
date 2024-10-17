import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    wasteBinId: {
        type: String,
        required: true,
        unique: true, 
    },
    residentId: {
        type: String,
        required: true,
        unique: true, 
    },
    userName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v); 
            },
            message: props => `${props.value} is not a valid contact number!`
        }
    },
    email: {
        type: String,
        required: true,
        unique: true, 
        match: /.+\@.+\..+/ 
    },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
