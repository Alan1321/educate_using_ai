const express = require('express');
const { sendInvite, signupWithInvite } = require('../controllers/authController');

const router = express.Router();

// Send invite route
router.post('/invite', sendInvite);

// Sign up route
router.post('/signup', signupWithInvite);

module.exports = router;
