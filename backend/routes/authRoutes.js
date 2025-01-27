const express = require('express');
const router = express.Router();
const { signup, login, sendotp } = require('../controllers/authController');

router.post("/register",signup);
router.post("/login",login);
router.post('/send-otp',sendotp)

module.exports = router;
