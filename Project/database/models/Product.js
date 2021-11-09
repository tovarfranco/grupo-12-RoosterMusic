// Los modelos exportan una FUNCION. Dentro creamos una constante que tendrá los datos del modelo.
// Los parámetros/módulos necesarios son pasados por index.js, por eso no hace falta que importemos módulos de sequelize en este archivo.

module.exports = function (sequelize, DataTypes) {

  let alias = "Product";                                         // 1° parámetro: alias para sequelize.

  let columns = {                                                // 2° parámetro: columnas de la tabla.
    id_product: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(9,2),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    brand: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    model: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    material: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    origin: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    year: {
      type: "YEAR",
      allowNull: false
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id_category'
      }
    },
    availability: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    id_campaign: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'campaigns',
        key: 'id_campaign'
      }
    }
  };

  let config = {                                                 // 3° parámetro: configuración especial.
    sequelize,
    tableName: 'products',                                       // Mi tabla en la BBDD.
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id_product" },]
      },
      {
        name: "fk_products_categories_idx",
        using: "BTREE",
        fields: [{ name: "id_category" },]
      },
      {
        name: "fk_products_campaigns_idx",
        using: "BTREE",
        fields: [{ name: "id_campaign" },]
      },
    ]
  };


  let Product = sequelize.define(alias, columns, config);       // Defino el modelo.

  Product.associate = function (models) {
    Product.belongsTo(models.Category, { as: "category", foreignKey: "id_category" });
    Product.belongsToMany(models.User, { as: "users", through: "Order", foreignKey: "id_product", otherKey: "id_user" });
    Product.belongsTo(models.Campaign, { as: "campaign", foreignKey: "id_campaign" });
    Product.hasMany(models.Order, { as: "orders", foreignKey: "id_product" });
  };

  return Product;
};
