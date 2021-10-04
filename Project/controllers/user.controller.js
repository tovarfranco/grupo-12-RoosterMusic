// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.
const {validationResult} = require('express-validator');                         // Tambien se requiere acá. Solo nos interesa el elemento validationResult de espress-validator (destructuring).
const bcryptjs = require('bcryptjs');                                            // Para encriptar las contraseñas.

// =========== Modelo ============================
const User = require('../models/User.model.js');

// =========== Controlador ============================
const userController = {

    /*** Logueo ***/
    login: (req, res) => {
        res.render('login');
    },

    /*** Detalle de un usuario ***/
    detail: (req, res) => {
        let userFound = User.findByPk(req.params.id)                             // Llamo al modelo.
        res.render('userDetail', {user: userFound});
    },

    /*** Creo un usuario ***/
    create: (req, res) => {
		res.render('register')
	},

	store: (req, res) => {
        /* Verifico errores por express-validator */
        const resultValidation = validationResult(req);                          // Guardamos los resultados de las validaciones. Es un ARRAY de objetos que tiene los errores que se produjeron (input name, mensaje, etc).
        
		if (!resultValidation.isEmpty()) {                                       // Si hubo errores, devuelvo la vista con los errores + la data ya ingresada del formulario.
			return res.render('register', {errors: resultValidation.mapped(), oldData: req.body});   // .mapped() convierte a ese array en un OBJETO literal con claves el input name y valor el contenido de todo ese error. Paso la data del body nuevamente así lo la pierdo.
		}

        /* Verifico si ya existe el usuario (mismo email) */
        let userFound = User.findByField('email', req.body.email);               // Uso esta función que creé en el modelo para verificar ya existe.

		if (userFound) {
			return res.render('register', {errors: {email: {msg: 'Este email ya está registrado'}}, oldData: req.body});    // Creo una valicación propia. Ver que creo el objeto errors por mi cuenta con su mensaje.
		}

        /* Sin errores, continúo con la lógica */
        /* Imagen */
		let imagenName;                                                          // Para guardar la imagen. Si existe uso su nombre sino uso el default.
		if (req.file) {
			imagenName = req.file.filename;
		} else {
			imagenName = "img-sin-imagen-disponible.jpg"
		}

        /* Inserto nuevo usuario */
		let userToCreate = {                                                     // Creo un objeto temporal que le pasaré al modelo para que lo inserte.
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),                  // Encriptamos la contraseña. Se pisa el valor del .body por esta nueva.
            img: imagenName
		}

        let userCreated = User.create(userToCreate);                             // Llamo al modelo.

		res.redirect('/users/detail/' + userCreated.id);
	},

    /*** Modifico un usuario ***/
	edit: (req, res) => {
		let userFound = User.findByPk(req.params.id)
		res.render('userEdit', {user: userFound});
	},

    update: (req, res) => {
        /* Busco el usuario */
        let userFound = User.findByPk(req.params.id)                             // Buscamos el usuario, me servirá para varias funciones.

        /* Imagen */
		let imagenName;                                                          // Para guardar la imagen. Si existe uso su nombre sino uso la que ya tenía.
		if (req.file) {
			imagenName = req.file.filename;
		} else {
			imagenName = userFound.img;
		}

        /* Actualizo usuario */
		let userToUpdate = {                                                     // Creo un objeto temporal que le pasaré el moddelo para que lo actualice.
            id: userFound.id,
            ...req.body,
            img: imagenName
		}

        User.update(userToUpdate);                                               // Llamo al modelo.

		res.redirect('/users/detail/' + req.params.id);
	},

    /*** Elimino un usuario ***/
    delete: (req, res) => {
		User.delete(req.params.id);

		res.redirect('/');
	}
}

// =========== Exporto Controlador ===========================
module.exports = userController                                                  // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.