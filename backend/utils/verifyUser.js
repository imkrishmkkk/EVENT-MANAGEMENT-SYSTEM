import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;  // Make sure the token is here
  
  if (!token) {
    console.log('No token found in cookies');
    return next(errorHandler(401, 'Unauthorized: No token provided'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token verification failed:', err.message);
      return next(errorHandler(403, 'Forbidden: Invalid token'));
    }

    req.user = decoded;
    console.log('Decoded token:', req.user);  // This should now show { id: "67a9bd6816968f1155c13e63", iat: ... }
    next();
  });
};
