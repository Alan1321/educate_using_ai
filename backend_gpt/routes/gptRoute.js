// routes/helloRoute.js
const express = require('express');
const router = express.Router();
const gptController = require('../controllers/gptController');

router.get('/iselp', gptController.gptResponse);

module.exports = router;