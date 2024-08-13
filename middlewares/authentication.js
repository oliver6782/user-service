
import jwt from 'jsonwebtoken';

function authenticateJWT(req, res, next) {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. You are not authenticated.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (ex) {
        res.status(400).json({ message: 'You are unauthenticated.' });
    }
}

export default authenticateJWT;
