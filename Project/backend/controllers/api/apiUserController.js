// =========== Require's ==============================
const path = require('path');                                                    // Manejo de rutas.

// =========== Modelo =================================
const User = require('../../models/User.model.js');

// =========== Controlador ============================
const apiUserController = {

    /*** Todos los usuarios ***/
    index: async (req, res) => {
        let userList = await User.findAll();

        /* Modifico la información de Sequelize */
        userList.forEach(user => {
            user.dataValues.url = `api/users/${user.id_user}`;
            delete user.dataValues.password;
            delete user.dataValues.birthdate;
        });

        /* Genero respuesta */
        let response = {
            meta: {
                status: 200,
                total: userList.length,
                url: '/api/users'
            },
            data: userList
        };

        res.json(response);
    },

    /*** Detalle de un usuario ***/
    detail: async (req, res) => {                                                // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        let userFound = await User.findByPk(req.params.id);                      // findByPk devuelve un objeto directamente, no un array.       

        /* Modifico la información de Sequelize */
        userFound.dataValues.url = `/api/users/${userFound.id_user}`;
        delete userFound.dataValues.password;
        delete userFound.dataValues.birthdate;

        res.json(userFound);
    }
}

// =========== Exporto Controlador ===========================
module.exports = apiUserController                                               // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.