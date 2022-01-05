// Los modelos exportan una FUNCION. Dentro creamos una constante que tendrá los datos del modelo.
// Los parámetros/módulos necesarios son pasados por index.js, por eso no hace falta que importemos módulos de sequelize en este archivo.

module.exports = function (sequelize, DataTypes) {

  let alias = "User";                                        // 1° parámetro: alias para sequelize.

  let columns = {                                            // 2° parámetro: columnas de la tabla.
    id_user: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    surname: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    document: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "email_UNIQUE"
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  };

  let config = {                                             // 3° parámetro: configuración especial.
    sequelize,
    tableName: 'users',                                      // Mi tabla en la BBDD.
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id_user" },]
      },
      {
        name: "email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [{ name: "email" },]
      },
    ]
  };

  let User = sequelize.define(alias, columns, config);       // Defino el modelo.

  User.associate = function (models) {
    User.belongsToMany(models.Product, { as: "products", through: "Order", foreignKey: "id_user", otherKey: "id_product" });
    User.hasMany(models.Order, { as: "orders", foreignKey: "id_user"});
  };

  return User;
};