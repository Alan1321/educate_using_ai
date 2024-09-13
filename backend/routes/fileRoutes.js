const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');

// Define routes for CRUD operations
router.get('/:filename', fileController.getRecords); // Get all records from a JSON file
router.post('/:filename', fileController.updateRecords); // Add/Update a record in a JSON file
router.delete('/:filename/:id', fileController.deleteRecord); // Delete a record by ID from a JSON file

module.exports = router;
