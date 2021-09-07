const productList = require("../database/productList.json")   // Importamos la BBDD que se pasará a las vistas.

const indexController = {
    index: (req,res) => {                                     // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        res.render('index', {productList: productList});      // ESTE ES UN .EJS (modificar los .html a .ejs). Es NECESARIO setear el VIEW ENGINE en app.js para usar res.render(). // Le envía a ESTA view las variables dinámicas que necesita.
    },
    login: (req,res) => {
        res.render('login');
    },
    register: (req,res) => {
        res.render('register');
    }
}

module.exports = indexController                             // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.