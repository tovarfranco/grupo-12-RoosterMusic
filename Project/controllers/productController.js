// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

// =========== Modelo ============================
const Product = require('../models/Product.model.js');

// =========== Controlador ============================
const productController = {

    /*** Todos los productos ***/
    index: (req, res) => {
        let productList = Product.findAll();
        res.render('products', {productList: productList});
    },

    /*** Detalle de un producto ***/
    detail: (req, res) => {                                                             // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let productFound = Product.findByPk(req.params.id);                             // Busca en la lista el producto que tiene el mismo id que el pasado por parámetro.
        let productList = Product.findAll();                                            // Es para mostrar en la vista los otros productos también.
        res.render('productDetail', {product: productFound, productList: productList}); // Le envía a ESTA view las variables dinámicas que necesita. ESTE ES UN .EJS (modificar los .html a .ejs). Es NECESARIO setear el VIEW ENGINE en app.js para usar res.render().
    },

    /*** Creo un producto ***/
    create: (req, res) => {
		res.render('productCreate');
	},

	store: (req, res) => {
        /* Imagen */
		let imagenName;                                                 // Para guardar la imagen. Si existe uso su nombre sino uso el default.
		if (req.file) {
			imagenName = req.file.filename;
		} else {
			imagenName = "img-sin-imagen-disponible.jpg"
		}

        /* Inserto nuevo producto */
		let productToCreate = {
            name: req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
			image: imagenName,								            // Guardo el nombre de la imagen que llega de Multer. Tiene una lógica arriba.
            brand: req.body.marca,
            model: req.body.modelo,
            color: req.body.color,
            material: req.body.material,
            origin: req.body.origen,
            year: req.body.anio,
            category: req.body.categoria,
            availability: req.body.disponibilidad
		}

		let newProduct = Product.create(productToCreate);               // Llamo al modelo.

		res.redirect('/products/detail/' + newProduct.id);
	},

    /*** Modifico un producto ***/
	edit: (req, res) => {
		let productFound = Product.findByPk(req.params.id);
		res.render('productEdit', {product: productFound});
	},

    update: (req, res) => {
        /* Busco el producto */
        let productFound = Product.findByPk(req.params.id)             // Buscamos el producto, me servirá para varias funciones.

        /* Imagen */
		let imagenName;                                                 // Para guardar la imagen. Si existe uso su nombre sino uso la que ya tenía.
		if (req.file) {
			imagenName = req.file.filename;
		} else {
			imagenName = productFound.image;
		}

        /* Actualizo producto */
		let productToUpdate = {
            id: productFound.id,                                        // Uso el id del producto que encontré.
            name: req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
			image: imagenName,								            // Guardo el nombre de la imagen que llega de Multer. Tiene una lógica arriba.
            brand: req.body.marca,
            model: req.body.modelo,
            color: req.body.color,
            material: req.body.material,
            origin: req.body.origen,
            year: req.body.anio,
            category: req.body.categoria,
            availability: req.body.disponibilidad
		}
		
		Product.update(productToUpdate);                                // Llamo al modelo.
		
		res.redirect('/products/detail/' + req.params.id);
	},

    /*** Elimino un producto ***/
    delete: (req, res) => {
		Product.delete(req.params.id);

		res.redirect('/products');
	}
}

// =========== Exporto Controlador ===========================
module.exports = productController                                      // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.