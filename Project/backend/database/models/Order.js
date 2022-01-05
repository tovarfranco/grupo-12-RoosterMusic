// Los modelos exportan una FUNCION. Dentro creamos una constante que tendrá los datos del modelo.
// Los parámetros/módulos necesarios son pasados por index.js, por eso no hace falta que importemos módulos de sequelize en este archivo.

module.exports = function (sequelize, DataTypes) {

  let alias = 'Order';                                        // 1° parámetro: alias para sequelize.

  let columns = {                                             // 2° parámetro: columnas de la tabla.
    id_order: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id_user'
      }
    },
    id_product: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id_product'
      }
    },
    id_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'status',
        key: 'id_status'
      }
    }/*,
    last_modified: {                                        // No es necesario ya que la BBDD lo genera, además vemos que tiene una función que no la importamos acá.
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }*/
  };

  let config = {                                              // 3° parámetro: configuración especial.
    sequelize,
    tableName: 'orders',                                      // Mi tabla en la BBDD.
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_order" },
          { name: "id_user" },
          { name: "id_product" },
        ]
      },
      {
        name: "fk_orders_users_idx",
        using: "BTREE",
        fields: [{ name: "id_user" },]
      },
      {
        name: "fk_orders_products_idx",
        using: "BTREE",
        fields: [{ name: "id_product" },]
      },
      {
        name: "fk_orders_status_idx",
        using: "BTREE",
        fields: [{ name: "id_status" },]
      },
    ]
  };

  let Order = sequelize.define(alias, columns, config);       // Defino el modelo.

  Order.associate = function (models) {
    Order.belongsTo(models.Product, { as: "product", foreignKey: "id_product"});
    Order.belongsTo(models.Status, { as: "status", foreignKey: "id_status"});
    Order.belongsTo(models.User, { as: "user", foreignKey: "id_user"});
  };

  return Order;
};
