// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

const db = require('../database/models');										 // Elemento de sequelize que tiene todos los modelos.
const Op = db.Sequelize.Op;														 // Para poder usar operadores.
const sequelize = require('sequelize')										     // Para algunos operadores especiales.

// =========== Modelo =================================
const Product = {

	/*** Todos los productos ***/
	findAll: async function () {
		return await db.Product.findAll();
	},

	/*** Búsqueda de producto por PK ***/
	findByPk: async function (id) {
		return await db.Product.findByPk(id);
	},

	/*** Búsqueda de producto por campo ***/
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

		return await db.Product.findAll({
			where: {
				...whereCondition
			},
			limit: limitMax,
			order: orderCondition
		});
	},

	create: async function (productToCreate) {
		try {
			return await db.Product.create({ ...productToCreate });			 		 // Se le debe pasar un objeto. Como ya productToCreate es un objeto, uso el spreadOperator.
		} catch (error) {
			console.log('Error al crear producto en la base de datos ' + error.message);
			return;
		}
	},

	update: async function (productToUpdate) {
		try {
			await db.Product.update(
				{
					...productToUpdate
				},
				{
					where: { id_product: productToUpdate.id_product }
				}
			);
			return;
		} catch (error) {
			console.log('Error al actualizar producto en la base de datos ' + error.message);
			return;
		}
	},

	delete: async function (id) {
		await db.Product.destroy({
			where: { id_product: id }
		});
		return;
	},

	join: async function (id) {
		return await db.Product.findByPk(id, {
			include: [{ association: "category" },]
		});
	}
}

// =========== Exporto Modelo =========================
module.exports = Product;