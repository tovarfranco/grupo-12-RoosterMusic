// =========== Require's ==============================
const express = require('express');                                            // Siempre requerimos express aunque ya se haya requerido en el entry point.
const router = express.Router();                                               // Este objeto nos permite crear rutas.
const path = require("path");                                                  // Para manejar rutas. Elimina la dependencia del sistema operativo.

// =========== Controladores ==========================
const productCartController = require('../controllers/productCartController'); // ACA requerimos el controlador que tiene los callbacks que generarán las respuestas.

// =========== Middlewares ============================
const authMiddleware = require('../middlewares/auth.middleware.js');           // Uso mi propio middleware.

// =========== Router =================================
/*** Todas las ordenes *******/
router.get('/', authMiddleware, productCartController.index);                  // ACA se pone la ruta que sacamos de app.js. Este será el encargado de enviar la petición al controlador correspondiente para que genere la respuesta. Debemos usar el objeto router + método HTTP + callback (quien genera la respuesta). Usamos también SUBRUTAS del la funcionalidad.

// /*** Detalle de un producto ****/
// router.get('/detail/:id', productController.detail);

/*** Creo una orden **********/
router.post('/create', authMiddleware, productCartController.store);

/*** Modifico una orden ******/
router.put('/edit/:id', productCartController.update);

/*** Elimino una orden *******/
router.delete('/delete/:id', productCartController.delete);

// /*** Testing ****/
// router.get('/test/all', productController.test);                            // Para testing.

// =========== Exporto Router =========================
module.exports = router;                                                       // Siempre exportarlo porque lo necesitaremos usar en el ENTRY POINT para que sepa a qué archivo enviar sus rutas.