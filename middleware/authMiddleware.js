// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

const authMiddleware = (req, res, next) => {
  // Extract the JWT from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    // If the token is missing, return an unauthorized response
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Verify the authenticity of the JWT using the secret key
    const decodedToken = jwt.verify(token, secretKey);

    // Set the authenticated user data in the request object
    req.user = decodedToken;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If the token is invalid or expired, return an unauthorized response
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
