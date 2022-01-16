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
            category.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${category.id_category}`;
        });

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: categoryList.length,
                url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: categoryList
        };

        res.json(response);
    },

    /*** Detalle de una categoria ***/
    detail: async (req, res) => {                                                      // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let categoryFound = await Category.findByPk(req.params.id);                    // findByPk devuelve un objeto directamente, no un array.       

        if (categoryFound) {                                                           // Si no es nulo... (Sequelize devuelve nulo si no lo encuentra).
            /* Modifico la información de Sequelize */
            categoryFound.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
        } else {
            categoryFound = [];
        };

        res.json(categoryFound);
    }
}

// =========== Exporto Controlador ===========================
module.exports = apiProductController                                                  // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.