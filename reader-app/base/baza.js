const Sequelize = require("sequelize");
const config = require('./config.json').database;

const sequelize = new Sequelize(config.name, config.user, config.password, { host : config.host, dialect : config.dialect });
module.exports = sequelize;