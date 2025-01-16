import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import "dotenv/config"

export const verifyToken = async (req, res, next) => {
    // Extract token directly without 'Bearer' prefix
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace 'secret_key' with your actual secret
        req.id = decoded.userId; // Assign the userId from the decoded token to req.id
        req.user = await userModel.findById(decoded.userId).select('-password'); // Optional: Attach user details
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};
