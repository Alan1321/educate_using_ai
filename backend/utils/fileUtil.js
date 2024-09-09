const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../models/data.json');

// Read data from JSON file
exports.readDataFromFile = () => {
    const fileContent = fs.readFileSync(dataFilePath);
    return JSON.parse(fileContent);
};

// Write data to JSON file
exports.writeDataToFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};
