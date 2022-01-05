// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

const db = require('../database/models');										 // Elemento de sequelize que tiene todos los modelos.
const Op = db.Sequelize.Op;														 // Para poder usar operadores.
const sequelize = require('sequelize')										     // Para algunos operadores especiales.

// =========== Modelo =================================
const User = {

    /*** Todos los usuarios ***/
	findAll: async function () {
		return await db.User.findAll();
	},

    /*** Búsqueda de usuario por PK ***/
	findByPk: async function (id) {
		return await db.User.findByPk(id);
	},

    /*** Búsqueda de usuario por campo ***/
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

		return await db.User.findAll({
			where: {
				...whereCondition
			},
			limit: limitMax,
			order: orderCondition
		});
	},

	create: async function (userToCreate) {
		try {
			await db.User.create({ ...userToCreate });			 			// Se le debe pasar un objeto. Como ya userToCreate es un objeto, uso el spreadOperator.			
			return;
		} catch (error) {
			console.log('Error al crear usuario en la base de datos ' + error.message);
			return;
		}
	},

    update: async function (userToUpdate) {
		try {
			await db.User.update(
				{
					...userToUpdate
				},
				{
					where: { id_user: userToUpdate.id_user }
				}
			);
			return;
		} catch (error) {
			console.log('Error al actualizar usuario en la base de datos ' + error.message);
			return;
		}
    },

	delete: async function (id) {
		await db.User.destroy({
			where: { id_user: id }
		});
		return;
	}
}

// =========== Exporto Modelo =========================
module.exports = User;