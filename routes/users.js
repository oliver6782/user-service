import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from'../controller/userController.js';

const router = express.Router();

// User registration
router.post('/signup', [
    body('name').isLength({ min: 3, max: 20 }).withMessage('Username must be at least 3 characters long'),
    body('email').notEmpty().isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty().isLength({min: 8}).withMessage('Password must be at least 8 characters long')
], registerUser);

// User login
router.post('/login', [
    body('email').notEmpty().isEmail().withMessage('Enter a valid email'),
    body('password').notEmpty()
], loginUser);

// Get user profile (requires authentication)
router.get('/:id', getUserProfile);

// Update user profile (requires authentication)
router.put('/:id', updateUserProfile);

export default router;
