const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// POST route for login
router.post('/login', loginController.login);

// GET route for login (not recommended for sensitive operations)
router.get('/login', loginController.login);

module.exports = router;
