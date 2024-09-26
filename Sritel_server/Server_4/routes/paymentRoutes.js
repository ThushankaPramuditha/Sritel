const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST route for payment processing
router.post('/payment', paymentController.processPayment);

module.exports = router;
