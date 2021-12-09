// =========== Creo variable global si tengo un usuario logueado ==========     // Nos servirá para poder, por ejemplo, mostrar la barra de navegación con enombre del usuario. Creamos este middleware a nivel aplicación así en todas las rutas se ejecuta este middleware (la barra de navegación está presente en todas las vistas/rutas).
const User = require('../models/User.model');                                   // Importo el módulo porque lo usaré para la cookie.
const Order = require('../models/Order.model');                                   // Importo el módulo porque lo usaré para la cookie.

async function userLoggedMiddleware(req, res, next) {
	res.locals.isLogged = false;                                                // Creo esta variable global para que TODAS las vistas la vean y además se aplica a todas las rutas por ser a nivel APLICACION.
	let userCookie;

	let cookieEmail = req.cookies.userEmail;                                    // Si tildé mantener sesión, se crea una cookie. Quiero leerla y pasarla a session si existe, así no se tiene que volver a logueaar. Esto se realiza en cada req, es decir, en cada acceso a una vista, ya que siempre se realiza un request al servidor pidiendo esa vista.
	
	if (cookieEmail) {                                              			// Si existe la cookie lo busco para ver si es un usario.            
		userCookie = await User.findByField('email', 'eq', cookieEmail);        // Llamo a la función en la BBDD para ver si tengo a ese usuario y lo leo. En este caso la cookie que se guarda es el email, por eso se busca por email.
        userCookie = userCookie[0];												// CASO PARTICULAR para que me traiga el usuario. Para consultas más complejas usar arrays.
		delete userCookie.password;												// Antes de pasarlo a session le borro la contraseña por seuridad.
		req.session.userLogged = userCookie;									// En caso de haberlo encontrado lo paso a session.
	}

	if (req.session.userLogged) {                                               // Si está logueado ponemos la variable en true. Los if no van anidados porque el logueao puede darse por cookie o por session-login.
		res.locals.isLogged = true;
		res.locals.userLogged = req.session.userLogged;                         // IMPORTANTE: nos preguntamos no podríamos usar directamente req.session? NO. porque no estamos renderizando nada. Para que las vistas puedan ver a nivel global esta variable debo pasarle su valor a la variable .locals.
		let orderList  = await Order.join(req.session.userLogged.id_user, '1'); // Traigo todas las ordenes 'En Carrito' del usuario (podría usar findByField pero este ya funciona).
		res.locals.count = orderList.length;									// Para mostrar las cantidades en el carrito.
	}

	next();
}

module.exports = userLoggedMiddleware;