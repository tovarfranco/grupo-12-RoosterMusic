// =========== Creo variable global si tengo un usuario logueado ==========     // Nos servirá para poder, por ejemplo, mostrar la barra de navegación con enombre del usuario. Creamos este middleware a nivel aplicación así en todas las rutas se ejecuta este middleware (la barra de navegación está presente en todas las vistas/rutas).
const User = require('../models/User.model');                                   // Importo el módulo porque lo usaré para la cookie.

function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;                                                // Creo esta variable global para que TODAS las vistas la vean y además se aplica a todas las rutas por ser a nivel APLICACION.

	let cookieEmail = req.cookies.userEmail;                                    // Si tildo mantener sesión, se crea una cookie. Quiero leerla y pasarla a session si existe, así no se tiene que volver a logueaar. Esto se realiza en cada req, es decir, en cada acceso a una vista, ya que siempre se realiza un request al servidor pidiendo esa vista.
	
	if (cookieEmail) {
		let userCookie = User.findByField('email', cookieEmail);                // Llamo a la función en la BBDD para ver si tengo a ese usuario y lo leo. En este caso la cookie que se guarda/dó es el email, por eso se busca por email.
		
		if (userCookie.length > 0) {                                            // En caso de haberlo encontrado lo paso a session. Para BBDD uso length ya que sino la query devuelve [] y no compara bien.
			delete userCookie.password;
			req.session.userLogged = userCookie;                                      
			res.locals.isLogged = true;											// Si está logueado ponemos la variable en true.
			res.locals.userLogged = req.session.userLogged;                     // IMPORTANTE: nos preguntamos no podríamos usar directamente req.session? NO. porque no estamos renderizando nada. Para que las vistas puedan ver a nivel global esta variable debo pasarle su valor a la variable .locals.
		}
	}

	next();
}

module.exports = userLoggedMiddleware;