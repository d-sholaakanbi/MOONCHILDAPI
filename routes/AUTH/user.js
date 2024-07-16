const express = require('express');
const router = express.Router();
const { signup, login } = require('../../controller/AUTH/userController');

// Register route
router.post('/signup', signup);

// Login route 
router.post('/login', login);

module.exports = router;
