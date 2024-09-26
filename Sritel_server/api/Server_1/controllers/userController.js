const User = require("../models/userModel/User");
const bcrypt = require("bcrypt");
const { SendMail } = require("../functions/NodemailerConfig");
const { generateOtp } = require("../functions/OtpGen");

// Sign in user
exports.signinUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ type: "error", message: "Incorrect email address" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.send({ type: "error", message: "Incorrect password" });
    }

    if (user.state !== "verified") {
      const otp = generateOtp(6);
      user.state = otp;
      await user.save();
      await SendMail(otp, email);
      return res.send({
        type: "warning",
        message: "Need to verify email first",
      });
    }

    res.send({ type: "success", user: user.type, id: user.user_id });
  } catch (error) {
    console.error("Error in signinUser:", error);
    res.status(500).send({ type: "error", message: "Internal Server Error" });
  }
};

// Register new user
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ type: "error", message: "Account already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp(6);

    const newUser = new User({
      email,
      password: hashedPassword,
      state: otp,
    });

    await newUser.save();
    await SendMail(otp, password, email);
    res.send({ type: "success", message: "Account created successfully" });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).send({ type: "error", message: "Internal Server Error" });
  }
};

// Add a customer
exports.addCustomer = async (req, res) => {
  const { email, name, contact_no, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ type: "error", message: "Account already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      contact_no,
      email,
      password: hashedPassword,
      state: "verified",
    });

    await newUser.save();
    await SendMail(0, password, email);
    res.send({ type: "success", message: "Account created successfully" });
  } catch (error) {
    console.error("Error in addCustomer:", error);
    res.status(500).send({ type: "error", message: "Internal Server Error" });
  }
};

// Verify user by OTP
exports.verifyUser = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.send({ type: "error", message: "User not found" });
    }

    if (user.state !== "verified" && user.state !== "notverified") {
      if (user.state === otp) {
        user.state = "verified";
        await user.save();
        return res.send({
          type: "success",
          message: "Account verified successfully",
        });
      } else {
        return res.send({ type: "error", message: "Invalid OTP" });
      }
    } else {
      return res.send({ type: "error", message: "An error occurred" });
    }
  } catch (error) {
    console.error("Error in verifyUser:", error);
    res.status(500).send({ type: "error", message: "Internal Server Error" });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ type: "Customer" });
    res.send(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).send({ type: "error", message: "Internal Server Error" });
  }
};

// Get all staff members
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ type: "Staff" });
    res.send(staff);
  } catch (error) {
    console.error("Error fetching staff:", error);
    res.status(500).send({ type: "error", message: "Internal Server Error" });
  }
};

// Add a staff member
exports.addStaff = async (req, res) => {
  const { name, email, type, contactNo } = req.body;
  const password = "Sritel@123";

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ type: "error", message: "Account already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStaff = new User({
      name,
      contact_no: contactNo,
      email,
      password: hashedPassword,
      state: "verified",
      type,
    });

    await newStaff.save();
    await SendMail(0, password, email);
    res.send({ type: "success", message: "Account created successfully" });
  } catch (error) {
    console.error("Error in addStaff:", error);
    res.status(500).send({ type: "error", message: "Internal Server Error" });
  }
};
