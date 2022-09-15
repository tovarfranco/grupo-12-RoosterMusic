// =========== Require's ==============================
const path = require('path');                                                          // Manejo de rutas.

// =========== Modelo =================================
const Order = require('../../models/Order.model.js');
const Product = require('../../models/Product.model.js');
const User = require('../../models/User.model.js');

// =========== Controlador ============================
const apiOrderController = {

    /*** Todas las ordenes ***/
    index: async (req, res) => {

        /* Información de ordenes */
        let orderList = await Order.joinAllProductUser('2');

        /* Modifico la información de Sequelize */
        orderList.forEach(order => {
            order.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${order.id_order}`;
            let day = order.last_modified.getUTCDate();
            let month = order.last_modified.getMonth() + 1;
            let year = order.last_modified.getFullYear();
            order.dataValues.last_modified_date = year + "-" + (month <= 9 ? '0' + month : month) + "-" + (day <= 9 ? '0' + day : day);
        });

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: orderList.length,
                url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: orderList
        };

        res.json(response);
    },

    /*** Detalle de una orden ***/
    detail: async (req, res) => {                                                      // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let categoryFound = await Order.findByPk(req.params.id);                       // findByPk devuelve un objeto directamente, no un array.       

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
module.exports = apiOrderController                                                    // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.