const jwt = require('jsonwebtoken');

// Checks if the request has a valid token
const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, invalid token' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token provided' });
    }
};

// Checks if the logged-in user is an admin
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ message: 'Access denied, admin only' });
    }
};

module.exports = { protect, adminOnly };