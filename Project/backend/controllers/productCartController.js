// =========== Require's ==============================
const fs = require('fs');                                              // Para la lectura y escritura de archivos.
const path = require('path');                                          // Manejo de rutas.

// =========== Modelo =================================
const Order = require('../models/Order.model.js');

// =========== Controlador ============================
const orderCartController = {

    /*** Todas las ordenes ***/
    index: async (req, res) => {
        let orderList = await Order.join(req.session.userLogged.id_user, '1');  // Traigo todas las ordenes del usuario (podría usar findByField pero este ya funciona).
        let total = 0;                                                          // Si no lo inicializo, al momento de hacer la suma devuelve NaN (porque es undefined).

        orderList.forEach(order => {
            total += parseFloat(order.product.price);
        });

        res.render('productCart', {orderList: orderList, total: total});
    },

    /*** Creo una orden ***/
    store: async (req, res) => {

        /* Inserto nueva orden */
		let orderToCreate = {
            id_user: req.session.userLogged.id_user,
            id_product: req.body.id_product,
            id_status: req.body.id_status                              // Código del estado "En carrito". Definido en cada botón.
		}

		let newOrder = await Order.create(orderToCreate);              // Llamo al modelo.
        res.redirect('/products');
	},

    update: async (req, res) => {
        let orderToUpdate = {};

        /* Comprar ALL o individual */
        if (req.params.id == 'ALL') {                                               // Si presionó el botón comprar, vendrá con este parámetro.
            let orderList = await Order.join(req.session.userLogged.id_user, '1');  // Traigo todas las ordenes del usuario (podría usar findByField pero este ya funciona).
            
            for (order of orderList) {                                              // Le cambio el estado a "comprado" a cada orden.
                orderToUpdate = {
                    id_order: order.id_order,
                    id_status: req.body.id_status
                };
                await Order.update(orderToUpdate);                                  // IMPORTANTE: await no funciona con forEach().
            };
        } else {                                                                    // Si entra acá es porque no presionó el botón comprar ALL.
            /* Actualizo estado de única orden */
            orderToUpdate = {
                id_order: req.params.id,                                            // Uso el id del parámetro.
                id_status: req.body.id_status
            };
            await Order.update(orderToUpdate);                                      // Llamo al modelo.
        };

        res.redirect('/productCart');
	},

    delete: async (req, res) => {
		await Order.delete(req.params.id);

		res.redirect('/productCart');
	}
}

module.exports = orderCartController                                   // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.