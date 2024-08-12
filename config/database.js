import mongoose from 'mongoose';

async function connectToDatabase() {
    try {
        console.log("Attempting to connect to MongoDB with Mongoose...");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully connected to MongoDB with Mongoose");
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
        process.exit(1);
    }
}

export { connectToDatabase };
