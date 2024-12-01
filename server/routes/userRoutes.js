import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser); 
router.post('/login', loginUser); 
// Protected route
router.get('/me', authenticateUser, getUserProfile);

export default router;
