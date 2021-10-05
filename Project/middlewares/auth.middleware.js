// =========== Redireccion a loguin si NO está logueado ==========
function authMiddleware(req, res, next) {
	if (!req.session.userLogged) {                                               // Si NO está lo redirijo a loguin. Esto irá en middleware de ruta en login y registro.      
		return res.redirect('/users/login');
	}
	next();
}

module.exports = authMiddleware;