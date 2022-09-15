// =========== Require's ==============================
const path = require('path');                                                    // Manejo de rutas.
const bcryptjs = require('bcryptjs');                                            // Para encriptar las contraseñas.

// =========== Modelo =================================
const User = require('../../models/User.model.js');

// =========== Controlador ============================
const apiUserController = {

    /*** Todos los usuarios ***/
    index: async (req, res) => {
        let userList = await User.findAll();

        /* Modifico la información de Sequelize */
        userList.forEach(user => {
            user.dataValues.img = `${req.protocol}://${req.get('host')}/images/users/${user.img}`;
            user.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${user.id_user}`;
            delete user.dataValues.password;
            delete user.dataValues.birthdate;
        });

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: userList.length,
                url: `${req.protocol}://${req.get('host')}${req.originalUrl}`
            },
            data: userList
        };

        res.json(response);
    },

    /*** Detalle de un usuario ***/
    detail: async (req, res) => {                                                // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let userFound = await User.findByPk(req.params.id);                      // findByPk devuelve un objeto directamente, no un array.       

        if (userFound) {                                                         // Si no es nulo... (Sequelize devuelve nulo si no lo encuentra).
            /* Modifico la información de Sequelize */
            userFound.dataValues.url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
            userFound.dataValues.img = `${req.protocol}://${req.get('host')}/images/users/${userFound.img}`;
            delete userFound.dataValues.password;
            delete userFound.dataValues.birthdate;
        } else {
            userFound = [];
        };

        res.json(userFound);
    },

    /*** Procesamos el login ***/
	loginProcess: async (req, res) => {
        /* Verifico si existe el usuario */
        let userFound = await User.findByField('email', 'eq', req.body.email);             // Uso esta función que creé en el modelo para verificar si ya existe. findByField devuelve un array de objetos.
        userFound = userFound[0];                                                          // Como findByField devuelve un array de objetos necesito solo el primero.

		if (!userFound) {
			return res.json({error: 'Usuario no registrado'});                             // Creo una validación propia. Ver que creo el objeto errors por mi cuenta con su mensaje.
		}

        if (userFound.email != 'admin@hotmail.com') {
			return res.json({error: 'Usuario no administrador'});                          // Creo una validación propia. Ver que creo el objeto errors por mi cuenta con su mensaje.
		}
		
        /* Verifico contraseña */
        let validation = bcryptjs.compareSync(req.body.password, userFound.password);      // Valido contraseña.
        if (validation) {                                                                  // Si es correcta borro su password por seguridad.
            delete userFound.dataValues.password;
            userFound.dataValues.img = `${req.protocol}://${req.get('host')}/images/users/${userFound.img}`;

            return res.json(userFound);                                                    // Si todo está ok le muestro sus datos. 
        };

        return res.json({error: 'Contraseña incorrecta'});                                 // Si el password es incorrecto muestro su error.
	}
}

// =========== Exporto Controlador ===========================
module.exports = apiUserController                                                         // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.