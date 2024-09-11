// app.js
const express = require('express');
const app = express();

require('dotenv').config();

// Import routes
const gptRoute = require('./routes/gptRoute')
const loginRoute = require('./routes/loginRoute');

// Use routes
app.use('/api/v1/gpt-response', gptRoute);
app.use('/', loginRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
