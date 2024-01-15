// userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authenticateToken, authorizeUser } = require('../middleware/auth');

// Register a new user
router.post('/register', UserController.register);

// Login
router.post('/login', UserController.login);

// Protected route - requires authentication and authorization
router.get('/profile', authenticateToken, authorizeUser, UserController.getUserProfile);

module.exports = router;
