// =========== Require's ==============================
const path = require('path');                                                          // Manejo de rutas.

// =========== Modelo =================================
const Category = require('../../models/Category.model.js');

// =========== Controlador ============================
const apiProductController = {

    /*** Todas las categorias ***/
    index: async (req, res) => {

        /* Información de categorias */
        let categoryList = await Category.joinAllProduct();

        /* Modifico la información de Sequelize */
        categoryList.forEach(category => {
            category.dataValues.url = `api/categories/${category.id_category}`;
        });

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: categoryList.length,
                url: '/api/categories'
            },
            data: categoryList
        };

        res.json(response);
    },

    /*** Detalle de una categoria ***/
    detail: async (req, res) => {                                                      // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let categoryFound = await Category.findByPk(req.params.id);                    // findByPk devuelve un objeto directamente, no un array.       

        /* Modifico la información de Sequelize */
        categoryFound.dataValues.url = `/api/categories/${categoryFound.id_category}`;

        res.json(categoryFound);
    }
}

// =========== Exporto Controlador ===========================
module.exports = apiProductController                                                  // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.