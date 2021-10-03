// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.
const {validationResult} = require('express-validator');                         // Tambien se requiere acá. Solo nos interesa el elemento validationResult de espress-validator (destructuring).

// =========== Lectura BBDD ===========================
const userListPath = path.join(__dirname, "../database/userList.json");    // Ruta del archivo BBDD.
let userList = JSON.parse(fs.readFileSync(userListPath, 'utf-8'));         // Importamos la BBDD que se pasará a las vistas. Lista de objetos.

// =========== Controlador ============================
const userController = {

    /*** Logueo ***/
    login: (req,res) => {
        res.render('login');
    },

    /*** Detalle de un usuario ***/
    detail: (req,res) => {
        const user = userList.find(user => user.id == req.params.id);
        res.render('userDetail', {user: user});
    },

    /*** Creo un usuario ***/
    create: (req, res) => {
		res.render('register')
	},

	store: (req, res) => {

        const resultValidation = validationResult(req);                 // Guardamos los resultados de las validaciones. Es un ARRAY de objetos que tiene los errores que se produjeron (input name, mensaje, etc).

		if (resultValidation.errors.length > 0) {                       // Si hubo errores, devuelvo la vista con los errores + la data ya ingresada del formulario.
			return res.render('register', {errors: resultValidation.mapped(), oldData: req.body});   // .mapped() convierte a ese array en un OBJETO literal con claves el input name y valor el contenido de todo ese error. Paso la data del body nuevamente así lo la pierdo.
		}

		let imagenName;                                                 // Para guardar la imagen. Si existe uso su nombre sino uso el default.
		if (req.file) {
			imagenName = req.file.filename;
		} else {
			imagenName = "img-sin-imagen-disponible.jpg"
		}

		let nuevo = {
			id: userList.slice(-1)[0].id + 1,                            // Lo hice de esta forma solo para agregar un id "autonumérico".
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            dni: req.body.dni,
			country: req.body.pais,								         // Guardo el nombre de la imagen que llega de Multer. Tiene una lógica arriba.
            address: req.body.domicilio,
            birth: req.body.nacimiento,
            email: req.body.email,
            password: req.body.password,
            image: imagenName
		}

		userList.push(nuevo);
		fs.writeFileSync(userListPath, JSON.stringify(userList, null, 4));  // De esta forma lo guarda "formateado".

		res.redirect('/users/detail/' + nuevo.id);
	},

    /*** Modifico un usuario ***/
	edit: (req, res) => {
		const user = userList.find(user => user.id == req.params.id);
		res.render('userEdit', {user: user});
	},

    update: (req, res) => {
		let imagenName;                                                      // Para guardar la imagen. Si existe uso su nombre sino uso la que ya tenía.
		if (req.file) {
			imagenName = req.file.filename;
		} else {
            const user = userList.find(user => user.id == req.params.id);
			imagenName = user.image;
		}

		userList.forEach(user => {
			if (user.id == req.params.id) {
                user.first_name = req.body.nombre,
                user.last_name = req.body.apellido,
                user.dni = req.body.dni,
                user.country = req.body.pais,								// Guardo el nombre de la imagen que llega de Multer. Tiene una lógica arriba.
                user.address = req.body.domicilio,
                user.birth = req.body.nacimiento,
                user.email = req.body.email,
                user.password = req.body.password,
                user.image = imagenName
			}
		});
		
        fs.writeFileSync(userListPath, JSON.stringify(userList, null, 4));  // De esta forma lo guarda "formateado".

		res.redirect('/users/detail/' + req.params.id);
	},

    /*** Elimino un usuario ***/
    delete: (req, res) => {
		userList = userList.filter(user => user.id != req.params.id);
		fs.writeFileSync(userListPath, JSON.stringify(userList, null, 4));  // De esta forma lo guarda "formateado".

		res.redirect('/');
	}
}

// =========== Exporto Controlador ===========================
module.exports = userController                                      // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.