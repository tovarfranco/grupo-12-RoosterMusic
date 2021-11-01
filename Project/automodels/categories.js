const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categories', {
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "category_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'categories',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_category" },
        ]
      },
      {
        name: "category_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "category" },
        ]
      },
    ]
  });
};
