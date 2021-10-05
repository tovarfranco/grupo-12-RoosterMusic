// =========== Redireccion a profile si está logueado ==========
function guestMiddleware(req, res, next) {
	if (req.session.userLogged) {                                               // Si está logueado no quiero que vaya a loguin ni a registro, lo redirijo a profile. Esto irá en middleware de ruta en login y registro.
		return res.redirect('/users/profile');
	}
	next();
}

module.exports = guestMiddleware;