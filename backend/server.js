// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from a .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Set the port. It will use the environment variable or default to 5000.
const PORT = process.env.PORT || 5000;

// --- Middleware ---

// Enable Cross-Origin Resource Sharing (CORS) for all routes
// This allows your React frontend to communicate with the backend.
app.use(cors());

app.use(express.json());

// Retrieve MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error('FATAL ERROR: MONGO_URI is not defined in the .env file.');
    process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB using Mongoose
mongoose.connect(MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => console.error('Database connection error:', err));


// --- API Routes ---

app.get('/', (req, res) => {
    res.send('Welcome to the ChatMate API!');
});


const zeroShotQARouter = require('./routes/zeroShotQA');

app.use('/api/zero-shot-qa', zeroShotQARouter);



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
