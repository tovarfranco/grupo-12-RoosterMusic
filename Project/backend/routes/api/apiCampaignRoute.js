// =========== Require's ==============================
const express = require('express');                                                           // Siempre requerimos express aunque ya se haya requerido en el entry point.
const router = express.Router();                                                              // Este objeto nos permite crear rutas.
const path = require("path");                                                                 // Para manejar rutas. Eimina la dependencia del sistema operativo.

// =========== Controladores ==========================
const apiCampaignController = require('../../controllers/api/apiCampaignController.js');      // ACA requerimos el controlador que tiene los callbacks que generarán las respuestas.

// =========== Router =================================
/*** Todas las campañas ********/
router.get('/', apiCampaignController.index);                                                 // ACA se pone la ruta que sacamos de app.js. Este será el encargado de enviar la petición al controlador correspondiente para que genere la respuesta. Debemos usar el objeto router + método HTTP + callback (quien genera la respuesta). Usamos también SUBRUTAS del la funcionalidad.

/*** Detalle de una campaña ****/
router.get('/:id', apiCampaignController.detail);

// =========== Exporto Router =========================
module.exports = router;                                                                      // Siempre exportarlo porque lo necesitaremos usar en el ENTRY POINT para que sepa a qué archivo enviar sus rutas.