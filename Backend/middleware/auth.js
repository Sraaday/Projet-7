const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // On recupère ici le token d'authentification signé via la clé privé généré dans le backend
    const token = req.headers.authorization.split(' ')[1];
    // renvoi le payload si le token et sa signature sont valides, remonte l'erreur sinon
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // On extrait les informations du token vérifié
    req.userId = decodedToken.userId;
    req.isAdmin = decodedToken.isAdmin

    
    
    next();
    
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};


