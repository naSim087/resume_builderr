const jwt = require('jsonwebtoken');
const { SECRETKEY } = require("../config/serverconfig");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
   if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
    // console.log(authHeader);
  const token = authHeader.split(' ')[1];  // Bearer <token>
  try {
    const decoded = jwt.verify(token, SECRETKEY);  // Verify token
    //  console.log(decoded); 
    // Check if the token is expired
      
    // console.log(decoded.id);
    req.username = decoded.username;
    req._id= decoded.id;
    // console.log(req.username) // Pass user data to next middleware or route handler
    next();
  } catch (err) {
    console.error(err);  // Log error for debugging purposes
    return res.status(403).json({ error: 'Invalid token' });
  }
};