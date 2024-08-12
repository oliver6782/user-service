import express from 'express';

import { registerUser, loginUser, getUserProfile, updateUserProfile } from'../controller/userController.js';

const router = express.Router();
// User registration
router.post('/signup', registerUser);

// User login
router.post('/login', loginUser);

// Get user profile (requires authentication)
router.get('/:id', getUserProfile);

// Update user profile (requires authentication)
router.put('/:id', updateUserProfile);

export default router;
