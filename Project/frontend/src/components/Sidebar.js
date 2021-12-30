import React from 'react';
import logo from '../assets/images/Logo.JPG';                 // Las imágenes debe ser importadas para poder utilizarlas.
import { Link } from 'react-router-dom';                      // Módulo importante para poder usar links a rutas. Reemplaza al tag <a> ya que este último recarga toda la página, en cambio link trabaja con el Virtual DOM, renderizando SOLO lo nuevo.

function Sidebar() {                                          // Usamos Link para redireccionar a la ruta que queramos. Básicamente cambia la ruta en el navegador. Ahora con un Switch + Route podemos elegir qué renderizar leyendo esta ruta del navegador.
    return (
        <React.Fragment>
            {/* <!-- Sidebar --> */}
            <nav id="sidebar" className="sidebar">

                <div className="logo"><img src={logo} alt="Logo Rooster Music" /></div>
                <hr />
                <div className="links"><i className="fas fa-tachometer-alt"></i><Link to="/">Tablero general</Link></div>
                <hr />
                <div>Secciones</div>
                <div className="links"><i className="fas fa-guitar"></i><Link to="/products">Productos</Link></div>
                <div className="links"><i className="fas fa-users"></i><Link to="/users">Usuarios</Link></div>
                <div className="links"><i className="fas fa-puzzle-piece"></i><Link to="/categories">Categorías</Link></div>
                <div className="links"><i className="fas fa-percentage"></i><Link to="/campaigns">Campañas</Link></div>
                {/* <div className="links"><i className="fas fa-search"></i><Link to="/search">Buscador</Link></div> */}

            </nav>
            {/* <!-- /Sidebar --> */}
        </React.Fragment>
    )
}

export default Sidebar;