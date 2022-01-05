// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

// =========== Modelo =================================
const Product = require('../models/Product.model.js');
const Category = require('../models/Category.model.js');

// =========== Controlador ===========================
const indexController = {

	/*** Productos para las secciones ***/
	index: async (req, res) => {                                // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
		let productList1 = await Product.findByField('id_campaign', 'eq', '2', 6);	// Busco los "Mas vistos".
		let productList2 = await Product.findByField('id_campaign', 'eq', '3', 6);	// Busco los "Oferta".
		let categoryList = await Category.findAll();
		res.render('index', {productList1: productList1, 
							 productList2: productList2,
							 categoryList: categoryList});      // ESTE ES UN .EJS (modificar los .html a .ejs). Es NECESARIO setear el VIEW ENGINE en app.js para usar res.render(). Le envía a ESTA view las variables dinámicas que necesita.
	},

    search: async (req, res) => {
		let productList = await Product.findByField('name', 'like', "%" + req.query.keyword + "%");
		res.render('results', {keyword: req.query.keyword,
							   productList: productList,});
	},

    category: async (req, res) => {
		let category = await Category.findByPk(req.params.id);
		let productList = await Product.findByField('id_category', 'eq', req.params.id);
		res.render('results', {keyword: category.name,
							   productList: productList});
	}
}

module.exports = indexController                                // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.