import User from '../models/user.js'; // Correctly import the User model

// Handle Google login
const googleLogin = async (req, res) => {
  const { googleId, email, name } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ googleId });
    if (!user) {
      // If user doesn't exist, create a new user
      user = new User({ googleId, email, name }); // Create a new instance of User
      await user.save(); // Save the new user to the database
      return res.status(201).json({ message: "User created", user });
    }

    // If user exists, log them in
    res.status(200).json({ message: "User logged in", user });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { googleLogin };
