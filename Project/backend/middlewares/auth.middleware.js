// =========== Redirecciono a login si NO está logueado ===========
function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {                                               // Si NO está logueado redirijo a login. Esto irá en middleware de RUTA en login y registro.      
		return res.redirect('/users/login');
	}
	next();
}

module.exports = authMiddleware;