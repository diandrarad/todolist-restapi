const jwt = require('jsonwebtoken');
const User = require('../models/user');
const jwtUtils = require('../utils/jwt');

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  
  console.log('Received Token:', token)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing Token' });
  }

  try {
    const decoded = await jwtUtils.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid Token' });
  }
};

const authorizeUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  authenticateToken,
  authorizeUser,
};
