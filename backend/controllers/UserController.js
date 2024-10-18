import userModel from '../models/UserModel.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const loginUser = async (req, res) => {
    const { email, password, phone } = req.body;

    try {
        // Check for user by either email or phone
        const user = await userModel.findOne({ $or: [{ email }, { phone }] });

        if (!user) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        // Compare the password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        // Create a token for the user
        const token = createToken(user._id);
        
        // Respond with success and the token
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "An error occurred, please try again" });
    }
}



const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const registerUser = async (req, res) => {
    const { name, password, email, phone, address, nicNumber, assessmentTaxNumber } = req.body;

    // Check if all fields are present
    if (!name || !email || !password || !phone || !address || !nicNumber || !assessmentTaxNumber) {
        return res.json({ success: false, message: "All fields are required" });
    }

    try {
        //checking if user already registered
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Registered" });
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        //validating password format
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating a new user with all required fields
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            address: address,
            nicNumber: nicNumber,
            assessmentTaxNumber: assessmentTaxNumber
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getUserProfile = async (req, res) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      // Fetch the user from the database using the user ID
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Return user profile data
      res.json({ user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error fetching user profile" });
    }
  };
  
const updateUserProfile = async (req, res) => {
    const { userId, name, email, phone, address, oldPassword, newPassword } = req.body;

    try {
        // Create an update object to store the fields that need updating
        const updateFields = {};

        // If any of the fields are provided, add them to the update object
        if (name) updateFields.name = name;
        if (email) updateFields.email = email;
        if (phone) updateFields.phone = phone;
        if (address) updateFields.address = address;

        // If password update is requested
        if (oldPassword && newPassword) {
            const user = await userModel.findById(userId);

            // Check if the old password is correct
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Old password is incorrect' });
            }

            // Hash the new password and add it to the update object
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            updateFields.password = hashedPassword;
        }

        // Perform the update in the database
        await userModel.findByIdAndUpdate(userId, updateFields);

        res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating profile' });
    }
};

const AddBin = async (req, res) => {
    const { binData } = req.body;
  const userId = req.user.id;  // Assume you've set the user ID from the token middleware
  
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add the new bin to the user's garbageBinData
    user.garbageBinData.push(binData);

    await user.save();

    res.status(200).json({ binData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add bin data' });
  }
  };

  const updatePassword = async(req, res) => {
    const { userId, oldPassword, newPassword } = req.body;

    try {
      const user = await userModel.findById(userId);

      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'Old password is incorrect' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

      res.json({ message: 'Password updated' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating password' });
    }
  }

export { loginUser, registerUser, getUserProfile, updateUserProfile, AddBin, updatePassword }