const User = require('../../models/AUTH/users');
const jwt = require('jsonwebtoken');
const asyncWrapper = require('../../middleware/AUTH/async');


// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Signup Controller
const signup = asyncWrapper(async (req, res) => {
    const { firstName, lastName, userName, gender, email, password } = req.body;
  
    if (!firstName || !lastName || !userName || !gender || !email || !password) {
      return res.status(400).json({ msg: 'Please provide all required fields' });
    }
  
    const newUser = new User({
      firstName,
      lastName,
      userName,
      gender,
      email,
      password
    });
  
    await newUser.save();
  
    res.status(201).json({ success: true, user: newUser });
  });
  

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;
 console.log(email);

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Please provide necessary information" });
    }

    try {
        const user = await User.findOne({ email });
        console.log('User found:', user);

        if (!user) {
            return res.status(400).json({ success: false, message: 'Email not found, please try again' });
        }

        const authenticated = await user.comparePassword(password);
        console.log('Password match:', authenticated);

        if (authenticated) {
            user.password = '';
            const token = generateToken(user._id);
            return res.status(200).json({ success: true, data: user, token });
        } else {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Logout Controller
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1000 });
    res.redirect('/login');
};

module.exports = { signup, login, logout };
