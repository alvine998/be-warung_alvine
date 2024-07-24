const dbConfig = require("../../config/db.config.js");
const mysql2 = require("mysql2")

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  dialectModule: mysql2,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.js")(sequelize, Sequelize);
db.stores = require("./stores.js")(sequelize, Sequelize);
db.products = require("./products.js")(sequelize, Sequelize);
db.transactions = require("./transactions.js")(sequelize, Sequelize);
db.detail_transactions = require("./detail_transactions.js")(sequelize, Sequelize);
db.categories = require("./categories.js")(sequelize, Sequelize);
db.stocks = require("./stocks.js")(sequelize, Sequelize);
db.payments = require("./payments.js")(sequelize, Sequelize);
db.domains = require("./domains.js")(sequelize, Sequelize);
db.sessions = require("./sessions.js")(sequelize, Sequelize);

module.exports = db;