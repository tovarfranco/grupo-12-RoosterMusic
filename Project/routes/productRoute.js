// =========== Require's ==============================
const express = require('express');                                            // Siempre requerimos express aunque ya se haya requerido en el entry point.
const router = express.Router();                                               // Este objeto nos permite crear rutas.
const path = require("path");                                                  // Para manejar rutas. Eimina la dependencia del sistema operativo.

// =========== Controladores ==========================
const productController = require('../controllers/productController.js');      // ACA requerimos el controlador que tiene los callbacks que generarán las respuestas.

// =========== Multer configuracion ===================
const multer = require("multer");                                              // Instalar MULTER. Importo a multer para poder subir archivos por formularios.

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images/products'));             // Acá se van a almacenar las imágenes. SI O SI USAR PATH.
    },

    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);   // Nombre que tendrá el archivo.
    },
});

const upload = multer({storage: storage});                                     // Acá guardamos la variable de configuración de Multer. Usarlo en la ruta que deseemos.

// =========== Router =================================
/*** Todos los productos *******/
router.get('/', productController.index);                                      // ACA se pone la ruta que sacamos de app.js. Este será el encargado de enviar la petición al controlador correspondiente para que genere la respuesta. Debemos usar el objeto router + método HTTP + callback (quien genera la respuesta). Usamos también SUBRUTAS del la funcionalidad.

/*** Detalle de un producto ****/
router.get('/detail/:id', productController.detail);

/*** Creo un producto **********/
router.get('/create', productController.create);
router.post('/create', upload.single('img'), productController.store);         // Acá va el name del input file.

/*** Modifico un producto ******/
router.get('/edit/:id', productController.edit);
router.put('/edit/:id', upload.single('img'), productController.update);       // Acá va el name del input file.

/*** Elimino un producto *******/
router.delete('/delete/:id', productController.delete);

/*** Testing ****/
router.get('/test/all', productController.test);                               // Para testing.

// =========== Exporto Router =========================
module.exports = router;                                                       // Siempre exportarlo porque lo necesitaremos usar en el ENTRY POINT para que sepa a qué archivo enviar sus rutas.