const mongoose = require("mongoose");

async function connectDB() {
    try {
        // Ensure the environment variable is correct
        const mongoURL = process.env.MONGODB_URL;

        // Check if the environment variable is defined
        if (!mongoURL) {
            throw new Error("MONGODB_URL environment variable is not defined");
        }

        // Connect to MongoDB
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });

        const connection = mongoose.connection;

        // Event listeners for connection status
        connection.on('connected', () => {
            console.log("Connected to MongoDB");
        });

        connection.on('error', (error) => {
            console.log("MongoDB connection error:", error);
        });

    } catch (error) {
        console.log("Failed to connect to MongoDB:", error);
    }
}

module.exports = connectDB;
