const fs = require('fs');
const path = require('path');

// Function to handle login logic
exports.login = (req, res) => {
    const { email, password } = req.query;

    // Read user data from JSON file
    const usersFilePath = path.join(__dirname, '../models/users.json');
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

    // Find a user with matching email and password
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};
