// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

// =========== Lectura BBDD ===========================
const productListPath = path.join(__dirname, "../database/productList.json");    // Ruta del archivo BBDD.
let productList = JSON.parse(fs.readFileSync(productListPath, 'utf-8'));         // Importamos la BBDD que se pasará a las vistas. Lista de objetos.

// =========== Controlador ===========================
const productController = {

    /*** Todos los productos ***/
    index: (req,res) => {
        res.render('products', {productList: productList});
    },

    /*** Detalle de un producto ***/
    detail: (req,res) => {                                                         // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        const product = productList.find(product => product.id == req.params.id);  // Busca en la lista el producto que tiene el mismo id que el pasado por parámetro.
        res.render('productDetail', {product: product, productList: productList}); // Le envía a ESTA view las variables dinámicas que necesita. ESTE ES UN .EJS (modificar los .html a .ejs). Es NECESARIO setear el VIEW ENGINE en app.js para usar res.render().
    },

    /*** Creo un producto ***/
    create: (req, res) => {
		res.render('productCreate')
	},

	store: (req, res) => {
		let imagenName;                                                 // Para guardar la imagen. Si existe uso su nombre sino uso el default.
		if (req.file) {
			imagenName = req.file.filename;
		} else {
			imagenName = "img-sin-imagen-disponible.jpg"
		}

		let nuevo = {
			id: productList.slice(-1)[0].id + 1,                        // Lo hice de esta forma solo para agregar un id "autonumérico".
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

		productList.push(nuevo);
		fs.writeFileSync(productListPath, JSON.stringify(productList, null, 4));  // De esta forma lo guarda "formateado".

		res.redirect('/products/detail/' + nuevo.id);
	},

    /*** Modifico un producto ***/
	edit: (req, res) => {
		const product = productList.find(product => product.id == req.params.id);
		res.render('productEdit', {product: product});
	},

    update: (req, res) => {
		let imagenName;                                                 // Para guardar la imagen. Si existe uso su nombre sino uso la que ya tenía.
		if (req.file) {
			imagenName = req.file.filename;
		} else {
            const product = productList.find(product => product.id == req.params.id);
			imagenName = product.image;
		}

		productList.forEach(product => {
			if (product.id == req.params.id){
                product.name = req.body.nombre,
                product.description = req.body.descripcion,
                product.price = req.body.precio,
                product.image = imagenName,								// Guardo el nombre de la imagen que llega de Multer. Tiene una lógica arriba.
                product.brand = req.body.marca,
                product.model = req.body.modelo,
                product.color = req.body.color,
                product.material = req.body.material,
                product.origin = req.body.origen,
                product.year = req.body.anio,
                product.category = req.body.categoria,
                product.availability = req.body.disponibilidad
			}
		});
		
		fs.writeFileSync(productListPath, JSON.stringify(productList, null, 4));  // De esta forma lo guarda "formateado".
		
		res.redirect('/products/detail/' + req.params.id);
	},

    /*** Elimino un producto ***/
    delete : (req, res) => {
		productList = productList.filter(product => product.id != req.params.id);
		fs.writeFileSync(productListPath, JSON.stringify(productList, null, 4));  // De esta forma lo guarda "formateado".

		res.redirect('/products');
	}
}

// =========== Exporto Controlador ===========================
module.exports = productController                                      // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.