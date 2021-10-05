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

    /*** Procesamos el login ***/
	loginProcess: (req, res) => {
        /* Verifico si existe el usuario */
        let userFound = User.findByField('email', req.body.email);                                 // Uso esta función que creé en el modelo para verificar ya existe.

		if (!userFound) {
			return res.render('login', {errors: {email: {msg: 'Usuario no registrado'}}});         // Creo una valicación propia. Ver que creo el objeto errors por mi cuenta con su mensaje.
		}
		
        /* Verifico contraseña + sesión + cookie */
        let validation = bcryptjs.compareSync(req.body.password, userFound.password);              // Valido contraseña.
        if (validation) {                                                                          // Si es correcta quiero guardarlo en sesión, borrando su password por seguridad.
            delete userFound.password;
            req.session.userLogged = userFound;                                                    // Guardo al usuario en sesión.

            // if (req.body.mantener) {                                                               // Ademas si tiene tildada la casilla "Mantener sesión abierta", lo guardo en una cookie.
            //     res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60})                // Guardo el email en una cookie para recordar su sesión. Recordar las cookies se gurardan en el cliente por eso usamos un .res().
            // }

            return res.redirect('/users/profile');                                 // Si todo está ok le muestro sus datos. 
        }

        res.render('login', {errors: {password: {msg: 'La contraseña no es válida'}}, oldData: req.body});    // Si el password es incorrcto muestro su error.
	},

    /*** Detalle de un usuario ***/
	profile: (req, res) => {
		res.render('userProfile', {user: req.session.userLogged});         // Ver que le paso el usuario que inició sesión.
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

        User.create(userToCreate);                             // Llamo al modelo.

		res.redirect('/users/login');
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

        /* Actualizo su sesión para continuar (sino queda en memoria)*/
        delete userToUpdate.password;
        req.session.userLogged = userToUpdate;

		res.redirect('/users/profile');
	},

    /*** Elimino un usuario ***/
    delete: (req, res) => {
		User.delete(req.params.id);

		// res.clearCookie('userEmail');
		req.session.destroy();
		res.redirect('/');
	},

    logout: (req, res) => {
		// res.clearCookie('userEmail');
		req.session.destroy();
		res.redirect('/');
	}
}

// =========== Exporto Controlador ===========================
module.exports = userController                                                  // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.