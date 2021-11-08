// =========== Require's ==============================
const fs = require('fs');                                              // Para la lectura y escritura de archivos.
const path = require('path');                                          // Manejo de rutas.

// =========== Modelo =================================
const Order = require('../models/Order.model.js');

// =========== Controlador ============================
const orderCartController = {

    /*** Todas las ordenes ***/
    index: async (req, res) => {
        let orderList = await Order.join(req.session.userLogged.id_user, '1');
        res.render('productCart', {orderList: orderList});
    },

    /*** Creo una orden ***/
    store: async (req, res) => {

        /* Inserto nueva orden */
		let orderToCreate = {
            id_user: req.session.userLogged.id_user,
            id_product: req.body.id_product,
            id_status: "1"                                             // Código del estado "En carrito".
		}

		let newOrder = await Order.create(orderToCreate);              // Llamo al modelo.
        res.redirect('/products');
	},

    update: async (req, res) => {

        /* Actualizo estado de la orden */
		let orderToUpdate = {
            id_order: req.params.id,                                   // Uso el id del parámetro.
            id_status: "2"
		}

		await Order.update(orderToUpdate);                             // Llamo al modelo.

		res.redirect('/productCart');
	},

    delete: async (req, res) => {
		await Order.delete(req.params.id);

		res.redirect('/productCart');
	}
}

module.exports = orderCartController                                   // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.