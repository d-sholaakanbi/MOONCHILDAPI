const User = require('../../models/AUTH/users');
const jwt = require('jsonwebtoken');
const handleErrors = require('../../middleware/AUTH/handleErrors');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Signup Controller
const signup = async (req, res) => {
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        return res.status(400).json({ success: false, message: "Please provide all necessary information" });
    }

    try {
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ success: false, message: "Email has been used" });
        }

        const user = await User.create({ firstname, lastname, username, email, password });
        res.status(201).json({ success: true, data: user });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ success: false, errors });
    }
};

// Login Controller
// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

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
