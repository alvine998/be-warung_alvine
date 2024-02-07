var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _detail_transactions = require("./detail_transactions");
var _domains = require("./domains");
var _payments = require("./payments");
var _products = require("./products");
var _stocks = require("./stocks");
var _stores = require("./stores");
var _transactions = require("./transactions");
var _users = require("./users");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var detail_transactions = _detail_transactions(sequelize, DataTypes);
  var domains = _domains(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var stocks = _stocks(sequelize, DataTypes);
  var stores = _stores(sequelize, DataTypes);
  var transactions = _transactions(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  detail_transactions.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(detail_transactions, { as: "detail_transactions", foreignKey: "product_id"});
  stocks.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(stocks, { as: "stocks", foreignKey: "product_id"});
  categories.belongsTo(stores, { as: "store", foreignKey: "store_id"});
  stores.hasMany(categories, { as: "categories", foreignKey: "store_id"});
  domains.belongsTo(stores, { as: "store", foreignKey: "store_id"});
  stores.hasMany(domains, { as: "domains", foreignKey: "store_id"});
  payments.belongsTo(stores, { as: "store", foreignKey: "store_id"});
  stores.hasMany(payments, { as: "payments", foreignKey: "store_id"});
  products.belongsTo(stores, { as: "store", foreignKey: "store_id"});
  stores.hasMany(products, { as: "products", foreignKey: "store_id"});
  transactions.belongsTo(stores, { as: "store", foreignKey: "store_id"});
  stores.hasMany(transactions, { as: "transactions", foreignKey: "store_id"});
  stores.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(stores, { as: "stores", foreignKey: "user_id"});
  transactions.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(transactions, { as: "transactions", foreignKey: "user_id"});

  return {
    categories,
    detail_transactions,
    domains,
    payments,
    products,
    stocks,
    stores,
    transactions,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
