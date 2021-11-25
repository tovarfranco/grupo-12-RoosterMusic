// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

const db = require('../database/models');										 // Elemento de sequelize que tiene todos los modelos.
const Op = db.Sequelize.Op;														 // Para poder usar operadores.
const sequelize = require('sequelize')										     // Para algunos operadores especiales.

// =========== Modelo =================================
const Category = {

	/*** Todas las categorías ***/
	findAll: async function () {
		return await db.Category.findAll();
	},

	/*** Búsqueda de categoría por PK ***/
	findByPk: async function (id) {
		return await db.Category.findByPk(id);
	}
}

// =========== Exporto Modelo =========================
module.exports = Category;