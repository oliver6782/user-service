
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";

// // Environment variables
// const JWT_SECRET = process.env.JWT_SECRET;
// console.log(JWT_SECRET);

// if (!JWT_SECRET) {
//     console.error('JWT_SECRET is not defined in the environment.');
//     process.exit(1);
// }

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email: email });
        if (user) {
            console.log('User already exists with email:', email); // Log to console
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('Password hashed successfully'); // Log to console

        // Create new user
        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();
        console.log('User saved to database:', user); // Log to console

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error occurred during signup:', error); // Log the error
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// User login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({ message: 'email not found' });
        }

        // Check the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, message: 'Logged in successfully' });
    } catch (error) {
        console.error('Error occurred during login:', error); // Log the error
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const {id} = req.params;

        // Check if the ID is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
    try {
        const {id} = req.params;
        const updates = req.body;
        const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true }).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
