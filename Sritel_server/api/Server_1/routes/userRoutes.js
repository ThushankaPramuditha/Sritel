const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Sign in user
router.post("/signinuser", userController.signinUser);

// Register a new user
router.post("/registeruser", userController.registerUser);

// Add a customer
router.post("/addcustomer", userController.addCustomer);

// Verify user by OTP
router.post("/verifyuser", userController.verifyUser);

// Get all customers
router.get("/customers", userController.getCustomers);

// Get all staff members
router.get("/getallstaff", userController.getAllStaff);

// Add a staff member
router.post("/addstaff", userController.addStaff);

module.exports = router;
