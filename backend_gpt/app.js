// app.js
const express = require('express');
const app = express();

// Import routes
const gptRoute = require('./routes/gptRoute')

// Use routes
app.use('/api/v1/gpt-response', gptRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
