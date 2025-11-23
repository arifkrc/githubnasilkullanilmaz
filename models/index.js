const sequelize = require('../config/database');
const User = require('./User');
const ProductionRecord = require('./ProductionRecord');

const db = {
  sequelize,
  User,
  ProductionRecord
};

module.exports = db;
