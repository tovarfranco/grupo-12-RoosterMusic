// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

const db = require('../database/models');										 // Elemento de sequelize que tiene todos los modelos.
const Op = db.Sequelize.Op;														 // Para poder usar operadores.
const sequelize = require('sequelize')										     // Para algunos operadores especiales.

// =========== Modelo =================================
const Order = {

	/*** Todas las ordenes ***/
	findAll: async function () {
		return await db.Order.findAll();
	},

	/*** Búsqueda de orden por PK ***/
	findByPk: async function (id) {
		return await db.Order.findByPk(id);
	},

	/*** Búsqueda de orden por campo ***/
	findByField: async function (field, operator, value, limitMax, order) {
		let operatorCriteria;
		switch (operator) {
			case 'eq':
				operatorCriteria = Op.eq;
				break;
			case 'ne':
				operatorCriteria = Op.ne;
				break;
			case 'like':
				operatorCriteria = Op.like;
				break;
			default:
				operatorCriteria = Op.eq;
				break;
		};
		let whereCondition = {};
		whereCondition[field] = { [operatorCriteria]: value };

		let orderCondition;
		if (order == 'RANDOM') {
			orderCondition = sequelize.literal('rand()');
		};

		return await db.Order.findAll({
			where: {
				...whereCondition
			},
			limit: limitMax,
			order: orderCondition
		});
	},

	create: async function (orderToCreate) {
		try {
			return await db.Order.create({ ...orderToCreate });			 		 // Se le debe pasar un objeto. Como ya orderToCreate es un objeto, uso el spreadOperator.
		} catch (error) {
			console.log('Error al crear orden en la base de datos ' + error.message);
			return;
		}
	},

	update: async function (orderToUpdate) {
		try {
			await db.Order.update(
				{
					...orderToUpdate
				},
				{
					where: { id_order: orderToUpdate.id_order }
				}
			);
			return;
		} catch (error) {
			console.log('Error al actualizar orden en la base de datos ' + error.message);
			return;
		}
	},

	delete: async function (id) {
		await db.Order.destroy({
			where: { id_order: id }
		});
		return;
	},

	join: async function (id_user, id_status) {
		return await db.Order.findAll({
			where: { id_user: id_user, id_status: id_status },
			include: [{ association: "product" },],
			order: [['id_product', 'ASC'],]
		});
	}
}

// =========== Exporto Modelo =========================
module.exports = Order;