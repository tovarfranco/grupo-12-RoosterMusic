// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

// =========== Modelo =================================
const User = {

    /*** Nombre de la BBDD ***/
	fileName: path.join(__dirname, "../database/userList.json"),                 // Ruta del archivo BBDD.

    /*** Lectura BBDD ***/
	readData: function () {
		return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));              // Importamos la BBDD a usar. Lista de objetos es devueta a la función que llamó a esta función.
	},

	generateId: function () {
		let userList = this.findAll();
		let lastUser = userList.pop();                                           // Solo altero la variable local userList, no se modifica el archivo JSON.
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;   // Debo devolver el valor 1 que será el primer id si la lista está vacia.
	},

    /*** Todos los usuarios ***/
	findAll: function () {
		return this.readData();
	},

    /*** Búsqueda de usuario por PK ***/
	findByPk: function (id) {
		let userList = this.findAll();
		let userFound = userList.find(user => user.id == id);
		return userFound;
	},

    /*** Búsqueda de usuario por campo ***/
	findByField: function (field, value) {
		let userList = this.findAll();
		let userFound = userList.find(user => user[field] == value);
		return userFound;
	},

	create: function (userToCreate) {
        let newUser = {
            id: this.generateId(),
			...userToCreate
		}

        let userList = this.findAll();
		userList.push(newUser);
		fs.writeFileSync(this.fileName, JSON.stringify(userList, null, 4));  // De esta forma lo guarda "formateado".
		return newUser;
	},

    update: function (userToUpdate) {
        let userList = this.findAll();
        let index = userList.findIndex(user => user.id == userToUpdate.id);
        userList[index] = userToUpdate;
        fs.writeFileSync(this.fileName, JSON.stringify(userList, null, 4));  // De esta forma lo guarda "formateado".
        return; // No hace falta devolver nada.
    },

	delete: function (id) {
		let userList = this.findAll();
		userList = userList.filter(user => user.id != id);
		fs.writeFileSync(this.fileName, JSON.stringify(userList, null, 4));  // De esta forma lo guarda "formateado".
		return; // No hace falta devolver nada.
	}
}

// =========== Exporto Modelo =========================
module.exports = User;