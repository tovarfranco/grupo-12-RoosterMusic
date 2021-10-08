// =========== Creo variable global si tengo un usuario logueado ==========     // Nos servirá para poder, por ejemplo, mostrar la barra de navegación con enombre del usuario. Creamos este middleware a nivel aplicación así en todas las rutas se ejecuta este middleware (la barra de navegación está presente en todas las vistas/rutas).
const User = require('../models/User.model');                                   // Importo el módulo porque lo usaré para la cookie.

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;                                                // Creo esta variable global para que TODAS las vistas la vean y ademas se aplica a todas las rutasA por ser a nivel PLICACION.

	let cookieEmail = req.cookies.userEmail;                                    // Si tildo mantener sesión, se crea una cookie. Quiero leerla y pasarla a session si existe, así no se tiene que volver a logueaar.
	let userCookie = User.findByField('email', cookieEmail);                    // Llamo a la función en la bbdd para ver si tengo a ese usuario y lo leo.

	if (userCookie) {                                                           // En caso de haberlo encontrado lo paso a session.
        delete userCookie.password;
		req.session.userLogged = userCookie;
	}

	if (req.session.userLogged) {                                               // Si está logueado ponemos la variable en true. 
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;                         // IMPORTANTE: nos preguntamos no podríamos usar directamente req.session? NO. porque no estamos renderizando nada. Para que las vistas puedan ver a nivel global esta variabe debo pasarle su valor a la variable .locals.
	}

	next();
}

module.exports = userLoggedMiddleware;