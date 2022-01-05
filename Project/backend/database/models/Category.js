// Los modelos exportan una FUNCION. Dentro creamos una constante que tendrá los datos del modelo.
// Los parámetros/módulos necesarios son pasados por index.js, por eso no hace falta que importemos módulos de sequelize en este archivo.

module.exports = function (sequelize, DataTypes) {

  let alias = 'Category';                                        // 1° parámetro: alias para sequelize.

  let columns = {                                                // 2° parámetro: columnas de la tabla.
    id_category: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "name_UNIQUE"
    }
  };

  let config = {                                                 // 3° parámetro: configuración especial.
    sequelize,
    tableName: 'categories',                                     // Mi tabla en la BBDD.
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id_category" },]
      },
      {
        name: "name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [{ name: "name" },]
      },
    ]
  };

  let Category = sequelize.define(alias, columns, config);       // Defino el modelo.

  Category.associate = function (models) {
    Category.hasMany(models.Product, { as: "products", foreignKey: "id_category"});
  };

  return Category;
};
