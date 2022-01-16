import React from 'react';
import Swal from 'sweetalert2'
import { useEffect, useState } from 'react';                                                 // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.
import Cookies from 'universal-cookie';                                                      // Para poder utilizar cookies.

//import '../assets/css/login.css';                                                          // Se importa un css. OJO con los css, afectan a toda la página.
import logo from '../assets/images/Logo.JPG';                                                // Las imágenes debe ser importadas para poder utilizarlas.

const cookies = new Cookies();                                                               // Necesito instanciar el objeto para poder usarlo.

function Login() {

    /* Valores iniciales */
    const [email, setEmail] = useState('');                                                  // useState genera un ARRAY de 2 posiciones. La 1° es una variable que tiene el valor definido. La 2° es una FUNCION que permitirá setear un nuevo valor a la variable anterior. En este caso lavarialbe tiene un array [].
    const [password, setPassword] = useState('');

    /* DidMount pero con Hook. */
    useEffect(() => {                                                                        // Recibe un callback y un array de dependencias. El "DidMount" recibe SIEMPRE un array vacío, indicando que no mira ninguna dependencia/variable de seguimiento.
        if (cookies.get('name_dashboard')) {                                                 // Si ya inició sesion lo redirijo al dashboard.
            window.location.href = "./dashboard"
        }
    }, []);

    /* DidUpdate pero con Hook. */
    useEffect(() => {                                                                        // En este caso es importante PASARLE el array con dependencias, es decir a la variable que daremos seguimiento por si cambia de estado.
        console.log('%cSe actualizó el componente - DidUpdate', 'color: blue');
        console.log("Soy emailState en DID-UPDATE: " + email);                               // IMPORTANTE ESTE SI TOMA el correcto porque el componente ya se volvió a renderizar.
        console.log("Soy passwordState en DID-UPDATE: " + password);
    }, [email, password]);


    /* Captura el valor del imput */
    const inputEmailChange = (e) => {
        setEmail(e.target.value);
        console.log("Soy emailTarget: " + e.target.value);
        console.log("Soy emailState: " + email);
    }

    /* Captura el valor del imput */
    const inputPasswordChange = (e) => {
        setPassword(e.target.value);
        console.log("Soy passwordTarget: " + e.target.value);
        console.log("Soy passwordState: " + password);
    }

    /* Llamo a la API con los valores capturados */
    const iniciarSesion = (e) => {
        e.preventDefault();
        fetch(`/api/users/login`, {                                                          // Ver que es un fetch de POST.
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())                                               // Convierte la respuesta plana json a objeto verdadero.
            .then(data => {
                if (Object.keys(data).includes('error') === false) {                         // Si la respuesta no tiene el atributo 'error' entonces está ok.
                    Swal.fire({                                                              // Le podemos pasar un objeto indicando cada atributo, o directamente texto (raro pero lo entiende).
                        title: `Bienvenido ${data.name}`,
                        text: 'Usuario logueado correctamente',
                        icon: 'success',
                        allowOutsideClick: false
                    }
                    ).then(() => {
                        console.log("EXITO");
                        cookies.set('name_dashboard', data.name, { path: '/' });
                        cookies.set('email_dashboard', data.email, { path: '/' });
                        cookies.set('img_dashboard', data.img, { path: '/' });
                        window.location.href="./dashboard";                                  // Como login y dashboard estan en el mismo nivel solo se agrega un punto.
                    })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: `${data.error}`,
                        icon: 'error',
                        confirmButtonText: 'Volver a intentar'
                    }
                    ).then(() => console.log("ERROR"))
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    console.log('%cSe renderizó el componente', 'color: violet');

    return (
        <React.Fragment>
            {/* <!-- Login --> */}
            <div className="container-login">

                <div className="logo-about" ><img src={logo} alt="Logo Rooster Music" /></div>

                <form className="formulario" onSubmit={iniciarSesion}>
                    <h3 className="texto-formulario">Ingreso Dashboard</h3>
                    <div className="inputs-2">
                        <div className="elemento">
                            <label>E-mail</label>
                            <input type="email" name="email" className="control-login" placeholder="E-mail" onChange={inputEmailChange} />
                        </div>
                        <div className="elemento">
                            <label>Contraseña</label>
                            <div className="psw">
                                <input type="password" name="password" className="control-psw" placeholder="Contraseña" id="id_password" onChange={inputPasswordChange} />
                                <i className="ojo-icono far fa-eye-slash" id="togglePassword"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mantener">
                        <label><input type="checkbox" name="mantener" />Mantener sesión iniciada</label>
                    </div>
                    <div><button className="boton-iniciar-sesion-formulario" type="submit">Iniciar sesión</button></div>
                    <p>* Solo usuarios administradres</p>
                </form>
            </div>
            {/* <!-- /Login --> */}
        </React.Fragment>
    )
}

export default Login;