import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Export the model, ensuring it handles existing models correctly
const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
export default UserModel;