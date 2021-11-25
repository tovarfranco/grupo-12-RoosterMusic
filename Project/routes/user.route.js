// =========== Require's ==============================
const express = require('express');                                            // Siempre requerimos express aunque ya se haya requerido en el entry point.
const router = express.Router();                                               // Este objeto nos permite crear rutas.
const path = require("path");                                                  // Para manejar rutas. Eimina la dependencia del sistema operativo.
const {body} = require('express-validator');                                   // Usamos destructuring para requerir solo el elemento body de express-validator.

// =========== Controladores ==========================
const userController = require('../controllers/user.controller.js');           // ACA requerimos el controlador que tiene los callbacks que generarán las respuestas.

// =========== Multer =================================
const upload = require('../middlewares/userMulter.middleware.js');             // Acá guardamos la variable de configuración de Multer. Usarlo en la ruta que deseemos.

// =========== Middlewares ============================
const guestMiddleware = require('../middlewares/guest.middleware.js');         // Uso mi propio middleware.
const authMiddleware = require('../middlewares/auth.middleware.js');           // Uso mi propio middleware.

// =========== Express-validator ======================
const createUsersValidations = require('../middlewares/createUsersValidations.middleware.js');  // Este array tendrá los inputs name que deseamos validar. Estará asociado a un formulario/ruta. Colocarlo com omiddleware en la ruta deseada.

// =========== Router =================================
/*** Login *******/
router.get('/login', guestMiddleware, userController.login);                                    // ACA se pone la ruta que sacamos de app.js. Este será el encargado de enviar la petición al controlador correspondiente para que genere la respuesta. Debemos usar el objeto router + método HTTP + callback (quien genera la respuesta). Usamos también SUBRUTAS del la funcionalidad.
router.post('/login', userController.loginProcess);

/*** Detalle de un usuario ****/
router.get('/profile', authMiddleware, userController.profile);

/*** Creo un usuario *******/
router.get('/create', guestMiddleware, userController.create);
router.post('/create', upload.single('img'), createUsersValidations, userController.store);     // Acá va el name del input file para Multer. Acá se pone el array de validaciones de express-validator.

/*** Modifico un usuario ******/
router.get('/edit/:id', userController.edit);
router.put('/edit/:id', upload.single('img'), userController.update);          // Acá va el name del input file.

/*** Elimino un usuario *******/
router.delete('/delete/:id', userController.delete);

/*** Cerrar sesión ***/
router.get('/logout', userController.logout);

/*** Testing ****/
router.get('/test/all', userController.test);                                  // Para testing.

// =========== Exporto Router =========================
module.exports = router;                                                       // Siempre exportarlo porque lo necesitaremos usar en el ENTRY POINT para que sepa a qué archivo enviar sus rutas.