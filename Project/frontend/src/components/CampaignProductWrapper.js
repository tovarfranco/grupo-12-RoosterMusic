import React from 'react';

function CampaignProductWrapper() {
    return (
        <React.Fragment>
            {/* <!-- Seccion 3 --> */}
            <section>
                <h3>Productos por campañas</h3>
                <hr />
                    <div class="container-metricas">
                        <article class="metrica">
                            <div class="metrica-descripcion">
                                <h3 class="texto-titulo-metrica">Mas visitados</h3>
                                <h4 class="texto-descripcion-metrica">15</h4>
                            </div>
                        </article>
                        <article class="metrica">
                            <div class="metrica-descripcion">
                                <h3 class="texto-titulo-metrica">Ofertas</h3>
                                <h4 class="texto-descripcion-metrica">200</h4>
                            </div>
                        </article>
                    </div>
            </section>
            {/* <!-- /Seccion 3 --> */}
        </React.Fragment>
    )
}

export default CampaignProductWrapper;