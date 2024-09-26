const express = require('express');
const router = express.Router();
const packageController = require('../controllers/packageController');

// Add a package
router.post('/addpackage', packageController.addPackage);

// Get all packages
router.get('/getallpackages', packageController.getAllPackages);

// Activate a package for a user
router.post('/activatepackage', packageController.activatePackage);

module.exports = router;
