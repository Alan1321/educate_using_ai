const express = require('express');
const cors = require('cors'); // Import cors
const app = express();

require('dotenv').config();

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Import routes
const gptRoute = require('./routes/gptRoute');
const loginRoute = require('./routes/loginRoute');
const fileRoutes = require('./routes/fileRoutes');

// Use routes
app.use('/api/v1/gpt-response', gptRoute);
app.use('/', loginRoute);
app.use('/api/files', fileRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});