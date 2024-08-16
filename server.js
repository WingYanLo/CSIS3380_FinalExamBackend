const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bookRouter = require('./routes/bookRouter');
require('dotenv').config(); // For reading environment variables from .env

const app = express();
const port = process.env.PORT || 5000;
const URI = process.env.MONGO_URI || "mongodb+srv://low3:ag6r77Ve9rGmMrdR@cluster0.hrxkceq.mongodb.net/BookDB";

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("ERROR: " + err));

// Routes
app.use('/api/v1/books', bookRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
