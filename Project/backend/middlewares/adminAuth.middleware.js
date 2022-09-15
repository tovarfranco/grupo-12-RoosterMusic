// =========== Redirecciono a login si NO está logueado ===========
function adminAuthMiddleware(req, res, next) {
	if (req.session.userLogged.email != 'admin@hotmail.com') {                                               // Si NO está logueado redirijo a login. Esto irá en middleware de RUTA en login y registro.      
		return res.redirect('/');
	}
	next();
}

module.exports = adminAuthMiddleware;