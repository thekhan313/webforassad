const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: 'Unauthorized: Authorization header missing'
        });
    }

    // Expected formats:
    // 1) Bearer <JWT_TOKEN>
    // 2) Bearer <ADMIN_PASSWORD> (dev shortcut)

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            error: 'Unauthorized: Invalid authorization format'
        });
    }

    const token = parts[1];

    // ✅ JWT AUTH
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded || decoded.role !== 'admin') {
            return res.status(403).json({
                error: 'Forbidden: Admin access required'
            });
        }

        req.user = decoded;
        next();
    } catch (err) {
        console.error('JWT Error:', err.message);
        return res.status(401).json({
            error: 'Unauthorized: Invalid or expired token'
        });
    }
};

module.exports = authMiddleware;
