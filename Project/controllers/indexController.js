// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

// =========== Modelo =================================
const Product = require('../models/Product.model.js');
const Category = require('../models/Product.model.js');

// =========== Controlador ===========================
const indexController = {

	/*** Productos para las secciones ***/
	index: async (req, res) => {                                // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
		let productList1 = await Product.findAll();
		let productList2 = await Product.findAll();
		res.render('index', {productList1: productList1, 
							 productList2: productList2});      // ESTE ES UN .EJS (modificar los .html a .ejs). Es NECESARIO setear el VIEW ENGINE en app.js para usar res.render(). Le envía a ESTA view las variables dinámicas que necesita.
	
	},

    search: async (req, res) => {
		let productList = await Product.findByField('name', 'like', "%" + req.query.keyword + "%");
		res.render('results', {keyword: req.query.keyword,
							   productList: productList,});
	},

    category: (req, res) => {
		let resultadoBusqueda = productList.filter(product => product.category == req.params.category);
		res.render('results', {resultadoBusqueda: resultadoBusqueda, 
							   busqueda: categoria});
	}
}

module.exports = indexController                                // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.