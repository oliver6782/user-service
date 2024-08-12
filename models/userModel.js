import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        set: (value) => {
            // Convert username to lowercase
            return value.toLowerCase();
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        set: (value) => {
            // Trim whitespace from email
            return value.trim();
        }
    },
    password: {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', userSchema);

export default User;
