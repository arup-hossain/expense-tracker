const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'JWT_KEY');
        req.userId = decodedToken.userId;
        next();
    } catch {
        res.status(401).json({ message: 'Please login' });
    }
};

module.exports = authenticate;