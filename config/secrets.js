// JWT Secret for production
module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'utf_production_secret_key_2025_change_in_production'
};
