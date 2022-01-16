import React from 'react';
import Cookies from 'universal-cookie';                     // Para poder utilizar cookies.

const cookies = new Cookies();

function Header() {

    let img = cookies.get('img_dashboard');
    let name = cookies.get('name_dashboard');

    return (
        <React.Fragment>
            {/* <!-- Header --> */}
            <header>

                <div className="boton-hamburguesa"><i className="fas fa-times" id="toggle-icon"></i></div>
                <div className="dashboard-texto"><h3>Dashboard RoosterMusic</h3></div>
                <div className="sesion">
                    <img src={img} alt="avatar" />
                    <button className="boton-usuario" type="button">{name}</button>
                </div>

            </header>
            {/* <!-- /Header --> */}
        </React.Fragment>
    )
}

export default Header;