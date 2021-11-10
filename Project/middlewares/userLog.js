// =========== Require's ==============================
const fs = require('fs');
const path = require('path');

// =========== Creación de archivo de visita ==========
const logPath = path.join(__dirname, '../logs/userLog.txt');                // Path SIEMPRE es necesario para rutas, para que no arroje errores.

function userLog (req, res, next) {

    if (!req.session.userLogged) {
        fs.appendFileSync(logPath, 'Usuario desconocido ingresó a la ruta ' + req.url + '\r\n');
    } else {
        fs.appendFileSync(logPath, 'El usuario ' + req.session.userLogged.id_user + ' ingresó a la ruta ' + req.url + '\r\n'); // \r\n es para que escriba en una nueva línea.
    };

    next();
};

module.exports = userLog;