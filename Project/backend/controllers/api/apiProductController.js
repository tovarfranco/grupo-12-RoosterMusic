// =========== Require's ==============================
const path = require('path');                                                          // Manejo de rutas.

// =========== Modelo =================================
const Product = require('../../models/Product.model.js');
const Category = require('../../models/Category.model.js');
const Campaign = require('../../models/Campaign.model.js');

// =========== Controlador ============================
const apiProductController = {

    /*** Todos los productos ***/
    index: async (req, res) => {

        /* Información de productos */
        let productList = await Product.joinAllCategoryCampaign();

        /* Modifico la información de Sequelize */
        productList.forEach(product => {
            product.dataValues.url = `api/products/${product.id_product}`;
        });

        /* Información sumarizada */
        let countByCategory = await Product.countByProduct();

        let countResult = []
        countByCategory.forEach(result => { 
            countResult.push({categoryName: result.dataValues.category.name, productCount: result.dataValues.productCount});        // Agrego un objeto formado por los campos que necesito
        })

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: productList.length,
                countByCategory: countResult,
                url: '/api/products'
            },
            data: productList
        };

        res.json(response);
    },

    /*** Detalle de un producto ***/
    detail: async (req, res) => {                                                      // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let productFound = await Product.joinPkCategoryCampaign(req.params.id);                      // findByPk devuelve un objeto directamente, no un array.       

        /* Modifico la información de Sequelize */
        productFound.dataValues.url = `/api/products/${productFound.id_product}`;

        res.json(productFound);
    }
}

// =========== Exporto Controlador ===========================
module.exports = apiProductController                                                  // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.