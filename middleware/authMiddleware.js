const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Access denied' });
    console.log(authHeader);

    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token. Log in for generate a new token' });
    }
};

module.exports = verifyToken;