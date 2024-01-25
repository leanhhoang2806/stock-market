class ConfigManager {
    constructor() {
      this.apiKey = process.env.YAHOO_API_KEY 
      this.apiHost = process.env.YAHOO_API_HOST
      this.jwtKey = process.env.JWT_SECRET_KEY
    }
  
    getApiKey() {
      return this.apiKey;
    }
  
    getApiHost() {
      return this.apiHost;
    }

    getJwtSecretKey() {
        return this.jwtKey
    }
}
  
module.exports = {
    ConfigManager
};
  