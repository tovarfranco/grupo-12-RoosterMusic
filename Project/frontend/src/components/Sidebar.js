import React from 'react';
import logo from '../assets/images/Logo.JPG';                 // Las imágenes debe ser importadas para poder utilizarlas.
import { Link } from 'react-router-dom';                      // Módulo importante para poder usar links a rutas. Reemplaza al tag <a> ya que este último recarga toda la página, en cambio link trabaja con el Virtual DOM, renderizando SOLO lo nuevo.
import { useEffect} from 'react';                             // useState es para poder darle estados a los componentes FUNCIONALES (no de clase). useEffect es par poder manejar el ciclo de ida para componentes FUNCIOANLES y useRef sirve para seleccionar elementos del DOm muy parecido a los selectores de JS.
import Cookies from 'universal-cookie';                       // Para poder utilizar cookies.

const cookies = new Cookies();                                // Necesito instanciar el objeto para poder usarlo.

function Sidebar() {                                          // Usamos Link para redireccionar a la ruta que queramos. Básicamente cambia la ruta en el navegador. Ahora con un Switch + Route podemos elegir qué renderizar leyendo esta ruta del navegador.

    /* DidMount pero con Hook. */
    useEffect(() => {                                         // Recibe un callback y un array de dependencias. El "DidMount" recibe SIEMPRE un array vacío, indicando que no mira ninguna dependencia/variable de seguimiento.
        if (!cookies.get('name_dashboard')) {                 // Si ya inició sesion lo redirijo al dashboard.
            window.location.href = "../"
        }
    }, []);

    const cerrarSesion = (e) => {
        cookies.remove('name_dashboard', { path: '/' });
        cookies.remove('email_dashboard', { path: '/' });
        window.location.href = "../";                         // Como login y dashboard estan en el mismo nivel solo se agrega un punto.
    }

    return (
        <React.Fragment>
            {/* <!-- Sidebar --> */}
            <nav id="sidebar" className="sidebar">

                <div className="logo"><img src={logo} alt="Logo Rooster Music" /></div>
                <hr />
                <div className="links"><i className="fas fa-tachometer-alt"></i><Link to="/dashboard">Tablero general</Link></div>
                <hr />
                <div>Secciones</div>
                <div className="links"><i className="fas fa-guitar"></i><Link to="/dashboard/products">Productos</Link></div>
                <div className="links"><i className="fas fa-users"></i><Link to="/dashboard/users">Usuarios</Link></div>
                <div className="links"><i className="fas fa-puzzle-piece"></i><Link to="/dashboard/categories">Categorías</Link></div>
                <div className="links"><i className="fas fa-percentage"></i><Link to="/dashboard/campaigns">Campañas</Link></div>
                <div className="links"><i className="fas fa-search"></i><Link to="/dashboard/search">Buscador</Link></div>
                <hr />
                <div className="links cerrar-sesion" onClick={cerrarSesion}><i className="fas fa-times"></i>Cerrar sesión</div>

            </nav>
            {/* <!-- /Sidebar --> */}
        </React.Fragment>
    )
}

export default Sidebar;