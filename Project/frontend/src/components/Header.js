import React from 'react';

function Header() {
    return (
        <React.Fragment>
            {/* <!-- Header --> */}
            <header>

                <div className="boton-hamburguesa"><i className="fas fa-times" id="toggle-icon"></i></div>
                <div className="dashboard-texto"><h3>Dashboard RoosterMusic</h3></div>

            </header>
            {/* <!-- /Header --> */}
        </React.Fragment>
    )
}

export default Header;