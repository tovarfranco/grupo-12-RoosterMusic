import React from 'react';

function Titulo(props) {
    return (
        <React.Fragment>
            {/* <!-- Seccion 1 --> */}
            <section>
                <h2 className="texto-titulo">{props.titulo}</h2>
            </section>
            {/* <!-- /Seccion 1 --> */}
        </React.Fragment>
    )
}

export default Titulo;