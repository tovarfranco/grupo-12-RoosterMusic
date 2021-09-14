const express = require('express');                                   // Levantar/crear un servidor.
const app = express();                                                // Debemos guardar la ejecución de la función en un variable llamada app generalmente.
const indexRoute = require('./routes/indexRoute.js');                 // ACA requerimos las rutas de la funcionalidad.
const productRoute = require('./routes/productRoute.js'); 
const productCartRoute = require('./routes/productCartRoute.js');
const path = require('path');                                         // Me permite independizar del sistema operativo y que no haya inconvenientes con las rutas.

app.use(express.static(path.resolve(__dirname, './public')));         // Indicamos a Express que esta carpeta será pública.

// TESTING ===================================================================================
// Solo para ver su HTML y CSS ORIGNAL, sin ruteo, controladores ni vistas dinámicas). No olvidarte de comentar los require necesarios y EXPORTAR app.

// Ruta para la raíz:
// app.get('/', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/index.html'))
// })

// //Detalle del producto:
// app.get('/productDetail', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/productDetail.html'))
// })

// //Carrito de compras:
// app.get('/productCart', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/productCart.html'))
// })

// //Registro:
// app.get('/register', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/register.html'))
// })

// //Login:
// app.get('/login', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './views/login.html'))
// })
//============================================================================================

// Configuración View Engine:
app.set("view engine", "ejs");                                        // Indica que se usará ejs como view engine.

// Ruta raices:
app.use('/', indexRoute);                                             // ACA indicamos la BASE/RAIZ de esa funcionalidad + su archivo ruta (objeto).
app.use('/productDetail', productRoute); 
app.use('/productCart', productCartRoute);




app.use((req,res) => {                                  
        res.status(404).render('error');                              // Para mostrar página 404.
})

module.exports = app;                                                 // IMPORTANTE porque lo necesita bin/www.