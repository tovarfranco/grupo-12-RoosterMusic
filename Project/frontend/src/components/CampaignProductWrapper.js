import React from 'react';

function CampaignProductWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 3 --> */}
            <section>
                <h3>Productos por campañas</h3>
                <hr />
                    <div className="container-metricas">
                        <article className="metrica">
                            <div className="metrica-descripcion">
                                <h3 className="texto-titulo-metrica">Mas visitados</h3>
                                <h4 className="texto-descripcion-metrica">15</h4>
                            </div>
                        </article>
                        <article className="metrica">
                            <div className="metrica-descripcion">
                                <h3 className="texto-titulo-metrica">Ofertas</h3>
                                <h4 className="texto-descripcion-metrica">200</h4>
                            </div>
                        </article>
                    </div>
            </section>
            {/* <!-- /Seccion 3 --> */}
        </React.Fragment>
    )
}

export default CampaignProductWrapper;