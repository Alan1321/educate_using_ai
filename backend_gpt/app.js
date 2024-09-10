// app.js
const express = require('express');
const app = express();

// Import routes
const helloRoute = require('./routes/helloRoute');
const gptRoute = require('./routes/gptRoute')

// Use routes
app.use('/', helloRoute);
app.use('/api/v1/gpt-response', gptRoute);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
