const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('No token provided or wrong token format');
        return res.status(401).json({ message: 'Unauthorized: No token provided or wrong token format' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('Invalid token');
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyJWT;
