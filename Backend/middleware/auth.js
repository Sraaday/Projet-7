const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    req.userId = decodedToken.userId;
    req.isAdmin = decodedToken.isAdmin
    
    next();
    
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};


