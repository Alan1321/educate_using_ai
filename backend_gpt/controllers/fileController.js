const fs = require('fs');
const path = require('path');

// Generic function to handle CRUD operations
const readJsonFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading the file: ' + err);
            } else {
                try {
                    const records = JSON.parse(data);
                    resolve(records);
                } catch (parseErr) {
                    reject('Error parsing JSON data: ' + parseErr);
                }
            }
        });
    });
};

const writeJsonFile = (filePath, data) => {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.stringify(data, null, 2);
        fs.writeFile(filePath, jsonData, 'utf8', (err) => {
            if (err) {
                reject('Error writing to the file: ' + err);
            } else {
                resolve('File updated successfully!');
            }
        });
    });
};

// Controller to handle adding/updating records
exports.updateRecords = async (req, res) => {
    const filePath = path.resolve(__dirname, '../../frontend/src/data', req.params.filename);
    const newRecord = req.body;
    console.log(req.params.filename, newRecord)
    try {
        let records = await readJsonFile(filePath);
        records.push(newRecord);
        await writeJsonFile(filePath, records);
        res.status(200).json({ message: 'Record added successfully!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Controller to get all records
exports.getRecords = async (req, res) => {
    const filePath = path.resolve(__dirname, '../../frontend/src/data', req.params.filename);

    try {
        const records = await readJsonFile(filePath);
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Controller to delete a record by ID (assuming each record has a unique `id`)
exports.deleteRecord = async (req, res) => {
    const filePath = path.resolve(__dirname, '../../frontend/src/data', req.params.filename);
    const recordId = req.params.id;

    try {
        let records = await readJsonFile(filePath);
        records = records.filter(record => record.id !== recordId);
        await writeJsonFile(filePath, records);
        res.status(200).json({ message: 'Record deleted successfully!' });
    } catch (error) {
        res.status(500).json({ error });
    }
};
