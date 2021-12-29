import React from 'react';

function CampaignWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 4 --> */}
            <section>
                <h3>Campañas disponibles</h3>
                <hr />
                <div className="container-boton-categorias">
                    <div className="boton-categoria"><button>Mas visitados</button></div>
                    <div className="boton-categoria"><button>Ofertas</button></div>
                </div>
            </section>
            {/* <!-- /Seccion 4 --> */}
        </React.Fragment>
    )
}

export default CampaignWrapper;