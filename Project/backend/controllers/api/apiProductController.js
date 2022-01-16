// =========== Require's ==============================
const path = require('path');                                                                                                 // Manejo de rutas.

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
            product.dataValues.image = `${req.protocol}://${req.get('host')}/images/products/${product.image}`;
            product.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${product.id_product}`;
            product.dataValues.url_site = `${req.protocol}://${req.get('host')}/products/detail/${product.id_product}`;
        });

        /* Información sumarizada */
        let countByCategory = await Product.countByProduct();

        let countResult = []
        countByCategory.forEach(result => {
            countResult.push({ categoryName: result.dataValues.category.name, productCount: result.dataValues.productCount });  // Agrego un objeto formado por los campos que necesito.
        })

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: productList.length,
                countByCategory: countResult,
                url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: productList
        };

        res.json(response);
    },

    /*** Detalle de un producto ***/
    detail: async (req, res) => {                                                                                             // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let productFound = await Product.joinPkCategoryCampaign(req.params.id);                                               // findByPk devuelve un objeto directamente, no un array.       

        if (productFound) {                                                                                                   // Si no es nulo... (Sequelize devuelve nulo si no lo encuentra).
            /* Modifico la información de Sequelize */
            productFound.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            productFound.dataValues.image = `${req.protocol}://${req.get('host')}/images/products/${productFound.image}`;
        } else {
            productFound = [];
        };

        res.json(productFound);
    },

    search: async (req, res) => {
        let productList = await Product.findByField('name', 'like', "%" + req.query.keyword + "%");

        if (productList.length > 0) {
            /* Modifico la información de Sequelize */
            productList.forEach(product => {
                product.dataValues.image = `${req.protocol}://${req.get('host')}/images/products/${product.image}`;
                product.dataValues.url = `${req.protocol}://${req.get('host')}${req.baseUrl}/${product.id_product}`;          // Ver que no uso req.originalUrl ya que me trae toda la url (incluye query string, en este caso no me sirve).
                product.dataValues.url_site = `${req.protocol}://${req.get('host')}/products/detail/${product.id_product}`;
            });
        } else {
            productList = [];
        };

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: productList.length,
                url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: productList
        };

        res.json(response);
    }
}

// =========== Exporto Controlador ===========================
module.exports = apiProductController                                                                                         // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.