const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Generate JWT token
const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, email, password, phone, role } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already registered' });

    const user = await User.create({ username, email, password, phone, role });

    const token = signToken(user);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Register error:', err); // ← this prints full error in terminal
    res.status(500).json({ message: 'Server error' });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {
    // Trim inputs to remove extra spaces
    const email = req.body.email.trim();
    const password = req.body.password.trim();

    const user = await User.findOne({ email });

    if (!user || user.password.trim() !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = signToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// GET CURRENT USER
exports.me = async (req, res) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    console.error('Me route error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
