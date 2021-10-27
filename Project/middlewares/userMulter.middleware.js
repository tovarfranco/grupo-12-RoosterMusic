// =========== Require's ==============================
const path = require("path");                                                  // Para manejar rutas. Eimina la dependencia del sistema operativo.
const multer = require("multer");                                              // Instalar MULTER. Importo a Multer para poder subir archivos por formularios.

// =========== Multer configuración ===================
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../public/images/users'));                // Acá se van a almacenar las imágenes. SI O SI USAR PATH.
    },

    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);   // Nombre que tendrá el archivo.
    },
});

const upload = multer({storage: storage});                                     // Acá guardamos la variable de configuración de Multer. Usarlo en la ruta que deseemos.

module.exports = upload;                                                       // Lo exportamos para su uso.