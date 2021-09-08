const productList = require("../database/productList.json")                       // Importamos la BBDD que se pasará a las vistas.

const productController = {

    productDetail: (req,res) => {                                                 // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        const product = productList.find(product => product.id == req.params.id)  // Busca en la lista el plato que tiene el mismo id que el pasado por parámetro.
        res.render('productDetail', {product: product, productList: productList})                           // Le envía a ESTA view las variables dinámicas que necesita.  // ESTE ES UN .EJS (modificar los .html a .ejs). Es NECESARIO setear el VIEW ENGINE en app.js para usar res.render(). // Le envía a ESTA view las variables dinámicas que necesita.
    }
}

module.exports = productController                                                // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.