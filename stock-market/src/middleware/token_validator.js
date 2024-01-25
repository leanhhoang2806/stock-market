const jwt = require('jsonwebtoken');
const { ConfigManager } = require("../managers/configuration_manager")

const configManager = new ConfigManager()

const validateJWT = async (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Missing JWT token' });
    }
  
    try {
      await jwt.verify(token.replace(/^Bearer\s/, ''), configManager.getJwtSecretKey()); 
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized: Invalid JWT token' });
    }
};

module.exports = {
    validateJWT
}
