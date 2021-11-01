var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _products = require("./products");
var _users = require("./users");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var products = _products(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  products.belongsTo(categories, { as: "id_category_category", foreignKey: "id_category"});
  categories.hasMany(products, { as: "products", foreignKey: "id_category"});

  return {
    categories,
    products,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
