// =========== Require's ==============================
const express = require('express');                                            // Siempre requerimos express aunque ya se haya requerido en el entry point.
const router = express.Router();                                               // Este objeto nos permite crear rutas.
const path = require("path");                                                  // Para manejar rutas. Eimina la dependencia del sistema operativo.

// =========== Controladores ==========================
const userController = require('../controllers/user.controller.js');           // ACA requerimos el controlador que tiene los callbacks que generarán las respuestas.

// =========== Multer configuracion ===================
const multer = require("multer");                                              // Instalar MULTER. Importo a multer para poder subir archivos por formularios.

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images/users'));                // Acá se van a almacenar las imágenes. SI O SI USAR PATH.
    },

    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);   // Nombre que tendrá el archivo.
    },
});

const upload = multer({storage: storage});                                     // Acá guardamos la variable de configuración de Multer. Usarlo en la ruta que deseemos.

// =========== Router =================================

/*** Login *******/
router.get('/login', userController.login);                                    // ACA se pone la ruta que sacamos de app.js. Este será el encargado de enviar la petición al controlador correspondiente para que genere la respuesta. Debemos usar el objeto router + método HTTP + callback (quien genera la respuesta). Usamos también SUBRUTAS del la funcionalidad.

/*** Detalle de un usuario ****/
router.get('/detail/:id', userController.detail);

/*** Creo un usuario *******/
router.get('/create', userController.create);
router.post('/create', upload.single('img'), userController.store);            // Acá va el name del input file.

/*** Modifico un usuario ******/
router.get('/edit/:id', userController.edit);
router.put('/edit/:id', upload.single('img'), userController.update);          // Acá va el name del input file.

/*** Elimino un usuario *******/
router.delete('/delete/:id', userController.delete);

// =========== Exporto Router =========================
module.exports = router;                                                       // Siempre exportarlo porque lo necesitaremos usar en el ENTRY POINT para que sepa a qué archivo enviar sus rutas.