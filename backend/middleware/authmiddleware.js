const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to check if user is logged in
const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the request headers
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token (remove "Bearer " from the start)
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user from database using the ID stored in token
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Everything is fine, move to the actual route
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, allow access
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

module.exports = { protect, admin };