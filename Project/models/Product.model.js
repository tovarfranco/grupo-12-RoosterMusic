// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

// =========== Modelo =================================
const Product = {

    /*** Nombre de la BBDD ***/
	fileName: path.join(__dirname, "../database/productList.json"),              // Ruta del archivo BBDD.

    /*** Lectura BBDD ***/
	readData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));              // Importamos la BBDD a usar. Lista de objetos es devueta a la función que llamó a esta función.
	},

	generateId: function () {
		let productList = this.findAll();
		let lastProduct = productList.pop();                                     // Solo altero la variable local productList, no se modifica el archivo JSON.
		if (lastProduct) {
			return lastProduct.id + 1;
		}
		return 1;   // Debo devolver el valor 1 que será el primer id si la lista está vacia.
	},

    /*** Todos los productos ***/
	findAll: function () {
		return this.readData();
	},

    /*** Búsqueda de producto por PK ***/
	findByPk: function (id) {
		let productList = this.findAll();
		let productFound = productList.find(product => product.id == id);
		return productFound;
	},

    /*** Búsqueda de producto por campo ***/
	findByField: function (field, value) {
		let productList = this.findAll();
		let productFound = productList.find(product => product[field] == value);
		return productFound;
	},

	create: function (productToCreate) {
        let newProduct = {
            id: this.generateId(),
			...productToCreate
		}

        let productList = this.findAll();
		productList.push(newProduct);
		fs.writeFileSync(this.fileName, JSON.stringify(productList, null, 4));   // De esta forma lo guarda "formateado".
		return newProduct;
	},

    update: function (productToUpdate) {
        let productList = this.findAll();
        let index = productList.findIndex(product => product.id == productToUpdate.id);
        productList[index] = productToUpdate;
        fs.writeFileSync(this.fileName, JSON.stringify(productList, null, 4));   // De esta forma lo guarda "formateado".
        return; // No hace falta devolver nada.
    },

	delete: function (id) {
		let productList = this.findAll();
		productList = productList.filter(product => product.id != id);
		fs.writeFileSync(this.fileName, JSON.stringify(productList, null, 4));   // De esta forma lo guarda "formateado".
		return; // No hace falta devolver nada.
	}
}

// =========== Exporto Modelo =========================
module.exports = Product;