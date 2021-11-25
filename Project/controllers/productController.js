// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

// =========== Modelo =================================
const Product = require('../models/Product.model.js');
const Category = require('../models/Category.model.js');
const Campaign = require('../models/Campaign.model.js');

// =========== Controlador ============================
const productController = {

    /*** Todos los productos ***/
    index: async (req, res) => {
        let productList = await Product.findAll();
        res.render('products', {productList: productList});
    },

    /*** Detalle de un producto ***/
    detail: async (req, res) => {                                                                                  // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let productFound = await Product.join(req.params.id);                                                      // Busca en la lista el producto que tiene el mismo id que el pasado por parámetro.
        let productList = await Product.findByField('id_category', 'eq', productFound.id_category, 4, 'RANDOM');   // Es para mostrar en la vista los otros productos también. Por defecto limit: 4 y orden aleatorio para que no aparexcan siempre los mismos.
        res.render('productDetail', {product: productFound, productList: productList});                            // Le envía a ESTA view las variables dinámicas que necesita. ESTE ES UN .EJS (modificar los .html a .ejs). Es NECESARIO setear el VIEW ENGINE en app.js para usar res.render().
    },

    /*** Creo un producto ***/
    create: async (req, res) => {
        let categoryList = await Category.findAll();                          // Para desplegable de categorías disponibles.
        let campaignList = await Campaign.findAll();                          // Para desplegable de campañas disponibles.
		res.render('productCreate', {categoryList: categoryList,
                                     campaignList: campaignList});
	},

	store: async (req, res) => {

        /* Inserto nuevo producto */
		let productToCreate = {
            name: req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
			image: (req.file) ? req.file.filename : "img-sin-imagen-disponible.jpg",    // Guardo el nombre de la imagen que llega de Multer. Sino default
            brand: req.body.marca,
            model: req.body.modelo,
            color: req.body.color,
            material: req.body.material,
            origin: req.body.origen,
            year: req.body.anio,
            id_category: req.body.categoria,
            availability: req.body.disponibilidad,
            id_campaign: req.body.campania
		}

		let newProduct = await Product.create(productToCreate);               // Llamo al modelo.

		res.redirect('/products/detail/' + newProduct.id_product);
	},

    /*** Modifico un producto ***/
	edit: async (req, res) => {
		let productFound = await Product.findByPk(req.params.id);
        let categoryList = await Category.findAll();                          // Para desplegable de categorías disponibles.
        let campaignList = await Campaign.findAll();                          // Para desplegable de campañas disponibles.
		res.render('productEdit', {product: productFound,
                                   categoryList: categoryList,
                                   campaignList: campaignList});
	},

    update: async (req, res) => {
        /* Busco el producto */
        let productFound = await Product.findByPk(req.params.id)              // Buscamos el producto, me servirá para varias funciones. findByPk devuelve un objeto directamente, no un array.

        /* Actualizo producto */
		let productToUpdate = {
            id_product: productFound.id_product,                              // Uso el id del producto que encontré.
            name: req.body.nombre,
            description: req.body.descripcion,
            price: req.body.precio,
			image: (req.file) ? req.file.filename : productFound.image,       // Guardo el nombre de la imagen que llega de Multer. Tiene una lógica arriba.
            brand: req.body.marca,
            model: req.body.modelo,
            color: req.body.color,
            material: req.body.material,
            origin: req.body.origen,
            year: req.body.anio,
            id_category: req.body.categoria,
            availability: req.body.disponibilidad,
            id_campaign: req.body.campania
		}
		
		await Product.update(productToUpdate);                                // Llamo al modelo.
		
		res.redirect('/products/detail/' + req.params.id);
	},

    /*** Elimino un producto ***/
    delete: async (req, res) => {
		await Product.delete(req.params.id);

		res.redirect('/products');
	},

    test: async function (req, res) {
        try {
            const result = await Product.test(1);
            res.send(result);
        } catch (error) {
            res.status(500).json({ data: null, error: error, success: false });
        }
    }
}

// =========== Exporto Controlador ===========================
module.exports = productController                                      // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.