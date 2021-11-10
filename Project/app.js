// =========== Require's general =======================
const express = require('express');                                   // Levantar/crear un servidor.
const path = require('path');                                         // Me permite independizar del sistema operativo y que no haya inconvenientes con las rutas.

// =========== Express =================================
const app = express();                                                // Debemos guardar la ejecución de la función en un variable llamada app generalmente.

// =========== Middlewares =============================
app.use(express.static(path.resolve(__dirname, './public')));         // Indicamos a Express que esta carpeta será pública.

app.use(express.urlencoded({ extended: false }));                     // Para poder trabajar con la información de formularios.
app.use(express.json());                                              // Para poder trabajar con la información de formularios.

const methodOverride =  require('method-override');                   // Para poder usar los métodos PUT y DELETE.
app.use(methodOverride('_method'));                                   // Para poder pisar el method="POST" en el formulario por PUT y DELETE.

const session = require('express-session');                           // Para poder trabajar con sesiones.
app.use(session({                                                     // Se inicializa de esta manera.
	secret: "Rooster Music secret",
	resave: false,
	saveUninitialized: false,
}));

const cookies = require('cookie-parser');                             // Middleware importado (no propio).
app.use(cookies());                                                   // Es a nivel aplicación, nos permitirá trabajar con cookies, que serán objetos literales que se guardan en el cliente (información no sensible).

const userLoggedMiddleware = require('./middlewares/userLoggued.middleware') // Middleware propio creado.
app.use(userLoggedMiddleware);                                               // Importante que esté después de session y cookies porque usa a estos en su funcionalidad. Me permitirá identificar e lusuario logueado, ya sea por loguin o por cookies

const userLog = require('./middlewares/userLog')                      // Middleware propio creado.
app.use(userLog);                                                     // Implemento mi middleware de APLICACION. Recordar que primero se procesa los middlewares de aplicación y luegos los de ruta, son jerárquicos.

// =========== Configuración Template Engine ===========
app.set("view engine", "ejs");                                        // Indica que se usará ejs como view engine.
app.set('views', path.join(__dirname, '/views'));                     // Define la ubicación de la carpeta de las Vistas.

// =========== Ruteo ===================================
const indexRoute = require('./routes/indexRoute.js');                 // ACA requerimos las rutas de la funcionalidad.
const userRoute = require('./routes/user.route.js');
const productRoute = require('./routes/productRoute.js'); 
const productCartRoute = require('./routes/productCartRoute.js');

app.use('/', indexRoute);                                             // ACA indicamos la BASE/RAIZ de esa funcionalidad + su archivo ruta (objeto).
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/productCart', productCartRoute);

app.use((req,res) => {                                  
        res.status(404).render('error');                              // Para mostrar página 404.
})

// =========== Exporto aplicación ======================
module.exports = app;                                                 // IMPORTANTE porque lo necesita bin/www.