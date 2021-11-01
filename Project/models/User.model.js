// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

const db = require('../database/models');										 // Ekemento de sequelize que tiene todos los modelos.
const Op = db.Sequelize.Op;														 // Para poder usar operadores.

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
	findByField: async function (field, value) {
		let condition = {};
		condition[field] = { [Op.eq]: value }

		return await db.User.findAll({
			where: {
				...condition
			}
		});
	},

	create: async function (userToCreate) {
		try {
			await db.User.create({ ...userToCreate })			 			// Se le debe pasar un objeto. Como ya userToCreate es un objeto, uso el spreadOperator.			
			return;
		} catch (error) {
			res.send('Error crear usuario en la base de datos ' + error.message);
			return;
		}
	},

    update: function (userToUpdate) {
        // let userList = this.findAll();
        // let index = userList.findIndex(user => user.id == userToUpdate.id);
        // userList[index] = userToUpdate;
        // fs.writeFileSync(this.fileName, JSON.stringify(userList, null, 4));  // De esta forma lo guarda "formateado".
        // return; // No hace falta devolver nada.
    },

	delete: function (id) {
		// let userList = this.findAll();
		// userList = userList.filter(user => user.id != id);
		// fs.writeFileSync(this.fileName, JSON.stringify(userList, null, 4));  // De esta forma lo guarda "formateado".
		// return; // No hace falta devolver nada.
	}
}

// =========== Exporto Modelo =========================
module.exports = User;