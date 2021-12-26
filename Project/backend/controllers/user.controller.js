// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.
const {validationResult} = require('express-validator');                         // También se requiere acá. Solo nos interesa el elemento validationResult de espress-validator (destructuring).
const bcryptjs = require('bcryptjs');                                            // Para encriptar las contraseñas.

// =========== Modelo =================================
const User = require('../models/User.model.js');

// =========== Controlador ============================
const userController = {

    /*** Logueo ***/
    login: (req, res) => {
        res.render('login');
    },

    /*** Procesamos el login ***/
	loginProcess: async (req, res) => {
        /* Verifico si existe el usuario */
        let userFound = await User.findByField('email', 'eq', req.body.email);                     // Uso esta función que creé en el modelo para verificar si ya existe. findByField devuelve un array de objetos.
        userFound = userFound[0];                                                                  // Como findByField devuelve un array de objetos necesito solo el primero.

		if (!userFound) {
			return res.render('login', {errors: {email: {msg: 'Usuario no registrado'}}});         // Creo una validación propia. Ver que creo el objeto errors por mi cuenta con su mensaje.
		}
		
        /* Verifico contraseña + sesión + cookie */
        let validation = bcryptjs.compareSync(req.body.password, userFound.password);              // Valido contraseña.
        if (validation) {                                                                          // Si es correcta quiero guardarlo en sesión, borrando su password por seguridad.
            delete userFound.password;
            req.session.userLogged = userFound;                                                    // Guardo al usuario en sesión.

            if (req.body.mantener) {                                                               // Ademas si tiene tildada la casilla "Mantener sesión abierta", lo guardo en una cookie.
                res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60) * 60 * 1})            // Guardo el email en una cookie para recordar su sesión. Recordar las cookies se guardan en el cliente por eso usamos un .res().
            }

            return res.redirect('/users/profile');                                                 // Si todo está ok le muestro sus datos. 
        }

        res.render('login', {errors: {password: {msg: 'La contraseña no es válida'}}, oldData: req.body});    // Si el password es incorrecto muestro su error.
	},

    /*** Detalle de un usuario ***/
	profile: (req, res) => {
		res.render('userProfile', {user: req.session.userLogged});               // Ver que le paso el usuario que inició sesión.
    },

    /*** Creo un usuario ***/
    create: (req, res) => {
		res.render('register')
	},

	store: async (req, res) => {
        /* Verifico errores por express-validator */
        const resultValidation = validationResult(req);                          // Guardamos los resultados de las validaciones. Es un ARRAY de objetos que tiene los errores que se produjeron (input name, mensaje, etc).
        
		if (!resultValidation.isEmpty()) {                                       // Si hubo errores, devuelvo la vista con los errores + la data ya ingresada del formulario.
			return res.render('register', {errors: resultValidation.mapped(), oldData: req.body});   // .mapped() (solo de express-validator) convierte a ese array en un OBJETO literal con claves: los input names y valores: el contenido de todo ese error. Paso la data del body nuevamente así no la pierdo.
		}

        /* Verifico si ya existe el usuario (mismo email) */
        let userFound = await User.findByField('email', 'eq', req.body.email);   // Uso esta función que creé en el modelo para verificar ya existe. findByField devuelve un array de objetos.
        userFound = userFound[0];                                                // Como findByField devuelve un array de objetos necesito solo el primero.

		if (userFound) {
			return res.render('register', {errors: {email: {msg: 'Este email ya está registrado'}}, oldData: req.body});    // Creo una valicación propia. Ver que creo el objeto errors por mi cuenta con su mensaje.
		}

        /* Sin errores, continúo con la lógica */
        /* Inserto nuevo usuario */
        let userToCreate = {                                                     // Creo un objeto temporal que le pasaré al modelo para que lo inserte.
            name: req.body.nombre,
            surname: req.body.apellido,
            document: req.body.dni,
            country: req.body.pais,
            address: req.body.domicilio,
            birthdate: req.body.nacimiento,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),                  // Encriptamos la contraseña. Se pisa el valor del .body por esta nueva.
            img: (req.file) ? req.file.filename : "img-sin-imagen-disponible.jpg"
        }

        await User.create(userToCreate);                                         // Llamo al modelo. Acá se frena el código hasta que terminé el modelo (por estar dentro de una función async).

		res.redirect('/users/login');                                            // Una vez terminado, ejecuta esta instrucción.
	},

    /*** Modifico un usuario ***/
	edit: async (req, res) => {
		let userFound = await User.findByPk(req.params.id);                      // findByPk devuelve un objeto directamente, no un array.                               
        res.render('userEdit', {user: userFound});
	},

    update: async (req, res) => {
        /* Busco el usuario */
        let userFound = await User.findByPk(req.params.id)                       // Buscamos el usuario, me servirá para varias funciones. findByPk devuelve un objeto directamente, no un array.

        /* Actualizo usuario */
		let userToUpdate = {                                                     // Creo un objeto temporal que le pasaré el modelo para que lo actualice.
            id_user: userFound.id_user,
            name: req.body.nombre,
            surname: req.body.apellido,
            document: req.body.dni,
            country: req.body.pais,
            address: req.body.domicilio,
            birthdate: req.body.nacimiento,
            email: req.body.email,
            password: req.body.password,
            img: (req.file) ? req.file.filename : userFound.img
		}

        await User.update(userToUpdate);                                         // Llamo al modelo.

        /* Actualizo su sesión para continuar (sino queda en memoria)*/
        delete userToUpdate.password;
        req.session.userLogged = userToUpdate;

		res.redirect('/users/profile');
	},

    /*** Elimino un usuario ***/
    delete: async (req, res) => {
		await User.delete(req.params.id);

		res.clearCookie('userEmail');                                            // Destruyo la cookie sino no me voy a poder desloguear.
		req.session.destroy();
		res.redirect('/');
	},

    /*** Cierre de sesión ***/
    logout: (req, res) => {
		res.clearCookie('userEmail');                                            // Destruyo la cookie sino no me voy a poder desloguear.
		req.session.destroy();
		res.redirect('/');
	},

    test: async function (req, res) {
        try {
            const result = await User.findByField('email', 'eq', 'franco3@hotmail.com');
            res.send(result);
        } catch (error) {
            res.status(500).json({ data: null, error: error, success: false });
        }
    }
}

// =========== Exporto Controlador ===========================
module.exports = userController                                                  // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.