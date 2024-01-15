const User = require('../models/user');
const jwtUtils = require('../utils/jwt');

module.exports = {
    register: async (req, res) => {
      // Implementation for user registration
      try {
        const { username, password } = req.body;  // Extract data from the request body
  
        const user = await User.create({  // Create a new user using the User model
          username: username,
          password: password, // Hash the password before storing it in production
        });
  
        // Generate token for the newly created user
        const token = jwtUtils.generateToken({ _id: user._id, username: user.username });
  
        res.status(201).json({ user, token });  // Send response with user and token
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    },

  login: async (req, res) => {
    // Implementation for user login
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwtUtils.generateToken({ _id: user._id, username: user.username });
      res.status(200).json({ user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getUserProfile: async (req, res) => {
    // Implementation for fetching user profile
    try {
      const user = await User.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};
