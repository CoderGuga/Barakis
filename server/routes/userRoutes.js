const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const { authenticateUser } = require('../middlewares/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser); 
router.post('/login', loginUser); 
// Protected route
router.get('/me', authenticateUser, getUserProfile);

module.exports = router;
