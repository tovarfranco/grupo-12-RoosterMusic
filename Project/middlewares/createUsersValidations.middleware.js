// =========== Require's ==============================
const path = require("path");                                                  // Para manejar rutas. Eimina la dependencia del sistema operativo.
const {body} = require('express-validator');                                   // Usamos destructuring para requerir solo el elemento body de express-validator.

// =========== Express-validator configuración ========
const createUsersValidations = [                                               // Este array tendrá los inputs name que deseamos validar. Estará asociado a un formulario/ruta. Colocarlo como middleware en la RUTA deseada.
	body('nombre').notEmpty().withMessage('Completar el nombre'),
    body('apellido').notEmpty().withMessage('Completar el apellido'),
    body('dni').notEmpty().withMessage('Completar el documento'),
    body('pais').notEmpty().withMessage('Completar el pais'),
    body('domicilio').notEmpty().withMessage('Completar el domicilio'),
    body('nacimiento').notEmpty().withMessage('Completar la fecha'),
    body('email')
        .notEmpty().withMessage('Completar el email').bail()                   // bail() permite FRENAR las validaciones para que no se muestren todas al cliente al mismo tiempo, sino que muestra de a una.
        .isEmail().withMessage('Formato de correo inválido'),
    body('password').notEmpty().withMessage('Completar la contraseña')
        .isLength({min: 6}).withMessage('Mínimo 6 caracteres'),

    body('img').custom((value, {req}) => {                                     // Validación para imagenes. Se debe usar una custom.
		let file = req.file;
		let extPermitidas = ['.jpg', '.png'];
		
		if (!file) {                                                           // Si no viene una imagen genera error con el mensaje indicado. COMENTADO para que no sea obligatoria.
			//throw new Error('Subir una imagen');
		} else {
			let extActual = path.extname(file.originalname);
			if (!extPermitidas.includes(extActual)) {
				throw new Error('Las extensiones permitidas son ' +  extPermitidas.join(', '));
			}
		}

		return true;                                                            // SI O SI para indicar que no hubo errores.
	})
]

module.exports = createUsersValidations;                                        // Lo exportamos para su uso.